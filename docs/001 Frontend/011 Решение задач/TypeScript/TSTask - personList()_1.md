---
uid: iU3zMFs3Jag0ZvLqUh9bb
title: TSTask - personList()_1
tags:
  - "#TypeScript"
  - "#tsTask"
  - "#unknownINC"
  - "#partial"
draft: false
technology: Решение задач
specialty: Frontend
tools: []
order: 0
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

```ts
// Напишите тип, который будет делать ключи и поля для Record<PersonList, PersonProps> необязательными
type PersonList = "Max" | "Alex" | "Boris"

type PersonProps = {
  age: number,
  height: number,
}

let mans: Record<PersonList, PersonProps> ={
  Alex: {age: 23, height: 170},
  Max: {age: 20, height: 175}.

}
```

\*\*Ответ

```ts
type PersonList = "Max" | "Alex" | "Boris";
type PersonProps = {
  age: number;
  height: number;
};

type PartialPerson = Partial<Record<PersonList, PersonProps>>;

let mans: PartialPerson = {
  Alex: { age: 23, height: 170 },
  Max: { age: 20, height: 175 },
};
```

---

[[011 Решение задач JS, TS и React|Назад]]
