---
templateKey: blog-post
date: 2012-07-22
title: Jekyll + Heroku + Unicorn = Blazing fast blogging
categories:
  - code
tags:
 - ruby
 - jekyll
 - heroku
 - unicorn
---

Deploy your [Jekyll](http://jekyllrb.com/) site on [Heroku](http://www.heroku.com/) with *6 workers* ready to take on your massive traffic *without first having to generate* the Jekyll site locally and there's *no need for a third-party buildpack*. And the best of all, it runs on a *single and free Heroku Dyno*.

### Rack-Jekyll
I have previously used `jekyll --server`in my `Procfile` on Heroku which in turn generated the jekyll site and booted up a webrick server. But I wanted to run my site with [Unicorn](http://unicorn.bogomips.org/) and it's support for multiple workers on a single Dyno. And to do so my Jekyll site must be a [Rack](http://rack.github.com/) app.

[Rack-Jekyll](https://github.com/adaoraul/rack-jekyll) to the rescue! It was exactly what I was looking for, it turned a Jekyll site into a Rack app. I had some issues with it on Heroku and made a pull request with the fixes. At this moment it has been merge with the master but there is not a new version released of the gem.

### Jekyll + Unicorn + Heroku
[Jekyll-Heroku-Unicorn](https://github.com/himynameisjonas/jekyll-heroku-unicorn) is a sample app of a simple Jykyll site with *6 Unicorn workers* ready to be *deployed to a free Heroku Dyno*:
1. `git clone git@github.com:himynameisjonas/jekyll-heroku-unicorn.git`
2. `cd jekyll-heroku-unicorn` and run `bundle install`
3. `heroku create` followed of `git push heroku master`
4. `heroku open` *and you're done*!
