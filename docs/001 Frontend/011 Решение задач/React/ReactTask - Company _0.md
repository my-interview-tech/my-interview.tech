---
uid: xJ3vHTcSOuP9Ej9N_Alrc
title: ReactTask - Company _0
tags:
  - "#React"
  - "#reactTask"
  - "#TypeScript"
  - "#tsTask"
  - "#гринатом"
draft: false
technology: Решение задач
specialty: Frontend
tools: []
order: 0
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

```tsx
type Person = { name: string; salary: number };
type Department = Person[] | { [key: string]: Person[] | Department };
type Company = { [key: string]: Department };

const company: Company = {
  sales: [
    { name: "John", salary: 1000 },
    { name: "Alice", salary: 500 },
  ],
  development: {
    sites: [
      { name: "Peter", salary: 1000 },
      { name: "Alex", salary: 200 },
    ],
    internals: {
      first: [{ name: "Ron", salary: 300 }],
      second: [{ name: "Bob", salary: 300 }],
    },
  },
  management: {
    sales: [{ name: "Alex", salary: 900 }],
    development: [{ name: "Jack", salary: 600 }],
  },
};

export default function App() {
  // Отобразить company виде дерева подразделений
  // Для каждого подразделения указать сумму зарплат работников
  // Пример:
  // company: 23
  // - sales: 11
  // - development: 12
  //      internals: 6
  //        first: 3
  //        second: 3

  return (
    <div className="App">
      <h1>Hello world!</h1>
    </div>
  );
}
```

\*\*Ответ

```jsx
import React from 'react';

type Person = { name: string; salary: number };
type Department = Person[] | { [key: string]: Person[] | Department };
type Company = { [key: string]: Department };

const company: Company = {
  sales: [
    { name: "John", salary: 1000 },
    { name: "Alice", salary: 500 }
  ],
  development: {
    sites: [
      { name: "Peter", salary: 1000 },
      { name: "Alex", salary: 200 }
    ],
    internals: {
      first: [{ name: "Ron", salary: 300 }],
      second: [{ name: "Bob", salary: 300 }]
    }
  },
  management: {
    sales: [{ name: "Alex", salary: 900 }],
    development: [{ name: "Jack", salary: 600 }]
  }
};

function calculateSalary(department: Department): number {
  if (Array.isArray(department)) {
    return department.reduce((total, person) => total + person.salary, 0);
  } else {
    return Object.values(department).reduce((total, subDepartment) => total + calculateSalary(subDepartment), 0);
  }
}

function renderDepartment(departmentName: string, department: Department): React.ReactNode {
  if (Array.isArray(department)) {
    const totalSalary = calculateSalary(department);
    return (
      <div key={departmentName}>
        {departmentName}: {totalSalary}
      </div>
    );
  } else {
    return (
      <div key={departmentName}>
        {departmentName}: {calculateSalary(department)}
        {Object.entries(department).map(([subDepartmentName, subDepartment]) =>
          renderDepartment(subDepartmentName, subDepartment)
        )}
      </div>
    );
  }
}

export default function App() {
  return (
    <div className="App">
      <h1>Hello world!</h1>
      {Object.entries(company).map(([departmentName, department]) =>
        renderDepartment(departmentName, department)
      )}
    </div>
  );
}
```

---

[[011 Решение задач JS, TS и React|Назад]]
