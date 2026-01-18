---
uid: YpxJ2SrYOMIKKWdS_6E32
title: Как вы тестируете ошибки в Jest ?
tags:
  - testing
  - Jest
  - toThrow
draft: false
technology: "Jest, RTL"
specialty: Frontend
tools: []
order: 54
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

В Jest.js управление ошибками достигается с помощью функций `expect` и `.toThrow()`. Функция `expect` оборачивает код, который может выбросить ошибку, а `.toThrow()` утверждает, что ошибка действительно выбрасывается. Если ошибка не выбрасывается, тест проваливается.

Пример:

Предположим, у вас есть функция `eatOctopus`, которая выбрасывает ошибку, если попытаться съесть осьминога:

```javascript
function eatOctopus() {
  throw new Error("octopus is not edible");
}
```

Теперь вы можете написать тест, чтобы убедиться, что эта функция действительно выбрасывает ошибку:

```javascript
test("throws on octopus", () => {
  expect(() => {
    eatOctopus();
  }).toThrow("octopus is not edible");
});
```

Пояснение:

1. **Оборачивание кода в функцию**: Используем `expect(() => { eatOctopus(); })`, чтобы обернуть вызов функции, которая может выбросить ошибку.
2. **Проверка выброса ошибки**: Используем `.toThrow('octopus is not edible')`, чтобы утверждать, что ошибка с сообщением `'octopus is not edible'` действительно выбрасывается.

Проверка на конкретный тип ошибки:

Вы также можете проверить, что выбрасывается ошибка конкретного типа, передав класс ошибки в `.toThrow()`:

```javascript
class EdibleError extends Error {}

function eatOctopus() {
  throw new EdibleError("octopus is not edible");
}

test("throws EdibleError on octopus", () => {
  expect(() => {
    eatOctopus();
  }).toThrow(EdibleError);
});
```

Пояснение:

1. **Создание пользовательского класса ошибки**: Создаем класс `EdibleError`, который наследуется от `Error`.
2. **Выброс ошибки пользовательского типа**: В функции `eatOctopus` выбрасываем экземпляр `EdibleError`.
3. **Проверка на конкретный тип ошибки**: Используем `.toThrow(EdibleError)`, чтобы утверждать, что выбрасывается ошибка типа `EdibleError`.

Этот подход позволяет вам тестировать обработку ошибок в вашем коде, гарантируя, что ошибки выбрасываются и обрабатываются правильно.

---

[[007 Jest, RTL|Назад]]
