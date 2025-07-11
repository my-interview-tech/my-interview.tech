---
title: Напишите код который читает файл и отправляет его содержимое в ответ HTTP-сервера через поток
draft: false
tags:
  - "#NodeJS"
  - "#HTTP"
  - "#fs"
  - "#потоки"
  - "#streams"
  - "#производительность"
info:
  - "[Документация Node.js по потокам](https://nodejs.org/api/stream.html)"
  - "[Документация по HTTP-модулю](https://nodejs.org/api/http.html)"
  - "[Работа с файловой системой в Node.js](https://nodejs.org/api/fs.html#fs_fs_createreadstream_path_options)"
---

Вот код HTTP-сервера на `Node.js`, который читает файл и отправляет его содержимое клиенту с использованием потоков:

```javascript
const http = require("http")
const fs = require("fs")

const server = http.createServer((req, res) => {
  if (req.url === "/file" && req.method === "GET") {
    const readStream = fs.createReadStream("example.txt")

    res.writeHead(200, { "Content-Type": "text/plain" })
    readStream.pipe(res)

    readStream.on("error", (err) => {
      res.writeHead(500)
      res.end("Ошибка при чтении файла")
    })
  } else {
    res.writeHead(404)
    res.end("Страница не найдена")
  }
})

server.listen(3000, () => {
  console.log("Сервер запущен на http://localhost:3000")
})
```

### **Как это работает**:

1. Сервер принимает HTTP-запросы.
2. Если запрос идет по пути `/file` и методом `GET`, создается поток `fs.createReadStream()`, который читает `example.txt`.
3. `pipe(res)` передает потоковые данные прямо в HTTP-ответ.
4. Если возникает ошибка при чтении, сервер возвращает `500 Internal Server Error`.

### **Преимущества подхода**:

- **Экономия памяти** – файл передается частями, не загружаясь полностью в память.
- **Производительность** – клиент получает данные быстрее, чем при использовании `fs.readFile()`.

---

[[002 Node.js|Назад]]
