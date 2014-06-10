---
layout: post
title: "Deploy to Heroku from Github"
categories:
  - code
tags:
 - heroku
 - github
 - code
 - ruby
 - no-photo
date: "2012-07-29 22:00"
---
*Automatically deployment of your app to Heroku when it has been pushed to Github* with [github-heroku-pusher](https://github.com/ajlai/github-heroku-pusher) by [ajlai on Github](https://github.com/ajlai).

I found this little Sinatra app a couple of days ago and have now set up it to automatically deploy this Jekyll site to Heroku when I push the repository to my Github account. It receives a post from Github via the post-receive service hook, fetches the updates and push them to Heroku.

I have made some changes to the app, so *use [my fork](https://github.com/himynameisjonas/github-heroku-pusher)* until the pull requests has been merged. My fork adds support for *private repositories* and makes it run smoothly on just *one free Heroku Dyno*.

Just follow the instructions in [the README](https://github.com/himynameisjonas/github-heroku-pusher) and you're *done in less than 5 minutes*.

- - -

### Important Update
*I've have switch to a [more competent solution for my continuous deployment to Heroku](https://github.com/himynameisjonas/heroku-deployer).*