---
uid: P0pKubs9jNOSIoDQ7L-uG
title: Что такое mock в unit-test?
tags:
  - "#testing"
  - "#unit-test"
  - "#unit-mock"
info:
  - "https://blog.pragmatists.com/test-doubles-fakes-mocks-and-stubs-1a7491dfa3da"
draft: false
technology: "Jest, RTL"
specialty: Frontend
tools: []
order: 9
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

В unit-тестировании `Mock` (англ. "мок") - это объект, который _имитирует поведение реального объекта и предоставляет специальные методы для проверки вызовов и параметров_, передаваемых в эти методы. Mock обычно используется, когда необходимо проверить, как объект взаимодействует с другими объектами, которые он использует.

Mock может имитировать различные объекты, такие как базы данных, файловые системы, сетевые соединения, а также другие объекты, которые сложно воссоздать в тестовой среде или которые могут повлиять на результаты тестирования.

`Mock` может быть реализован как самостоятельный объект или как часть другого объекта. Он может быть создан вручную или с помощью специальных инструментов.

Использование `Mock` в unit-тестировании позволяет проверять, как объект взаимодействует с другими объектами, и контролировать его поведение в тестовых условиях. Это позволяет улучшить качество и надежность программного обеспечения, а также ускорить процесс тестирования.

**Пример**

Представим, что у нас есть функциональный компонент `UserProfile`, который зависит от сервиса `UserService` для получения информации о пользователе. Сервис `UserService` имеет метод `getUserById`, который принимает на вход идентификатор пользователя и возвращает его данные.

Мы можем создать Mock объект `UserServiceMock`, который будет имитировать работу сервиса, и затем использовать его для проверки, как `UserProfile` взаимодействует с сервисом.

```jsx
const UserServiceMock = {
  getUserById: jest.fn((id) => ({ id: 1, name: "John" })),
};
```

Затем мы можем создать функциональный компонент `UserProfile`, который будет использовать этот Mock сервис.

```jsx
import React, { useState, useEffect } from "react";

const UserProfile = ({ userId, userService }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await userService.getUserById(userId);
      setUser(fetchedUser);
    };

    fetchUser();
  }, [userId, userService]);

  return (
    <div>
      {user ? (
        <div>
          <div>User ID: {user.id}</div>
          <div>User Name: {user.name}</div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
```

Теперь мы можем протестировать компонент `UserProfile` с использованием Mock сервиса `UserServiceMock`.

```jsx
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

test("fetches user data and displays it", async () => {
  render(<UserProfile userId={1} userService={UserServiceMock} />);

  // Проверяем, что метод getUserById был вызван с правильным аргументом
  expect(UserServiceMock.getUserById).toHaveBeenCalledWith(1);

  // Ждем, пока данные загрузятся и отобразятся
  const userIdElement = await screen.findByText(/User ID: 1/i);
  const userNameElement = await screen.findByText(/User Name: John/i);

  expect(userIdElement).toBeInTheDocument();
  expect(userNameElement).toBeInTheDocument();
});
```

Таким образом, использование Mock объекта позволяет нам проверять, как компонент взаимодействует с другими объектами, и контролировать его поведение в тестовых условиях.

---

[[007 Jest, RTL|Назад]]
