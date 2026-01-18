---
uid: Tx7lxTKdESJmp4AsPPd_E
title: Что такое getters и setters. Как их использовать?
tags:
  - "#TypeScript"
  - "#getters"
  - "#setters"
info: []
draft: false
technology: TypeScript
specialty: Frontend
tools: []
order: 41
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

Геттеры и сеттеры - это особые типы методов, которые помогают делегировать различные уровни доступа к частным переменным в зависимости от потребностей программы.

**Геттеры** позволяют ссылаться на значение, но не могут его редактировать.
**Сеттеры** позволяют изменять значение переменной, но не видеть ее текущее значение.
_Это важно для достижения инкапсуляции._

Например, новый работодатель может получить количество сотрудников в компании, но не имеет разрешения устанавливать количество сотрудников.

```typescript
const fullNameMaxLength = 10;

class Employee {
  private _fullName: string = "";

  get fullName(): string {
    return this._fullName;
  }

  set fullName(newName: string) {
    if (newName && newName.length > fullNameMaxLength) {
      throw new Error("fullName has a max length of " + fullNameMaxLength);
    }

    this._fullName = newName;
  }
}

let employee = new Employee();
employee.fullName = "Bob Smith";

if (employee.fullName) {
  console.log(employee.fullName);
}
```

---

[[005 TypeScript|Назад]]
