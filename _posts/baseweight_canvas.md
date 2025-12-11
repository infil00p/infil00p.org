---
title: "Baseweight Canvas"
excerpt: "Making a desktop application in 2025"
coverImage: "/assets/cover_image/cascade_rainbow.jpg"
date: "2025-12-10T10:48:30.322Z"
author:
  name: "Joe Bowser"
  picture: "/assets/blog/authors/joe.png"
  bio: "Joe writes software, hikes and lives in Port Moody, BC"
  instagram: "infil00p"
  linked_in: "https://www.linkedin.com/in/joe-bowser/"
---

I've been working on a desktop application for Baseweight, and it's been a lot of fun. I'm using Tauri, and I'm using React for the frontend with Adobe Spectrum CSS for styling, and for the OnDevice AI processing, I'm using llama.cpp, since that's what the world has determined is the standard for Transformer based models on desktop.

## OK, but why?

So, you'd think that ollama would have this niche locked down, and I thought so to when I attended their ollama 2.0 launch event in Vancouver back in July of 2025, but there's the demo and there's the reality, and when image drag and drop didn't work on VLMs and a bunch of VLMs didn't even load properly in ollama, instead of just sitting around and waiting for them to fix the issues, I decided to build my own application and focus on the desktop experience, as well asthe experience of looking at my content while using an LLM about it.

Hence Baseweight Canvas.

While Baseweight Snap entirely used native UI due to the fact that React Native causes a noticible dip in performance, we don't have to worry about that on Desktop and can use a Hybrid framework like Tauri, which is basically "What if Cordova but on Desktop with Rust?".  

## Did you vibecode this?

Yeah, I brutally abused Claude Code, but I'm cheap so it works for me, since once I reach my token limit, I'm forced to use my brain and actually write regular code.  I also have old habits like making sure that what Claude calls the backend, the Rust code that calls llama.cpp, actually has tests.  The thing that's the most time consuming is actually adding the polish to it.  I know we're not supposed to for prototypes, but given that I had people ridicule me for the shittacular performance of SmolVLM2 despite Baseweight Snap being rock solid, there's no excuse to not polish things that are deterministic like basic application code.

## What's the goal for this?

The goal is to just throw something out there and try new things. I've seen a lot of Python demos, but I haven't seen much beyond the classic chat based UI that's been done to death by ollama, llama-server, and literally every cloud-based LLM ever created. While I would agree that language needs to be a part of the UI, we need to think about the whole conversation and allow for multimodal media to be in the model for this to be pushed forward.  This is supposed to be more of a personal blog, BUT you should check it out and let me know what you think.
