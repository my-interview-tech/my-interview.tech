---
uid: n1aJP5ZF4A3V2W8ALpSw9
title: Как обрабатывать ошибки в async и await?
tags:
  - "#JavaScript"
  - "#асинхронность"
  - "#async"
  - "#await"
  - "#try-catch"
info: []
draft: false
technology: JSCore
specialty: Frontend
tools: []
order: 213
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

Обработка ошибок в `async/await` происходит с помощью конструкции `try-catch`. Если внутри функции, помеченной как `async`, происходит ошибка, то она будет выброшена в виде исключения. Для обработки ошибок можно использовать конструкцию `try-catch`, как в примере ниже:

```javascript
async function getData() {
  try {
    const response = await fetch("https://example.com/data");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
```

В этом примере мы используем `try-catch` для обработки ошибок в асинхронной функции `getData()`. Мы отправляем запрос на сервер с помощью `fetch` и ожидаем завершения операции с помощью `await`. Если операция завершается успешно, то мы преобразуем ответ в формат json с помощью `response.json()` и возвращаем результат. Если операция завершается с ошибкой, то мы перехватываем исключение с помощью `catch`, выводим сообщение об ошибке в консоль и возвращаем `null`.

Кроме того, можно использовать метод `finally` для выполнения каких-либо действий после завершения операции, независимо от того, была ли она выполнена успешно или с ошибкой:

```javascript
async function getData() {
  try {
    const response = await fetch("https://example.com/data");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    console.log("Request completed.");
  }
}
```

В этом примере мы добавили блок `finally`, который будет выполнен после завершения операции, независимо от того, была ли она выполнена успешно или с ошибкой. В данном случае мы выводим сообщение в консоль, указывающее на то, что запрос завершен.

Таким образом, для обработки ошибок в `async/await` можно использовать конструкцию `try-catch`, а также метод `finally` для выполнения каких-либо действий после завершения операции.

---

[[003 JSCore|Назад]]
