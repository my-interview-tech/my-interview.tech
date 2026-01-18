---
uid: Ut4KzEgxSyjLCMFIn0Xnj
title: TSTask - Types vs Interface_0
tags:
  - "#TypeScript"
  - "#tsTask"
  - "#type"
  - "#interface"
  - "#астон"
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
interface Type {
	propA: string | underfined;
	propB?: string;
}

const ReactComponent = {props: Type} => null;
```

```ts
// Как это всё работает?
interface Type {
	propA: string | underfined;
	propB?: string;
}

interface Type {
	propC: string | underfined;
	propD?: string;
}

type a = 'string'
type a = 'number'
const ReactComponent = {props: Type} => null;

// interfaces схлопнутся а types перезапишутся
```

---

[[011 Решение задач JS, TS и React|Назад]]
