---
uid: Rb52tiX5M5c4OkJmHiTxQ
title: TSTask - add()_1
tags:
  - "#TypeScript"
  - "#tsTask"
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
function add(x: string, y: string): string;
function add(x: number, y: number): number {
	return x + y;
}

add(’1’,’2’);
```

\*\*Ответ

```ts
function add(x: string, y: string): string;
function add(x: number, y: number): number;
function add(x: number | string, y: number | string): number | string {
  if ((typeof x === "number") & (typeof y === "number")) {
    return x + y;
  } else if ((typeof x === "string") & (typeof y === "string")) {
    return x + y;
  } else {
    throw new Error("Invalid types of arguments");
  }
}

add("1", "2");
```

---

[[011 Решение задач JS, TS и React|Назад]]
