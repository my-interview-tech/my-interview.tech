---
uid: RCDeOUn4IpTTchg3bluER
title: Task_object - inputExpiredSort()_1
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#object"
  - "#filter"
  - "#sort"
  - "#reduce"
  - "#itOne"
  - "#сбербанк"
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
// сконкатенировать по value, expired не должны быть true, порядок отсортирован по order

const input = [
  { value: "abcd", order: 4, expired: false },
  { value: "qwer", order: 2, expired: true },
  { value: "xyz1", order: 1, expired: false },
  { value: "abx2", order: 3, expired: false },
];

function inputExpiredSort(data) {
  // Ваш код здесь
}

inputExpiredSort(input);
```

\*\*Ответ

```js
function inputExpiredSort(data) {
  const filtered = data.filter((el) => !el.expired);
  const sorted = filtered.sort((a, b) => a.order - b.order);

  return sorted.reduce((acc, el) => {
    return acc + el.value;
  }, "");
}

console.log(inputExpiredSort(input));
```

---

[[011 Решение задач JS, TS и React|Назад]]
