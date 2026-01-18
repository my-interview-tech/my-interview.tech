---
uid: LDb7yXB6v9xt5Wvg4r_b4
title: Task_eventloop - 21_0
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#EventLoop"
draft: false
technology: Решение задач
specialty: Frontend
tools: []
order: 0
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

```js
//! будет ли обработан ответ?

fetch("http://www.speedtest.net")
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.error(error);
  });
while (true) console.log(1);
```

---

[[011 Решение задач JS, TS и React|Назад]]
