---
title: Чем отличается ws от wss
draft: false
tags:
  - "#NodeJS"
  - "#WebSocket"
  - "#безопасность"
  - "#протоколы"
  - "#SSL"
  - "#TLS"
  - "#сеть"
info:
  - https://developer.mozilla.org/ru/docs/Web/API/WebSockets_API
  - https://nodejs.org/api/https.html
  - https://habr.com/ru/articles/726798/
---

# Отличие между протоколами ws и wss

**WebSocket** — это протокол связи поверх TCP-соединения, обеспечивающий полнодуплексный канал связи между клиентом и сервером. В зависимости от требований безопасности используются два основных варианта этого протокола: `ws` и `wss`.

## Основные отличия

### 1. Протокол `ws` (WebSocket)

- **Схема URL**: `ws://`
- **Порт по умолчанию**: 80 (как у HTTP)
- **Шифрование**: Отсутствует, данные передаются в открытом виде
- **Безопасность**: Подвержен атакам типа "человек посередине" (MITM)
- **Применение**: Локальная разработка, защищенные среды, некритичные данные

### 2. Протокол `wss` (WebSocket Secure)

- **Схема URL**: `wss://`
- **Порт по умолчанию**: 443 (как у HTTPS)
- **Шифрование**: Использует шифрование SSL/TLS поверх WebSocket
- **Безопасность**: Защищает от прослушивания и атак на целостность данных
- **Применение**: Продакшн-среды, публичные приложения, передача чувствительных данных

## Сравнительная таблица

| Характеристика            | **ws** (WebSocket)           | **wss** (WebSocket Secure)                |
| ------------------------- | ---------------------------- | ----------------------------------------- |
| **Схема URL**             | ws://                        | wss://                                    |
| **Шифрование**            | Нет                          | Да (SSL/TLS)                              |
| **Порт по умолчанию**     | 80                           | 443                                       |
| **Перехват данных**       | Возможен                     | Защищено шифрованием                      |
| **Подтверждение сервера** | Нет                          | Проверка SSL-сертификата                  |
| **Прокси-серверы**        | Могут блокировать соединение | Лучше проходят через прокси-серверы       |
| **Производительность**    | Немного быстрее              | Небольшие накладные расходы на шифрование |

## Примеры использования в браузере

### Подключение с использованием `ws`

```javascript
const socket = new WebSocket("ws://example.com/socket")

socket.onopen = function (event) {
  console.log("Соединение установлено")
  socket.send("Привет, сервер!")
}

socket.onmessage = function (event) {
  console.log("Получены данные: " + event.data)
}

socket.onclose = function (event) {
  console.log("Соединение закрыто")
}
```

### Подключение с использованием `wss`

```javascript
const secureSocket = new WebSocket("wss://example.com/socket")

secureSocket.onopen = function (event) {
  console.log("Защищенное соединение установлено")
  secureSocket.send("Привет, сервер! Данные зашифрованы.")
}

secureSocket.onmessage = function (event) {
  console.log("Получены защищенные данные: " + event.data)
}

secureSocket.onclose = function (event) {
  console.log("Защищенное соединение закрыто")
}
```

## Реализация WebSocket-сервера в Node.js

### Создание незащищенного WebSocket-сервера (ws)

```javascript
const WebSocket = require("ws")

// Создаем WebSocket-сервер на порту 8080
const wss = new WebSocket.Server({ port: 8080 })

// Обработка событий соединения
wss.on("connection", function connection(ws) {
  console.log("Новое соединение установлено")

  // Обработка входящих сообщений
  ws.on("message", function incoming(message) {
    console.log("Получено сообщение: %s", message)

    // Отправка ответа клиенту
    ws.send("Сервер получил ваше сообщение: " + message)
  })

  // Отправка приветственного сообщения
  ws.send("Добро пожаловать на незащищенный WebSocket-сервер!")
})

console.log("WebSocket-сервер запущен на ws://localhost:8080")
```

### Создание защищенного WebSocket-сервера (wss)

```javascript
const https = require("https")
const WebSocket = require("ws")
const fs = require("fs")

// Опции для HTTPS-сервера с SSL/TLS
const options = {
  cert: fs.readFileSync("/path/to/cert.pem"),
  key: fs.readFileSync("/path/to/key.pem"),
}

// Создаем HTTPS-сервер
const server = https.createServer(options)

// Создаем WebSocket-сервер поверх HTTPS
const wss = new WebSocket.Server({ server })

// Обработка событий соединения
wss.on("connection", function connection(ws) {
  console.log("Новое защищенное соединение установлено")

  ws.on("message", function incoming(message) {
    console.log("Получено защищенное сообщение: %s", message)
    ws.send("Сервер безопасно получил ваше сообщение: " + message)
  })

  ws.send("Добро пожаловать на защищенный WebSocket-сервер!")
})

// Запускаем HTTPS-сервер на порту 8443
server.listen(8443, () => {
  console.log("Защищенный WebSocket-сервер запущен на wss://localhost:8443")
})
```

## Практические рекомендации

1. **Для разработки**: Во время локальной разработки часто используется `ws` для удобства и скорости.

2. **Для продакшн-среды**: Всегда используйте `wss` для приложений, доступных из интернета.

3. **Прокси и промежуточное ПО**: `wss` лучше проходит через прокси-серверы и межсетевые экраны.

4. **Mixed Content**: Современные браузеры блокируют незащищенные `ws`-соединения со страниц, загруженных через HTTPS.

5. **Бесплатные SSL-сертификаты**: Используйте Let's Encrypt для получения бесплатных SSL-сертификатов.

6. **Best Practice**: В современной веб-разработке рекомендуется всегда использовать `wss` даже для некритичных данных.

WebSocket является мощной технологией для реализации двунаправленной связи в реальном времени, а использование `wss` обеспечивает необходимый уровень безопасности для большинства веб-приложений.

---

[[003 JSCore|Назад]]
