---
uid: l6BdvgvGFF-x7Cg4mLGuc
title: >-
  Как можно протестировать функцию на основе таймера, например setTimeout или
  setInterval, с помощью Jest?
tags:
  - testing
  - Jest
  - setTimeout
  - useFakeTimers
  - runAllTimers
  - setInterval
draft: false
technology: "Jest, RTL"
specialty: Frontend
tools: []
order: 53
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

Jest предоставляет утилиты для тестирования функций на основе таймера, таких как `setTimeout` или `setInterval`. Для этого используется функция `jest.useFakeTimers()`, которая заменяет нативные функции таймера на имитации, контролируемые Jest.

Тестирование `setTimeout`:

1. **Используйте `jest.useFakeTimers()`**: Это позволяет Jest контролировать таймеры.
2. **Вызовите функцию, которую хотите протестировать**.
3. **Используйте `jest.runAllTimers()`**: Это быстро продвигает время и выполняет все ожидающие обратные вызовы таймера немедленно.
4. **Утвердите, что ваша функция вела себя так, как ожидалось**.

Предположим, у вас есть функция, которая использует `setTimeout`:

```javascript
function delayedGreeting(callback) {
  setTimeout(() => {
    callback("Hello, world!");
  }, 1000);
}
```

Теперь вы можете написать тест для этой функции:

```javascript
test("delayedGreeting calls callback after 1 second", () => {
  jest.useFakeTimers();

  const callback = jest.fn();
  delayedGreeting(callback);

  // На этом этапе таймер еще не выполнен
  expect(callback).not.toHaveBeenCalled();

  // Продвигаем время на 1 секунду
  jest.runAllTimers();

  // Теперь таймер выполнен, и обратный вызов должен быть вызван
  expect(callback).toHaveBeenCalledWith("Hello, world!");
});
```

Тестирование `setInterval`:

Процесс аналогичен, но вместо `jest.runAllTimers()` используйте `jest.advanceTimersByTime(ms)`, где `ms` — это интервал времени в миллисекундах. Это продвигает таймеры на указанное время и выполняет любые обратные вызовы, запланированные в это время.

Предположим, у вас есть функция, которая использует `setInterval`:

```javascript
function periodicGreeting(callback) {
  setInterval(() => {
    callback("Hello, world!");
  }, 1000);
}
```

Теперь вы можете написать тест для этой функции:

```javascript
test("periodicGreeting calls callback every second", () => {
  jest.useFakeTimers();

  const callback = jest.fn();
  periodicGreeting(callback);

  // На этом этапе таймер еще не выполнен
  expect(callback).not.toHaveBeenCalled();

  // Продвигаем время на 1 секунду
  jest.advanceTimersByTime(1000);

  // Теперь таймер выполнен, и обратный вызов должен быть вызван
  expect(callback).toHaveBeenCalledWith("Hello, world!");

  // Продвигаем время еще на 1 секунду
  jest.advanceTimersByTime(1000);

  // Теперь таймер выполнен второй раз
  expect(callback).toHaveBeenCalledTimes(2);
});
```

Пояснение:

1. **Использование `jest.useFakeTimers()`**: Имитирует таймеры, позволяя Jest контролировать их.
2. **Вызов функции**: Вызываем функцию, которую хотим протестировать.
3. **Продвижение времени**: Используем `jest.runAllTimers()` для `setTimeout` или `jest.advanceTimersByTime(ms)` для `setInterval`, чтобы продвинуть время и выполнить обратные вызовы.
4. **Утверждения**: Проверяем, что функция вела себя так, как ожидалось.ckeif

Этот подход позволяет вам тестировать функции на основе таймера, гарантируя, что они работают правильно и вызывают обратные вызовы в нужные моменты времени.

---

[[007 Jest, RTL|Назад]]
