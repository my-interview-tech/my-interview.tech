---
title: Какие методы модуля os могут помочь в мониторинге производительности
draft: false
tags:
  - "#NodeJS"
  - "#os"
  - "#мониторинг"
  - "#производительность"
  - "#системные-ресурсы"
info:
  - "[Официальная документация модуля os](https://nodejs.org/api/os.html)"
  - "[Node.js Performance Monitoring](https://nodejs.org/en/docs/guides/diagnostics/)"
  - "[Мониторинг приложений Node.js](https://www.datadoghq.com/blog/node-monitoring-tools/)"
---

# Методы модуля os для мониторинга производительности

Модуль `os` в Node.js предоставляет несколько методов, которые могут быть полезны для мониторинга производительности системы. Эти методы позволяют получать информацию о состоянии операционной системы, ресурсах и нагрузке.

## 1. CPU и загрузка процессора

### `os.cpus()`

Возвращает информацию о CPU, включая количество ядер, модель процессора и его скорость.

```javascript
const os = require("os")

// Получение информации о всех CPU/ядрах
const cpuInfo = os.cpus()
console.log(`Количество ядер: ${cpuInfo.length}`)
console.log(`Модель: ${cpuInfo[0].model}`)
console.log(`Скорость: ${cpuInfo[0].speed} MHz`)

// Анализ времени CPU
const totalIdle = cpuInfo.reduce((acc, cpu) => acc + cpu.times.idle, 0)
const totalTick = cpuInfo.reduce(
  (acc, cpu) => acc + Object.values(cpu.times).reduce((total, time) => total + time, 0),
  0,
)
const cpuUsage = 100 - (totalIdle / totalTick) * 100
console.log(`Использование CPU: ${cpuUsage.toFixed(2)}%`)
```

### `os.loadavg()`

Возвращает тройку значений, показывающих среднюю нагрузку на систему за последние 1, 5 и 15 минут. Полезно для мониторинга загрузки процессора во времени.

```javascript
const os = require("os")

const loadAvg = os.loadavg()
console.log(`Средняя нагрузка за 1, 5 и 15 минут: ${loadAvg.join(", ")}`)

// Интерпретация нагрузки относительно количества ядер
const cpuCount = os.cpus().length
const load1min = loadAvg[0] / cpuCount
console.log(`Относительная нагрузка (1 мин): ${load1min.toFixed(2)}`)
// Значение > 1 может указывать на перегрузку
```

## 2. Мониторинг памяти

### `os.freemem()`

Возвращает количество свободной памяти в байтах на системе.

```javascript
const os = require("os")

console.log(`Свободная память: ${os.freemem()} байт`)
console.log(`Свободная память: ${(os.freemem() / 1024 / 1024 / 1024).toFixed(2)} ГБ`)
```

### `os.totalmem()`

Возвращает общий объём памяти на системе (в байтах).

```javascript
const os = require("os")

console.log(`Общая память: ${os.totalmem()} байт`)
console.log(`Общая память: ${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} ГБ`)

// Расчет использования памяти в процентах
const memoryUsage = 100 - (os.freemem() / os.totalmem()) * 100
console.log(`Использование памяти: ${memoryUsage.toFixed(2)}%`)
```

## 3. Время работы и стабильность системы

### `os.uptime()`

Возвращает количество секунд, прошедших с загрузки системы.

```javascript
const os = require("os")

const uptime = os.uptime()
console.log(`Время работы системы: ${uptime} секунд`)
// Преобразование в более читаемый формат
const days = Math.floor(uptime / 86400)
const hours = Math.floor((uptime % 86400) / 3600)
const minutes = Math.floor((uptime % 3600) / 60)
console.log(`Система работает: ${days} дней, ${hours} часов, ${minutes} минут`)
```

## 4. Сетевые интерфейсы

### `os.networkInterfaces()`

Возвращает объект, содержащий информацию о сетевых интерфейсах и их адресах. Полезно для мониторинга состояния сети.

```javascript
const os = require("os")

const networks = os.networkInterfaces()

// Получение активных сетевых интерфейсов
Object.keys(networks).forEach((interface) => {
  const addresses = networks[interface]
  console.log(`Интерфейс: ${interface}`)

  addresses.forEach((addr) => {
    console.log(`  Адрес: ${addr.address}`)
    console.log(`  Тип: ${addr.family}`)
    console.log(`  Маска: ${addr.netmask}`)
    console.log(`  MAC: ${addr.mac}`)
    console.log(`  Внутренний: ${addr.internal}`)
  })
})
```

## 5. Дополнительная системная информация

### `os.platform()` и `os.arch()`

Определяют платформу и архитектуру операционной системы.

```javascript
const os = require("os")

console.log(`Платформа: ${os.platform()}`)
console.log(`Архитектура: ${os.arch()}`)
```

### `os.tmpdir()` и `os.homedir()`

Могут помочь отслеживать использование дискового пространства во временной директории и домашнем каталоге.

```javascript
const os = require("os")
const fs = require("fs")

console.log(`Временная директория: ${os.tmpdir()}`)
console.log(`Домашняя директория: ${os.homedir()}`)

// Пример: проверка свободного места в домашней директории
// (требует дополнительных модулей или системных вызовов)
```

## Интеграция для непрерывного мониторинга

Методы модуля `os` могут быть интегрированы с системами мониторинга для отслеживания производительности в реальном времени:

```javascript
const os = require("os")

// Функция для сбора метрик системы
function collectMetrics() {
  const cpus = os.cpus()
  const freemem = os.freemem()
  const totalmem = os.totalmem()
  const loadavg = os.loadavg()
  const uptime = os.uptime()

  return {
    cpu: {
      cores: cpus.length,
      model: cpus[0].model,
      loadavg: loadavg,
    },
    memory: {
      free: freemem,
      total: totalmem,
      usagePercent: 100 - (freemem / totalmem) * 100,
    },
    system: {
      platform: os.platform(),
      arch: os.arch(),
      uptime: uptime,
    },
  }
}

// Пример периодического сбора метрик
setInterval(() => {
  const metrics = collectMetrics()
  console.log(JSON.stringify(metrics, null, 2))

  // В реальном приложении здесь можно отправлять данные
  // в систему мониторинга или базу данных временных рядов
}, 5000)
```

## Ограничения модуля os

Модуль `os` предоставляет только базовые метрики системы. Для более детального мониторинга производительности Node.js приложений рекомендуется использовать:

1. **Встроенный модуль `process`** для мониторинга использования памяти Node.js процессом:

   ```javascript
   console.log(process.memoryUsage())
   ```

2. **Внешние библиотеки** для расширенного мониторинга:
   - `node-os-utils`
   - `systeminformation`
   - `appmetrics` (от IBM)
   - Интеграция с Prometheus, Grafana, или New Relic

## Заключение

Методы модуля `os` предоставляют важную информацию о системе, которая может быть использована для базового мониторинга производительности. Для полноценной системы мониторинга эти методы часто комбинируют с другими инструментами для получения более детальной картины производительности Node.js приложения и системы в целом.

---

[[002 Node.js|Назад]]
