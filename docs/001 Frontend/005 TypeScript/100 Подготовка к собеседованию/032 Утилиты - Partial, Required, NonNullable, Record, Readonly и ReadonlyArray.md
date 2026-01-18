---
uid: _A4nifpGpOqMpqpTLFGeH
title: "Утилиты - Partial, Required, NonNullable, Record, Readonly и ReadonlyArray"
tags:
  - "#TypeScript"
  - "#partial"
  - "#required"
  - "#nonnullable"
  - "#Record"
  - "#readonly"
  - "#readonlyArray"
info:
  - "https://www.youtube.com/watch?v=BTB3VDkWiOQ"
draft: false
technology: TypeScript
specialty: Frontend
tools: []
order: 32
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

\*\*Awaited

`Awaited<T>`
Утилита предназначена для ожидания в асинхронных операциях, например:

```tsx
type A = Awaited<Promise<number>>;
//type A -> number
```

\*\*Partial

`Partial<T>`

Утилита предназначена для создания нового типа, где каждое свойство станет опциональным. Напомню, для того чтобы сделать свойство объекта опциональным, необходимо использовать знак "?":

```tsx
type A = {
  id: number;
  name?: string; //Опциональное свойство (необязательное)
};
```

Как работает Partial ?

```tsx
type A = {
  id: number;
  name: string;
};

type B = Partial<A>;

//Output
type B = {
  id?: number; //Опциональное свойство (необязательное)
  name?: number; //Опциональное свойство (необязательное)
};
```

\*\*Require

`Required<T>`
Утилита работает в точности наоборот как Partial. Свойства текущего типа делает строго обязательными.

```tsx
type A = {
  id?: number;
  name?: string;
};

type B = Required<A>;

//Output
type B = {
  id: number; //Обязательное свойство
  name: number; //Обязательное свойство
};
```

\*\*Readonly

`Readonly<T>`
Утилиты преобразует все свойства типа, делает их недоступными для переназначения с использованием нового значения.

```tsx
type A = {
  id: number;
  name: string;
};

type B = Readonly<A>;

const firstObj: A = { id: 0, name: "first" };
const secondObj: B = { id: 1, name: "second" };

firstObj.name = "first_1"; // it's correct
secondObj.name = "second_2"; //Cannot assign to 'name' because it is a read-only property.
```

Если у вас есть необходимость сделать поле readonly только для определенного свойства объекта, то необходимо написать ключевое слово перед именем св-ва:

```tsx
type A = {
  readonly id: number;
  name: string;
};
```

\*\*Record

Создает тип объекта, ключи свойств которого `Keys`, а значениями свойств - `Type`.
Эту утилиту можно использовать для сопоставления свойств одного типа с другим типом.

```typescript
interface CatInfo {
  age: number;
  breed: string;
}

type CatName = "miffy" | "boris" | "mordred";

const cats: Record<CatName, CatInfo> = {
  miffy: { age: 10, breed: "Persian" },
  boris: { age: 5, breed: "Maine Coon" },
  mordred: { age: 16, breed: "British Shorthair" },
};
```

\*\*Pick

`Pick<T, 'key1' | 'key2'>`
Утилита предназначена для создания нового типа из выбранных свойств объекта.

```tsx
type A = {
  id: number;
  name: string;
};

type B = Pick<A, "name">;

//Output 1
type B = {
  name: string;
};

type B = Pick<A, "id" | "name">;

//Output 2
type B = {
  id: number;
  name: string;
};
```

\*\*Omit

`Omit<T, 'key1' | 'key2'>`
Утилита предназначена для создания типа из оставшихся (не исключенных) свойств объекта.

```tsx
type A = {
  id: number;
  name: string;
};

type B = Omit<A, "id">;

//Output 1
type B = {
  name: string;
};

type B = Omit<A, "id" | "name">;

//Output 2
type B2 = {};
```

\*\*Exclude

`Exclude<T, U>`
Утилита создает union тип, исключая свойства, которые уже присутствуют в двух разных типах. Он исключает из T все поля, которые можно назначить U.

```tsx
type A = {
  id: number;
  name: string;
  length: number;
};

type B = {
  id: number;
  color: string;
  depth: string;
};

type C = Exclude<keyof A, keyof B>;

//Output
type C = "name" | "length";
```

\*\*Extract

`Extract<T, U>`
Создает union тип, извлекая из T все члены объединения, которые можно назначить U.

```tsx
type A = {
  id: number;
  name: string;
  length: number;
};

type B = {
  id: number;
  name: string;
  color: string;
  depth: string;
};

type C = Extract<keyof A, keyof B>;

//Output
type C = "id" | "name";
```

\*\*ReturnType

`ReturnType<T>`
Создает тип, состоящий из типа, возвращаемого функцией T.

```tsx
type A = () => string;

type B = ReturnType<A>;

//Output
type B = string;
```

Это одни из основных Utility Types, в материалах к статье я оставлю ссылку на документацию, где при желании вы сможете разобрать остальные утилиты для продвинутой работы с TS.

---

[[005 TypeScript|Назад]]
