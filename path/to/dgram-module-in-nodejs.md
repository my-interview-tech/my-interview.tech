---
title: Модуль Dgram в Node.js и работа с UDP-сокетами
draft: false
tags:
  - "#NodeJS"
  - "#UDP"
  - "#сокеты"
  - "#сетевое_программирование"
  - "#датаграммы"
info:
---

Модуль `dgram` в Node.js - это встроенный низкоуровневый модуль для работы с UDP (User Datagram Protocol) сокетами. Он предоставляет возможность создавать UDP-серверы и клиенты для обмена данными по сети без установления соединения.

## Введение в UDP и модуль dgram

UDP - это транспортный протокол, который, в отличие от TCP, не требует установления соединения и не гарантирует доставку пакетов. Это делает его более быстрым, но менее надежным вариантом для сетевого взаимодействия.

Основные характеристики UDP:

- Отсутствие установки соединения (connectionless)
- Отсутствие гарантии доставки пакетов
- Отсутствие подтверждения получения
- Отсутствие контроля потока
- Минимальные накладные расходы

Подключение модуля dgram в Node.js:

```javascript
const dgram = require("dgram")
```

## Создание UDP-сокета

В Node.js можно создать UDP-сокет двух типов: IPv4 ('udp4') или IPv6 ('udp6'):

```javascript
// Создание IPv4 UDP сокета
const socket = dgram.createSocket("udp4")

// Создание IPv6 UDP сокета
const socket6 = dgram.createSocket("udp6")

// Создание сокета с дополнительными опциями и обработчиком событий
const socketWithOptions = dgram.createSocket(
  {
    type: "udp4",
    reuseAddr: true, // Позволяет повторно использовать адрес
  },
  (msg, rinfo) => {
    console.log(`Получено сообщение: ${msg} от ${rinfo.address}:${rinfo.port}`)
  },
)
```

## Основные события UDP-сокета

### Событие 'message'

Возникает при получении нового UDP-пакета:

```javascript
socket.on("message", (msg, rinfo) => {
  console.log(`Сервер получил: ${msg} от ${rinfo.address}:${rinfo.port}`)
})
```

### Событие 'listening'

Возникает, когда сокет начинает прослушивание датаграмм:

```javascript
socket.on("listening", () => {
  const address = socket.address()
  console.log(`Сервер слушает ${address.address}:${address.port}`)
})
```

### Событие 'error'

Возникает при ошибке:

```javascript
socket.on("error", (err) => {
  console.error(`Ошибка сервера: ${err.stack}`)
  socket.close()
})
```

### Событие 'close'

Возникает после закрытия сокета:

```javascript
socket.on("close", () => {
  console.log("Сокет закрыт")
})
```

## Создание UDP-сервера

Пример простого эхо-сервера UDP:

```javascript
const dgram = require("dgram")
const server = dgram.createSocket("udp4")

server.on("error", (err) => {
  console.error(`Ошибка сервера: ${err.stack}`)
  server.close()
})

server.on("message", (msg, rinfo) => {
  console.log(`Сервер получил: ${msg} от ${rinfo.address}:${rinfo.port}`)

  // Отправка эхо-ответа
  server.send(msg, rinfo.port, rinfo.address, (err) => {
    if (err) {
      console.error("Ошибка отправки:", err)
    } else {
      console.log(`Эхо-ответ отправлен на ${rinfo.address}:${rinfo.port}`)
    }
  })
})

server.on("listening", () => {
  const address = server.address()
  console.log(`Сервер слушает ${address.address}:${address.port}`)
})

// Начинаем слушать на порту 41234
server.bind(41234)
```

## Создание UDP-клиента

Пример UDP-клиента, отправляющего сообщение серверу:

```javascript
const dgram = require("dgram")
const client = dgram.createSocket("udp4")

const message = Buffer.from("Привет, сервер!")

client.on("message", (msg, rinfo) => {
  console.log(`Клиент получил: ${msg} от ${rinfo.address}:${rinfo.port}`)
  client.close()
})

// Отправка сообщения серверу
client.send(message, 41234, "localhost", (err) => {
  if (err) {
    console.error("Ошибка отправки:", err)
    client.close()
  } else {
    console.log("Сообщение отправлено серверу")
  }
})
```

## Отправка и получение данных

### Метод send()

Метод `send()` используется для отправки UDP-датаграммы на указанный хост и порт:

```javascript
/**
 * socket.send(msg, [offset, length,] port, address, [callback])
 *
 * msg - Buffer или строка для отправки
 * offset - начало буфера для отправки (опционально)
 * length - количество байт для отправки (опционально)
 * port - порт назначения
 * address - адрес или имя хоста назначения
 * callback - функция обратного вызова после отправки (опционально)
 */

// Отправка строки
socket.send("Привет", 41234, "localhost", (err) => {
  if (err) console.error(err)
})

// Отправка буфера с указанием смещения и длины
const buffer = Buffer.from("Большое сообщение")
socket.send(buffer, 3, 5, 41234, "localhost", (err) => {
  if (err) console.error(err)
  // Отправит только "ьшое"
})
```

### Широковещательная рассылка

UDP поддерживает широковещательные сообщения, которые позволяют отправлять данные всем устройствам в сети:

```javascript
const dgram = require("dgram")
const socket = dgram.createSocket("udp4")

// Разрешаем широковещательные сообщения
socket.setBroadcast(true)

const message = Buffer.from("Широковещательное сообщение")

// Отправка на широковещательный адрес
socket.send(message, 0, message.length, 41234, "255.255.255.255", (err) => {
  if (err) console.error(err)
  socket.close()
})
```

### Мультикаст группы

UDP также поддерживает мультикаст группы для отправки сообщений подгруппе получателей:

```javascript
const dgram = require("dgram")

// Мультикаст-сервер
function createMulticastServer() {
  const server = dgram.createSocket({ type: "udp4", reuseAddr: true })

  server.on("message", (msg, rinfo) => {
    console.log(`Сервер получил: ${msg} от ${rinfo.address}:${rinfo.port}`)
  })

  server.on("listening", () => {
    console.log(`Сервер слушает ${server.address().address}:${server.address().port}`)

    // Присоединяемся к группе мультикаста
    server.addMembership("224.0.0.114")
  })

  server.bind(41234)
  return server
}

// Мультикаст-клиент
function createMulticastClient() {
  const client = dgram.createSocket("udp4")

  const message = Buffer.from("Мультикаст сообщение")

  // Отправка на мультикаст-адрес
  client.send(message, 0, message.length, 41234, "224.0.0.114", (err) => {
    if (err) console.error(err)
    client.close()
  })

  return client
}

// Создаем сервер и клиент
const server = createMulticastServer()

// Отправляем сообщение через 1 секунду, чтобы сервер успел начать слушать
setTimeout(() => {
  createMulticastClient()
}, 1000)
```

## Практические примеры использования

### Простая система мониторинга сети

UDP часто используется для быстрой передачи статистики и метрик:

```javascript
// Сервер мониторинга
const dgram = require("dgram")
const server = dgram.createSocket("udp4")

// Хранилище данных
const metrics = {}

server.on("message", (msg, rinfo) => {
  try {
    const data = JSON.parse(msg.toString())
    const clientId = `${rinfo.address}:${rinfo.port}`

    // Сохраняем метрики с временной меткой
    metrics[clientId] = {
      ...data,
      lastSeen: new Date().toISOString(),
    }

    console.log(`Обновлены метрики для ${clientId}:`, metrics[clientId])
  } catch (err) {
    console.error("Ошибка обработки сообщения:", err)
  }
})

server.on("listening", () => {
  console.log(`Сервер мониторинга запущен на порту ${server.address().port}`)
})

server.bind(41234)

// Клиент мониторинга
const client = dgram.createSocket("udp4")

// Отправка метрик каждые 5 секунд
setInterval(() => {
  const metrics = {
    cpu: Math.round(Math.random() * 100),
    memory: Math.round(Math.random() * 1024),
    timestamp: Date.now(),
  }

  const message = Buffer.from(JSON.stringify(metrics))

  client.send(message, 41234, "localhost", (err) => {
    if (err) console.error("Ошибка отправки метрик:", err)
  })
}, 5000)
```

### Система обнаружения сервисов

UDP хорошо подходит для систем обнаружения сервисов в локальной сети:

```javascript
const dgram = require("dgram")

// Сервис, анонсирующий себя
function startService(serviceName, servicePort) {
  const socket = dgram.createSocket("udp4")

  // Разрешаем широковещательные сообщения
  socket.setBroadcast(true)

  // Отправляем анонс каждые 10 секунд
  setInterval(() => {
    const announcement = {
      type: "service-announcement",
      name: serviceName,
      port: servicePort,
      timestamp: Date.now(),
    }

    const message = Buffer.from(JSON.stringify(announcement))

    socket.send(message, 0, message.length, 41234, "255.255.255.255", (err) => {
      if (err) console.error(`Ошибка анонса сервиса ${serviceName}:`, err)
    })
  }, 10000)

  return socket
}

// Обнаружение сервисов
function discoverServices() {
  const socket = dgram.createSocket("udp4")

  // Хранилище обнаруженных сервисов
  const services = {}

  socket.on("message", (msg, rinfo) => {
    try {
      const data = JSON.parse(msg.toString())

      if (data.type === "service-announcement") {
        // Обновляем информацию о сервисе
        services[data.name] = {
          host: rinfo.address,
          port: data.port,
          lastSeen: new Date().toISOString(),
        }

        console.log(`Обнаружен сервис: ${data.name} на ${rinfo.address}:${data.port}`)
      }
    } catch (err) {
      console.error("Ошибка обработки анонса:", err)
    }
  })

  socket.on("listening", () => {
    socket.setBroadcast(true)
    console.log(`Обнаружение сервисов запущено на порту ${socket.address().port}`)
  })

  // Функция для получения списка активных сервисов
  function getActiveServices() {
    const now = Date.now()
    const active = {}

    // Считаем сервис активным, если анонс был получен в течение последних 30 секунд
    for (const [name, info] of Object.entries(services)) {
      const lastSeen = new Date(info.lastSeen).getTime()
      if (now - lastSeen < 30000) {
        active[name] = info
      }
    }

    return active
  }

  socket.bind(41234)

  return {
    socket,
    getActiveServices,
  }
}

// Пример использования
const serviceA = startService("serviceA", 3000)
const serviceB = startService("serviceB", 3001)

const discovery = discoverServices()

// Периодически выводим список активных сервисов
setInterval(() => {
  const activeServices = discovery.getActiveServices()
  console.log("Активные сервисы:", activeServices)
}, 15000)
```

## Преимущества и недостатки использования UDP

### Преимущества UDP:

1. **Скорость** - отсутствие накладных расходов на установление соединения и подтверждение доставки
2. **Низкая задержка** - подходит для приложений реального времени
3. **Простота** - минималистичный протокол с небольшими заголовками
4. **Поддержка широковещательной и мультикаст передачи**
5. **Меньшая нагрузка на сеть** - нет необходимости в подтверждениях и повторных отправках

### Недостатки UDP:

1. **Ненадежность** - пакеты могут теряться без уведомления
2. **Отсутствие контроля потока** - возможно перегрузить получателя
3. **Отсутствие упорядочивания пакетов** - пакеты могут приходить в произвольном порядке
4. **Ограничение размера** - размер датаграммы ограничен (обычно до 65,507 байт)
5. **Проблемы с брандмауэрами** - многие брандмауэры блокируют UDP-трафик

## Типичные сценарии использования UDP

1. **Потоковое медиа (видео/аудио)** - для передачи мультимедиа в реальном времени
2. **Онлайн-игры** - для быстрой передачи обновлений состояния
3. **DNS-запросы** - для разрешения доменных имен
4. **VoIP** - для передачи голосовых данных
5. **Мониторинг и сбор метрик** - для сбора статистики с минимальными накладными расходами
6. **Системы обнаружения сервисов** - для поиска сервисов в локальной сети
7. **Протоколы, реализующие собственную надежность поверх UDP** - когда требуется контроль над аспектами надежности

## Заключение

Модуль `dgram` в Node.js предоставляет мощный инструмент для работы с UDP-протоколом, позволяя создавать высокопроизводительные сетевые приложения. Хотя UDP не гарантирует доставку и порядок следования пакетов, он обеспечивает низкую задержку и высокую скорость передачи данных, что делает его идеальным для определенных типов приложений.

При выборе между UDP и TCP необходимо учитывать требования вашего приложения: если важнее скорость и минимальная задержка, выбирайте UDP; если важнее надежность и гарантированная доставка данных, используйте TCP.

---

[[Назад]]
