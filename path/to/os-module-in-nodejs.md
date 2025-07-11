---
title: Модуль OS в Node.js и работа с операционной системой
draft: false
tags:
  - "#NodeJS"
  - "#OS"
  - "#системная_информация"
  - "#мониторинг"
  - "#производительность"
info:
---

Модуль `os` в Node.js - это встроенный модуль, который предоставляет различные методы и свойства для взаимодействия с операционной системой. Он позволяет получить информацию о системе, на которой запущено приложение, включая данные о процессоре, памяти, сетевых интерфейсах и другие системные характеристики.

## Подключение модуля OS

```javascript
const os = require("os")
```

## Информация о системе

### Определение операционной системы

```javascript
// Название платформы: 'win32', 'darwin', 'linux', и т.д.
const platform = os.platform()
console.log(`Платформа: ${platform}`)

// Более подробное имя ОС: 'Windows_NT', 'Darwin', 'Linux'
const osType = os.type()
console.log(`Тип ОС: ${osType}`)

// Версия операционной системы
const osVersion = os.version()
console.log(`Версия ОС: ${osVersion}`)

// Архитектура процессора: 'x64', 'arm', 'ia32', и т.д.
const arch = os.arch()
console.log(`Архитектура: ${arch}`)

// Информация о выпуске ОС (на Linux)
console.log(`Выпуск ОС: ${os.release()}`)
```

Эти методы полезны для адаптации приложения к различным операционным системам и выполнения платформо-зависимого кода.

## Информация о пользователе и сети

### Данные о пользователе

```javascript
// Информация о текущем пользователе
const userInfo = os.userInfo()
console.log("Информация о пользователе:", userInfo)
/*
{
  uid: 1000,        // ID пользователя (на Unix-системах)
  gid: 1000,        // ID группы (на Unix-системах)
  username: 'user', // Имя пользователя
  homedir: '/home/user', // Домашняя директория
  shell: '/bin/bash'     // Оболочка
}
*/

// Домашняя директория текущего пользователя
const homeDir = os.homedir()
console.log(`Домашняя директория: ${homeDir}`)
```

### Сетевые настройки

```javascript
// Получение списка сетевых интерфейсов
const networkInterfaces = os.networkInterfaces()
console.log("Сетевые интерфейсы:", networkInterfaces)

// Пример доступа к IP-адресам
for (const [name, interfaces] of Object.entries(networkInterfaces)) {
  for (const iface of interfaces) {
    if (iface.family === "IPv4" && !iface.internal) {
      console.log(`Интерфейс ${name}: ${iface.address}`)
    }
  }
}

// Имя хоста (компьютера)
const hostname = os.hostname()
console.log(`Имя хоста: ${hostname}`)
```

## Информация о ресурсах системы

### Процессоры

```javascript
// Информация о процессорах (массив объектов с информацией о каждом ядре)
const cpus = os.cpus()
console.log("Количество ядер процессора:", cpus.length)
console.log("Информация о первом ядре:", cpus[0])
/*
{
  model: 'Intel(R) Core(TM) i7-9700K CPU @ 3.60GHz',
  speed: 3600,  // в МГц
  times: {
    user: 9304687,  // время в пользовательском режиме (миллисекунды)
    nice: 0,        // время "nice" процессов (Unix)
    sys: 3136250,   // время в системном режиме
    idle: 48140625, // время простоя
    irq: 156250     // время обработки аппаратных прерываний
  }
}
*/

// Средняя загрузка системы (только для Unix-подобных ОС)
try {
  const loadAvg = os.loadavg()
  console.log(`Средняя загрузка за 1, 5, 15 минут: ${loadAvg.join(", ")}`)
} catch (err) {
  console.log("Средняя загрузка недоступна на данной операционной системе")
}
```

### Память

```javascript
// Общее количество памяти системы (в байтах)
const totalMem = os.totalmem()
console.log(`Всего памяти: ${totalMem} байт (${(totalMem / 1024 / 1024 / 1024).toFixed(2)} ГБ)`)

// Свободная память (в байтах)
const freeMem = os.freemem()
console.log(`Свободная память: ${freeMem} байт (${(freeMem / 1024 / 1024 / 1024).toFixed(2)} ГБ)`)

// Процент использованной памяти
const usedMemPercent = ((1 - freeMem / totalMem) * 100).toFixed(2)
console.log(`Использовано памяти: ${usedMemPercent}%`)
```

## Системные пути и временные директории

```javascript
// Разделитель пути для текущей ОС
console.log(`Разделитель пути: "${os.EOL}"`)

// Директория для временных файлов
const tempDir = os.tmpdir()
console.log(`Временная директория: ${tempDir}`)

// Конец строки (символы переноса строки) для текущей ОС
console.log(`Символ окончания строки: "${os.EOL}" (код ${os.EOL.charCodeAt(0)})`)
```

## Информация о времени работы системы

```javascript
// Время работы системы (в секундах)
const uptime = os.uptime()
const days = Math.floor(uptime / 86400)
const hours = Math.floor((uptime % 86400) / 3600)
const minutes = Math.floor((uptime % 3600) / 60)
const seconds = Math.floor(uptime % 60)

console.log(`Система работает: ${days}д ${hours}ч ${minutes}м ${seconds}с`)
```

## Мониторинг системы с помощью модуля OS

Модуль `os` часто используется для создания систем мониторинга. Вот пример простого мониторинга системных ресурсов:

```javascript
const os = require("os")

// Функция для форматирования байтов в читаемый формат
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
}

// Функция для расчета процента использования CPU
function calculateCpuUsage(cpus) {
  return new Promise((resolve) => {
    // Собираем начальное состояние CPU
    const initialMeasurement = os.cpus().map((cpu) => {
      const { user, nice, sys, idle, irq } = cpu.times
      return user + nice + sys + idle + irq
    })

    // Ждем немного для второго замера
    setTimeout(() => {
      const finalMeasurement = os.cpus().map((cpu) => {
        const { user, nice, sys, idle, irq } = cpu.times
        return user + nice + sys + idle + irq
      })

      // Расчет использования CPU
      const cpuUsage = initialMeasurement.map((startTotal, i) => {
        const endTotal = finalMeasurement[i]
        const startIdle = os.cpus()[i].times.idle
        const endIdle = os.cpus()[i].times.idle

        const totalDiff = endTotal - startTotal
        const idleDiff = endIdle - startIdle

        return 100 - (100 * idleDiff) / totalDiff
      })

      resolve(cpuUsage)
    }, 1000)
  })
}

// Функция мониторинга
async function monitorSystem() {
  try {
    console.clear()
    console.log("\n=== Информация о системе ===")
    console.log(`Платформа: ${os.platform()}`)
    console.log(`ОС: ${os.type()} ${os.release()}`)
    console.log(`Архитектура: ${os.arch()}`)
    console.log(`Хост: ${os.hostname()}`)

    console.log("\n=== Использование ресурсов ===")

    // Мониторинг CPU
    const cpuUsage = await calculateCpuUsage()
    const avgCpuUsage = cpuUsage.reduce((sum, usage) => sum + usage, 0) / cpuUsage.length

    console.log(`CPU: ${os.cpus().length} ядер, ${os.cpus()[0].model}`)
    console.log(`CPU загрузка: ${avgCpuUsage.toFixed(1)}%`)
    cpuUsage.forEach((usage, i) => {
      console.log(`  Ядро ${i + 1}: ${usage.toFixed(1)}%`)
    })

    // Мониторинг памяти
    const totalMem = os.totalmem()
    const freeMem = os.freemem()
    const usedMem = totalMem - freeMem
    const usedMemPercent = ((usedMem / totalMem) * 100).toFixed(1)

    console.log(`Память: ${formatBytes(totalMem)}`)
    console.log(`Использовано: ${formatBytes(usedMem)} (${usedMemPercent}%)`)
    console.log(`Свободно: ${formatBytes(freeMem)}`)

    // Информация о времени работы
    const uptime = os.uptime()
    const days = Math.floor(uptime / 86400)
    const hours = Math.floor((uptime % 86400) / 3600)
    const minutes = Math.floor((uptime % 3600) / 60)

    console.log(`\nВремя работы: ${days}д ${hours}ч ${minutes}м`)
  } catch (error) {
    console.error("Ошибка мониторинга:", error)
  }
}

// Запуск мониторинга каждые 5 секунд
setInterval(monitorSystem, 5000)
monitorSystem() // Первый запуск
```

## Практические примеры использования модуля OS

### Адаптация приложения к разным ОС

```javascript
const os = require("os")

function getConfigPath() {
  const platform = os.platform()
  const homeDir = os.homedir()

  switch (platform) {
    case "win32":
      return `${homeDir}\\AppData\\Roaming\\myapp\\config.json`
    case "darwin":
      return `${homeDir}/Library/Preferences/myapp/config.json`
    case "linux":
      return `${homeDir}/.config/myapp/config.json`
    default:
      return `${homeDir}/.myapp-config.json`
  }
}

console.log(`Путь к конфигурационному файлу: ${getConfigPath()}`)
```

### Определение доступных ресурсов для многопоточных операций

```javascript
const os = require("os")
const { Worker } = require("worker_threads")

// Определяем оптимальное количество воркеров
function getOptimalWorkerCount() {
  // Получаем количество ядер процессора
  const cpuCount = os.cpus().length

  // Получаем доступную память (в МБ)
  const availableMemory = os.freemem() / 1024 / 1024

  // Предполагаем, что каждый воркер требует 100 МБ памяти
  const maxWorkersByMemory = Math.floor(availableMemory / 100)

  // Выбираем минимальное из числа ядер и доступной памяти
  // Никогда не меньше 1 и не больше чем количество ядер
  return Math.max(1, Math.min(cpuCount, maxWorkersByMemory))
}

function runWorkers(data, workerScript) {
  const workerCount = getOptimalWorkerCount()
  console.log(`Запуск ${workerCount} воркеров...`)

  // Разделяем данные на части для каждого воркера
  const chunkSize = Math.ceil(data.length / workerCount)
  const promises = []

  for (let i = 0; i < workerCount; i++) {
    const start = i * chunkSize
    const end = Math.min(start + chunkSize, data.length)
    const chunk = data.slice(start, end)

    promises.push(
      new Promise((resolve, reject) => {
        const worker = new Worker(workerScript, {
          workerData: { chunk },
        })

        worker.on("message", resolve)
        worker.on("error", reject)
        worker.on("exit", (code) => {
          if (code !== 0) {
            reject(new Error(`Worker stopped with exit code ${code}`))
          }
        })
      }),
    )
  }

  return Promise.all(promises)
}

// Пример использования
const data = Array.from({ length: 1000000 }, (_, i) => i)
runWorkers(data, "./worker.js")
  .then((results) => {
    console.log(`Обработка завершена, получено ${results.length} результатов`)
  })
  .catch((err) => {
    console.error("Ошибка обработки:", err)
  })
```

### Проверка системных требований

```javascript
const os = require("os")

function checkSystemRequirements() {
  const requirements = {
    minMemory: 4 * 1024 * 1024 * 1024, // 4 ГБ
    minCpuCores: 2,
    supportedPlatforms: ["win32", "darwin", "linux"],
  }

  const checks = {
    memory: os.totalmem() >= requirements.minMemory,
    cpu: os.cpus().length >= requirements.minCpuCores,
    platform: requirements.supportedPlatforms.includes(os.platform()),
  }

  const allRequirementsMet = Object.values(checks).every(Boolean)

  console.log("=== Проверка системных требований ===")
  console.log(`Память: ${formatBytes(os.totalmem())} [${checks.memory ? "✓" : "✗"}]`)
  console.log(`Процессор: ${os.cpus().length} ядер [${checks.cpu ? "✓" : "✗"}]`)
  console.log(`Платформа: ${os.platform()} [${checks.platform ? "✓" : "✗"}]`)
  console.log(
    `Итог: ${
      allRequirementsMet ? "Все требования выполнены" : "Система не соответствует требованиям"
    }`,
  )

  return allRequirementsMet
}

function formatBytes(bytes) {
  return (bytes / 1024 / 1024 / 1024).toFixed(2) + " ГБ"
}

// Проверяем требования перед запуском приложения
if (checkSystemRequirements()) {
  console.log("Запуск приложения...")
} else {
  console.error("Приложение не может быть запущено из-за невыполненных требований")
}
```

## Преимущества и ограничения

### Преимущества использования модуля OS:

1. **Кросс-платформенность** - работает на всех поддерживаемых Node.js платформах
2. **Встроенность** - не требует установки дополнительных пакетов
3. **Простота использования** - предоставляет простой API для доступа к системной информации
4. **Производительность** - низкие накладные расходы на вызовы к системным функциям

### Ограничения:

1. **Ограниченная функциональность** - для специфических задач может потребоваться использование сторонних модулей
2. **Зависимость от платформы** - некоторые методы (например, os.loadavg()) работают только на определенных платформах
3. **Ограниченная информация о производительности** - для глубокого мониторинга производительности системы может потребоваться дополнительная инструментация
4. **Отсутствие детализированной информации о процессах** - для работы с процессами лучше использовать модуль `child_process` или сторонние модули

## Заключение

Модуль `os` в Node.js предоставляет простой и эффективный способ доступа к основной информации об операционной системе и системных ресурсах. Это делает его незаменимым инструментом для создания кросс-платформенных приложений, которые должны адаптироваться к различным средам выполнения.

Комбинируя модуль `os` с другими встроенными модулями, такими как `fs`, `path` и `process`, разработчики могут создавать приложения, которые эффективно используют системные ресурсы и корректно работают на различных платформах.

Для более сложных сценариев мониторинга или управления системой можно использовать сторонние модули, такие как `systeminformation` или `node-os-utils`, которые расширяют возможности встроенного модуля `os` и предоставляют более детализированную информацию о системе.

---

[[Назад]]
