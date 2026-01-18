---
uid: h1rgHklpJTC-84WU1D9pS
title: Task_others - FizzBuzz()_1
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#switchCase"
  - "#SignalINC"
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
// FizzBuzz - написать функцию которая в качестве аргумента принимает целое,
// положительное число n, результатом работы функции должен быть массив строк длиной n элементов в котором:

function fizzBuzz(number) {
  // Ваш код здесь
}

console.log(fizzBuzz(15), `Делится на 3 и 5`);
console.log(fizzBuzz(12), `Делится на 3`);
console.log(fizzBuzz(20), `Делится на 5`);
console.log(fizzBuzz(number), `не удовлетворяется ни одно из условий`);
```

### Ответ

```js
let number = 2;

function fizzBuzz(number) {
  let result = [];

  switch (true) {
    case number % 3 === 0 && number % 5 === 0:
      result.push("FizzBuzz");
      break;
    case number % 3 === 0 && number % 5 !== 0:
      result.push("Fizz");
      break;
    case number % 5 === 0 && number % 3 !== 0:
      result.push("Buzz");
      break;
    default:
      result.push(number.toString());
  }
  return result;
}

console.log(fizzBuzz(15), `Делится на 3 и 5`);
console.log(fizzBuzz(12), `Делится на 3`);
console.log(fizzBuzz(20), `Делится на 5`);
console.log(fizzBuzz(number), `не удовлетворяется ни одно из условий`);
```

---

[[011 Решение задач JS, TS и React|Назад]]
