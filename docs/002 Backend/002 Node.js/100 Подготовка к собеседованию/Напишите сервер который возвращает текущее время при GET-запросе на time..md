---
title: Напишите сервер который возвращает текущее время при GET-запросе на time
draft: false
tags:
  - "#NodeJS"
  - "#HTTP"
  - "#сервер"
  - "#маршрутизация"
  - "#API"
info:
  - "[Документация Node.js по http-модулю](https://nodejs.org/api/http.html)"
  - "[Создание HTTP-сервера в Node.js](https://nodejs.dev/learn/build-an-http-server)"
  - "[Форматирование даты и времени в JavaScript](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString)"
---

Вот пример простого HTTP-сервера на Node.js, который возвращает текущее время при GET-запросе на путь `/time`:

```javascript
const http = require("http")

const server = http.createServer((req, res) => {
  // Проверка маршрута и метода запроса
  if (req.method === "GET" && req.url === "/time") {
    // Получаем текущее время
    const currentTime = new Date().toLocaleString()

    // Отправляем ответ с текущим временем
    res.writeHead(200, { "Content-Type": "text/plain" })
    res.end(`Текущее время: ${currentTime}`)
  } else {
    // Если путь не совпадает, возвращаем 404
    res.writeHead(404, { "Content-Type": "text/plain" })
    res.end("Страница не найдена")
  }
})

// Запуск сервера на порту 3000
server.listen(3000, () => {
  console.log("Сервер запущен на порту 3000")
})
```

### Пояснение:

- Мы создаем сервер с помощью модуля `http`.
- В обработчике запросов проверяем, что метод запроса `GET` и путь равен `/time`.
- Если запрос соответствует этому условию, отправляем текущее время в формате строки с помощью `new Date().toLocaleString()`.
- Если запрос не соответствует этому маршруту, возвращаем ошибку 404.

### Запуск:

1. Сохраните код в файл, например `server.js`.
2. Запустите сервер командой:
   ```bash
   node server.js
   ```
3. Откройте браузер или используйте `curl`, чтобы получить текущее время:
   ```bash
   curl http://localhost:3000/time
   ```

Ответ будет, например:

```
Текущее время: 10/02/2025, 14:30:00
```

---

[[002 Node.js|Назад]]
