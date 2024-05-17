---
title: >-
  Deploy an Eleventy site to Cloudflare Pages efficiently with GitHub's action
  cache
date: 2024-02-29T00:00:00.000Z
tags:
  - programming
  - cloudflare
  - github
  - netlify
  - eleventy
  - meta
  - webdev
syndications:
  - 'https://tacocat.space/@jonas/112016732931252162'
---

I have wanted to move this site from *Netlify* for a while now, but the [recent news about their bandwidth pricing](https://www.reddit.com/r/webdev/s/2A07zZuKoQ) made me finally do it. I looked into some alternatives (like Render, Cloudflare, Vercel, etc.) and decided to go with Cloudflare Pages. I liked Cloudflare the best because of their generous free tier.

I connected my GitHub repository to Cloudflare Pages and had Cloudflare build and deploy the site. It worked, but was really slow due to the large photos it has to process every time it rebuilds. **It took over 14 minutes to build and deploy the site** 😩. Cloudflare supports build caching, but only for a few specific frameworks, and unfortunately, Eleventy is not one of them.

I remember reading about how [Sophie Koonin deploys her site to NeoCities using GitHub Actions](https://localghost.dev/blog/how-i-deploy-my-eleventy-site-to-neocities/) (go read that; it is a really good write-up of how things work). Knowing that GitHub Actions has support for custom caching, I decided to do the same but with Cloudflare Pages instead of NeoCities.

## Deploy to Cloudflare Pages with GitHub Actions

I created a GitHub Actions workflow that caches the `node_modules` and `.cache` directories, as well as the `img` directory where the photos are stored. This reduced the build time to **just over 2 minutes, a 7x improvement**!

### The full workflow

This is the complete workflow as I write this post. I may have updated it since then, so please refer to the [source code](https://github.com/himynameisjonas/jonas.brusman.se/blob/master/.github/workflows/deploy.yml) for the latest version.

{% raw %}

```yaml
name: Build and Deploy

on:
  push:
    branches: ["master"]
  pull_request:
    branches: ["master"]
  schedule:
    - cron: "17 8 * * 6"

jobs:
  build:
    name: "Build and Deploy"
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v4
        with:
          node-version: 20.10.0
          cache: "yarn"
      - run: yarn install --frozen-lockfile

      - uses: actions/cache/restore@v4
        id: cache
        with:
          path: |
            .cache
            img
          key: 11ty-${{ runner.os }}-${{ github.run_id }}
          restore-keys: |
            11ty-${{ runner.os }}
            ${{ runner.os }}-11ty

      - name: Build 11ty site
        run: yarn build
        env:
          TINA_CLIENT_ID: ${{ secrets.TINA_CLIENT_ID }}
          TINA_SEARCH_TOKEN: ${{ secrets.TINA_SEARCH_TOKEN }}
          TINA_TOKEN: ${{ secrets.TINA_TOKEN }}
          ENABLE_ANALYTICS: ${{ github.ref == 'refs/heads/master' }}

      - name: Publish to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: 8dfec48c278d5a97c93de33e072261bd
          projectName: jonas-brusman-se
          directory: dist
          gitHubToken: ${{ secrets.GITHUB_TOKEN }}
          branch: ${{ github.head_ref || github.ref_name }}
          wranglerVersion: "3"

      - uses: actions/cache/save@v4
        with:
          path: |
            .cache
            img
          key: 11ty-${{ runner.os }}-${{ github.run_id }}
```

{% endraw %}

The workflow does the following:

1. Checks out the code and sets up Node.js with a specific version, enabling caching for dependencies installed with Yarn.
2. Installs dependencies using Yarn.
3. Restores cached directories for faster builds. I use the unique `github.run_id` to create a unique key for the cache so it can be updated with new content/images on every build.
4. Builds the 11ty site and sets some environment variables for the build.
5. Publishes the site to Cloudflare Pages using the [Cloudflare Pages Action](https://github.com/cloudflare/pages-action), specifying project details and authentication. I had to specify the branch name manually with {% raw %}`branch: ${{ github.head_ref || github.ref_name }}`{% endraw %} to make it work with pull requests.
6. Caches the contents in the specified directories to speed up future builds.
