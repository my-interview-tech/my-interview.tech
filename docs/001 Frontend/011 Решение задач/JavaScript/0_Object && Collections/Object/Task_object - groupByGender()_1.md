---
uid: VyJ5ejAp5y0yQYsagh7ML
title: Task_object - groupByGender()_1
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#object"
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
// Из исходного массива сделать объект, ключами которого будут все встречающиеся gender,
// а значениями массив объектов юзеров

const users = [
  {
    id: 1,
    name: "Виктория",
    gender: "female",
  },
  {
    id: 2,
    name: "Андрей",
    gender: "male",
  },
  {
    id: 3,
    name: "Александр",
    gender: "male",
  },
];

function groupByGender(users) {
  // Ваш код здесь
}

const groupedByGender = groupByGender(users);
console.log(groupedByGender);
```

\*\*Ответ

```js
function groupByGender(users) {
  const gender = { female: [], male: [] };

  for (const user of Object.values(users)) {
    const { id, name, gender: userGender } = user;
    const res = { id, name };
    userGender === "female" ? gender.female.push(res) : gender.male.push(res);
  }

  return gender;
}
```

---

[[011 Решение задач JS, TS и React|Назад]]
