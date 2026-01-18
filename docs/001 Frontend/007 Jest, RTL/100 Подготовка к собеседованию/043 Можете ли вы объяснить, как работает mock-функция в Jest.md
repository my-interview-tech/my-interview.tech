---
uid: g-Nq_bSHX8oh3hHTlAG-6
title: "Можете ли вы объяснить, как работает mock-функция в Jest?"
tags:
  - testing
  - Jest
  - mockReturnValue
draft: false
technology: "Jest, RTL"
specialty: Frontend
tools: []
order: 43
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

Имитационная функция (mock function) используется для отслеживания вызовов функции и имитации её функциональности. Это позволяет контролировать поведение функции в тестах, делая их более предсказуемыми и изолированными. Вот как работает имитация функции в Jest:

\*\*Основные возможности имитации функции:

1. **Отслеживание вызовов**: Имитация функции позволяет отслеживать, сколько раз и с какими аргументами была вызвана функция.
2. **Имитация поведения**: Вы можете настроить имитацию функции так, чтобы она возвращала определенные значения или выполняла определенные действия.
3. **Замена реальной реализации**: Имитация позволяет заменить реальную функцию на имитированную версию, что полезно для тестирования кода, который зависит от внешних зависимостей.

\*\*Пример создания и использования имитации функции

```javascript
// Создание имитации функции
const mockFn = jest.fn();

// Настройка возвращаемого значения
mockFn.mockReturnValue(42);

// Использование имитации функции
console.log(mockFn()); // 42

// Отслеживание вызовов
mockFn("a", "b");
console.log(mockFn.mock.calls); // [['a', 'b']]
```

\*\*Пример имитации модуля

Если вы хотите имитировать целый модуль, можно использовать `jest.mock()`:

```javascript
// В папке __mocks__ создайте файл axios.js
module.exports = {
  get: jest.fn(() => Promise.resolve({ data: {} })),
};

// В вашем тесте
jest.mock("axios");
const axios = require("axios");

test("should fetch data", async () => {
  const response = await axios.get("/api/data");
  expect(response.data).toEqual({});
});
```

\*\*Пример имитации метода класса

Для имитации методов класса можно использовать `jest.spyOn()`:

```javascript
class MyClass {
  method() {
    return "original value";
  }
}

const spy = jest
  .spyOn(MyClass.prototype, "method")
  .mockReturnValue("mocked value");
const instance = new MyClass();
console.log(instance.method()); // 'mocked value'
```

---

[[007 Jest, RTL|Назад]]
