---
published: false
layout: post
title: A Flickr plugin to Jekyll
tags:
- jekyll
- flickr
- no-photo
- ruby
- plugin
- code
---
Den här bloggen drivs av [Jekyll](https://github.com/mojombo/jekyll) och jag har skrivit en liten enkel plugin till Jekyll för att på ett enkelt sätt infoga fotografier från flickr direkt i posten.

Börja med att lägga till `fleakr` till din gemfile:

{% gist 2380125 GEMFILE %}

Lägg sedan in flickr-pluginen i din `_plugins` mapp

{% gist 2380125 flickr.rb %}

Läs på [readmen för fleakr gemen](https://github.com/reagent/fleakr) för hur du får tag i dina tokens som ska in i början av flickr.rb ovan.

Loopa över dina flickr-foton i din post layout, se exempel:

{% gist 2380125 post.html %}

Slutligen är det bara att lägga till ett eller flera foton i ett inlägg:

{% gist 2380125 example-post %}

Se alla [exempel som en Gist](https://gist.github.com/2380125).