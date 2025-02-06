---
title: TSTask - Types vs Interface
draft: false
tags:
  - "#TypeScript"
  - "#tsTask"
  - "#type"
  - "#interface"
  - "#астон"
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

___

[[011 Решение задач JS, TS и React|Назад]]