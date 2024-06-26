---
date: 2012-12-28
title: 'Create Jekyll posts from the command line'
tags:
  - programming
  - jekyll
  - thor
  - command line
---

I got _tired on creating new files manually_ for each new post a write so I put together this little _command line task_ with [Thor](https://github.com/wycats/thor).

It creates a new file in the `_posts` directory with _today's date_, parses the _parameters to command as the post's title_ and adds that as a slug to the new file. It then writes a _default yaml template_ to the file (as specified in the script).

Running `thor jekyll:new New and shiny post` will for example create the file `_posts/2012-12-28-new-and-shiny-post.md`, populate it with an yaml template and finally open the file in my favorite editor.

### How to

Add the following to your Gemfile:

```ruby
gem 'thor'
gem 'stringex'
```

Run `bundle install` and create a `jekyll.thor` file with the following contents:

```ruby
require "stringex"
class Jekyll < Thor
  desc "new", "create a new post"
  method_option :editor, :default => "subl"
  def new(*title)
    title = title.join(" ")
    date = Time.now.strftime('%Y-%m-%d')
    filename = "_posts/#{date}-#{title.to_url}.md"

    if File.exist?(filename)
      abort("#{filename} already exists!")
    end

    puts "Creating new post: #{filename}"
    open(filename, 'w') do |post|
      post.puts "---"
      post.puts "templateKey: blog-post"
      post.puts "title: \"#{title}\""
      post.puts "tags:"
      post.puts " -"
      post.puts "---"
    end

    system(options[:editor], filename)
  end
end
```

Use the new command:

```shell
$ thor jekyll:new The title of the new post
```

You can even specify which editor to open the new file with:

```shell
$ thor jekyll:new The title of the new post --editor=vim
```

The default editor is Sublime Text 2, just change on line 4 in `jekyll.thor` if an other editor is preferred.
