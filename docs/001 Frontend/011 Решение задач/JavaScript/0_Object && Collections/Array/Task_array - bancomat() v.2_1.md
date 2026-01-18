---
uid: TB9_R8qbjs1YXj8uiC6a3
title: Task_array - bancomat() v.2_1
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#object"
  - "#array"
  - "#райфайзенбанк"
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
const atm = (currency, count) => {
  // we have values:
  // - "EUR": 5, 10, 20, 50, 100, 200, 500,
  // - "USD": 1, 2, 5, 20, 50, 100,
  // - "RUB": 50, 100, 500, 1000, 5000
  // your code here...
};

console.log(atm("XSF", 1000)); // 'Sorry, have no XSF.'
console.log(atm("rub", 12341)); // 'Can not do 12341 RUB. Value must be divisible by 10!'
console.log(atm("USD", 842)); // '8 * 100 USD, 2 * 20 USD, 1 * 2 USD'
console.log(atm("euR", 1000)); // '2 * 500 EUR'
```

\*\*Ответ

```js
const atm = (currency, count) => {
  const values = {
    EUR: [5, 10, 20, 50, 100, 200, 500],
    USD: [1, 2, 5, 20, 50, 100],
    RUB: [50, 100, 500, 1000, 5000],
  };

  let newCurr = currency.toUpperCase();

  if (!values[newCurr]) throw `Sorry, have no ${newCurr}`;
  if (!(count % values[newCurr][0] == 0))
    throw `Can not do ${count} ${newCurr}. Value must be divisible by ${values[newCurr][0]}!`;

  let notes = {};
  let value = count;

  for (let curr in values) {
    if (newCurr === curr) {
      let reversed = values[curr].reverse();

      while (value) {
        let filtered = reversed.find((el) => value >= el);
        notes[filtered] = notes[filtered] + 1 || 1;
        value = value - filtered;
      }
    }
  }

  const transition = Object.entries(notes).sort((a, b) => b[0] - a[0]);
  const bancomatInfo = "";

  for (let i = 0; i < transition.length; i++) {
    bancomatInfo += `${transition[1]} * ${transition[0]} ${newCurr}, `;
  }

  return bancomatInfo.slice(0, bancomatInfo.length - 2);
};

console.log(atm("XSF", 1000)); // 'Sorry, have no XSF.'
console.log(atm("rub", 12341)); // 'Can not do 12341 RUB. Value must be divisible by 50!'
console.log(atm("USD", 842)); // '8 * 100 USD, 2 * 20 USD, 1 * 2 USD'
console.log(atm("euR", 1000)); // '2 * 500 EUR'
```

---

[[011 Решение задач JS, TS и React|Назад]]
