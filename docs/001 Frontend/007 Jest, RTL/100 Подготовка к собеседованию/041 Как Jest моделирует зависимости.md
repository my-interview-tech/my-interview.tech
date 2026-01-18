---
uid: RpJvCNvdJbkVpkllZLuVy
title: Как Jest моделирует зависимости?
tags:
  - testing
  - Jest
  - JestFn
  - JestMock
  - __mocks__
  - spyOn
info:
  - "https://dev.to/this-is-learning/how-to-mock-dependencies-with-jest-457l"
draft: false
technology: "Jest, RTL"
specialty: Frontend
tools: []
order: 41
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

Jest моделирует зависимости с помощью механизма имитации (mocking). Это позволяет разработчикам заменять реальные зависимости, такие как функции, модули или классы, на имитированные версии, которые могут контролироваться в тестах. Вот как Jest реализует имитацию:

1. **Имитация функций**: Jest позволяет создавать имитации функций с помощью `jest.fn()`. Эти имитации могут быть настроены для возврата определенных значений, выполнения определенных действий или проверки вызовов.
2. **Имитация модулей**: Jest предоставляет `jest.mock()` для имитации целых модулей. Это позволяет заменить реальные модули на имитированные версии, что полезно для тестирования изолированных частей кода, которые зависят от внешних модулей.
3. **Имитация классов**: Jest также поддерживает имитацию классов с помощью `jest.spyOn()`. Это позволяет контролировать вызовы методов класса и их поведение в тестах.
4. **Автоматическая имитация**: Jest может автоматически имитировать модули, если они находятся в папке `__mocks__` рядом с исходным модулем. Это упрощает управление имитациями для часто используемых зависимостей.

Примеры:

- **Имитация функции**:

```javascript
const mockFn = jest.fn();
mockFn.mockReturnValue(42);

console.log(mockFn()); // 42
```

- **Имитация модуля**:

```javascript
jest.mock("./myModule", () => ({
  myFunction: jest.fn(() => "mocked value"),
}));

const myModule = require("./myModule");
console.log(myModule.myFunction()); // 'mocked value'
```

- **Имитация класса**:

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

Имитация зависимостей в Jest позволяет разработчикам контролировать окружение тестов, упрощая тестирование изолированных частей кода и обеспечивая более предсказуемые результаты.

---

[[007 Jest, RTL|Назад]]
