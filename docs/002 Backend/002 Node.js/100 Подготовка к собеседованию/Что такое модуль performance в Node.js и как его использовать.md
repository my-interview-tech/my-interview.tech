---
title: Что такое модуль performance в Node.js и как его использовать
draft: false
tags:
  - "#NodeJS"
  - "#performance"
  - "#измерение_производительности"
  - "#профилирование"
  - "#оптимизация"
info:
  - "[Документация Node.js - perf_hooks](https://nodejs.org/api/perf_hooks.html)"
  - "[Node.js Performance Timing API](https://nodejs.org/api/perf_hooks.html#performance-measurement-apis)"
---

![[node-performance.png|600]]

## Что такое модуль performance в Node.js

Модуль `perf_hooks` (также известный как Performance API) в Node.js предоставляет механизмы для измерения производительности приложений. Он был добавлен в Node.js версии 8.5.0 и основан на Web Performance API, что делает его знакомым для разработчиков, имеющих опыт работы с браузерными приложениями.

Основное назначение модуля - предоставить точные и высокопроизводительные средства для измерения времени выполнения операций, отслеживания событий и анализа производительности кода. Эти инструменты позволяют выявлять узкие места в приложениях и принимать обоснованные решения при оптимизации.

## Основные концепции и компоненты

### 1. Performance Timing API

В основе модуля лежит объект `performance`, который предоставляет методы для измерения времени:

```javascript
const { performance } = require("perf_hooks")

// Получение текущего времени с высокой точностью
const start = performance.now()

// Выполнение операции
for (let i = 0; i < 1000000; i++) {
  // Какие-то вычисления
}

const end = performance.now()
console.log(`Операция заняла ${end - start} миллисекунд`)
```

### 2. Performance Marks и Measures

API меток (marks) и измерений (measures) позволяет создавать именованные временные метки и измерять интервалы между ними:

```javascript
const { performance } = require("perf_hooks")

// Установка меток
performance.mark("начало-операции")

// Выполнение операции
let sum = 0
for (let i = 0; i < 10000000; i++) {
  sum += i
}

performance.mark("конец-операции")

// Создание измерения между метками
performance.measure("длительность-операции", "начало-операции", "конец-операции")

// Получение всех измерений
const measurements = performance.getEntriesByType("measure")
console.log(measurements)

// Очистка меток и измерений
performance.clearMarks()
performance.clearMeasures()
```

### 3. Performance Observer

Performance Observer позволяет асинхронно наблюдать за событиями производительности:

```javascript
const { PerformanceObserver, performance } = require("perf_hooks")

// Создание наблюдателя для измерений
const obs = new PerformanceObserver((items) => {
  const measurements = items.getEntries()
  console.log(measurements)

  // Отключение наблюдателя после получения данных
  obs.disconnect()
})

// Указание типов событий для наблюдения
obs.observe({ entryTypes: ["measure"] })

// Установка меток и измерений
performance.mark("начало")
// Выполнение операций
setTimeout(() => {
  performance.mark("конец")
  performance.measure("асинхронная-операция", "начало", "конец")
}, 1000)
```

## Практические примеры использования

### 1. Сравнение производительности различных подходов

```javascript
const { performance } = require("perf_hooks")

// Функция для измерения времени выполнения функции
function benchmark(fn, name, iterations = 100000) {
  performance.mark(`start-${name}`)

  for (let i = 0; i < iterations; i++) {
    fn()
  }

  performance.mark(`end-${name}`)
  performance.measure(name, `start-${name}`, `end-${name}`)

  const measurement = performance.getEntriesByName(name)[0]
  console.log(`${name}: ${measurement.duration.toFixed(3)} мс`)

  // Очистка меток и измерений
  performance.clearMarks()
  performance.clearMeasures()
}

// Примеры функций для сравнения
function usingConcat() {
  const arr = [1, 2, 3]
  return [0].concat(arr)
}

function usingSpread() {
  const arr = [1, 2, 3]
  return [0, ...arr]
}

function usingPush() {
  const arr = [1, 2, 3]
  const result = [0]
  for (const item of arr) {
    result.push(item)
  }
  return result
}

// Измерение производительности
console.log("Сравнение методов добавления элементов в массив:")
benchmark(usingConcat, "Array.concat")
benchmark(usingSpread, "Spread оператор")
benchmark(usingPush, "Array.push в цикле")
```

### 2. Профилирование асинхронных операций

```javascript
const { performance, PerformanceObserver } = require("perf_hooks")
const fs = require("fs")

// Настройка наблюдателя
const obs = new PerformanceObserver((items) => {
  const entries = items.getEntries()
  for (const entry of entries) {
    console.log(`${entry.name}: ${entry.duration.toFixed(2)} мс`)
  }
})
obs.observe({ entryTypes: ["measure"], buffered: true })

// Асинхронная функция для тестирования
async function readFiles() {
  performance.mark("start-read")

  const files = ["file1.txt", "file2.txt", "file3.txt"]
  const promises = files.map(async (file) => {
    performance.mark(`start-read-${file}`)

    try {
      // Симуляция чтения файла с разной задержкой
      await new Promise((resolve) => setTimeout(resolve, Math.random() * 100))
      performance.mark(`end-read-${file}`)
      performance.measure(`Чтение ${file}`, `start-read-${file}`, `end-read-${file}`)
      return `Содержимое ${file}`
    } catch (err) {
      performance.mark(`end-read-${file}-error`)
      performance.measure(`Ошибка чтения ${file}`, `start-read-${file}`, `end-read-${file}-error`)
      throw err
    }
  })

  const results = await Promise.all(promises)

  performance.mark("end-read")
  performance.measure("Общее время чтения файлов", "start-read", "end-read")

  return results
}

// Запуск тестирования
readFiles()
  .then((results) => console.log("Готово!"))
  .catch((err) => console.error("Ошибка:", err))
```

### 3. Измерение производительности HTTP запросов

```javascript
const { performance, PerformanceObserver } = require("perf_hooks")
const http = require("http")

// Создание наблюдателя
const obs = new PerformanceObserver((items) => {
  const entries = items.getEntries()
  for (const entry of entries) {
    console.log(`${entry.name}: ${entry.duration.toFixed(2)} мс`)
  }
})
obs.observe({ entryTypes: ["measure"] })

// Функция для выполнения HTTP запроса с измерением времени
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url)

    performance.mark(`start-${urlObj.hostname}`)

    const req = http.get(url, (res) => {
      let data = ""

      res.on("data", (chunk) => {
        data += chunk
      })

      res.on("end", () => {
        performance.mark(`end-${urlObj.hostname}`)
        performance.measure(
          `Запрос к ${urlObj.hostname}`,
          `start-${urlObj.hostname}`,
          `end-${urlObj.hostname}`,
        )

        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          data,
        })
      })
    })

    req.on("error", (error) => {
      performance.mark(`error-${urlObj.hostname}`)
      performance.measure(
        `Ошибка запроса к ${urlObj.hostname}`,
        `start-${urlObj.hostname}`,
        `error-${urlObj.hostname}`,
      )

      reject(error)
    })

    // Установка таймаута
    req.on("timeout", () => {
      req.destroy()

      performance.mark(`timeout-${urlObj.hostname}`)
      performance.measure(
        `Таймаут запроса к ${urlObj.hostname}`,
        `start-${urlObj.hostname}`,
        `timeout-${urlObj.hostname}`,
      )

      reject(new Error("Превышено время ожидания"))
    })

    req.setTimeout(5000)
  })
}

// Измерение производительности нескольких запросов
async function benchmarkRequests() {
  performance.mark("start-all-requests")

  const urls = ["http://nodejs.org", "http://example.com", "http://google.com"]

  try {
    const results = await Promise.all(urls.map(makeRequest))
    console.log("Все запросы выполнены")
  } catch (error) {
    console.error("Ошибка при выполнении запросов:", error)
  } finally {
    performance.mark("end-all-requests")
    performance.measure("Общее время всех запросов", "start-all-requests", "end-all-requests")
  }
}

benchmarkRequests()
```

## Продвинутые возможности модуля Performance

### 1. Высокоточные таймеры (Histograms)

Node.js (начиная с версии 12) предоставляет доступ к высокоточным таймерам:

```javascript
const { monitorEventLoopDelay } = require("perf_hooks")

// Создание гистограммы для отслеживания задержек цикла событий
const histogram = monitorEventLoopDelay({ resolution: 10 })

// Запуск мониторинга
histogram.enable()

// Эмуляция нагрузки на цикл событий
setTimeout(() => {
  // Блокирующая операция
  const start = Date.now()
  while (Date.now() - start < 100) {}

  // Получение метрик
  console.log("Метрики задержки цикла событий:")
  console.log("Min:", histogram.min)
  console.log("Max:", histogram.max)
  console.log("Mean:", histogram.mean)
  console.log("Std Dev:", histogram.stddev)
  console.log("Percentiles:")
  console.log("  50%:", histogram.percentile(50))
  console.log("  90%:", histogram.percentile(90))
  console.log("  99%:", histogram.percentile(99))

  // Остановка мониторинга
  histogram.disable()
}, 1000)
```

### 2. Измерение Node.js внутренних операций

Начиная с Node.js 16, можно наблюдать за внутренними операциями Node.js:

```javascript
const { performance, createHistogram } = require("perf_hooks")
const crypto = require("crypto")

// Функция для тестирования криптографических операций
function testCryptoOperations() {
  const iterations = 10000
  const histogram = createHistogram()

  for (let i = 0; i < iterations; i++) {
    const start = performance.now()

    // Выполняем криптографическую операцию
    const hash = crypto.createHash("sha256")
    hash.update("Тестовая строка для хеширования")
    const digest = hash.digest("hex")

    const duration = performance.now() - start
    histogram.record(duration)
  }

  console.log("Результаты измерения криптографических операций:")
  console.log(`Выполнено операций: ${iterations}`)
  console.log(`Мин. время: ${histogram.min.toFixed(4)} мс`)
  console.log(`Макс. время: ${histogram.max.toFixed(4)} мс`)
  console.log(`Среднее время: ${histogram.mean.toFixed(4)} мс`)
  console.log(`Медианное время: ${histogram.percentile(50).toFixed(4)} мс`)
  console.log(`90-й процентиль: ${histogram.percentile(90).toFixed(4)} мс`)
  console.log(`99-й процентиль: ${histogram.percentile(99).toFixed(4)} мс`)
}

testCryptoOperations()
```

### 3. Использование Timerify для профилирования функций

```javascript
const { performance, PerformanceObserver } = require("perf_hooks")

// Настройка наблюдателя для событий функций
const obs = new PerformanceObserver((items) => {
  const entries = items.getEntries()
  for (const entry of entries) {
    console.log(`Функция ${entry.name}: ${entry.duration.toFixed(3)} мс`)
  }
})
obs.observe({ entryTypes: ["function"] })

// Оборачивание функций для автоматического профилирования
const timerify = performance.timerify

// Функции для тестирования
const fibonacci = timerify(function fibonacci(n) {
  if (n <= 1) return n
  return fibonacci(n - 1) + fibonacci(n - 2)
})

const factorial = timerify(function factorial(n) {
  if (n <= 1) return 1
  return n * factorial(n - 1)
})

const isPrime = timerify(function isPrime(n) {
  if (n <= 1) return false
  if (n <= 3) return true
  if (n % 2 === 0 || n % 3 === 0) return false

  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false
  }
  return true
})

// Тестирование функций
console.log("Запуск профилирования функций...")

console.log("Fibonacci(30):", fibonacci(30))
console.log("Factorial(20):", factorial(20))

for (let i = 1000; i < 10000; i += 1000) {
  isPrime(i)
}
```

## Лучшие практики использования модуля Performance

### 1. Создание собственного API для профилирования

```javascript
const { performance, PerformanceObserver } = require("perf_hooks")

// Создание простого API для профилирования
class Profiler {
  constructor(options = {}) {
    this.enabled = options.enabled !== false
    this.verbose = options.verbose === true
    this.prefix = options.prefix || ""
    this.marks = new Map()

    // Настройка наблюдателя
    this.observer = new PerformanceObserver((items) => {
      if (this.verbose) {
        const entries = items.getEntries()
        for (const entry of entries) {
          console.log(`[Profiler] ${entry.name}: ${entry.duration.toFixed(3)} мс`)
        }
      }
    })

    if (this.enabled) {
      this.observer.observe({ entryTypes: ["measure"] })
    }
  }

  start(label) {
    if (!this.enabled) return

    const markName = `${this.prefix}${label}-start`
    performance.mark(markName)
    this.marks.set(label, markName)

    if (this.verbose) {
      console.log(`[Profiler] Начало '${label}'`)
    }
  }

  end(label) {
    if (!this.enabled) return 0

    const startMark = this.marks.get(label)
    if (!startMark) {
      if (this.verbose) {
        console.warn(`[Profiler] Метка '${label}' не найдена`)
      }
      return 0
    }

    const endMark = `${this.prefix}${label}-end`
    performance.mark(endMark)

    const measureName = `${this.prefix}${label}`
    performance.measure(measureName, startMark, endMark)

    const measurement = performance.getEntriesByName(measureName)[0]
    const duration = measurement.duration

    // Очистка меток для этого измерения
    performance.clearMarks(startMark)
    performance.clearMarks(endMark)
    performance.clearMeasures(measureName)

    this.marks.delete(label)

    return duration
  }

  wrap(fn, label) {
    if (!this.enabled) return fn

    const profiler = this
    return function (...args) {
      profiler.start(label)
      try {
        return fn.apply(this, args)
      } finally {
        profiler.end(label)
      }
    }
  }

  async wrapAsync(asyncFn, label) {
    if (!this.enabled) return asyncFn

    const profiler = this
    return async function (...args) {
      profiler.start(label)
      try {
        return await asyncFn.apply(this, args)
      } finally {
        profiler.end(label)
      }
    }
  }

  destroy() {
    if (this.enabled) {
      this.observer.disconnect()
    }
  }
}

// Пример использования
const profiler = new Profiler({ verbose: true, prefix: "app:" })

// Профилирование синхронного кода
function processData(data) {
  profiler.start("process-data")

  // Симуляция обработки данных
  const result = data.map((x) => x * 2)

  profiler.end("process-data")
  return result
}

// Профилирование с помощью обертки
const calculateSum = profiler.wrap(function (array) {
  return array.reduce((sum, item) => sum + item, 0)
}, "calculate-sum")

// Профилирование асинхронного кода
async function fetchData() {
  profiler.start("fetch-data")

  // Симуляция асинхронной операции
  await new Promise((resolve) => setTimeout(resolve, 500))

  const duration = profiler.end("fetch-data")
  return { data: [1, 2, 3, 4, 5], duration }
}

// Использование обертки для асинхронных функций
const processDataAsync = profiler.wrapAsync(async function (url) {
  // Симуляция HTTP запроса
  await new Promise((resolve) => setTimeout(resolve, 300))
  return { result: "success" }
}, "api-request")

// Запуск примеров
async function runExamples() {
  console.log("Начало тестирования профилировщика...")

  // Тест синхронных функций
  const data = Array(10000).fill(1)
  const processed = processData(data)
  const sum = calculateSum(processed)
  console.log("Сумма:", sum)

  // Тест асинхронных функций
  const result = await fetchData()
  console.log("Получены данные:", result.data)

  const apiResult = await processDataAsync("/api/data")
  console.log("Результат API:", apiResult)

  // Очистка ресурсов
  profiler.destroy()
}

runExamples()
```

### 2. Интеграция с системами мониторинга

```javascript
const { performance, PerformanceObserver } = require("perf_hooks")
const http = require("http")

// Простая имитация отправки метрик во внешнюю систему мониторинга
class MetricsReporter {
  constructor(options = {}) {
    this.endpoint = options.endpoint || "http://localhost:8081/metrics"
    this.appName = options.appName || "node-app"
    this.interval = options.interval || 10000
    this.metrics = []

    // Наблюдатель за событиями производительности
    this.observer = new PerformanceObserver((items) => {
      const entries = items.getEntries()
      for (const entry of entries) {
        this.addMetric(entry.name, entry.duration)
      }
    })

    this.observer.observe({ entryTypes: ["measure"] })

    // Запуск периодической отправки метрик
    this.timer = setInterval(() => this.sendMetrics(), this.interval)
  }

  addMetric(name, value, tags = {}) {
    this.metrics.push({
      name: `${this.appName}.${name}`,
      value,
      tags,
      timestamp: Date.now(),
    })
  }

  async sendMetrics() {
    if (this.metrics.length === 0) return

    const metricsToSend = [...this.metrics]
    this.metrics = []

    try {
      // В реальном приложении здесь был бы запрос к системе мониторинга
      console.log(`Отправка ${metricsToSend.length} метрик в систему мониторинга`)
      console.log(JSON.stringify(metricsToSend, null, 2))

      // Имитация отправки данных
      // await fetch(this.endpoint, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(metricsToSend)
      // })
    } catch (error) {
      console.error("Ошибка отправки метрик:", error)

      // Возвращаем метрики обратно в очередь при ошибке
      this.metrics.push(...metricsToSend)
    }
  }

  stop() {
    this.observer.disconnect()
    clearInterval(this.timer)
  }
}

// Пример использования с Express-подобным API
function setupPerformanceMonitoring(app) {
  const reporter = new MetricsReporter({
    appName: "api-server",
    interval: 5000,
  })

  // Middleware для измерения времени запросов
  return function performanceMiddleware(req, res, next) {
    const routeName = req.method + req.originalUrl.split("?")[0]
    const markStart = `request-${req.id || Date.now()}-start`

    performance.mark(markStart)

    // Перехватываем окончание запроса
    const originalEnd = res.end
    res.end = function (...args) {
      const markEnd = `request-${req.id || Date.now()}-end`
      performance.mark(markEnd)

      const measureName = `http-request-${routeName}`
      performance.measure(measureName, markStart, markEnd)

      // Добавляем дополнительные метки для метрик
      reporter.addMetric(
        `request.duration`,
        performance.getEntriesByName(measureName)[0].duration,
        {
          method: req.method,
          route: routeName,
          status: res.statusCode,
        },
      )

      // Очистка меток
      performance.clearMarks(markStart)
      performance.clearMarks(markEnd)
      performance.clearMeasures(measureName)

      return originalEnd.apply(this, args)
    }

    next()
  }
}

// Пример сервера с мониторингом
const server = http.createServer((req, res) => {
  const markStart = `request-${Date.now()}-start`
  performance.mark(markStart)

  // Эмуляция обработки запроса
  setTimeout(() => {
    const markEnd = `request-${Date.now()}-end`
    performance.mark(markEnd)

    const measureName = `http-request-${req.url}`
    performance.measure(measureName, markStart, markEnd)

    res.statusCode = 200
    res.setHeader("Content-Type", "application/json")
    res.end(JSON.stringify({ message: "Hello World!" }))
  }, Math.random() * 100)
})

// Запуск сервера с мониторингом
const reporter = new MetricsReporter()
server.listen(3000, () => {
  console.log("Сервер запущен на порту 3000")

  // Имитация запросов
  setInterval(() => {
    http.get("http://localhost:3000", (res) => {
      res.resume()
    })
  }, 1000)

  // Остановка через 30 секунд
  setTimeout(() => {
    reporter.stop()
    server.close(() => {
      console.log("Сервер остановлен")
      process.exit(0)
    })
  }, 30000)
})
```

## Заключение

Модуль Performance (`perf_hooks`) в Node.js предоставляет мощный и стандартизированный инструментарий для измерения производительности приложений. Его возможности охватывают широкий спектр задач - от простого измерения времени выполнения операций до детального профилирования приложения и интеграции с системами мониторинга.

Правильное использование API производительности позволяет:

1. Выявлять узкие места в приложении
2. Обнаруживать регрессии производительности
3. Принимать обоснованные решения при оптимизации
4. Собирать метрики в реальном времени

Особая ценность модуля состоит в его высокой точности и минимальном влиянии на производительность самого приложения. В отличие от многих внешних инструментов профилирования, встроенный API производительности практически не создаёт дополнительных накладных расходов, что делает его подходящим даже для использования в production-окружении.

---

[[002 Node.js|Назад]]
