---
uid: lisFNr8fZ6goQ2_1H8kno
title: Какую функцию выполняет toHaveBeenCalledWith()?
tags:
  - testing
  - Jest
  - toHaveBeenCalledWith
draft: false
technology: "Jest, RTL"
specialty: Frontend
tools: []
order: 51
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

`toHaveBeenCalledWith` — это матчер, который используется для проверки того, был ли вызван мок-функция (mock function) с определенными аргументами. Он полезен при тестировании функций, которые вызывают другие функции, чтобы убедиться, что они вызываются с правильными параметрами.

Пример использования:

```javascript
test("mock function should be called with specific arguments", () => {
  const mockFn = jest.fn();

  mockFn("arg1", "arg2");

  expect(mockFn).toHaveBeenCalledWith("arg1", "arg2"); // Пройдет, так как mockFn была вызвана с 'arg1' и 'arg2'
});
```

В этом примере `mockFn` вызывается с аргументами `'arg1'` и `'arg2'`, и `toHaveBeenCalledWith` проверяет, что это действительно произошло.

---

[[007 Jest, RTL|Назад]]
