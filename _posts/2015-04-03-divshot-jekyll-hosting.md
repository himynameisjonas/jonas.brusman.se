---
layout: post
title: Divshot Jekyll hosting
categories:
 - code
tags:
 - jekyll
 - hosting
 - divshot
 - github
---

I used to [host this site on Heroku][heroku-post] but have now moved to a platform build for static sites, or as [Divshot][divshot] puts it: *Static Web Hosting for Developers*. Setting up the site on Divshot was a breeze, took just a couple of seconds from when I started reading [the documentation][docs] to when I had the site up and running. And they even have [a free plan for small sites][pricing] like this one.

### Continious deployment with CircleCI
My previous setup allowed me to just push my updates to the Github repository and have Heroku pull the changes and update the site automatically. The new setup uses [CircleCI][circleci] to accomplish the same. Add your Divshot token to the environment variables on CircleCi ([more info][docs2]) and then tell it to deploy on successful deploy by adding this to the `circle.yml` file in the root of the repository:

{% highlight yaml %}
test:
  override:
    - bundle exec jekyll build
deployment:
  production:
    branch: master
    commands:
      - npm install -g divshot-cli
      - divshot push production —token $DIVSHOT_TOKEN
  staging:
    branch: /(^(?!master$).*$)/
    commands:
      - npm install -g divshot-cli
      - divshot push staging —token $DIVSHOT_TOKEN
{% endhighlight %}

It will deploy the *master branch to the production* environment and *all other branches to the staging* environment. All automatically when pushing to Github.

[heroku-post]: /2012/07/22/jekyll-heroku-unicorn/
[divshot]: https://divshot.com
[pricing]: https://divshot.com/pricing
[docs]: http://docs.divshot.com/integrations/jekyll
[docs2]: http://docs.divshot.com/integrations/circleci
[circleci]: https://circleci.com
