---
uid: uo2DzH18PZelELSYEJj9-
title: Что такое fake в unit-test?
tags:
  - "#testing"
  - "#unit-test"
  - "#unit-fake"
  - unit-mock
  - unit-stub
  - unit-dummy
info:
  - "https://blog.pragmatists.com/test-doubles-fakes-mocks-and-stubs-1a7491dfa3da"
draft: false
technology: "Jest, RTL"
specialty: Frontend
tools: []
order: 6
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

В unit-тестировании `Fake` (англ. "фейк") - это объект, который _имитирует поведение реального объекта, но не является точной его копией_, а создается специально для тестирования. Fake обычно используется, когда _необходимо создать объект, который зависит от других компонентов_, _которые еще не готовы или не доступны на момент тестирования_.

`Fake` может имитировать различные объекты, такие как базы данных, файловые системы, сетевые соединения, а также другие объекты, которые сложно воссоздать в тестовой среде или которые могут повлиять на результаты тестирования.

`Fake` может быть реализован в виде заглушки (англ. `unit-mock` ), подмены (англ. `unit-stub`) или имитации (англ. `unit-dummy` ).

Использование `Fake` в unit-тестировании позволяет изолировать тестируемый объект от внешних зависимостей и контролировать его поведение в тестовых условиях. Это позволяет улучшить качество и надежность программного обеспечения, а также ускорить процесс тестирования.

**Пример**

Представим, что у нас есть функциональный компонент `UserProfile`, который зависит от сервиса `UserService` для получения информации о пользователе. Сервис `UserService` имеет метод `getUserNameById`, который принимает на вход идентификатор пользователя и возвращает его имя. Для тестирования этого компонента нам нужно имитировать работу сервиса, чтобы изолировать тестируемый компонент от внешних зависимостей.

Мы можем создать Fake объект `FakeUserService`, который будет имитировать работу сервиса. Для этого нам нужно создать функцию `FakeUserService`, которая будет возвращать фиктивные данные.

```jsx
const FakeUserService = {
  getUserNameById: (id) => {
    const users = [
      { id: 1, name: "John" },
      { id: 2, name: "Jane" },
    ];

    return users.find((user) => user.id === id)?.name;
  },
};
```

Затем мы можем создать функциональный компонент `UserProfile`, который будет использовать этот Fake сервис.

```jsx
import React, { useState, useEffect } from "react";

const UserProfile = ({ userId, userService }) => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUserName = async () => {
      const name = await userService.getUserNameById(userId);
      setUserName(name);
    };

    fetchUserName();
  }, [userId, userService]);

  return <div>User Name: {userName}</div>;
};
```

Теперь мы можем протестировать компонент `UserProfile` с использованием Fake сервиса `FakeUserService`.

```jsx
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

test("renders user name correctly", () => {
  render(<UserProfile userId={1} userService={FakeUserService} />);
  const userNameElement = screen.getByText(/User Name: John/i);

  expect(userNameElement).toBeInTheDocument();
});
```

Таким образом, использование Fake объекта позволяет нам изолировать тестируемый объект от внешних зависимостей и контролировать его поведение в тестовых условиях.

---

[[007 Jest, RTL|Назад]]
