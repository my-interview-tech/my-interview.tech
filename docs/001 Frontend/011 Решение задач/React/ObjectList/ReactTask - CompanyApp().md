---
title: CompanyApp()
draft: false
tags:
  - "#React"
  - "#reactTask"
  - "#TypeScript"
  - "#tsTask"
  - "#гринатом"
---
```tsx
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

export default function CompanyApp() {
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

___

[[011 Решение задач JS, TS и React|Назад]]