---
uid: 8VkbFKD8n8aP3Q4DidUEu
title: Task_array - foo()_0
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#for"
  - "#array"
  - "#unknownINC"
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
//изменить код так, что бы в итоге выводился массив i ([], [1], [1, 1]) (сейчас выводится [1, 1, 1])

function foo() {
  for (let i = []; i.length < 3; i.push(1)) {
    setTimeout(console.log(i), i.length * 1000);
  }
}

console.log(foo());
```

\*\*Ответ

```js

```

---

[[011 Решение задач JS, TS и React|Назад]]
