---
uid: OZW8P9-k_5VXg6ZlfAkJX
title: Что делает метод renderHook в RTL?
tags:
  - testing
  - Jest
  - react-testing-library
  - renderHook
  - rerender
  - unmount
info:
  - "https://testing-library.com/docs/react-testing-library/api/#renderhook"
draft: false
technology: "Jest, RTL"
specialty: Frontend
tools: []
order: 61
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

**`renderHook`** — это метод, предоставляемый библиотекой `@testing-library/react-hooks`, который используется для тестирования кастомных хуков. Он позволяет рендерить хук в изолированной среде и получать доступ к его результатам и состоянию.

Основные функции `renderHook`:

1. **Рендеринг хуков**: Рендерит кастомный хук в изолированной среде.
2. **Доступ к результатам**: Предоставляет доступ к результатам хука через свойство `result`.
3. **Обновление состояния**: Позволяет обновлять состояние хука с помощью метода `rerender`.
4. **Очистка**: Позволяет выполнять очистку после теста с помощью метода `unmount`.

Пример кастомного хука:

```javascript
import { useState, useEffect } from "react";

function useCounter(initialCount) {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return count;
}

export default useCounter;
```

Пример теста:

```javascript
import { renderHook, act } from "@testing-library/react-hooks";
import useCounter from "./useCounter";

test("useCounter increments the count", () => {
  // Рендерим хук с начальным значением
  const { result } = renderHook(() => useCounter(0));

  // Проверяем начальное состояние
  expect(result.current).toBe(0);

  // Обновляем состояние с помощью act
  act(() => {
    jest.advanceTimersByTime(1000);
  });

  // Проверяем обновленное состояние
  expect(result.current).toBe(1);

  // Обновляем состояние еще раз
  act(() => {
    jest.advanceTimersByTime(1000);
  });

  // Проверяем обновленное состояние
  expect(result.current).toBe(2);
});
```

Пояснение:

1. **Импорт `renderHook` и `act`**: Импортируйте `renderHook` и `act` из `@testing-library/react-hooks`.
2. **Рендеринг хука**: Используйте `renderHook` для рендеринга хука с начальным значением.
3. **Доступ к результатам**: Используйте свойство `result` для доступа к результатам хука.
4. **Обновление состояния**: Используйте `act` для обновления состояния хука. В данном случае, мы используем `jest.advanceTimersByTime` для продвижения времени и вызова эффектов.
5. **Проверка обновленного состояния**: Используйте `expect` для проверки обновленного состояния.

Дополнительные методы:

- **`rerender`**: Позволяет перерендерить хук с новыми аргументами.
- **`unmount`**: Позволяет отмонтировать хук, что полезно для проверки очистки эффектов.

```javascript
import { renderHook, act } from "@testing-library/react-hooks";
import useCounter from "./useCounter";

test("useCounter handles rerender and unmount", () => {
  const { result, rerender, unmount } = renderHook(
    ({ initialCount }) => useCounter(initialCount),
    {
      initialProps: { initialCount: 0 },
    },
  );

  expect(result.current).toBe(0);

  act(() => {
    jest.advanceTimersByTime(1000);
  });

  expect(result.current).toBe(1);

  // Перерендерим хук с новым начальным значением
  rerender({ initialCount: 5 });

  expect(result.current).toBe(5);

  // Отмонтируем хук
  unmount();

  // Проверяем, что интервал был очищен
  act(() => {
    jest.advanceTimersByTime(1000);
  });

  expect(result.current).toBe(5);
});
```

---

[[007 Jest, RTL|Назад]]
