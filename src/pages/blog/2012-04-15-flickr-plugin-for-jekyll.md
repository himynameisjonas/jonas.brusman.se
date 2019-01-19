---
templateKey: blog-post
date: 2012-04-15
title: A Flickr plugin to Jekyll
categories:
  - code
tags:
- jekyll
- flickr
- ruby
- plugin
---

This blog is driven by [Jekyll](http://jekyllrb.com/) and i have written a simple plugin to Jekyll that makes it easy to embed photographs from [Flickr](http://flickr.com) directly into your posts.

If you have a Gemfile, start by adding the `fleakr` gem to your Gemfile and run `bundle install`.
If you don't have a Gemfile, install the gem with `gem install fleakr`.

{% highlight ruby %}
source :rubygems

gem 'RedCloth'
gem 'jekyll'
gem 'fleakr'
{% endhighlight %}

Then add the flickr plugin to your `_plugins` folder:

{% highlight ruby %}
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
{% endhighlight %}


Read the [readme for the fleakr gem](https://github.com/reagent/fleakr) on how to obtain your flickr api tokens. Then add them to the top of the flickr.rb file.

Loop over your photos in your post layout, for example like this:

{% highlight html %}{% raw %}
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
{% endraw %}{% endhighlight %}

Finally, the last step is to add one or more photos to your post:
{% highlight html %}
---
templateKey: blog-post
title: A blog post with photos from flickr
photos:
- /img/6167152072.jpg
- /img/6167152448.jpg
- /img/6167153574.jpg
---
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
{% endhighlight %}


I have also published all these [examples as a gist](https://gist.github.com/2380125).
