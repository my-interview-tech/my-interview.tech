---
uid: D8Z2j0idiQGrOcDQw4Hlm
title: Task_array - bancomat()_1
tags:
  - "#JavaScript"
  - "#array"
  - "#taskJS"
  - "#альфабанк"
  - "#технологияДоверия"
  - "#itOne"
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
const bancomat = (money) => {
  // Ваш код здесь
};

//доступные купюры 100, 50, 20, 10

console.log(bancomat(280)); // [100, 100, 50, 20, 10]
```

\*\*Ответ

```js
// for

const bancomat = (money) => {
  const available = [100, 50, 20, 10]; //доступные купюры 100, 50, 20, 10
  let lastMoney = [];

  for (let i = 0; i < available.length; i++) {
    let note = available[i];

    while (money >= note) {
      lastMoney.push(note);
      money -= note;
    }
  }

  return lastMoney;
};

console.log(bancomat(280)); // [100, 100, 50, 20, 10]
```

```js
// while

const bancomat = (money) => {
  const banknotes = [100, 50, 20, 10];
  const arrRes = [];
  let value = money;

  while (value) {
    let filtered = banknotes.find((el) => value >= el);
    arrRes.push(filtered);
    value = value - filtered;
  }

  return arrRes;
};

console.log(bancomat(280)); // [100, 100, 50, 20, 10]
```

```js
// recursion

const bancomat = (money) => {
  const arr = [];
  const bablo = [100, 50, 20, 10];
  let res = money;

  let a = bablo.filter((el) => res >= el);

  if (res) {
    arr.push(a[0]);
    res = res - a[0];
    return arr.concat(bancomat(res));
  }

  return arr;
};
```

---

[[011 Решение задач JS, TS и React|Назад]]
