---
title: Glyphhanger – subset fonts for the web
date: 2024-05-17T19:28:00.000Z
tags:
  - meta
  - webdev
  - design
  - programming
syndications:
---

This site uses two custom fonts, and I wanted to see if I could make them smaller to improve loading times. I found a tool called [Glyphhanger](https://www.zachleat.com/web/glyphhanger/) that does just that: subsetting fonts to only include the characters needed.

## The "logo"

The "logo" on this site that is set in a custom font. It felt very wasteful to load the entire font just for displaying my name. Using the following command (I used Docker to run the tool to avoid installing all dependencies on my machine), I shrunk the font file from 79KB to just 6.5KB.

```sh
docker run --rm -v "./:/app" talentplatforms/glyphhanger --whitelist="JONAS BRUSMAN" --family="Tropi Land" --subset=TropiLand.ttf --formats=woff2,woff,woff-zopfli --css
```

I ran the command in the directory where the font file is located. The `--whitelist` flag specifies the characters I want to include in the subset. The `--family` flag specifies the name of the font. The `--subset` flag specifies the name of the output file. The `--formats` flag specifies the formats I want to generate. The `--css` flag generates a CSS file with the `@font-face` rule that I copied and pasted into my site's CSS file.

## The main font

The main font on this site is also a custom font. I used the following command to shrink the font file from 318KB to just 32.7KB.

```sh
docker run --rm -v "./:/app" talentplatforms/glyphhanger http://host.docker.internal:8080/texts/ http://host.docker.internal:8080/photos/ --jsdom --US_ASCII --family="Overpass" --subset=Overpass-VariableFont_wght.ttf --formats=woff2,woff,woff-zopfli --css
```

This time I used the `--jsdom` flag to make the tool visit the URLs I specified to find the characters used on the site. I ran a local server (using Eleventy) on port 8080 and pointed the tool to the URLs where the text is located. The rest of the flags are the same as in the previous command.
