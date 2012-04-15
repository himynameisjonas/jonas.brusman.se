---
layout: post
title: A Flickr plugin to Jekyll
tags:
- jekyll
- flickr
- no-photo
- ruby
- plugin
- code
---
This blog is driven by [Jekyll](http://jekyllrb.com/) and i have written a simple plugin to Jekyll that makes it easy to embed photographs from [Flickr](http://flickr.com) directly into your posts.

If you have a Gemfile, start by adding the `fleakr` gem to your Gemfile and run `bundle install`.
If you don't have a Gemfile, install the gem with `gem install fleakr`.

{% gist 2380125 GEMFILE %}

Then add the flickr plugin to your `_plugins` folder:

{% gist 2380125 flickr.rb %}

Read the [readme for the fleakr gem](https://github.com/reagent/fleakr) on how to obtain your flickr api tokens. Then add them to the top of the flickr.rb file.

Loop over your photos in your post layout, for example like this:

{% gist 2380125 post.html %}

Finally, the last step is to add one or more photos to your post:

{% gist 2380125 example-post %}

I have also published all these [examples as a gist](https://gist.github.com/2380125).