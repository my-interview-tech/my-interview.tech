---
title: Модуль Worker Threads в Node.js и параллельные вычисления
draft: false
tags:
  - "#NodeJS"
  - "#worker_threads"
  - "#многопоточность"
  - "#параллельные_вычисления"
  - "#производительность"
info:
---

Модуль Worker Threads в Node.js - это встроенный инструмент, позволяющий выполнять JavaScript-код в параллельных потоках. Он был добавлен в Node.js с версии 10 (как экспериментальный) и стал стабильным с версии 12 для выполнения CPU-интенсивных операций без блокировки основного потока событийного цикла.

## Зачем нужны Worker Threads

По умолчанию Node.js работает в однопоточном режиме, что делает его эффективным для I/O-интенсивных операций, но ограничивает при работе с CPU-интенсивными задачами. Worker Threads решают эту проблему, позволяя:

1. Распределять вычислительную нагрузку между несколькими потоками
2. Обрабатывать CPU-интенсивные задачи без блокировки событийного цикла
3. Использовать все доступные ядра процессора для параллельных вычислений

## Ключевые компоненты API

```javascript
const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
  threadId,
  MessageChannel,
  MessagePort,
  SharedArrayBuffer,
} = require("worker_threads")
```

- `Worker`: Класс для создания нового рабочего потока
- `isMainThread`: Булево значение, показывающее, выполняется ли код в основном потоке
- `parentPort`: Объект для обмена сообщениями с родительским потоком
- `workerData`: Данные, переданные при создании рабочего потока
- `threadId`: Уникальный идентификатор потока
- `MessageChannel`: Класс для создания коммуникационного канала между потоками
- `MessagePort`: Порт для отправки сообщений между потоками
- `SharedArrayBuffer`: Буфер для совместного использования памяти между потоками

## Базовый пример использования Worker Threads

**Основной файл (main.js)**:

```javascript
const { Worker } = require("worker_threads")

// Функция для создания и запуска Worker Thread
function runWorker(workerData) {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./worker.js", { workerData })

    worker.on("message", resolve)
    worker.on("error", reject)
    worker.on("exit", (code) => {
      if (code !== 0) reject(new Error(`Рабочий поток завершился с кодом ${code}`))
    })
  })
}

async function main() {
  try {
    // Запуск двух параллельных задач
    const [result1, result2] = await Promise.all([
      runWorker({ data: [1, 2, 3, 4], operation: "sum" }),
      runWorker({ data: [5, 6, 7, 8], operation: "multiply" }),
    ])

    console.log(`Результат суммирования: ${result1}`)
    console.log(`Результат умножения: ${result2}`)
  } catch (err) {
    console.error(err)
  }
}

main()
```

**Рабочий поток (worker.js)**:

```javascript
const { parentPort, workerData } = require("worker_threads")

// Получаем данные из основного потока
const { data, operation } = workerData

let result
// Выполняем CPU-интенсивную операцию
if (operation === "sum") {
  result = data.reduce((sum, value) => sum + value, 0)
} else if (operation === "multiply") {
  result = data.reduce((product, value) => product * value, 1)
}

// Отправляем результат обратно в основной поток
parentPort.postMessage(result)
```

## Способы передачи данных между потоками

### 1. Клонирование (по умолчанию)

Данные, передаваемые между потоками, клонируются с использованием алгоритма структурированного клонирования:

```javascript
// В основном потоке
const worker = new Worker("./worker.js", {
  workerData: { complexObject: { nested: { array: [1, 2, 3] } } },
})

// В worker.js
const { workerData } = require("worker_threads")
console.log(workerData.complexObject.nested.array) // [1, 2, 3]
```

### 2. Передача по ссылке (transferList)

Некоторые типы объектов можно передавать по ссылке, что более эффективно для больших объектов:

```javascript
// В основном потоке
const buffer = new ArrayBuffer(16)
const view = new Uint32Array(buffer)
view[0] = 123

const worker = new Worker("./worker.js", {
  workerData: { buffer },
  transferList: [buffer], // Объекты из этого списка передаются по ссылке
})

// После передачи, оригинальный buffer становится недоступным в основном потоке
console.log(buffer.byteLength) // 0, буфер был перемещен

// В worker.js
const { workerData } = require("worker_threads")
const view = new Uint32Array(workerData.buffer)
console.log(view[0]) // 123
```

### 3. Общая память с SharedArrayBuffer

Для прямого обмена данными между потоками можно использовать общий буфер памяти:

```javascript
// В основном потоке
const sharedBuffer = new SharedArrayBuffer(4)
const sharedArray = new Int32Array(sharedBuffer)

const worker = new Worker("./worker.js", {
  workerData: { sharedBuffer },
})

// Чтение данных, измененных в рабочем потоке
setTimeout(() => {
  console.log("Значение после обновления:", Atomics.load(sharedArray, 0))
}, 1000)

// В worker.js
const { workerData } = require("worker_threads")
const sharedArray = new Int32Array(workerData.sharedBuffer)

// Безопасно изменяем значение в общей памяти с помощью атомарных операций
Atomics.store(sharedArray, 0, 42)
```

## Создание пула Worker Threads

Для эффективного использования рабочих потоков часто используется пул, который повторно использует потоки вместо создания новых для каждой задачи:

```javascript
const { Worker } = require("worker_threads")
const os = require("os")

class WorkerPool {
  constructor(workerScriptPath, numWorkers = os.cpus().length) {
    this.workerPath = workerScriptPath
    this.workers = []
    this.freeWorkers = []
    this.queue = []

    // Инициализация пула воркеров
    for (let i = 0; i < numWorkers; i++) {
      this.addNewWorker()
    }
  }

  addNewWorker() {
    const worker = new Worker(this.workerPath)

    worker.on("message", (result) => {
      // Возвращаем воркер в пул свободных
      this.freeWorkers.push(worker)

      // Если есть задачи в очереди, выполняем следующую
      if (this.queue.length > 0) {
        const { taskData, resolve, reject } = this.queue.shift()
        this.runTask(taskData, resolve, reject)
      }

      // Разрешаем промис с результатом
      worker.currentResolve(result)
      worker.currentResolve = null
      worker.currentReject = null
    })

    worker.on("error", (error) => {
      if (worker.currentReject) {
        worker.currentReject(error)
      }
      // Удаляем упавший воркер и создаем новый
      this.workers = this.workers.filter((w) => w !== worker)
      this.addNewWorker()
    })

    this.workers.push(worker)
    this.freeWorkers.push(worker)

    // Выполняем ожидающую задачу, если она есть
    if (this.queue.length > 0) {
      const { taskData, resolve, reject } = this.queue.shift()
      this.runTask(taskData, resolve, reject)
    }
  }

  runTask(workerData, resolve, reject) {
    if (this.freeWorkers.length === 0) {
      // Если нет свободных воркеров, добавляем задачу в очередь
      this.queue.push({ taskData: workerData, resolve, reject })
      return
    }

    const worker = this.freeWorkers.pop()
    worker.currentResolve = resolve
    worker.currentReject = reject
    worker.postMessage(workerData)
  }

  executeTask(workerData) {
    return new Promise((resolve, reject) => {
      this.runTask(workerData, resolve, reject)
    })
  }

  terminate() {
    for (const worker of this.workers) {
      worker.terminate()
    }
  }
}

// Использование пула воркеров
const pool = new WorkerPool("./worker-task.js")

async function example() {
  try {
    const results = await Promise.all([
      pool.executeTask({ data: [1, 2, 3, 4], operation: "sum" }),
      pool.executeTask({ data: [5, 6, 7, 8], operation: "multiply" }),
      pool.executeTask({ data: [9, 10, 11, 12], operation: "sum" }),
    ])

    console.log("Результаты:", results)
  } finally {
    pool.terminate()
  }
}

example().catch(console.error)
```

## Когда использовать Worker Threads

Worker Threads рекомендуется использовать для:

1. **CPU-интенсивных операций**:

   - Сложные математические вычисления
   - Обработка и анализ больших массивов данных
   - Обработка изображений и видео
   - Шифрование и хеширование данных

2. **Параллельной обработки независимых задач**, которые можно разбить на части

## Когда НЕ использовать Worker Threads

Worker Threads не рекомендуется использовать для:

1. **I/O-интенсивных операций** (чтение/запись файлов, сетевые запросы)
2. **Простых и быстрых вычислений**, где накладные расходы на создание потока превышают выигрыш от параллелизма
3. **Масштабирования веб-сервера** (лучше использовать модуль `cluster`)

## Сравнение с другими подходами к многопоточности в Node.js

| Подход             | Характеристики                            | Когда использовать                      |
| ------------------ | ----------------------------------------- | --------------------------------------- |
| **Worker Threads** | Отдельные потоки в рамках одного процесса | CPU-интенсивные задачи                  |
| **Child Process**  | Отдельные процессы Node.js                | Запуск внешних программ, изоляция задач |
| **Cluster**        | Отдельные процессы Node.js с общим портом | Масштабирование веб-серверов            |

## Особенности и ограничения

1. **Отсутствие общего состояния**: переменные не разделяются между потоками
2. **Необходимость синхронизации**: при работе с общей памятью нужны атомарные операции
3. **Накладные расходы**: на создание и обмен данными между потоками
4. **Отладка**: многопоточные программы сложнее отлаживать

## Заключение

Worker Threads в Node.js предоставляют мощный инструмент для выполнения параллельных вычислений, позволяя эффективно использовать многоядерные системы без блокировки основного потока событийного цикла. Они оптимальны для CPU-интенсивных операций, где традиционная однопоточная модель Node.js может быть неэффективной.

При разработке с использованием Worker Threads важно правильно оценивать, когда их применение оправдано, и выбирать оптимальные способы обмена данными между потоками для достижения наилучшей производительности.

---

[[Назад]]
