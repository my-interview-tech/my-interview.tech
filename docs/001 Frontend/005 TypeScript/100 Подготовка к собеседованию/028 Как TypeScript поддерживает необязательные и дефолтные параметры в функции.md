---
uid: pgLPyZwbYTT6esuhmLMn-
title: Как TypeScript поддерживает необязательные и дефолтные параметры в функции?
tags:
  - "#TypeScript"
info: []
draft: false
technology: TypeScript
specialty: Frontend
tools: []
order: 28
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

- Используйте синтаксис параметра `?: type`, чтобы сделать параметр необязательным.
- Используйте выражение `typeof (параметр)! == 'undefined'`, чтобы проверить, был ли параметр инициализирован.

```typescript
function multiply(a: number, b?: number, c: number): number {
  if (typeof c !== "undefined") {
    return a * b * c;
  }
  return a * b;
}
```

TypeScript поддерживает необязательные и дефолтные параметры в функции с помощью специального синтаксиса.

## Необязательные параметры

Необязательные параметры определяются с помощью символа `?` после имени параметра. Необязательный параметр может быть опущен при вызове функции, и в этом случае ему будет присвоено значение `undefined`.

```tsx
function printName(firstName: string, lastName?: string) {
  console.log(firstName + (lastName ? " " + lastName : ""));
}

printName("John"); // Output: 'John'
printName("John", "Doe"); // Output: 'John Doe'
```

В этом примере мы определили функцию `printName()`, которая принимает два параметра: `firstName` и `lastName`. Параметр `lastName` определен как необязательный с помощью символа `?` после имени параметра. При вызове функции `printName()` с одним параметром (`'John'`) в консоль будет выведено только имя. При вызове функции с двумя параметрами (`'John'`и `'Doe'`) в консоль будет выведено имя и фамилия.

## Дефолтные параметры

Дефолтные параметры позволяют определить значение параметра по умолчанию, которое будет использовано, если параметр не был передан при вызове функции. Дефолтные параметры определяются с помощью символа = после имени параметра.

```tsx
function printGreeting(name: string = "World") {
  console.log(`Hello, ${name}!`);
}

printGreeting(); // Output: 'Hello, World!'
printGreeting("John"); // Output: 'Hello, John!'
```

В этом примере мы определили функцию `printGreeting()`, которая принимает один параметр `name`. Параметр `name` определен со значением по умолчанию `'World'` с помощью символа = после имени параметра. Если параметр `name` не был передан при вызове функции, будет использовано значение по умолчанию `'World'`. Если параметр был передан, будет использовано переданное значение.

## Комбинация необязательных и дефолтных параметров

Необязательные и дефолтные параметры могут быть использованы вместе в одной функции.

```tsx
function printMessage(
  message: string = "Hello",
  times: number = 1,
  name?: string,
) {
  for (let i = 0; i < times; i++) {
    console.log(`${message}${name ? ", " + name : ""}`);
  }
}

printMessage(); // Output: 'Hello'
printMessage("Hi", 2); // Output: 'Hi' 'Hi'
printMessage("Welcome", 3, "John"); // Output: 'Welcome, John' 'Welcome, John' 'Welcome, John'
```

В этом примере мы определили функцию `printMessage()`, которая принимает три параметра: `message`, `times` и `name`. Параметры `message` и `times` определены с помощью значений по умолчанию — `'Hello'` и `1` соответственно. Параметр `name` определен как необязательный с помощью символа `?` после имени параметра. Если параметр `name` не был передан, он не будет использован при выводе сообщений.

---

[[005 TypeScript|Назад]]
