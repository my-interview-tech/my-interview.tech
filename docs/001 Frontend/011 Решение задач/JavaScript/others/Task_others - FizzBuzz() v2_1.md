---
uid: x5TjVtljTXRJsf1rrTGLx
title: Task_others - FizzBuzz() v2_1
tags:
  - "#JavaScript"
  - "#taskJS"
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
/*
Реализуйте функцию, которая выводит (console.log) в терминал числа в диапазоне от begin до end. При этом:

Если число делится без остатка на 3, то вместо него выводится слово Fizz
Если число делится без остатка на 5, то вместо него выводится слово Buzz
Если число делится без остатка и на 3, и на 5, то вместо числа выводится слово FizzBuzz

В остальных случаях выводится само число

Функция принимает два параметра (begin и end), определяющих начало и конец диапазона (включительно). 
Для простоты считаем, что эти параметры являются целыми числами больше нуля. 
Если диапазон пуст (в случае, когда begin > end), то функция просто ничего не печатает.
fizzBuzz(11, 20);
11
Fizz
13
14
FizzBuzz
16
17
Fizz
19
Buzz
*/

const fizzBuzz = (begin, end) => {
  let counter = begin;

  while (counter <= end) {
    switch (true) {
      case counter % 3 === 0 && counter % 5 === 0:
        console.log("FizzBuzz");
        break;
      case counter % 3 === 0:
        console.log("Fizz");
        break;
      case counter % 5 === 0:
        console.log("Buzz");
        break;
      default:
        console.log(counter);
    }

    counter += 1;
  }
};

fizzBuzz(11, 20);
```

---

[[011 Решение задач JS, TS и React|Назад]]
