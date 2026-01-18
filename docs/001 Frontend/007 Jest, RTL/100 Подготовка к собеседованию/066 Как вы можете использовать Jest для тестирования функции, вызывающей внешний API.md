---
uid: yu-t2EQK8qIPTF6co4VPx
title: >-
  Как вы можете использовать Jest для тестирования функции, вызывающей внешний
  API?
tags:
  - testing
  - Jest
  - API
  - unit-mock
draft: false
technology: "Jest, RTL"
specialty: Frontend
tools: []
order: 66
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

`Jest` позволяет тестировать функции, которые вызывают внешние API, путем имитации (mocking) вызовов API. Это делается с помощью функциональности имитации Jest, которая позволяет заменить фактическую реализацию функции на фейковую или "имитированную" версию.

Шаги для тестирования функции, вызывающей внешний API:

1. **Импортируйте модуль с функцией, которую хотите протестировать**.
2. **Используйте `jest.mock()` для замены функции на имитированную версию**.
3. **Определите, что должна возвращать имитированная функция при вызове**.
4. **Напишите утверждения (assertions) для проверки правильности поведения вашей функции с имитированными данными**.

Предположим, у вас есть функция `fetchData`, которая вызывает внешний API:

```javascript
export const fetchData = async () => {
  const response = await fetch("https://api.example.com/data");
  const data = await response.json();
  return data;
};
```

```javascript
import { fetchData } from "./api";

export const getData = async () => {
  const data = await fetchData();
  return data.name;
};
```

```javascript
import { getData } from "./myFunction";
import { fetchData } from "./api";

// Имитируем функцию fetchData
jest.mock("./api");

test("getData returns the name from the API", async () => {
  // Определяем, что должна возвращать имитированная функция
  fetchData.mockResolvedValue({ name: "John Doe" });

  // Вызываем функцию, которую хотим протестировать
  const result = await getData();

  // Проверяем, что функция ведет себя правильно
  expect(result).toBe("John Doe");
  expect(fetchData).toHaveBeenCalled();
});
```

1. **Импорт модуля и имитация**: Импортируем функцию `fetchData` и используем `jest.mock('./api')` для замены ее на имитированную версию.
2. **Определение возвращаемого значения**: Используем `fetchData.mockResolvedValue({ name: 'John Doe' })`, чтобы определить, что должна возвращать имитированная функция.
3. **Вызов тестируемой функции**: Вызываем функцию `getData`, которую хотим протестировать.
4. **Написание утверждений**: Проверяем, что функция `getData` возвращает ожидаемое значение и что имитированная функция `fetchData` была вызвана.

Дополнительные примеры:

Имитация отклоненного промиса:

```javascript
test("getData handles API error", async () => {
  fetchData.mockRejectedValue(new Error("API error"));

  await expect(getData()).rejects.toThrow("API error");
  expect(fetchData).toHaveBeenCalled();
});
```

Имитация функции с параметрами:

```javascript
test("getData handles different API responses", async () => {
  fetchData.mockImplementation((url) => {
    if (url === "https://api.example.com/data") {
      return Promise.resolve({ name: "John Doe" });
    } else {
      return Promise.resolve({ name: "Jane Smith" });
    }
  });

  const result1 = await getData("https://api.example.com/data");
  const result2 = await getData("https://api.example.com/other");

  expect(result1).toBe("John Doe");
  expect(result2).toBe("Jane Smith");
  expect(fetchData).toHaveBeenCalledTimes(2);
});
```

---

[[007 Jest, RTL|Назад]]
