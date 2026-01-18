---
uid: 8FwkL6b8f4sZBvmYsISOn
title: Task_object - sumAge()_1
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#object"
  - "#recursion"
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
function sumAge(user) {}

const user1 = {
  name: "Петр",
  age: 49,
  children: [
    {
      name: "Ника",
      age: 25,
      children: [
        {
          name: "Андрей",
          age: 3,
        },
        {
          name: "Олег",
          age: 1,
        },
      ],
    },
    {
      name: "Александр",
      age: 22,
    },
  ],
};

console.log(sumAge(user1)); // 100
```

\*\*Ответ

```js
function sumAge(user) {
  let resAge = user.age;

  if (user.children) {
    for (let i = 0; i < user.children.length; i++) {
      resAge = resAge + sumAge(user.children[i]);
    }
  }

  return resAge;
}
```

---

[[011 Решение задач JS, TS и React|Назад]]
