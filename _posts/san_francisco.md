---
title: "San Francisco Update"
excerpt: "First trip to SF since leaving Adobe, and other news"
coverImage: "/assets/cover_image/san_francisco.jpg"
date: "2025-11-28T10:48:30.322Z"
author:
  name: "Joe Bowser"
  picture: "/assets/blog/authors/joe.png"
  bio: "Joe writes software, hikes and lives in Port Moody, BC"
  instagram: "infil00p"
  linked_in: "https://www.linkedin.com/in/joe-bowser/"
---

It's definitely been a couple of months.  I was planning on writing earlier, but I recently had a hard drive issue, and while I was able to recover most of my files, the blog post wasn't pushed up and I managed to lose that.  I have more to announce, but this blog post will be about the trip to the Executorch Hackathon.

Recently I saw on LinkedIn that the Executorch Team was coordinating a hackathon before PyTorch conference to work on Executorch.  Since I'm new to my day job, it has nothing to do with AI or Machine Learning, and I don't have the PTO saved up to fly to San Francisco for an entire week to attend PyTorch Conference, I decided to spend the weekend in SF just for fun and to possibly meet up with people, attend the hackathon for a networking opportunity and to meet some people I talked to online, and to look at what people were able to get working in Executorch.  This trip was mostly to re-assure myself that if needed, I could still fly down to the Bay Area at the drop of a hat, because too many people in the Vancouer startup scene straight up worship SF and view it as this place to be/unattainable goal where all their problems will be magically solved.

As for the hackathon itself, it was held at GitHub HQ in San Francisco.  I ended up meeting the guys from NimbleEdge and I teamed up with them during the Hackathon, which mostly involved us first trying to invent something on our own, and then falling back and trying to use their stack with the most recent version.  At the end, we just ended up modifying a system prompt to try and get the Qwen model that was in the example to make an agentic call.  Many other teams had similar problems and it seems that the only successful teams were the ones that used the pre-existing models, or didn't use Transformers based models and built demos with conventional models.  I honestly think that if I was to do a hackathon again, I should have talked a couple of friends of mine into using some PTO days to go to the thing instead of just showing up, but to be honest, it's been over a decade since I've been in a hackathon and I was technically hosting the last one as an Adobe employee in San Francisco and was ineligible to participate.

Now, honestly, I don't feel like this trip was a complete waste of time and money given that I managed to prove to myself that I could do a business trip as Baseweight in San Francisco, and I did manage to achieve my objectives this trip, which was to network and attend the hackathon, but I'm still using llama.cpp for Baseweight Snap and upcoming software development projects for the following reasons:

* The industry/community seems to have coalesced on GGUF, despite it being weights only
* I haven't gotten a Visual Language Model to work in Executorch yet, although I did find a branch in optimum-executorch that converts SmolVLM2

To be honest, there are serious issues with time to first token when running VLMs on mobile, and while I do intend to improve it so that it's ready for the production instead of the "Open Testing" lane on Google Play, I'm currently working on a Desktop application that I'll be mentioning more soon.  I'll also be releasing an iOS version of the same application, although it'll have more functionality to stand out since there are so many applications like it on both Google Play and the App Store.

Keep watching this space.
