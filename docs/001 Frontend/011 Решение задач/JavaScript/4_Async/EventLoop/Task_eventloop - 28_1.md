---
uid: HFnMMLAYH3iStiDRr21FR
title: Task_eventloop - 28_1
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

```JS
console.log(1)

Promise.resolve(2).then((res) => console.log(res))

setTimeout(() => console.log(3), 0);

Promise.resolve(4).then((res) => console.log(res))

console.log(5)
```

---

[[011 Решение задач JS, TS и React|Назад]]
