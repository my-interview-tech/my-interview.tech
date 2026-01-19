---
title: Модуль Cluster в Node.js и масштабирование приложений
draft: false
tags:
  - "#NodeJS"
  - "#cluster"
  - "#масштабирование"
  - "#многоядерность"
  - "#балансировка"
info:
---

Модуль Cluster в Node.js - это встроенный инструмент, который позволяет создавать многопроцессные приложения для эффективного использования многоядерных систем. По умолчанию Node.js работает в однопоточном режиме, что ограничивает его способность использовать все доступные ядра процессора.

## Принцип работы модуля Cluster

Модуль Cluster использует механизм `child_process`, позволяя создать основной (master) процесс, который затем порождает несколько рабочих (worker) процессов. Все эти процессы могут совместно использовать один и тот же серверный порт.

```javascript
const cluster = require("cluster")
const http = require("http")
const numCPUs = require("os").cpus().length

if (cluster.isPrimary) {
  console.log(`Главный процесс ${process.pid} запущен`)

  // Создаем рабочий процесс для каждого ядра
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Рабочий процесс ${worker.process.pid} завершился`)
    // При необходимости можно запустить новый воркер
    cluster.fork()
  })
} else {
  // Рабочие процессы создают HTTP-сервер
  http
    .createServer((req, res) => {
      res.writeHead(200)
      res.end(`Привет от процесса ${process.pid}\n`)
    })
    .listen(8000)

  console.log(`Рабочий процесс ${process.pid} запущен`)
}
```

## Методы балансировки нагрузки

Node.js предлагает два механизма распределения входящих соединений:

### 1. Round-Robin (по умолчанию, кроме Windows)

```javascript
if (cluster.isPrimary) {
  cluster.schedulingPolicy = cluster.SCHED_RR
  // Дальнейший код...
}
```

При этом подходе соединения равномерно распределяются между рабочими процессами по очереди.

### 2. Случайное распределение (по умолчанию в Windows)

```javascript
if (cluster.isPrimary) {
  cluster.schedulingPolicy = cluster.SCHED_NONE
  // Дальнейший код...
}
```

При этом подходе соединения назначаются случайному рабочему процессу.

## Коммуникация между процессами

Рабочие процессы и главный процесс могут обмениваться сообщениями:

```javascript
if (cluster.isPrimary) {
  const worker = cluster.fork()

  // Отправка сообщения от главного процесса к рабочему
  worker.send({ cmd: "config", settings: { port: 8000 } })

  // Получение сообщений от рабочих процессов
  worker.on("message", (msg) => {
    console.log(`Сообщение от рабочего процесса:`, msg)
  })
} else {
  // Получение сообщений от главного процесса
  process.on("message", (msg) => {
    if (msg.cmd === "config") {
      // Настройка рабочего процесса
      console.log(`Получены настройки:`, msg.settings)
    }
  })

  // Отправка сообщения главному процессу
  process.send({ status: "ready", pid: process.pid })
}
```

## Обработка ошибок и перезапуск процессов

Одно из преимуществ кластеризации - возможность обеспечить отказоустойчивость приложения путем перезапуска упавших процессов:

```javascript
if (cluster.isPrimary) {
  console.log(`Главный процесс ${process.pid} запущен`)

  // Создание рабочих процессов
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }

  // Обработка завершения рабочего процесса
  cluster.on("exit", (worker, code, signal) => {
    if (code !== 0) {
      console.log(`Рабочий процесс ${worker.process.pid} упал. Перезапуск...`)
      cluster.fork()
    } else {
      console.log(`Рабочий процесс ${worker.process.pid} завершился штатно`)
    }
  })

  // Обработка сигналов завершения для корректного закрытия
  process.on("SIGTERM", () => {
    console.log("Завершение главного процесса")
    for (const id in cluster.workers) {
      cluster.workers[id].kill()
    }
    process.exit(0)
  })
} else {
  // Код рабочего процесса
}
```

## Sticky-сессии

Для некоторых приложений важно, чтобы запросы от одного клиента всегда обрабатывались одним и тем же рабочим процессом (например, для работы с сессиями без внешнего хранилища):

```javascript
const crypto = require("crypto")

if (cluster.isPrimary) {
  // Хранение соответствия id -> worker
  const workerMap = {}

  // Прослушивание событий соединения для маршрутизации
  const server = net.createServer({ pauseOnConnect: true }, (connection) => {
    // Получаем уникальный идентификатор соединения
    const remoteAddress = connection.remoteAddress + ":" + connection.remotePort
    const hash = crypto.createHash("md5").update(remoteAddress).digest("hex")
    const workerIndex = parseInt(hash, 16) % numCPUs

    // Получаем или создаем рабочий процесс
    let worker = workerMap[workerIndex]
    if (!worker) {
      worker = cluster.fork()
      workerMap[workerIndex] = worker
    }

    // Отправляем соединение рабочему процессу
    worker.send("connection", connection)
  })

  server.listen(8000)
} else {
  // Рабочие процессы получают соединения от главного
  process.on("message", (msg, connection) => {
    if (msg === "connection") {
      // Обработка соединения
      connection.resume()
      // Дальнейший код обработки...
    }
  })
}
```

## Общая память и состояние

Поскольку рабочие процессы запускаются в разных процессах, они не разделяют общую память. Для обмена данными можно использовать:

1. **Механизм обмена сообщениями**, как показано выше
2. **Внешние хранилища данных** (Redis, MongoDB и т.д.)
3. **Файловую систему** для простых случаев

```javascript
// Пример использования Redis для общего состояния
const cluster = require("cluster")
const http = require("http")
const Redis = require("ioredis")

if (cluster.isPrimary) {
  // Код главного процесса...
} else {
  const redis = new Redis()
  const app = require("express")()

  app.get("/counter", async (req, res) => {
    // Увеличиваем общий счетчик в Redis
    const count = await redis.incr("counter")
    res.send(`Счетчик: ${count} (процесс ${process.pid})`)
  })

  app.listen(3000)
}
```

## Альтернативы встроенному модулю Cluster

### PM2

Менеджер процессов PM2 предоставляет упрощенный интерфейс для кластеризации:

```javascript
// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: "app",
      script: "app.js",
      instances: "max", // использовать все доступные CPU
      exec_mode: "cluster",
      watch: true,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
}
```

Запуск:

```bash
pm2 start ecosystem.config.js
```

### Worker Threads

Для CPU-интенсивных задач, которые не требуют отдельного HTTP-сервера, можно использовать модуль `worker_threads`:

```javascript
const { Worker, isMainThread, parentPort, workerData } = require("worker_threads")

if (isMainThread) {
  // Код главного потока
  const worker = new Worker(__filename, {
    workerData: { dataToProcess: /* ... */ }
  })

  worker.on("message", (result) => {
    console.log("Результат обработки:", result)
  })
} else {
  // Код рабочего потока
  const result = processData(workerData.dataToProcess)
  parentPort.postMessage(result)
}
```

## Заключение

Модуль Cluster в Node.js является мощным инструментом для масштабирования приложений на многоядерных системах. Он обеспечивает:

1. **Повышение производительности** - использование всех ядер процессора
2. **Отказоустойчивость** - автоматический перезапуск упавших процессов
3. **Равномерное распределение нагрузки** - балансировка входящих соединений

При проектировании масштабируемых Node.js-приложений следует учитывать ограничения кластеризации, такие как отсутствие общей памяти между процессами, и выбирать подходящие стратегии для обмена данными и состоянием.

---

[[Назад]]
