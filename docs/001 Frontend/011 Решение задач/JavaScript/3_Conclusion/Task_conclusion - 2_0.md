---
uid: 7KVhCqHMdbvlE-c1ic1CM
title: Task_conclusion - 2_0
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#conclusion"
  - "#СИБУР"
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
//! Что будет в консоли?

function createCounter() {
  let count = 0;

  let msg = `Count is ${count}`;

  const increase = () => (count += 1);
  const printMsg = () => console.log(msg);
  const printCount = () => console.log(count);

  return [increase, printMsg, printCount];
}
function runCreateCounter() {
  const [increase, printMsg, printCount] = createCounter();
  increase(); //
  increase(); //
  increase(); //
  printMsg(); //
  printCount(); //
}

runCreateCounter();
```

\*\*Ответ

```js

```

---

[[011 Решение задач JS, TS и React|Назад]]
