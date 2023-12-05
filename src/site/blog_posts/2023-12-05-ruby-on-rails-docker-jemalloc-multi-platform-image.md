---
title: 'Ruby on Rails and Docker: Jemalloc in multi-platform images'
date: 2023-12-05T19:29:03.944Z
tags:
  - ruby
  - docker
  - programming
---

Teamtailor has been [running with jemalloc in production](https://tacocat.space/@jonas/111499803357547924) for a couple of days, [with great success](https://tacocat.space/@jonas/111499996256547764). Today, we wanted to try running the app on AWS's Graviton, their ARM-based CPUs, to see if we could get a better cost/performance ratio.

Our Docker image setup for jemalloc, based on [a gist](https://gist.github.com/jjb/9ff0d3f622c8bbe904fe7a82e35152fc) from [John Bachir](https://mastodon.social/@johnjoseph), was using a hard-coded path containing a reference to `x86_64`:

```dockerfile
ENV LD_PRELOAD=/usr/lib/x86_64-linux-gnu/libjemalloc.so.2
ENV MALLOC_CONF="dirty_decay_ms:1000,narenas:2,background_thread:true"
```

The solution I came up with to support both `linux/amd64` and `linux/arm64` was to use a symlink:

```dockerfile
RUN ln -s /usr/lib/*-linux-gnu/libjemalloc.so.2 /usr/lib/libjemalloc.so.2
ENV LD_PRELOAD=/usr/lib/libjemalloc.so.2
ENV MALLOC_CONF="dirty_decay_ms:1000,narenas:2,background_thread:true"
```
