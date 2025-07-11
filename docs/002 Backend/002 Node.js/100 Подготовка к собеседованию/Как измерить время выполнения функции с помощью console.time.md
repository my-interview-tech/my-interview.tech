---
title: Как измерить время выполнения функции с помощью console.time
draft: false
tags:
  - "#NodeJS"
  - "#console"
  - "#производительность"
  - "#отладка"
  - "#JavaScript"
info:
  - https://nodejs.org/api/console.html#consoletimerlabel
  - https://developer.mozilla.org/en-US/docs/Web/API/console/time
---

Методы `console.time()` и `console.timeEnd()` в Node.js позволяют измерять время выполнения участков кода с высокой точностью.

## Основные методы для измерения времени

Node.js предоставляет два основных метода для измерения времени:

1. **`console.time(label)`** — Начинает таймер с указанным меткой (label)
2. **`console.timeEnd(label)`** — Завершает таймер и выводит затраченное время в консоль

## Базовый пример измерения времени

```javascript
// Начинаем отсчет времени с меткой 'myFunction'
console.time("myFunction")

// Функция, время выполнения которой нужно измерить
function exampleFunction() {
  let sum = 0
  for (let i = 0; i < 1e6; i++) {
    sum += i
  }
  return sum
}

// Вызываем функцию
exampleFunction()

// Завершаем отсчет времени и выводим результат
console.timeEnd("myFunction") // Выведет: myFunction: 2.345ms
```

## Как это работает

1. **`console.time('myFunction')`** запускает таймер с меткой `'myFunction'`
2. Выполняется функция `exampleFunction()`
3. **`console.timeEnd('myFunction')`** останавливает таймер и выводит затраченное время в миллисекундах

> **Важно**: Метка (label) должна быть одинаковой в вызовах `console.time()` и `console.timeEnd()`, чтобы система могла связать начало и конец измерения.

## Измерение времени асинхронных операций

При работе с асинхронным кодом важно правильно разместить `console.timeEnd()`:

```javascript
console.time("asyncOperation")

setTimeout(() => {
  // Какие-то операции
  console.timeEnd("asyncOperation") // Выведет время через 1 секунду
}, 1000)
```

## Вложенные измерения

Можно использовать несколько таймеров одновременно с разными метками:

```javascript
console.time("total")

console.time("part1")
// Первая часть кода
console.timeEnd("part1")

console.time("part2")
// Вторая часть кода
console.timeEnd("part2")

console.timeEnd("total")
```

## Дополнительные возможности

В Node.js версии 10+ также доступны:

- **`console.timeLog(label)`** — выводит промежуточное время, не останавливая таймер

```javascript
console.time("process")
// Часть 1
console.timeLog("process", "Завершена часть 1")
// Часть 2
console.timeEnd("process")
```

## Альтернативные методы измерения времени

Кроме `console.time()`, в Node.js можно использовать:

1. **`process.hrtime()`** — высокоточное измерение времени в наносекундах
2. **`performance.now()`** — измерение времени с высокой точностью (доступно в более новых версиях Node.js)

```javascript
// С использованием process.hrtime()
const start = process.hrtime()
exampleFunction()
const diff = process.hrtime(start)
console.log(`Выполнено за ${diff[0] * 1e9 + diff[1]} наносекунд`)

// С использованием performance.now()
const { performance } = require("perf_hooks")
const startTime = performance.now()
exampleFunction()
console.log(`Выполнено за ${performance.now() - startTime} миллисекунд`)
```

## Рекомендации по использованию

- Используйте `console.time()` для быстрой отладки и оптимизации кода
- Для более точных измерений в продакшн-коде предпочтительнее `performance.now()`
- Для профилирования сложных приложений рассмотрите использование специализированных инструментов, таких как `node --inspect` с Chrome DevTools

---

[[002 Node.js|Назад]]
