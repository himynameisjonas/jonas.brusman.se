---
title: Minecraft cross-play between Playstation, Switch and Mac
date: 2025-03-15T17:35:00.000Z
tags:
  - gaming
  - minecraft
syndications:
  - https://tacocat.space/@jonas/114167693689730169
---

My wife, friends, and I used to play Minecraft together, but we haven't done that in years, like since we had kids. Now the kids are old enough to play Minecraft themselves, and we want to play together again as a family.

The problem is that the kids play on a PlayStation 5 and a Nintendo Switch, while we parents play on Mac computers, and Minecraft doesn't support cross-play between the Bedrock (consoles) and Java Edition (Mac/PC).

## Enter Geyser

[Geyser](https://geysermc.org) is a plugin for the Java Edition that allows Bedrock Edition clients to join the Java Edition server. See their [Setup Instructions](https://geysermc.org/wiki/geyser/setup/) for how to install it. I did a quick evaluation/comparison of the [listed hosting providers](https://geysermc.org/wiki/geyser/supported-hosting-providers) and found that [CloudNord hosting](https://cloudnord.net/aff.php?aff=40) has built in support for Geyser.

> I've been a very happy CloudNord customer for my Minecraft hosting. If you're looking for Minecraft server hosting, you can use [my affiliate link](https://cloudnord.net/aff.php?aff=40) to sign up - and I'll receive some hosting credits.

You will also probably need to install the [Floodgate extension](https://geysermc.org/wiki/floodgate/); it handles some account-specific things between Bedrock and Java Edition players.

## Connecting to the Server

It is still a [bit complicated](https://geysermc.org/wiki/geyser/using-geyser-with-consoles) to connect to a Java server from Switch/PlayStation when Geyser is up and running, but there's a nice solution for that as well: the [MCXboxBroadcast Geyser extension](https://github.com/MCXboxBroadcast/Broadcaster). That uses an Xbox Live account, and every friend of that account will see it as online on the server, which makes it easy to join the server from both Switch and PlayStation. I created a new dummy account for this purpose and made sure to befriend everyone who should be able to join the server.
