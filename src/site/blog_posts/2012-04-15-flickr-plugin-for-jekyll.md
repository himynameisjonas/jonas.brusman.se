---
date: 2012-04-15
title: A Flickr plugin to Jekyll
tags:
  - programming
  - jekyll
  - flickr
  - ruby
  - plugin
---

This blog is driven by [Jekyll](http://jekyllrb.com/) and i have written a simple plugin to Jekyll that makes it easy to embed photographs from [Flickr](http://flickr.com) directly into your posts.

If you have a Gemfile, start by adding the `fleakr` gem to your Gemfile and run `bundle install`.
If you don't have a Gemfile, install the gem with `gem install fleakr`.

```ruby
source :rubygems

gem 'RedCloth'
gem 'jekyll'
gem 'fleakr'
```

Then add the flickr plugin to your `_plugins` folder:

```ruby
require 'liquid'
require 'fleakr'

Fleakr.api_key       = "XXX"
Fleakr.shared_secret = "YYY"
Fleakr.auth_token    = "ZZZ"

CACHED_IMAGES = {}

module Flickr
  def flickr_image(url)
    "<img alt='#{image_object(url).title}' src='#{image_object(url).large.url}'>"
  end

  def flickr_medium_image(url)
    "<img alt='#{image_object(url).title}' src='#{image_object(url).medium.url}'>"
  end

  private

  def image_object(url)
    CACHED_IMAGES[url] ||= Fleakr.resource_from_url(url)
  end
end

Liquid::Template.register_filter(Flickr)
```

Read the [readme for the fleakr gem](https://github.com/reagent/fleakr) on how to obtain your flickr api tokens. Then add them to the top of the flickr.rb file.

Loop over your photos in your post layout, for example like this:

{% raw %}
```html
<article>
  <h1>{{ post.title }}</h1>

  {% for flickr_url in post.flickr %}
    <a href="{{ flickr_url }}">{{ flickr_url | flickr_image }}</a>
  {% endfor %}

  {{ post.content }}

  <footer>
    {{ post.date || date:"%Y-%m-%d" }}</br>
  </footer>
</article>
```
{% endraw %}

Finally, the last step is to add one or more photos to your post:

```html
---
title: A blog post with photos from flickr
photos:
  - 'https://photo-storage.brusman.se/6167152072.jpg'
  - 'https://photo-storage.brusman.se/6167152448.jpg'
  - 'https://photo-storage.brusman.se/6167153574.jpg'
---

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
```

I have also published all these [examples as a gist](https://gist.github.com/2380125).
