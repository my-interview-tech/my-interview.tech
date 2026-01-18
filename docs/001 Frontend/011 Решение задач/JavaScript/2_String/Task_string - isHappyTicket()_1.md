---
uid: 92A8D_od0HRqO0sH_0LR4
title: Task_string - isHappyTicket()_1
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#string"
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
"Счастливым" называют билет с номером, в котором сумма первой половины цифр равна сумме второй половины цифр. 
Номера могут быть произвольной длины, с единственным условием, что количество цифр всегда чётно, например: 33 или 2341 и так далее.

Билет с номером 385916 — счастливый, так как 3 + 8 + 5 === 9 + 1 + 6. Билет с номером 231002 не является счастливым, так как 2 + 3 + 1 !== 0 + 0 + 2.
Реализуйте и экспортируйте по умолчанию функцию, проверяющую является ли номер счастливым (номер — всегда строка). Функция должна возвращать true, если билет счастливый, или false, если нет.
*/

const isHappyTicket = (str) => {
  let rightRes = 0;
  let leftRes = 0;

  let rightStr = str.slice(-str.length / 2);
  let leftStr = str.slice(0, str.length / 2);

  for (let i = 0; i < str.length / 2; i++) {
    rightRes += Number(rightStr[i]);
    leftRes += Number(leftStr[i]);
  }

  return rightRes === leftRes;
};

console.log(isHappyTicket("385916")); // true
console.log(isHappyTicket("231002")); // false
console.log(isHappyTicket("1222")); // false
console.log(isHappyTicket("054702")); // true
console.log(isHappyTicket("00")); // true
```

---

[[011 Решение задач JS, TS и React|Назад]]
