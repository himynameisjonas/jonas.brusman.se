---
date: 2021-04-26
title: Different "Final newline" settings per file type
tags:
 - VS Code
---

I want my editor to insert new lines in the end of every file I save except for `*.hbs` files and fixed that with this setting.

```json
"files.insertFinalNewline": true,
"[handlebars]": {
  "files.insertFinalNewline": false,
}
```
