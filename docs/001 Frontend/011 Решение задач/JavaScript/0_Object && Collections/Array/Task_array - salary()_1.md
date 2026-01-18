---
uid: E2CrcR8cgws3EOiPCdV4G
title: Task_array - salary()_1
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#object"
  - "#forEach"
  - "#sort"
  - "#array"
  - "#for-in"
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
// Необходимо сделать выборки.
// 1. Список имен, отсортированный по размеру зарплаты
// 2. Размер максимальной зарплаты
// 3. Статистика по каждому отделу: сумма затрат, количество сотрудников, средняя з/п

const arr = [
  { name: "Вася", salary: 10000, department: "Frontend" },
  { name: "Петя", salary: 12000, department: "Backend" },
  { name: "Дима", salary: 10500, department: "Frontend" },
  { name: "Оля", salary: 15000, department: "Backend" },
  { name: "Саша", salary: 8000, department: "Frontend" },
  { name: "Олег", salary: 9000, department: "Testing" },
];
```

\*\*Ответ

```js
function salary(arr) {
  const sorted = arr.sort((a, b) => {
    return b.salary - a.salary;
  });

  const maxSalary = sorted[0].salary;

  const objSalary = {};

  arr.forEach((employee) => {
    const { salary, department } = employee;

    if (!objSalary[department]) {
      objSalary[department] = {
        sum: 0,
        count: 0,
        average: 0,
      };
    }

    objSalary[department].sum += salary;
    objSalary[department].count++;
  });

  for (let departments in objSalary) {
    const { sum, count } = objSalary[departments];

    objSalary[departments].average = sum / count;
  }

  return { sorted, maxSalary, objSalary };
}
```

---

[[011 Решение задач JS, TS и React|Назад]]
