---
title: Webmentions
date: 2025-03-15T08:30:00.000Z
tags:
  - meta
  - eleventy
syndications:
  - https://tacocat.space/@jonas/114165612618690047
  - https://bsky.app/profile/jonas.brusman.se/post/3lkfr3cebdk2v
---

I came across a [blog post by Tom where he discusses his simple webmention implementation in Eleventy](https://ttntm.me/blog/implementing-webmentions/).

I decided to do something similar for this site, so now each post includes webmention statistics instead of the already existing stats from the Fediverse.

I made [one small change](https://github.com/himynameisjonas/jonas.brusman.se/commit/263ab9bc0894421ebebaa75f8e92b8aa8aa91fed#diff-8b43a81e37dfe07b699be671ac44b58fece73e27f8dbc2e1fda99c0e13ffec90R24-R26) to the webmention fetch function by combining `mention-of` and `in-reply-to` numbers.
