---
date: 2021-11-23
title: __END__
tags:
 - ruby
---

I keep forgetting about this simple keyword, so I thought that i should document it somewhere…
Use `__END__` to stop executing a ruby file. Content after the keyword will be available in the `DATA` constant.

```ruby
# lol.rb
puts DATA.map(&:reverse)

__END__
'123'
'234'
'345'
```


```bash
$ ruby lol.rb
'321'
'432'
'543'
```
