---
title: Что такое Worker Threads в Node.js и когда их следует использовать
draft: false
tags:
  - "#NodeJS"
  - "#WorkerThreads"
  - "#Многопоточность"
  - "#Производительность"
  - "#ПараллельныеВычисления"
info:
  - "[Документация Node.js - Worker Threads](https://nodejs.org/api/worker_threads.html)"
  - "[Node.js Multithreading: What are Worker Threads and Why do They Matter](https://blog.appsignal.com/2022/07/20/nodejs-multithreading-with-worker-threads.html)"
---

![[Pasted image worker-threads.png|600]]

## Что такое Worker Threads в Node.js

**Worker Threads** — это модуль в Node.js, который позволяет запускать JavaScript-код в параллельных потоках. Он был добавлен для выполнения CPU-интенсивных операций, не блокируя основной поток событийного цикла (Event Loop).

В отличие от кластеризации, где создаются отдельные процессы Node.js, Worker Threads работают в рамках одного процесса, но в разных потоках, что делает их более легковесными и эффективными для определенных задач.

## Основные характеристики Worker Threads

1. **Изоляция выполнения**: Каждый Worker Thread имеет свой собственный V8-изолят и событийный цикл
2. **Общая память**: Возможность использования SharedArrayBuffer для прямого доступа к одной и той же памяти из разных потоков
3. **Передача по значению**: Обычные данные копируются между потоками
4. **Передача по ссылке**: Типизированные массивы и некоторые другие объекты могут передаваться по ссылке
5. **Межпоточная коммуникация**: Обмен сообщениями между потоками через систему событий

## Когда использовать Worker Threads

Worker Threads целесообразно использовать:

1. **CPU-интенсивные операции**:

   - Сложные математические вычисления
   - Обработка изображений и видео
   - Парсинг и генерация больших JSON-документов
   - Шифрование и хеширование данных

2. **Параллельная обработка данных**:

   - Обработка больших массивов данных
   - Анализ и преобразование данных
   - Параллельные запросы к базам данных

3. **Блокирующие операции**, которые не могут быть асинхронными по своей природе

## Когда НЕ стоит использовать Worker Threads

Worker Threads не подходят для:

1. **I/O-интенсивных операций**: Node.js уже эффективно обрабатывает ввод-вывод асинхронно
2. **Небольших вычислений**: Накладные расходы на создание потока могут превышать выигрыш
3. **Задач масштабирования веб-сервера**: Для этого лучше использовать кластеризацию (cluster)

## Основные компоненты API Worker Threads

```javascript
const { Worker, isMainThread, parentPort, workerData, threadId } = require("worker_threads")
```

- `Worker`: Класс для создания новых потоков
- `isMainThread`: Флаг, указывающий, является ли текущий код частью основного потока
- `parentPort`: Объект для обмена сообщениями с родительским потоком
- `workerData`: Данные, переданные из основного потока при создании
- `threadId`: Уникальный идентификатор потока

## Пример использования Worker Threads

**Основной файл (main.js)**:

```javascript
const { Worker } = require("worker_threads")

// Функция для запуска Worker Thread
function runWorker(workerData) {
  return new Promise((resolve, reject) => {
    // Создаем новый поток с передачей данных
    const worker = new Worker("./worker.js", { workerData })

    // Обработка сообщений от воркера
    worker.on("message", resolve)

    // Обработка ошибок
    worker.on("error", reject)

    // Обработка завершения
    worker.on("exit", (code) => {
      if (code !== 0) reject(new Error(`Worker завершился с кодом выхода ${code}`))
    })
  })
}

// Запускаем несколько воркеров параллельно
async function main() {
  try {
    const results = await Promise.all([
      runWorker({ start: 0, end: 50000000 }),
      runWorker({ start: 50000000, end: 100000000 }),
      runWorker({ start: 100000000, end: 150000000 }),
      runWorker({ start: 150000000, end: 200000000 }),
    ])

    // Суммируем результаты
    const sum = results.reduce((acc, val) => acc + val, 0)
    console.log(`Результат: ${sum}`)
  } catch (err) {
    console.error(err)
  }
}

main()
```

**Файл Worker Thread (worker.js)**:

```javascript
const { parentPort, workerData } = require("worker_threads")

// Получаем данные из основного потока
const { start, end } = workerData

// Выполняем CPU-интенсивную операцию
let sum = 0
for (let i = start; i < end; i++) {
  sum += i
}

// Отправляем результат обратно
parentPort.postMessage(sum)
```

## Передача данных между потоками

Существует несколько способов передачи данных между Worker Threads:

1. **Клонирование** (по умолчанию):

```javascript
// В основном потоке
const worker = new Worker("./worker.js", {
  workerData: { complex: { data: [1, 2, 3] } },
})

// В worker.js
const { workerData } = require("worker_threads")
console.log(workerData.complex.data) // [1, 2, 3]
```

2. **Передача по ссылке** (возможно с типизированными массивами и некоторыми другими объектами):

```javascript
// В основном потоке
const buffer = new ArrayBuffer(16)
const view = new Uint32Array(buffer)
view[0] = 123

const worker = new Worker("./worker.js", {
  workerData: { buffer },
  transferList: [buffer],
})

// В worker.js
const { workerData } = require("worker_threads")
const view = new Uint32Array(workerData.buffer)
console.log(view[0]) // 123
view[0] = 456 // Изменяет данные в буфере
```

3. **Shared Memory** с использованием `SharedArrayBuffer`:

```javascript
// В основном потоке
const sharedBuffer = new SharedArrayBuffer(4)
const view = new Int32Array(sharedBuffer)

const worker = new Worker("./worker.js", {
  workerData: { sharedBuffer },
})

// В worker.js
const { workerData, parentPort } = require("worker_threads")
const view = new Int32Array(workerData.sharedBuffer)

// Атомарные операции для безопасного изменения данных
Atomics.add(view, 0, 42)
parentPort.postMessage("done")
```

## Пул Worker Threads

Для повышения эффективности можно создать пул Worker Threads:

```javascript
const { Worker } = require("worker_threads")
const os = require("os")

class WorkerPool {
  constructor(workerScript, numWorkers = os.cpus().length) {
    this.workers = []
    this.freeWorkers = []

    for (let i = 0; i < numWorkers; i++) {
      const worker = new Worker(workerScript)
      this.workers.push(worker)
      this.freeWorkers.push(worker)
    }
  }

  runTask(workerData) {
    return new Promise((resolve, reject) => {
      const worker = this.freeWorkers.pop()

      if (!worker) {
        reject(new Error("Нет свободных воркеров в пуле"))
        return
      }

      const messageCallback = (result) => {
        worker.removeAllListeners("message")
        worker.removeAllListeners("error")
        this.freeWorkers.push(worker)
        resolve(result)
      }

      const errorCallback = (error) => {
        worker.removeAllListeners("message")
        worker.removeAllListeners("error")
        this.freeWorkers.push(worker)
        reject(error)
      }

      worker.once("message", messageCallback)
      worker.once("error", errorCallback)
      worker.postMessage(workerData)
    })
  }

  close() {
    for (const worker of this.workers) {
      worker.terminate()
    }
  }
}

// Использование пула
const pool = new WorkerPool("./task-worker.js", 4)

async function runTasks() {
  const results = await Promise.all([
    pool.runTask({ data: "task1" }),
    pool.runTask({ data: "task2" }),
    pool.runTask({ data: "task3" }),
    pool.runTask({ data: "task4" }),
    pool.runTask({ data: "task5" }),
  ])

  console.log(results)
  pool.close()
}

runTasks().catch(console.error)
```

## Сравнение с другими подходами в Node.js

1. **Worker Threads vs Child Process**:

   - Worker Threads легче и имеют меньше накладных расходов
   - Worker Threads могут напрямую использовать общую память (SharedArrayBuffer)
   - Child Process лучше изолированы и могут выполнять разные программы

2. **Worker Threads vs Cluster**:

   - Cluster создает отдельные процессы Node.js для распределения сетевой нагрузки
   - Worker Threads создают отдельные потоки внутри одного процесса для CPU-задач
   - Cluster лучше подходит для масштабирования HTTP-серверов

3. **Worker Threads vs Асинхронное программирование**:
   - Асинхронное программирование подходит для I/O операций
   - Worker Threads подходят для CPU-интенсивных операций

## Ограничения и особенности

1. **Накладные расходы на создание потоков**: Создание Worker Thread занимает время
2. **Расход памяти**: Каждый поток требует дополнительной памяти (~5-10 МБ)
3. **Сложность отладки**: Отладка многопоточных программ сложнее
4. **Синхронизация**: При работе с общей памятью необходимо использовать атомарные операции
5. **Отсутствие разделяемого состояния**: Глобальные объекты и состояние не разделяются между потоками

---

[[002 Node.js|Назад]]
