---
date: 2012-07-29
title: 'Deploy to Heroku from Github'
tags:
  - programming
  - heroku
  - github
  - ruby
---

_Automatically deployment of your app to Heroku when it has been pushed to Github_ with [github-heroku-pusher](https://github.com/ajlai/github-heroku-pusher) by [ajlai on Github](https://github.com/ajlai).

I found this little Sinatra app a couple of days ago and have now set up it to automatically deploy this Jekyll site to Heroku when I push the repository to my Github account. It receives a post from Github via the post-receive service hook, fetches the updates and push them to Heroku.

I have made some changes to the app, so _use [my fork](https://github.com/himynameisjonas/github-heroku-pusher)_ until the pull requests has been merged. My fork adds support for _private repositories_ and makes it run smoothly on just _one free Heroku Dyno_.

Just follow the instructions in [the README](https://github.com/himynameisjonas/github-heroku-pusher) and you're _done in less than 5 minutes_.

---

### Update _2014-06-10_

I've have switch to a [more competent solution for my continuous deployment to Heroku](https://github.com/himynameisjonas/heroku-deployer).

### Update _2015-02-01_

Heroku has released [their own Github integration](/heroku-github-integration).
