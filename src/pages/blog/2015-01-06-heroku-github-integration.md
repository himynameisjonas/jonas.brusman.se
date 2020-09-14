---
templateKey: blog-post
date: 2015-01-06
title: "Heroku’s GitHub Integration"
categories:
  - code
tags:
 - heroku
 - github
---

Heroku has finally released *their own integration with Github*. So it’s time for me to officially retire my current solution based on my [HerokuDeployer](https://github.com/himynameisjonas/heroku-deployer) project. An app that I build for the sole purpose of deploying this Jekyll blog with just a push to the Github repository. I’ve been using the new official Github integration as part of the closed beta for a while and it has worked flawlessly.

Just log in to your Heroku dashboard to *enable automatic deploys* to make Heroku build and deploy all pushes to the specified branch.

Read more about the new Github integration in [Heroku’s Dev Center documentation](https://devcenter.heroku.com/articles/github-integration).
