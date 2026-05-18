---
title: 'Slaying the Snapdragon: Getting things to work'
excerpt: 'An update on NEXA and other progress'
coverImage: '/assets/cover_image/snapdragon_phone.jpg'
date: '2026-06-25T10:48:30.322Z'
author:
  name: Joe Bowser
  picture: '/assets/blog/authors/joe.png'
  bio: 'Joe writes software, hikes and lives in Port Moody, BC'
  instagram: 'infil00p'
  linked_in: 'https://www.linkedin.com/in/joe-bowser/'
---

Back in December 2022, after giving what would be my final public talk as an Adobe employee, I met Felix Baum at Qualcomm.  I've worked with Qualcomm on and off throughout the years, mostly stumbling over their SDKs and trying to get them to work on my MBP.  That's where I found out that Qualcomm was no longer supporting NNAPI and that they were investing in the NP on both Windows and Android.  Now, while Apple hold the majority of OnDevice market share in North America, it's pretty clear how to get the best performance out of ML on iOS, which is to use frameworks that use the Neural Processing Unit, or NPU.  However, Qualcomm, Mediatek, Google and Samsung (Exynos) have their own neural accelerators with their own proprietary bits, and due to market conditions combined with a decade of history, Qualcomm is in the dominant position when it comes to Android hardware in North America.  So, when someone from Qualcomm says "Hey, maybe you should move away from NNAPI", you listen.

Fast forward to October of 2025. Qualcomm and Meta are co-hosting the Executorch hackathon, and I decide to actually fly down from Vancouver to San Francisco for it because I wanted to meet the NimbleEdge team, I wanted to catch up with people who were working on PyTorch/Executorch that I only met in the Discord, and maybe I could make something cool. At this point, this was the first hackathon that I attended since my PhoneGap days over a decade ago where I was asked to help host an AR hackathon at Adobe San Francisco (I still have the NVIDIA device I'm convinced was used to sell Nintendo GPUs for the first generation Nintendo Switch).  I teamed up with NimbleEdge, and while we didn't have much to show for our efforts in the hackathon, I learned a lot, including tactics on how to win.  I also learned that the Samsung Galaxy S25 Ultra had a Snapdragon 8 Elite Gen 4 processor that was capable of producing tokens at approximately 50 tok/sec on a half a billion parameter model.  This was very compelling, and put me on the fence about buying a snapdragon device.

Now, moving on to 2026.  Someone from NEXA AI reached out to me and asked if I wanted to participate in the NEXA AI hackathon.  I decided that I was going to do so, because there was a prize of $5000 and that gave me the mental justification to run out and buy a OnePlus 15 with the Snapdragon 8 Elite Gen 5 chip, which is cutting edge.  I went with OnePlus over Samsung given the fact that Lineage OS often supports OnePlus devices, and back in the day before I got too busy, I used to enjoy building my own custom Android ROMs.  I was never a super active participant in the Android ROM scene, but given the fact that most OEM devices ship with pre-baked AI, I would like to have the option to strip things down and ship my own AI and my own agents on my own phone.

So, I pressed on and I worked on the NEXA AI hackathon.  I built an application called SideEye, which is a Smart Gallery application that uses NEXA's OmniNeural VLM to classify sensitive photos that you may want to hide or delete in your camera roll.  This is something that MUST have NPU acceleration to be viable because the processing and thermal requirements are far too much for CPU or even Vulkan accleeration on Android.  While the model was four billion parameters and was overkill for the task, I wasn't able to just convert nudenet and run a classifier, therefore it was multimodal all the time for the prototype.  I tested it on the Snapdragon Device Cloud, and was very impressed with how the thing worked.  After doing as much testing as I could on the QDC, I submitted my application.  I really wanted to do testing on the OnePlus 15, but it was stuck in Ontario and I wasn't able to in time.

Now, that would be the end of the story, except that I didn't move past Phase One, and I did get the OnePlus 15.

The moment I got the OnePlus 15, I decided to try out SideEye and I got this error (this was before NEXA AI 0.0.24):

14001

This is the error that you get when you're running the NEXA AI SDK on an unsupported chipset.  This was a little embarassing, because it should work.  Since I was no longer required to use NEXA AI, I decided to try out all the other AI frameworks that claimed to have Qualcomm support.

* LiteRT
* ONNX Runtime
* Executorch
* llama.cpp

LiteRT was a mess.  It seems that Google doesn't believe that cutting edge OnDeivce AI developers should be able to build using NPU, or build anything without their bloated Mediapipe framework, because getting a generic Visual Language Model to run at all was a major challenge, even with Claude Code and vibecoding the shit out of it.  After about 6 hours trying to get this to work, I gave up and I acutally sent an RMA thinking that it didn't work.  I then went and pulled down the Qualcomm Demo Apps to sanity check, and it was actually the hard to use LiteRT stack that was the culprit, so I gave up on LiteRT.

ONNX Runtime was not much better.  While I have Rust code through pyke-ort that does run LLMs fairly well, the reality is that Microsoft did a lot of work to get Scaled Dot Product Attention to work fast in the models and that once you remove the optimization and deal with the ONNX export issues, it was really no longer worth the effort to try and get ORT to work with LLMs on the Snapdragon chipsets.  I could totally get non-LLM models to work fine and run at less than a millisecond, but that's really table stakes.

Executorch DID work, but only after I fixed two bugs in their main branch.  I think Executorch is promising, but there's still a ton of jagged edges with the model conversion, and as of writing this, the only VLM that works with Executorch is Gemma, and I want to be able to run any VLM.  I may still look at Executorch for Mediatek acceleration and their Apple NPU backend, but this requires a lot of DevOps work around model conversions, compilation and CI/CD just to make sure nothing breaks.

This finally brings me to llama.cpp and the Hexagon build.  I was actually surprised this existed, because llama.cpp is literally programatic C++ that's like artisnal transformers graph building than it is a general purpose inference framework, BUT it's the most popular by far and it's got the most support for multimodal models such as Ministral, Liquid and SmolVLM.  The latter being my personal favourite because it's what got me into the VLM thing in the first place.  I did manage to get both the Hexagon command line tools to work on the OnePlus 15, and after some minor tweaking I got some outputs to work on the OnePlus 15.

Now, are they good outputs? I don't think they are, but I am uncertain whether that's a model issue or whether that's an inference issue, but with the TTFT no longer needing a loading indicator, this is huge, because it opens up the opportunity for things like full OnDevice semantic search of your photo gallery to exist, which just couldn't work on Android before.

## Where things are at now

I can get Snapdragon to work on Baseweight Snap, but it is by no means stable.  This work definitely highlighted the fact that accelerated Android inference is an absolute nightmare dependent on hardware fragmentation, and I wasn't aware of exactly how dogwater Vulkan is on an Adreno chip.  I did release a new test version that has support for all three backends on llama.cpp on the Google Play store.  Feel free to try it out and let me know whether it's useful.  I know that most people use PocketPal, but I dislike React Native for Local ML use cases due to the way that React Native renders the UI and steals CPU cycles.  I may actually write a blog post about that comparing llama.rn to llama.cpp.  It may shock people who know me from the Cordova days, but I'm a big proponent of avoiding the nth body problem, and I agree with AirBNB's reasons for dropping React Native.

