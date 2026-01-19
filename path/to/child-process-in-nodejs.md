---
title: Модуль child_process в Node.js и работа с дочерними процессами
draft: false
tags:
  - "#NodeJS"
  - "#child_process"
  - "#процессы"
  - "#масштабирование"
  - "#межпроцессное_взаимодействие"
info:
---

`child_process` - это встроенный модуль Node.js, который предоставляет возможность создавать дочерние процессы. Модуль позволяет выполнять команды оболочки, запускать внешние программы и взаимодействовать с ними из основного Node.js процесса.

## Основные методы модуля child_process

### spawn()

Метод `spawn()` запускает новый процесс с указанной командой и возвращает экземпляр класса `ChildProcess`.

```javascript
const { spawn } = require("child_process")

// Запуск процесса ls с аргументами -la
const ls = spawn("ls", ["-la"])

// Обработка потоков вывода
ls.stdout.on("data", (data) => {
  console.log(`stdout: ${data}`)
})

ls.stderr.on("data", (data) => {
  console.error(`stderr: ${data}`)
})

ls.on("close", (code) => {
  console.log(`Процесс завершился с кодом ${code}`)
})
```

### exec()

Метод `exec()` запускает команду оболочки и буферизирует вывод, который передается в колбэк.

```javascript
const { exec } = require("child_process")

exec("ls -la", (error, stdout, stderr) => {
  if (error) {
    console.error(`Ошибка выполнения: ${error}`)
    return
  }

  console.log(`stdout: ${stdout}`)
  console.error(`stderr: ${stderr}`)
})
```

### execFile()

Метод `execFile()` запускает исполняемый файл напрямую (без оболочки).

```javascript
const { execFile } = require("child_process")

execFile("node", ["--version"], (error, stdout, stderr) => {
  if (error) {
    console.error(`Ошибка выполнения: ${error}`)
    return
  }

  console.log(`Версия Node.js: ${stdout.trim()}`)
})
```

### fork()

Метод `fork()` - это специализированный вариант `spawn()` для создания новых процессов Node.js. Дочерний процесс имеет встроенный коммуникационный канал с родительским.

```javascript
// parent.js
const { fork } = require("child_process")

// Запуск child.js как отдельного процесса
const child = fork("child.js")

// Отправка сообщения дочернему процессу
child.send({ message: "Привет от родительского процесса" })

// Получение сообщения от дочернего процесса
child.on("message", (message) => {
  console.log("Получено от дочернего процесса:", message)
})

// Обработка завершения дочернего процесса
child.on("exit", (code) => {
  console.log(`Дочерний процесс завершился с кодом ${code}`)
})
```

```javascript
// child.js
process.on("message", (message) => {
  console.log("Получено от родительского процесса:", message)

  // Отправка ответа родительскому процессу
  process.send({ response: "Привет от дочернего процесса" })
})

// Эмуляция длительной задачи
setTimeout(() => {
  process.exit(0) // Завершение процесса с кодом 0 (успешно)
}, 3000)
```

## Синхронные методы

Модуль `child_process` также предоставляет синхронные версии методов, которые блокируют основной поток выполнения до завершения дочернего процесса.

```javascript
const { spawnSync, execSync, execFileSync } = require("child_process")

// Синхронный spawn
const result = spawnSync("ls", ["-la"])
console.log(result.stdout.toString())

// Синхронный exec
try {
  const stdout = execSync("ls -la")
  console.log(stdout.toString())
} catch (error) {
  console.error("Ошибка выполнения:", error)
}

// Синхронный execFile
const output = execFileSync("node", ["--version"])
console.log(`Версия Node.js: ${output.toString().trim()}`)
```

## Сравнение методов

| Метод        | Оболочка | Буферизация | Максимальный размер | Использование                          |
| ------------ | -------- | ----------- | ------------------- | -------------------------------------- |
| `spawn()`    | Нет      | Нет         | Не ограничен        | Долговременные процессы, большой вывод |
| `exec()`     | Да       | Да          | 1 МБ (по умолчанию) | Короткие команды оболочки              |
| `execFile()` | Нет      | Да          | 1 МБ (по умолчанию) | Исполняемые файлы с небольшим выводом  |
| `fork()`     | Нет      | Нет         | Не ограничен        | Node.js процессы с коммуникацией       |

## Передача данных через stdin

```javascript
const { spawn } = require("child_process")

// Запуск процесса grep для поиска строки
const grep = spawn("grep", ["keyword"])

// Отправка данных в stdin процесса
grep.stdin.write("keyword found here\n")
grep.stdin.write("another line\n")
grep.stdin.end() // Закрытие потока stdin

// Обработка stdout
grep.stdout.on("data", (data) => {
  console.log(`Найдено: ${data}`)
})
```

## Перенаправление потоков ввода-вывода

```javascript
const { spawn } = require("child_process")
const fs = require("fs")

// Создание файла для записи вывода
const outputFile = fs.createWriteStream("output.txt")

// Создание файла для записи ошибок
const errorFile = fs.createWriteStream("error.txt")

// Запуск процесса с перенаправлением потоков
const process = spawn("ls", ["-la"], {
  stdio: [
    "ignore", // stdin (игнорировать)
    "pipe", // stdout (канал)
    "pipe", // stderr (канал)
  ],
})

// Перенаправление stdout в файл
process.stdout.pipe(outputFile)

// Перенаправление stderr в файл
process.stderr.pipe(errorFile)

process.on("close", (code) => {
  console.log(`Процесс завершился с кодом ${code}`)
})
```

## Запуск команды в оболочке

```javascript
const { spawn } = require("child_process")

// Запуск команды с использованием оболочки
const process = spawn('find . -name "*.js" | xargs grep "console.log"', {
  shell: true,
})

process.stdout.on("data", (data) => {
  console.log(`stdout: ${data}`)
})
```

## Конвейер процессов (pipeline)

```javascript
const { spawn } = require("child_process")

// Запуск первого процесса
const find = spawn("find", [".", "-name", "*.js"])

// Запуск второго процесса
const grep = spawn("grep", ["require"])

// Связывание выхода первого процесса со входом второго
find.stdout.pipe(grep.stdin)

// Обработка вывода последнего процесса
grep.stdout.on("data", (data) => {
  console.log(`Найдено: ${data}`)
})

// Обработка ошибок
find.stderr.on("data", (data) => {
  console.error(`find stderr: ${data}`)
})

grep.stderr.on("data", (data) => {
  console.error(`grep stderr: ${data}`)
})

// Обработка завершения процессов
grep.on("close", (code) => {
  console.log(`grep завершился с кодом ${code}`)
})

find.on("close", (code) => {
  console.log(`find завершился с кодом ${code}`)

  // Закрываем stdin второго процесса, когда первый завершился
  grep.stdin.end()
})
```

## Настройка окружения и рабочей директории

```javascript
const { spawn } = require("child_process")

// Запуск процесса с дополнительными параметрами
const process = spawn("node", ["script.js"], {
  // Рабочая директория для процесса
  cwd: "/path/to/working/directory",

  // Переменные окружения
  env: { ...process.env, NODE_ENV: "production" },

  // Использовать оболочку
  shell: true,

  // Установить UID и GID для процесса (только на POSIX)
  uid: 1000,
  gid: 1000,

  // Перенаправление потоков
  stdio: "inherit", // Использовать те же потоки, что и родительский процесс
})
```

## Обработка ошибок и таймауты

```javascript
const { exec } = require("child_process")

// Выполнение команды с таймаутом
const child = exec('sleep 10 && echo "Готово"', { timeout: 5000 }, (error, stdout, stderr) => {
  if (error) {
    console.error(`Ошибка: ${error.message}`)
    return
  }
  console.log(`stdout: ${stdout}`)
})

// Обработка ошибок запуска процесса
child.on("error", (error) => {
  console.error(`Не удалось запустить процесс: ${error.message}`)
})
```

## Кластеризация приложения

Для масштабирования приложения на многоядерных системах можно использовать модуль `cluster`, который основан на `child_process`:

```javascript
const cluster = require("cluster")
const http = require("http")
const numCPUs = require("os").cpus().length

if (cluster.isMaster) {
  console.log(`Мастер-процесс ${process.pid} запущен`)

  // Создание рабочих процессов по числу ядер
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Рабочий процесс ${worker.process.pid} завершился`)
    // Можно перезапустить упавший процесс
    cluster.fork()
  })
} else {
  // Рабочие процессы разделяют TCP-соединение
  http
    .createServer((req, res) => {
      res.writeHead(200)
      res.end(`Привет от процесса ${process.pid}\n`)
    })
    .listen(8000)

  console.log(`Рабочий процесс ${process.pid} запущен`)
}
```

## Примеры практического использования

### Выполнение длительных задач в фоне

```javascript
const { fork } = require("child_process")
const path = require("path")

function processLargeData(data) {
  return new Promise((resolve, reject) => {
    // Путь к скрипту обработки данных
    const processPath = path.join(__dirname, "dataProcessor.js")

    // Запуск скрипта в отдельном процессе
    const child = fork(processPath)

    // Отправка данных для обработки
    child.send({ data })

    // Получение результата
    child.on("message", (result) => {
      resolve(result)
    })

    // Обработка ошибок
    child.on("error", (error) => {
      reject(error)
    })

    // Обработка неожиданного завершения
    child.on("exit", (code) => {
      if (code !== 0) {
        reject(new Error(`Процесс завершился с кодом ${code}`))
      }
    })
  })
}

// Использование функции
async function main() {
  try {
    const result = await processLargeData([1, 2, 3, 4, 5])
    console.log("Результат обработки:", result)
  } catch (error) {
    console.error("Ошибка:", error)
  }
}

main()
```

```javascript
// dataProcessor.js
process.on("message", ({ data }) => {
  // Симуляция тяжелой обработки
  console.log("Начинаем обработку данных:", data)

  // Сложные вычисления
  const result = data.map((item) => item * 2)

  // Отправка результата обратно родительскому процессу
  process.send({ result })

  // Завершение процесса
  process.exit(0)
})
```

### Запуск команд с правами администратора

```javascript
const { spawn } = require("child_process")
const sudo = require("sudo-prompt") // Необходимо установить пакет

// Вариант 1: с использованием sudo-prompt (для GUI)
sudo.exec(
  "apt-get update",
  {
    name: "Мое приложение",
  },
  (error, stdout, stderr) => {
    if (error) throw error
    console.log("stdout:", stdout)
  },
)

// Вариант 2: для CLI приложений
const childProcess = spawn("sudo", ["apt-get", "update"], {
  stdio: "inherit", // Перенаправить потоки консоли
})

childProcess.on("close", (code) => {
  console.log(`Процесс завершился с кодом ${code}`)
})
```

### Обработка большого количества данных

```javascript
const { Worker, isMainThread, parentPort, workerData } = require("worker_threads")
const { fork } = require("child_process")

// Функция для распараллеливания обработки массива данных
function processDataInParallel(data, numWorkers = 4) {
  return new Promise((resolve, reject) => {
    // Если массив небольшой, обрабатываем в текущем процессе
    if (data.length <= 1000 || numWorkers <= 1) {
      try {
        const result = processChunk(data)
        resolve(result)
      } catch (error) {
        reject(error)
      }
      return
    }

    // Разделяем данные на примерно равные части
    const chunkSize = Math.ceil(data.length / numWorkers)
    const chunks = []

    for (let i = 0; i < numWorkers; i++) {
      const start = i * chunkSize
      const end = Math.min(start + chunkSize, data.length)
      chunks.push(data.slice(start, end))
    }

    // Массив для хранения воркеров
    const workers = []
    // Массив для хранения результатов
    const results = new Array(numWorkers)
    // Счетчик завершенных воркеров
    let completed = 0

    // Создаем и запускаем воркеры
    for (let i = 0; i < numWorkers; i++) {
      const worker = fork("./dataChunkProcessor.js")
      workers.push(worker)

      // Отправляем данные воркеру
      worker.send({ id: i, chunk: chunks[i] })

      // Получаем результаты
      worker.on("message", (message) => {
        results[message.id] = message.result
        completed++

        // Если все воркеры завершены, объединяем результаты
        if (completed === numWorkers) {
          // Объединение всех результатов
          const combinedResult = combineResults(results)
          resolve(combinedResult)

          // Закрываем все воркеры
          workers.forEach((w) => w.kill())
        }
      })

      // Обработка ошибок
      worker.on("error", (error) => {
        workers.forEach((w) => w.kill())
        reject(error)
      })

      worker.on("exit", (code) => {
        if (code !== 0) {
          reject(new Error(`Воркер завершился с кодом ${code}`))
          workers.forEach((w) => w.kill())
        }
      })
    }
  })
}

// Пример функции обработки чанка данных
function processChunk(chunk) {
  return chunk.map((item) => item * 2)
}

// Пример функции объединения результатов
function combineResults(results) {
  return results.flat()
}

// Использование
async function main() {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i)

  console.time("parallel")
  try {
    const result = await processDataInParallel(largeArray)
    console.log(`Обработано ${result.length} элементов`)
  } catch (error) {
    console.error("Ошибка:", error)
  }
  console.timeEnd("parallel")
}

main()
```

```javascript
// dataChunkProcessor.js
process.on("message", ({ id, chunk }) => {
  // Обработка данных
  const result = chunk.map((item) => item * 2)

  // Отправка результата родительскому процессу
  process.send({ id, result })

  // Завершение процесса
  process.exit(0)
})
```

## Особенности и лучшие практики использования child_process

### Безопасность

При выполнении команд, полученных от пользователей, всегда существует риск инъекций команд. Для предотвращения этого:

```javascript
const { execFile } = require("child_process")

// Небезопасно: прямое использование пользовательского ввода
// exec(`ls ${userInput}`, callback) // ОПАСНО!

// Безопасно: передача аргументов как отдельных параметров
execFile("ls", [userInput], callback) // Более безопасно
```

### Управление ресурсами

Дочерние процессы потребляют ресурсы системы. Создание слишком большого количества процессов может привести к снижению производительности:

```javascript
const { spawn } = require("child_process")

// Пул дочерних процессов с ограничением
class ProcessPool {
  constructor(maxWorkers) {
    this.maxWorkers = maxWorkers
    this.workers = []
    this.queue = []
  }

  runTask(command, args) {
    return new Promise((resolve, reject) => {
      const task = { command, args, resolve, reject }

      if (this.workers.length < this.maxWorkers) {
        this.startWorker(task)
      } else {
        this.queue.push(task)
      }
    })
  }

  startWorker(task) {
    const { command, args, resolve, reject } = task

    const worker = spawn(command, args)
    const workerId = this.workers.length

    let stdoutData = ""
    let stderrData = ""

    worker.stdout.on("data", (data) => {
      stdoutData += data
    })

    worker.stderr.on("data", (data) => {
      stderrData += data
    })

    worker.on("close", (code) => {
      // Удаляем работника из списка активных
      this.workers = this.workers.filter((_, i) => i !== workerId)

      // Запускаем следующую задачу, если есть
      if (this.queue.length > 0) {
        this.startWorker(this.queue.shift())
      }

      // Разрешаем или отклоняем обещание
      if (code === 0) {
        resolve({ stdout: stdoutData, stderr: stderrData })
      } else {
        reject(new Error(`Process exited with code ${code}\n${stderrData}`))
      }
    })

    worker.on("error", reject)

    // Добавляем воркера в пул
    this.workers.push(worker)
  }
}

// Использование пула
const pool = new ProcessPool(4) // Максимум 4 одновременных процесса

async function runTasks() {
  const tasks = [
    ["ls", ["-la", "/"]],
    ["find", [".", "-name", "*.js"]],
    ["grep", ["-r", "function", "."]],
    ["ps", ["aux"]],
    ["cat", ["/etc/passwd"]],
    ["df", ["-h"]],
  ]

  const results = await Promise.all(tasks.map(([cmd, args]) => pool.runTask(cmd, args)))
  return results
}

runTasks()
  .then((results) => {
    results.forEach((result, i) => {
      console.log(`Task ${i + 1} stdout:`, result.stdout)
    })
  })
  .catch((err) => console.error("Error:", err))
```

### Обработка ошибок

Важно всегда обрабатывать возможные ошибки при работе с дочерними процессами:

```javascript
// Полная обработка ошибок при запуске процесса
function runCommand(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args)

    let stdout = ""
    let stderr = ""

    child.stdout.on("data", (data) => {
      stdout += data
    })

    child.stderr.on("data", (data) => {
      stderr += data
    })

    child.on("error", (error) => {
      // Ошибка при запуске процесса
      reject(new Error(`Failed to start process: ${error.message}`))
    })

    child.on("close", (code, signal) => {
      if (code === 0) {
        resolve(stdout)
      } else if (signal) {
        reject(new Error(`Process terminated with signal: ${signal}`))
      } else {
        reject(new Error(`Process exited with code: ${code}\nStderr: ${stderr}`))
      }
    })

    // Обработка тайм-аута (опционально)
    const timeout = setTimeout(() => {
      child.kill() // Завершаем процесс
      reject(new Error("Process timed out"))
    }, 30000) // 30 секунд

    // Очистка таймера после завершения
    child.on("close", () => clearTimeout(timeout))
  })
}

// Использование с обработкой ошибок
runCommand("non-existing-command", [])
  .then((output) => console.log("Output:", output))
  .catch((error) => {
    console.error("Error occurred:", error.message)
    // Обработка конкретных ошибок
    if (error.message.includes("Failed to start process")) {
      console.error("The command could not be found or executed")
    }
  })
```

## Заключение

Модуль `child_process` является мощным инструментом в Node.js для создания масштабируемых приложений и интеграции с внешними программами. Он позволяет:

1. **Запускать внешние программы и команды** из Node.js приложения
2. **Распараллеливать вычисления** на многоядерных системах
3. **Выполнять ресурсоемкие задачи** в отдельных процессах
4. **Взаимодействовать с операционной системой** на низком уровне
5. **Создавать сложные конвейеры обработки данных** с использованием стандартных утилит

При использовании модуля важно соблюдать безопасность, правильно управлять ресурсами и обрабатывать возможные ошибки, чтобы создавать надежные и эффективные приложения.

---

[[Назад]]
