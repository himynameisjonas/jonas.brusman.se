---
templateKey: blog-post
date: 2014-08-16
title: "Deploy Jekyll to Heroku with a click on a button"
categories:
  - code
tags:
 - jekyll
 - heroku
 - github
 - unicorn
---

I've updated my [*Jekyll + Heroku + Unicorn*][git] sample app to the latest version of Jekyll available (2.3.0). It now have all the latest features from Jekyll!

I also added a [Heroku Button][herokubutton]. So you can deploy your own version of the Jekyll site to a new app on your Heroku account with *just a single click on a button*. You can try it directly here on this blog by clicking the button below.
<div class="text-center"><a href="https://heroku.com/deploy?template=https://github.com/himynameisjonas/jekyll-heroku-unicorn"><img src="https://www.herokucdn.com/deploy/button.png" alt="Deploy"></a></div>

Pressing this button will deploy a Unicorn powered Jekyll site to Heroku. The blog will be *blazingly fast and handle a heavy load* by using Unicorn with multiple workers on per dyno. And by only using a Dyno the hosting will be *completely free*!

[git]: https://github.com/himynameisjonas/jekyll-heroku-unicorn
[herokubutton]: https://blog.heroku.com/archives/2014/8/7/heroku-button
