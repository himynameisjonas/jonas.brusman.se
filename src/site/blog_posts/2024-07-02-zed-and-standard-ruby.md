---
title: Zed and Standard Ruby
date: 2024-07-02T18:49:00.000Z
tags:
  - zed
  - ruby
  - editor
  - programming
syndications:
  - https://tacocat.space/@jonas/112718460575519913
---

I’ve been using **[Zed](https://zed.dev)** as my main editor for the last two weeks or so. It feels great, lean, and fast compared to VS Code that I’ve been using for years. Last time I tried Zed, there were no possibilities to install extensions or add/customize language servers, [but this has changed](https://zed.dev/blog/language-extensions-part-1), and there are more and more extensions being built.

I missed one particular feature while working with Ruby code, **formatting with [Standard](https://github.com/standardrb/standard)** (*"…a linter & formatter built on RuboCop…"*) so I set out on a mission to try to create one, *how hard can it be?*

Turns out it was a bit harder than I thought but not too bad. You have to write Rust, which I had never done before. Luckily, there were a lot of extensions to look at, and with that, I could quite quickly throw together a working extension that wraps Standard’s language server and uses that for linting and formatting.

## Introducing the Standard extension for Zed

![Screenshot showing the Standard extension in use within Zed](/images/zed-standard-ruby.png)

Github: **[himynameisjonas/zed-standardrb](https://github.com/himynameisjonas/zed-standardrb)**

The implementation is quite naive, and I'm not sure if I should submit it to Zed's extension library. We'll see. But until then, you can clone/download the code and use the "install dev extension" feature to use it yourself.

To enable it, you can add this snippet to your `config.json`:

```json
"languages": {
  "Ruby": {
    "language_servers": ["standardrb"]
  }
},
```

Feel free to contribute or give feedback. I'm sure there are a lot of improvements that can be made, but for now, it works for me, and I have a huge lack of time to work on it further. I hope it can be useful for someone else as well.
