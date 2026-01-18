---
uid: AWfc888ESlAUVCbw0iC1G
title: Как можно протестировать HTTP-запросы в Jest?
tags:
  - testing
  - Jest
  - __mocks__
  - axios
  - fetch
draft: false
technology: "Jest, RTL"
specialty: Frontend
tools: []
order: 68
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

Jest позволяет тестировать HTTP-запросы через имитацию (mocking). Вы можете использовать библиотеки, такие как `axios` или `fetch-mock`, для этой цели. Вот как это можно сделать:

Использование `axios` для имитации HTTP-запросов

1. **Создайте папку `__mocks__`**:

Создайте папку `__mocks__` на том же уровне, что и `node_modules`, и поместите в неё файл `axios.js`.

2. **Создайте имитацию `axios`**:

В файле `axios.js` экспортируйте объект по умолчанию с методами `get` и `post`, которые возвращают промисы.

Пример `__mocks__/axios.js`:

```javascript
export default {
  get: jest.fn(() => Promise.resolve({ data: {} })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
};
```

3. **Импортируйте и имитируйте `axios` в тестовом файле**:

В вашем тестовом файле импортируйте `axios` и используйте `jest.mock('axios')` для имитации. Затем определите, что должен возвращать промис, используя `axios.get.mockResolvedValue({ data: {} })`.

```javascript
import axios from "axios";
import { fetchData } from "./api";

jest.mock("axios");

test("should fetch data", async () => {
  const data = { id: 1, name: "John Doe" };
  axios.get.mockResolvedValue({ data });

  const result = await fetchData();

  expect(result).toEqual(data);
  expect(axios.get).toHaveBeenCalledWith("https://api.example.com/data");
});
```

Использование `fetch-mock` для имитации HTTP-запросов

1. **Установите `fetch-mock`**:

```bash
npm install fetch-mock
```

2. **Импортируйте и настройте `fetch-mock`**:

В вашем тестовом файле импортируйте `fetch-mock` и настройте его для возврата ожидаемых данных.

```javascript
import fetchMock from "fetch-mock";
import { fetchData } from "./api";

afterEach(() => {
  fetchMock.restore();
});

test("should fetch data", async () => {
  const data = { id: 1, name: "John Doe" };
  fetchMock.get("https://api.example.com/data", { data });

  const result = await fetchData();

  expect(result).toEqual(data);
  expect(fetchMock.called("https://api.example.com/data")).toBe(true);
});
```

---

[[007 Jest, RTL|Назад]]
