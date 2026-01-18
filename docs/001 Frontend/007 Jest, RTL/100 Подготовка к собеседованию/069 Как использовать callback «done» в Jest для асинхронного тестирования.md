---
uid: _VmP9Q4uqTVJ2oXHkxwaU
title: Как использовать callback «done» в Jest для асинхронного тестирования?
tags:
  - testing
  - Jest
  - done
draft: false
technology: "Jest, RTL"
specialty: Frontend
tools: []
order: 69
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

В Jest callback `done` используется для асинхронного тестирования. Он передается в качестве аргумента вашей тестовой функции и должен быть вызван, когда асинхронная операция завершается. Если у вас есть асинхронная операция на основе промисов, верните этот промис вместо использования `done`.

```javascript
test("async test", (done) => {
  setTimeout(() => {
    expect(someValue).toBe(expectedValue);
    done();
  }, 2000);
});
```

Пояснение:

1. **Передача `done` в тестовую функцию**:
   - `done` передается в качестве аргумента в тестовую функцию.
2. **Вызов `done` после завершения асинхронной операции**:
   - Внутри асинхронной операции (например, внутри `setTimeout`) вызывается `done()`, чтобы сообщить Jest, что асинхронная операция завершена и тест может быть завершен.
3. **Ожидание вызова `done`**:
   - Если `done` не вызывается в течение дефолтного таймаута (5 секунд), тест завершится с ошибкой.

Пример с использованием `setTimeout`:

```javascript
test("async test with setTimeout", (done) => {
  setTimeout(() => {
    expect(true).toBe(true);
    done();
  }, 2000);
});
```

Пример с использованием `Promise`:

Если у вас есть асинхронная операция на основе промисов, верните промис вместо использования `done`:

```javascript
test("async test with Promise", () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      expect(true).toBe(true);
      resolve();
    }, 2000);
  });
});
```

Пример с использованием `async/await`:

Если вы используете `async/await`, вам не нужно использовать `done`:

```javascript
test("async test with async/await", async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  expect(true).toBe(true);
});
```

---

[[007 Jest, RTL|Назад]]
