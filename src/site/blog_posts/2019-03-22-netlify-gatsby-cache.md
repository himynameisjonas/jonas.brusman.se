---
date: 2019-03-22
title: Cache Gatsby builds on Netlify
tags:
  - programming
  - netlify
  - gatsby
  - meta
---

When I started moving this site from Jekyll to [Gatsby](https://www.gatsbyjs.org/) I noticed that my deploys to [Netlify](https://www.netlify.com) was very slow. Mostly because I have a lot of large photos that need to be converted and optimized to different sizes. I experienced deploy times over 10 minutes and thought that there must be something to do to speed things up.

When I was using Jekyll I just dumped my photos cache inside the `node_modules` directory and I thought that I just could do that now too. But it felt dirty. And hacky.

So I search the Netlify documentation but couldn't find anything about adding files to a cache between builds until I stumble upon a comment on StackOverflow (or was it on a Github issue?) that mentioned an undocumented cache folder and that someone [already had built a Gatsby plugin](https://www.npmjs.com/package/gatsby-plugin-netlify-cache) that simply caches the Gatsby output in that Netlify folder. A piece of cake!

1. Install the addon by running: `yarn add gatsby-plugin-netlify-cache`
2. Add `'gatsby-plugin-netlify-cache'` to the plugins list in your `gatsby-config.js` file.
