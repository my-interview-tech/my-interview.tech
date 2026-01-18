---
uid: RBxFZjk7ThCVofjfcpB-I
title: >-
  Как бы вы написали тест для проверки того, что функция выдаёт ошибку при
  определённых условиях, используя Jest?
tags:
  - testing
  - Jest
  - toThrow
draft: false
technology: "Jest, RTL"
specialty: Frontend
tools: []
order: 55
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

Для тестирования того, что функция выбрасывает ошибку при определенных условиях, используя Jest, вы можете использовать метод `.toThrow()`. Вот как это работает:

1. **Оберните вызов функции в другую функцию**: Это необходимо, потому что Jest должен выполнить функцию, чтобы поймать ошибку. Вы можете использовать стандартный синтаксис функции или синтаксис стрелочной функции.
2. **Напишите тестовый случай и утверждение**: Как обычно, но вместо прямого вызова функции в утверждении, передайте созданную вами обертку.
3. **Добавьте метод `.toThrow()`**: В конце утверждения добавьте метод `.toThrow()`. Если функция выбрасывает ошибку, тест пройдет. Если нет, тест провалится.

Пример:

Предположим, у вас есть функция `myFunction`, которая выбрасывает ошибку, если ей передается неверный тип:

```javascript
function myFunction(type) {
  if (typeof type !== "string") {
    throw new TypeError("Invalid type");
  }
  // Остальная логика функции
}
```

Теперь вы можете написать тест, чтобы убедиться, что эта функция действительно выбрасывает ошибку при передаче неверного типа:

```javascript
test("throws on invalid type", () => {
  const wrapperFunction = () => {
    myFunction("invalidType");
  };
  expect(wrapperFunction).toThrow(TypeError);
});
```

Пояснение:

1. **Создание обертки**: Создаем функцию `wrapperFunction`, которая вызывает `myFunction` с аргументом `'invalidType'`.
2. **Написание теста**: В тесте используем `expect(wrapperFunction).toThrow(TypeError)`, чтобы утверждать, что `wrapperFunction` выбрасывает ошибку типа `TypeError`.

Проверка конкретного сообщения об ошибке:

```javascript
test("throws on invalid type with specific message", () => {
  const wrapperFunction = () => {
    myFunction("invalidType");
  };
  expect(wrapperFunction).toThrow("Invalid type");
});
```

Проверка выброса ошибки без указания типа:

```javascript
test("throws on invalid type without specifying error type", () => {
  const wrapperFunction = () => {
    myFunction("invalidType");
  };
  expect(wrapperFunction).toThrow();
});
```

Этот подход позволяет вам тестировать выброс ошибок в вашем коде, гарантируя, что ошибки выбрасываются и обрабатываются правильно при определенных условиях.

---

[[007 Jest, RTL|Назад]]
