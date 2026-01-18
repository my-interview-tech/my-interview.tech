---
uid: EJ8cGKwN-CjIXJ8V6FrB3
title: Что такое AbortController() ?
tags:
  - React
  - AbortController
  - async
  - fetch
info:
  - "https://habr.com/ru/articles/588799/"
  - >-
    https://vc.ru/dev/674490-abortcontroller-varianty-primeneniya-dlya-effektivnogo-upravleniya-asinhronnymi-operaciyami
  - "https://www.youtube.com/watch?v=RKSNE23lNi4"
draft: false
technology: ReactCore
specialty: Frontend
tools: []
order: 44
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

**AbortController** используется _для отмены или прерывания асинхронных операций, таких как запросы к серверу, чтобы избежать утечки ресурсов и обновлять компоненты только в тех случаях, когда операция все еще актуальна._

Вот пример, как можно использовать AbortController в React:

```js
import React, { useEffect, useState } from "react";

const MyComponent = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const abortController = new AbortController();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.example.com/data", {
          signal: abortController.signal, // Передаем сигнал отмены в запрос
        });
        const jsonData = await response.json();
        setData(jsonData);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    return () => {
      // При размонтировании компонента отменяем запрос
      abortController.abort();
    };
  }, []); // Пустой массив зависимостей, чтобы useEffect вызывался только при монтировании компонента

  if (loading) {
    return <div>Loading...</div>;
  }

  return <div>{data}</div>;
};

export default MyComponent;
```

В этом примере мы создаем экземпляр AbortController и передаем его сигнал отмены в запрос с помощью свойства `signal`. Затем мы используем сигнал отмены для отмены запроса при размонтировании компонента с помощью `abortController.abort()`. Это позволяет избежать обновления компонента с данными, которые уже не актуальны или не нужны.

Обратите внимание, что AbortController поддерживается в современных браузерах, но не является частью стандарта JavaScript. Если вы планируете использовать его в проекте, убедитесь, что ваш целевой браузер поддерживает AbortController или рассмотрите использование полифила или другого подходящего решения для отмены асинхронных операций.

---

[[004 ReactCore|Назад]]
