---
title: "The internals of Baseweight Snap"
excerpt: "Explorations with llama.cpp and libmtmd"
coverImage: "/assets/cover_image/baseweight_snap.jpg"
date: "2025-06-11T10:48:30.322Z"
author:
  name: "Joe Bowser"
  picture: "/assets/blog/authors/joe.png"
  bio: "Joe writes software, hikes and lives in Port Moody, BC"
  instagram: "infil00p"
  linked_in: "https://www.linkedin.com/in/joe-bowser-17b3397/"
---

Back on May 5th, Xuan-Son Nguyen edited the readme and renamed the llava repo to mtmd, and libmtmd was born.  SmolVLM
has been worked on for a few months, and Qwen and others have been making models that were multimodal but llama.cpp
lacked multimodal support.  In the meantime I was experimenting on bringing SmolVLM2 over to Android with ONNX runtime since the ONNX files were already exported, but I got bogged down by the tokenizer.  I first tried in C++ and then switched to Rust to attempt to get things to work, but unfortunately I wasn't successful.

Then after the announcement about libmtmd a couple weeks ago, I did a sprint, got llama.cpp and libmtmd integrated into an app the replicated the functionality of Hugging Snap, an earlier iOS only application written by Hugging Face, and Baseweight Snap was born.

<YouTube video_id="16FLQFcMwkQ" />

My goal was to have a cool demo to show people at Web Summit Vancouver to talk about my startup, Baseweight.  While I 
decided to shelve Baseweight, the OnDevice AI tool business, in its current form, the demo was impressive.

However, unlike the last demo where we used Executorch to run Llama-3.2-3B on a Pixel 9 for a week, Baseweight Snap lasted a few hours until the battery died.  Not only that, the peformance of llama.cpp even with Vulkan acceleration was relatively poor, and every other device I managed to get my hands on didn't even support 16 bit registers and I couldn't get it to work.

Meanwhile Google did implement VLMs with Gemma.  It seems buried deep in a chat interface, and it's weird they chose to show it that way instead of using a camera, since that's truly where the mobile use case shines.

<YouTube video_id="tS2rlpHN-N8" />


## How Visual Language Models work

Visual Language models consist of primarily three parts, there's the vision encoder that takes an existing image and encodes it.  There's the embedder, or projector that embeds the tokens into the prompt, and of course the decoder that actually does the generation based on the embeddings.  Of course, these are handled differently in llama.cpp and we only have the two GGUF files, the Multimodal Projector and the main VLM file.  It's clear form the documentation that a libmtmd is the encoder and the projector for image data.

## So...you're just bolting this in on Android...who cares?

Well, yes and no, and this is where we get into the technical aspects of this.  First of all, adding llama.cpp functionality in Android means adding all of llama.cpp's CMake into the project, or trying to build shared libraries and linking against them.  I decided on the former, because that's what the example app in llama.cpp's on repository did.  This
definitely isn't my first rodeo experimenting with this, since I've done something similar in the past switching between
Executorch's LLM runner and llama.cpp.  The thing is that you need to bring in libmtmd into the mix, and that means including it into CMake, enabling Vulkan acceleration and setting things up as follows:

```cmake
set(LLAMA_CURL OFF)
set(GGML_VULKAN ON)

#load local llama.cpp
add_subdirectory(llama.cpp build-llama)
add_subdirectory(llama.cpp/common build-common)
add_subdirectory(llama.cpp/tools/mtmd build-mtmd)
```

I'm not going to lie, I pointed Cursor at mtmd-cli.cpp and based the C++ runner that I used for this off of that. That
being said, there was no way I was going to vibecode my way out of this, because there were things that you can't vibecode, such as loading the image from memory, which I do here:

```cpp
    for (size_t i = 0; i < width * height; ++i) {
        size_t src_idx = i * 4;
        size_t dst_idx = i * 3;
        
        // Skip alpha channel (BGR -> RGB)
        rgb_buffer[dst_idx + 0] = buff[src_idx + 0]; // R
        rgb_buffer[dst_idx + 1] = buff[src_idx + 1]; // G
        rgb_buffer[dst_idx + 2] = buff[src_idx + 2]; // B;
    }

    // We load directly from the buffer since mtmd takes ownership
    // this is better than copying to file or messing around with PNG decoding
    mtmd::bitmap bmp(width, height, rgb_buffer);
```

As far as GPU was concerned, I did set the gpu_layers to 512, and that seemed to work fine on the Pixel 9.  I only ever managed to get this thing to work on a Pixel 9, and other phones just failed when I tried to get it to work on them due to the lack of 16 bit register support on the Vulkan driver.  I don't have a list of Android devices with this particular quirk, but it's safe to say that this is very likely flagship phone only.

There was also the massive performance hit that evalChunks takes on Android.  I thought it was the encoding
step, so I added callbacks to evalMessage.  This sequential evalutation takes literally forever, and while I was tempted
to scale it per chunk, I decided not to.  I did experiment with adding OpenMP to the mix and trying to parallelize some
of it, but it didn't increase the performance.

```cpp
int32_t ModelManager::evalChunksWithProgress(mtmd_context * ctx,
                                struct llama_context * lctx,
                                const mtmd_input_chunks * chunks,
                                llama_pos n_past,
                                llama_seq_id seq_id,
                                int32_t n_batch,
                                bool logits_last,
                                llama_pos * new_n_past) {
    size_t n_chunks = mtmd_input_chunks_size(chunks);
    if (n_chunks == 0) {
        LOGe("no chunks to eval\n");
        return 0;
    }

    // Get JNIEnv for the current thread
    JNIEnv* env = getJNIEnv();
    if (env && currentCallback) {
        onTextGenerated("PROGRESS:Analyzing image content...:35", env, currentCallback);
    }

    // Process chunks sequentially
    for (size_t i = 0; i < n_chunks; i++) {
        bool chunk_logits_last = (i == n_chunks - 1) && logits_last;
        auto chunk = mtmd_input_chunks_get(chunks, i);

        int32_t res = mtmd_helper_eval_chunk_single(ctx, lctx, chunk, n_past, seq_id, 
                                                  n_batch, chunk_logits_last, &n_past);
        if (res != 0) {
            LOGe("failed to eval chunk %zu\n", i);
            return res;
        }
        *new_n_past = n_past;

    }

    if (env && currentCallback) {
        onTextGenerated("PROGRESS:Generating description...:70", env, currentCallback);
    }

    return 0;
}
```

So, after all of this, while I did get a cool demo that I could throw in the Open Testing channel on the Google Play store to get installed on people's phones.  What this meant is that I could go to meetups at bars and stuff and demo this in 
front of people, which is frankly more important than something that has to be tethered to my laptop.  It's better to 
get as close to shipping as possible without shipping total crap.

## What are the problems with this:

1. Battery usage is bad - Inference consistently takes 300 mW on the GPU and the phone gets warm when running inference for a long period of time.  In fact, the phone did not last the entire day of demos as Web Summit and I had to charge it and use the iOS demo, which used Metal GPU acceleration instead of Vulkan.
2. Low reach - GPU drivers are fincky, and while both Mediatek and Qualcomm have drivers that support this, they're not
good enough to actually run this fast enough to be usable.
3. No practical use cases for this form factor yet - Like, this makes for a very cool demo but the demo by itself isn't practical, and the model often gets things wrong.  I had people react badly to it making mistakes and saying that I didn't have a business because SmolVLM can't read very well

## OK, so where does this leave us with llama.cpp and libmtmd on Android.

I personally wouldn't use llama.cpp for an OnDevice project going forward, because we didn't have these problems when we ran Executorch with Llama-3.1-3b on the same phone for four days straight when we showed people at NeurIPS.  Sure, the C++
runner has some clear bugs that we found, but we hacked around them by not sending the whole context window, and the effect
was essentially the same.  We also got a higher token count of 15 tokens/sec, where as when we ran this on llama.cpp, we got a much lower 8 tokens per second.

And when we ran the same thing in llama.rn, we got an all time low of 3 tokens per second, showing that if you are going to use LLMs with React Native, it makes more sense to use React Native Executorch with the caveat that you lose a lot of control over the models when you use that library. Honestly, I think going forward it makes more sense to use either Executorch or LiteRT for this task due to the fact that they have access to proprietary delegates that simply wouldn't easily make it into the llama.cpp source as easily. I prefer Executorch because it is PyTorch native, and are working on a GGUF conversion tool to ease the pain, although multimodal is still a ways off based on what I asked on the discord.

I'll revisit the React Native performance hit soon enough.  It's up there with the fact that I've never used PocketPal because I can't seem to get it to actually download the 2GB models in my house due to the fact that the app still needs to be in the foreground to download files.

## Where do you plan to go from here

Honestly, I'm very excited about NanoVLM because it's entirely in PyTorch and that means that it can be exported easily to Executorch and run on both iOS and Android with various backends.  I know that LiteRT can also do this, but I'm more 
bullish on Meta's ecosystem than I am on Google's ecosystem since PyTorch won the inference framework fight with Tensorflow
losing and JAX being a weird thing that only Google really uses.

I'm actually far more excited about the applications of VLMs in general.  Unfortunately, this is all hobby work for me now becuse I live in Canada and there is zero demand for actual technical work in this country, and I need to eat.  I'll probably spend my time doing something that increases some shareholder value somewhere.