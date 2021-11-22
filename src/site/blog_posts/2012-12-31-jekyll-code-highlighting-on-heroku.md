---
date: 2012-12-31
title: 'Jekyll code highlighting on Heroku'
tags:
  - programming
  - jekyll
  - heroku
  - ruby
---

The built in code highlighter in Jekyll doesn't work on Heroku due to some issues with Python. I came up with a _work around by using the [Pygmentize][1] gem_ instead.

### Gemfile

Add the Pygmentize gem to your gemfile:

```ruby
gem 'pygmentize'
```

And run `bundle install`

### \_plugins/highlight.rb

Create a new file in the `_plugins` directory with the name `highlight.rb`. Paste the following code to _make the built in code highlighter use the new Pygmentize gem_:

```ruby
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
```

### Use

Just use the _standard highlight blocks as usual_:

````html
``` ruby gem 'pygmentize' ```
````

[1]: https://rubygems.org/gems/pygmentize
