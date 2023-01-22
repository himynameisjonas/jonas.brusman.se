---
date: 2023-01-22
title: Monitor multiple Redis servers on Heroku with Datadog
tags:
  - datadog
  - heroku
  - redis
  - rails
  - devops
  - programming
---

Our main Rails app on Heroku uses multiple redis instances. We have one instance for our job queue, one for caching and one instance for our session store. This is how we setup Datadog to monitor the health of our redis instances.

The setup is based on [Datadog's article on monitoring Ruby on Rails on Heroku][1]. So we need to enable the redis integration in Datadog by adding a file at `datadog/conf.d/redisdb.yaml` with the following content:

```yaml
init_config:

instances:
  # populated by prerun.sh
```

Then we need to modify the `datadog/prerun.sh` script to add the redis instances to the `redisdb.yaml` file. The script is executed before the Datadog agent is started. The script looks like this:

```bash
redis_regex='(\w+)_URL=redis:\/\/([^:]*):([^@]+)@([^:]+):([0-9]*)$'
env | grep "REDIS.*_URL=" | while read -r line ; do
  if [[ $line =~ $redis_regex ]]; then
    {
      echo "  - host: ${BASH_REMATCH[4]}";
      echo "    port: ${BASH_REMATCH[5]}";
      echo "    username: ${BASH_REMATCH[2]}";
      echo "    password: ${BASH_REMATCH[3]}";
      echo "    tags:";
      echo "      - name:${BASH_REMATCH[1]}";
    } >> "$DD_CONF_DIR/conf.d/redisdb.d/conf.yaml"
  fi
done
```

It will fetch all `REDIS_*_URL` environment variables and add them to the `redisdb.yaml` file. The `tags` section is optional and can be used to add tags to the redis instance. In our case we add a tag with the name of the redis instance.

[1]: https://docs.datadoghq.com/agent/guide/heroku-ruby/
