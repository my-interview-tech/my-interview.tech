---
uid: MqCuseF18WR3bjJrHSDcA
title: Что такое «опрос» (Polling)? Как его реализовать в React?
tags:
  - "#React"
  - "#polling"
info: []
draft: false
technology: ReactCore
specialty: Frontend
tools: []
order: 85
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

_Опрос (Polling)_ - это техника обновления данных в приложении, при которой приложение периодически отправляет запрос на сервер для получения новых данных. Это может быть полезно, когда данные в приложении могут часто изменяться и требуется отображать их в режиме реального времени.

_В React опрос можно реализовать с использованием `setInterval()`, который будет запускать функцию-обработчик каждый определенный интервал времени. В данном случае функция-обработчик будет отправлять запрос на сервер для получения новых данных и обновлять состояние компонента при получении ответа._

Пример реализации опроса (Polling) в React:

```jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

function Polling() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get("/api/data")
        .then((response) => setData(response.data))
        .catch((error) => console.log(error));
    }, 5000); // Опрос каждые 5 секунд

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>
          <p>{item.name}</p>
          <p>{item.value}</p>
        </div>
      ))}
    </div>
  );
}

export default Polling;
```

В данном примере мы используем хук `useEffect()` для запуска опроса при монтировании компонента и остановки опроса при размонтировании компонента. Функция `setInterval()` запускает опрос каждые 5 секунд и отправляет запрос на сервер при помощи библиотеки `axios`. После получения ответа мы обновляем состояние компонента при помощи функции `setData()`. Возвращаемое значение компонента - список данных, полученных с сервера, отображаемый в элементах `<div>`.

---

[[004 ReactCore|Назад]]
