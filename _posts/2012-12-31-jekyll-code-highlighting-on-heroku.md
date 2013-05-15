---
layout: post
title: "Jekyll code highlighting on Heroku"
tags:
 - jekyll
 - code
 - heroku
 - ruby
 - no-photo
---

The built in code highlighter in Jekyll doesn't work on Heroku due to some issues with Python. I came up with a *work around by using the [Pygmentize][1] gem* instead.

### Gemfile
Add the Pygmentize gem to your gemfile:
{% highlight ruby %}
gem 'pygmentize'
{% endhighlight %}

And run `bundle install`

### \_plugins/highlight.rb
Create a new file in the `_plugins` directory with the name `highlight.rb`. Paste the following code to *make the built in code highlighter use the new Pygmentize gem*:
{% highlight ruby %}
require 'pygmentize'
class Jekyll::HighlightBlock < Liquid::Block
  def render_pygments(context, code)
    @options[:encoding] = 'utf-8'
    output = add_code_tags(
      Pygmentize.process(code, @lang),
      @lang
    )

    output = context["pygments_prefix"] + output if context["pygments_prefix"]
    output = output + context["pygments_suffix"] if context["pygments_suffix"]
    output
  end
end
{% endhighlight %}

### Use
Just use the *standard highlight blocks as usual*:
{% highlight html %}{% raw %}
{% highlight ruby %}
gem 'pygmentize'
{% endhighlight %}
{% endraw %}{% endhighlight %}

[1]: https://rubygems.org/gems/pygmentize
