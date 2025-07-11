---
title: Модуль Net в Node.js и работа с TCP-соединениями
draft: false
tags:
  - "#NodeJS"
  - "#TCP"
  - "#сокеты"
  - "#сетевое_программирование"
  - "#серверы"
info:
---

Модуль `net` в Node.js - это встроенный низкоуровневый модуль, предоставляющий асинхронный сетевой API для создания TCP-серверов и клиентов. Этот модуль лежит в основе многих других сетевых модулей Node.js, включая `http`, `https` и `tls`.

## Основы модуля Net

Модуль `net` позволяет работать напрямую с TCP-протоколом, создавая серверы, принимающие соединения, и клиенты, устанавливающие соединения с серверами:

```javascript
const net = require("net")
```

## Создание TCP-сервера

Создание базового TCP-сервера выглядит следующим образом:

```javascript
const net = require("net")

// Создание сервера
const server = net.createServer((socket) => {
  console.log("Клиент подключился")

  // Обработка получаемых данных
  socket.on("data", (data) => {
    const message = data.toString()
    console.log(`Получено: ${message}`)

    // Отправка ответа клиенту
    socket.write(`Эхо: ${message}`)
  })

  // Обработка закрытия соединения
  socket.on("end", () => {
    console.log("Клиент отключился")
  })

  // Обработка ошибок соединения
  socket.on("error", (err) => {
    console.error("Ошибка соединения:", err)
  })
})

// Прослушивание порта
server.listen(3000, () => {
  console.log("Сервер запущен на порту 3000")
})
```

## Создание TCP-клиента

Подключение к TCP-серверу с помощью клиента:

```javascript
const net = require("net")

// Создание клиентского соединения
const client = net.createConnection({ port: 3000 }, () => {
  console.log("Подключено к серверу")

  // Отправка данных серверу
  client.write("Привет, сервер!")
})

// Получение данных от сервера
client.on("data", (data) => {
  console.log(data.toString())

  // Завершение соединения после получения ответа
  client.end()
})

// Обработка завершения соединения
client.on("end", () => {
  console.log("Отключено от сервера")
})

// Обработка ошибок
client.on("error", (err) => {
  console.error("Ошибка соединения:", err)
})
```

## Работа с потоками данных

TCP-соединения в Node.js представлены в виде потоков (streams), что позволяет эффективно передавать большие объемы данных:

```javascript
const net = require("net")
const fs = require("fs")

// Создание сервера для передачи файлов
const server = net.createServer((socket) => {
  socket.on("data", (data) => {
    const fileName = data.toString().trim()
    console.log(`Запрошен файл: ${fileName}`)

    // Проверка существования файла
    fs.access(fileName, fs.constants.F_OK, (err) => {
      if (err) {
        socket.write("Файл не найден")
        return
      }

      // Создание потока чтения и передача файла клиенту
      const fileStream = fs.createReadStream(fileName)
      fileStream.pipe(socket)

      fileStream.on("error", (err) => {
        console.error("Ошибка чтения файла:", err)
        socket.write("Ошибка чтения файла")
      })
    })
  })
})

server.listen(3000, () => {
  console.log("Файловый сервер запущен на порту 3000")
})
```

## Установка параметров соединения

Модуль `net` позволяет настраивать различные параметры соединений:

```javascript
const server = net.createServer()

// Установка тайм-аута для бездействующих соединений
server.on("connection", (socket) => {
  // Установка тайм-аута в 60 секунд
  socket.setTimeout(60000)

  // Обработка тайм-аута
  socket.on("timeout", () => {
    console.log("Соединение простаивает")
    socket.end("Соединение закрыто из-за бездействия")
  })

  // Отключение механизма Нагла для более быстрой отправки пакетов
  socket.setNoDelay(true)

  // Установка размера буфера сокета
  socket.setKeepAlive(true, 1000)
})

// Ограничение максимального количества соединений
server.maxConnections = 100

// Обработка достижения лимита соединений
server.on("connection", () => {
  const currentConnections = server.getConnections((err, count) => {
    if (!err) {
      console.log(`Текущее количество соединений: ${count}`)
    }
  })
})
```

## Работа с сокетами

Сокеты в `net` предоставляют ряд полезных свойств и методов:

```javascript
server.on("connection", (socket) => {
  // Получение информации о соединении
  console.log(`Новое соединение от ${socket.remoteAddress}:${socket.remotePort}`)

  // Отслеживание состояния сокета
  console.log(`Сокет открыт: ${!socket.destroyed}`)

  // Методы для управления соединением
  socket.pause() // Приостановка чтения данных
  socket.resume() // Возобновление чтения данных

  // Отправка данных в буфер
  socket.write("Данные", () => {
    console.log("Данные отправлены")
  })

  // Завершение записи, но продолжение чтения
  socket.end("Последние данные")

  // Полное закрытие соединения
  // socket.destroy()
})
```

## Создание сервера с поддержкой нескольких подключений

Пример сервера, который обслуживает несколько клиентов одновременно и передает сообщения между ними (простой чат):

```javascript
const net = require("net")

// Массив для хранения всех активных подключений
const sockets = []

const server = net.createServer((socket) => {
  // Добавление нового сокета в массив
  sockets.push(socket)

  // Отправка приветствия новому клиенту
  socket.write("Добро пожаловать в чат!\n")

  // Оповещение всех клиентов о новом подключении
  broadcast(`Новый пользователь подключился. Всего пользователей: ${sockets.length}\n`, socket)

  // Обработка сообщений
  socket.on("data", (data) => {
    const message = data.toString().trim()

    // Отправка сообщения всем, кроме отправителя
    broadcast(`${socket.remoteAddress}:${socket.remotePort} > ${message}\n`, socket)
  })

  // Обработка отключения
  socket.on("close", () => {
    // Удаление сокета из массива
    const index = sockets.indexOf(socket)
    if (index !== -1) {
      sockets.splice(index, 1)
    }

    broadcast(`Пользователь отключился. Всего пользователей: ${sockets.length}\n`, socket)
  })

  // Обработка ошибок
  socket.on("error", (err) => {
    console.error("Ошибка сокета:", err)
  })
})

// Функция для отправки сообщения всем клиентам, кроме отправителя
function broadcast(message, sender) {
  sockets.forEach((socket) => {
    // Проверка, что сокет не является отправителем и открыт
    if (socket !== sender && !socket.destroyed) {
      socket.write(message)
    }
  })
}

server.listen(3000, () => {
  console.log("Чат-сервер запущен на порту 3000")
})
```

## Работа с доменными сокетами (UNIX-сокеты)

На UNIX-системах модуль `net` также поддерживает работу с доменными сокетами:

```javascript
const net = require("net")
const path = require("path")

const socketPath = path.join(__dirname, "app.sock")

// Создание UNIX-сокет сервера
const server = net.createServer((socket) => {
  socket.on("data", (data) => {
    console.log(`Получено через UNIX-сокет: ${data}`)
    socket.write("Ответ через UNIX-сокет")
  })
})

// Прослушивание UNIX-сокета
server.listen(socketPath, () => {
  console.log(`Сервер прослушивает UNIX-сокет: ${socketPath}`)
})

// Подключение клиента к UNIX-сокету
const client = net.createConnection({ path: socketPath }, () => {
  console.log("Подключено к UNIX-сокету")
  client.write("Привет через UNIX-сокет")
})

client.on("data", (data) => {
  console.log(data.toString())
  client.end()
})
```

## Сравнение с другими сетевыми модулями Node.js

| Модуль         | Уровень абстракции | Использование                 |
| -------------- | ------------------ | ----------------------------- |
| `net`          | Низкий (TCP)       | Базовые TCP-серверы и клиенты |
| `http`/`https` | Высокий (HTTP)     | Веб-серверы и клиенты         |
| `tls`          | Низкий (SSL/TLS)   | Защищенные TCP-соединения     |
| `dgram`        | Низкий (UDP)       | Отправка датаграмм            |

## Преимущества использования модуля Net

1. **Низкоуровневый контроль** - полный доступ к TCP-функциям без дополнительных абстракций
2. **Высокая производительность** - минимальные накладные расходы по сравнению с более высокоуровневыми модулями
3. **Гибкость** - возможность реализации собственных протоколов поверх TCP
4. **Потоковая обработка данных** - эффективная передача больших объемов данных
5. **Масштабируемость** - поддержка множества одновременных соединений благодаря неблокирующему I/O

## Заключение

Модуль `net` в Node.js предоставляет мощный инструмент для работы с TCP-соединениями на низком уровне. Он является фундаментом для построения сетевых приложений и более высокоуровневых модулей, таких как HTTP и WebSockets. Понимание принципов работы модуля `net` дает разработчикам возможность создавать эффективные и гибкие сетевые решения с полным контролем над сетевыми взаимодействиями.

---

[[Назад]]
