---
uid: fBs7Xd3TvPhbYO7TJZk8Y
title: Как вы пишите mock для функции на Jest?
tags:
  - testing
  - Jest
  - mockResolvedValue
  - mockImplementation
  - mockReturnValue
  - spyOn
draft: false
technology: "Jest, RTL"
specialty: Frontend
tools: []
order: 42
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

Для создания имитации (mock) функции в Jest используется метод `jest.fn()`. Этот метод позволяет создать новую имитационную функцию, которую можно настроить для возврата определенных значений, имитации поведения или отслеживания вызовов. Вот ка к это делается:

\*\*Пример создания и настройки имитации функции

1. **Создание пустой имитации**:

```javascript
const mockFn = jest.fn();
```

2. **Настройка возвращаемого значения**:

```javascript
mockFn.mockReturnValue(42);
console.log(mockFn()); // 42
```

3. **Настройка асинхронного возвращаемого значения**:

```javascript
mockFn.mockResolvedValue("data");
mockFn().then((data) => console.log(data)); // 'data'
```

4. **Настройка реализации функции**:

```javascript
mockFn.mockImplementation((x) => x * 2);
console.log(mockFn(5)); // 10
```

5. **Отслеживание вызовов**:

```javascript
mockFn("a", "b");
console.log(mockFn.mock.calls); // [['a', 'b']]
```

\*\*Пример имитации существующей функции

Если вы хотите имитировать существующую функцию в объекте, можно использовать `jest.spyOn()`:

```javascript
const myObject = {
  myFunction: (a, b) => a + b,
};

const spy = jest
  .spyOn(myObject, "myFunction")
  .mockImplementation((a, b) => a * b);

console.log(myObject.myFunction(2, 3)); // 6
console.log(spy.mock.calls); // [[2, 3]]
```

\*\*Пример имитации модуля

Если вы хотите имитировать целый модуль, можно использовать `jest.mock()`:

```javascript
jest.mock("./myModule", () => ({
  myFunction: jest.fn(() => "mocked value"),
}));

const myModule = require("./myModule");
console.log(myModule.myFunction()); // 'mocked value'
```

\*\*Пример имитации класса

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

Имитация функций в Jest позволяет контролировать поведение зависимостей в тестах, что делает тесты более предсказуемыми и изолированными. Используя `jest.fn()`, `jest.spyOn()` и `jest.mock()`, вы можете создавать и настраивать имитации функций и модулей для различных сценариев тестирования.

---

[[007 Jest, RTL|Назад]]
