---
title: Another success story with Jemalloc
date: 2023-12-27T20:17:29.315Z
tags:
  - programming
  - ruby
  - docker
syndications:
  - 'https://tacocat.space/@jonas/111654499289851393'
  - 'https://tacocat.space/@jonas/111499996256547764'
  - 'https://tacocat.space/@jonas/111499803357547924'
---

I recently merged a Pull Request to enable Jemalloc in our (Teamtailor's) production Rails app, and the results were impressive.

![A graph showing memory usage before (\~6GB) and after (\~2.5GB)](https://photo-storage.brusman.se/jemalloc/ed1719d6225f87e3.png)

After deploying Jemalloc, our app's memory usage decreased from around 6 GB to just 2.5 GB. Super nice!

Our next step involved switching to ARM architecture with AWS Graviton for our ECS tasks, resulting in improved performance at a lower cost. Two big wins in a short time!
