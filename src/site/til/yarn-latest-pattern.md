---
date: 2019-08-21
title: Update Yarn packages based on a pattern
tags:
 - node
---

Today I learned about `yarn --latest` and `yarn --pattern`.

You can for example update all fontawesome packages to the latest version by compining those to flags:

```shell
yarn upgrade --pattern "@fortawesome" --latest
```
