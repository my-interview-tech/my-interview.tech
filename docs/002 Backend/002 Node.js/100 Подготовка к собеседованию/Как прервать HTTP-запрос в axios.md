---
title: Как прервать HTTP-запрос в axios
draft: false
tags:
  - "#NodeJS"
  - "#axios"
  - "#HTTP"
  - "#запросы"
  - "#отмена-запроса"
  - "#CancelToken"
info:
  - "[Документация Axios по отмене запросов](https://axios-http.com/docs/cancellation)"
  - "[GitHub репозиторий Axios](https://github.com/axios/axios)"
  - "[Работа с HTTP-запросами в Node.js](https://nodejs.dev/learn/making-http-requests-with-nodejs)"
---

В **Axios** вы можете прервать HTTP-запрос с помощью **CancelToken**. Это позволяет создать токен отмены и передать его в запрос. Когда вы хотите отменить запрос, вызываете метод `cancel()` для токена отмены.

Вот пример, как это сделать:

### Пример отмены запроса:

```javascript
const axios = require("axios")

// Создаем токен отмены
const CancelToken = axios.CancelToken
let cancel

// Отправляем GET-запрос с токеном отмены
axios
  .get("https://api.example.com/data", {
    cancelToken: new CancelToken(function executor(c) {
      cancel = c // Сохраняем функцию отмены
    }),
  })
  .then((response) => {
    console.log(response.data)
  })
  .catch((error) => {
    if (axios.isCancel(error)) {
      console.log("Запрос был отменен:", error.message)
    } else {
      console.error("Ошибка запроса:", error)
    }
  })

// Прерываем запрос через 2 секунды
setTimeout(() => {
  cancel("Запрос отменен пользователем")
}, 2000)
```

### Объяснение:

1. **CancelToken**: Это механизм, который позволяет отменить запрос.
2. **executor**: Это функция, которая принимает функцию `c`, которую мы используем как `cancel`. Она будет вызываться для отмены запроса.
3. **cancel('Сообщение')**: Вызываем функцию отмены, чтобы прекратить выполнение запроса, передав сообщение, которое будет доступно в ошибке.
4. **axios.isCancel(error)**: Мы проверяем, является ли ошибка отменой запроса, чтобы корректно обработать её.

### Когда запрос будет отменен:

- Если запрос не завершился до момента вызова `cancel()`, то он будет отменен.
- В случае отмены запроса в ошибке будет содержаться сообщение, которое вы передали в `cancel()`.

Этот подход позволяет удобно управлять временем жизни запросов, отменяя их при необходимости.

---

[[002 Node.js|Назад]]
