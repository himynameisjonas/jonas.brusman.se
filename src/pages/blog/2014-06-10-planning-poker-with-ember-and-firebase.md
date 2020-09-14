---
templateKey: blog-post
date: 2014-06-10
title: "Planning Poker with Ember.js and Firebase"
categories:
  - code
tags:
 - firebase
 - ember.js
 - javascript
 - realtime
 - javascript
 - coffeescript
---

Had some fun with [Ember.js][ember] and [Firebase][firebase] today. Tried out the [EmberFire][emberfire] lib provided by Firebase to use Firebase with Ember-Data. I also used the [Ember CLI][cli] for the first time, can really recommend it. Wanted to see how easy it would be to build an *real time syncing Ember.js app* and then deploy it to the new and easy to use *Firebase hosting* service.

It resulted in a [simple planning poker app][app] to help with the sprint planning for my remote team. I've uploaded the [source to Github][git].

[firebase]: https://www.firebase.com/
[ember]: http://emberjs.com/
[app]: https://mnd-vote.firebaseapp.com/
[emberfire]: https://github.com/firebase/emberFire
[cli]: http://iamstef.net/ember-cli/
[git]: https://github.com/himynameisjonas/emberfire-poker
