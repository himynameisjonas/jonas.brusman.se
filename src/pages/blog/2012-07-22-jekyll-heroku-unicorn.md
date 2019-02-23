---
templateKey: blog-post
date: 2012-07-22
title: Jekyll + Heroku + Unicorn = Blazing fast blogging
tags:
  - programming
  - ruby
  - jekyll
  - heroku
  - unicorn
---

Deploy your [Jekyll](http://jekyllrb.com/) site on [Heroku](http://www.heroku.com/) with _6 workers_ ready to take on your massive traffic _without first having to generate_ the Jekyll site locally and there's _no need for a third-party buildpack_. And the best of all, it runs on a _single and free Heroku Dyno_.

### Rack-Jekyll

I have previously used `jekyll --server`in my `Procfile` on Heroku which in turn generated the jekyll site and booted up a webrick server. But I wanted to run my site with [Unicorn](http://unicorn.bogomips.org/) and it's support for multiple workers on a single Dyno. And to do so my Jekyll site must be a [Rack](http://rack.github.com/) app.

[Rack-Jekyll](https://github.com/adaoraul/rack-jekyll) to the rescue! It was exactly what I was looking for, it turned a Jekyll site into a Rack app. I had some issues with it on Heroku and made a pull request with the fixes. At this moment it has been merge with the master but there is not a new version released of the gem.

### Jekyll + Unicorn + Heroku

[Jekyll-Heroku-Unicorn](https://github.com/himynameisjonas/jekyll-heroku-unicorn) is a sample app of a simple Jykyll site with _6 Unicorn workers_ ready to be _deployed to a free Heroku Dyno_:

1. `git clone git@github.com:himynameisjonas/jekyll-heroku-unicorn.git`
2. `cd jekyll-heroku-unicorn` and run `bundle install`
3. `heroku create` followed of `git push heroku master`
4. `heroku open` _and you're done_!
