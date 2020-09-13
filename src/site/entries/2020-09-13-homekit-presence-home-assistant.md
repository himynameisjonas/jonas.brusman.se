---
templateKey: blog-post
date: 2020-09-13
title: "Home assistant presence detection with Homekit and iPhone"
tags:
  - programming
  - smart home
  - home assistant
  - homekit
---

I wanted a basic way of tracking in [Home assistant][1] if me and/or my wife was at home or not, to be able to make my home a bit smarter. I didn't want to have an other app on my iPhone tracking my location all the time, mostly due to avoid extra battery drainage. I already have Apple's Home app installed, which can trigger stuff based on if I arrive or leave the home, perfect! Now I just needed to sync that into Home assistant.

### Input boolean helpers

Setup a boolean input helper in Home assistant for every member of your household that has a iPhone:
```yaml
input_boolean:
  jonas_present:
    name: Jonas
    icon: mdi:account
  eva_present:
    name: Eva
    icon: mdi:account
```
And here is how it looks in Home assistant:
![Home assistant helpers configuration](/images/home-assistant-helpers.png)

### Home (Homekit)

First, make sure you have enable and setup [the Homekit integration][2] in Home assistant. You then need to setup some automations. One that turns the helper off when the person leaves and one that turns the helper on when they arrive home. Repeat that for every person in the household.
![Home app automations on Mac OS](/images/homekit-automations.png)

### Device tracker and Persons
By now we have a working solution that we can use in our automations. But i'm not quite happy just yet, I want to connect these input helpers as [device trackers][3] and add them to my [persons in Home assistant][4].

You can create an automation in Home assistant that maps the input helpers state to device trackers by using the [device trackers see service][5]. That service will update or create a device tracker with the specified name. Here's my automation that create a `device_tracker.homekit_*` for every member of the household.

{% raw %}
```yaml
- alias: Homekit to device tracker
  description: ''
  trigger:
  - entity_id: input_boolean.eva_present
    platform: state
  - entity_id: input_boolean.jonas_present
    platform: state
  condition: []
  action:
  - data_template:
      dev_id: homekit_{{ trigger.to_state.name }}
      location_name: '{{ ''home'' if trigger.to_state.state == ''on'' else ''not_home''
        }}'
    service: device_tracker.see
  mode: parallel
  max: 10
```
{% endraw %}

You can now assign the new device tracker to the corresponding person in home assistant. First you have to make sure that you have triggered the input boolean once first to force the automation to create the new device trackers. You can toggle the inputs in the Home app on your iPhone/Mac instead of leaving your house for real.

Here's the final result on my lovelace dashboard:
![Home assistant persons overview](/images/home-assistant-overview.png)

[1]: https://www.home-assistant.io
[2]: https://www.home-assistant.io/integrations/homekit/
[3]: https://www.home-assistant.io/integrations/device_tracker/
[4]: https://www.home-assistant.io/integrations/person/
[5]: https://www.home-assistant.io/integrations/device_tracker/#device_trackersee-service
