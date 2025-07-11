---
title: Модуль process в Node.js и управление процессом приложения
draft: false
tags:
  - "#NodeJS"
  - "#process"
  - "#переменные-окружения"
  - "#аргументы-командной-строки"
  - "#обработка-сигналов"
info:
---

`process` - это глобальный объект в Node.js, который предоставляет информацию о текущем процессе Node.js и позволяет управлять им. Объект `process` доступен глобально и не требует использования `require()`.

## Основные свойства модуля process

### Информация о среде выполнения

```javascript
// Путь к исполняемому файлу Node.js
console.log(process.execPath)
// например, '/usr/local/bin/node'

// Аргументы, с которыми запущен процесс Node.js
console.log(process.argv)
// ['node', '/path/to/script.js', 'arg1', 'arg2']

// Информация о версии Node.js и компонентах
console.log(process.versions)
// { node: '14.17.0', v8: '8.4.371.19', ... }

// Информация о платформе
console.log(process.platform)
// 'darwin', 'linux', 'win32' и т.д.

// Идентификатор процесса
console.log(process.pid)
// например, 12345

// Имя текущей директории
console.log(process.cwd())
// '/path/to/current/directory'

// Время работы процесса в секундах
console.log(process.uptime())
// например, 10.45
```

## Управление потоками ввода-вывода

### Стандартные потоки

```javascript
// Запись в стандартный вывод (stdout)
process.stdout.write("Привет, мир!\n")

// Запись в стандартный поток ошибок (stderr)
process.stderr.write("Произошла ошибка!\n")

// Чтение из стандартного ввода (stdin)
process.stdin.on("data", (data) => {
  console.log(`Получено: ${data}`)
})

// Установка кодировки для stdin
process.stdin.setEncoding("utf8")
```

### Перенаправление потоков

```javascript
// Перенаправление stdout в файл
const fs = require("fs")
const outStream = fs.createWriteStream("output.log")

// Сохраняем оригинальный stdout.write
const originalStdoutWrite = process.stdout.write

// Переопределяем stdout.write
process.stdout.write = function (chunk, encoding, callback) {
  // Записываем как в консоль, так и в файл
  originalStdoutWrite.apply(process.stdout, arguments)
  outStream.write(chunk, encoding)

  if (callback) callback()
}
```

## Переменные окружения

```javascript
// Доступ к переменным окружения
console.log(process.env.NODE_ENV)
console.log(process.env.PATH)

// Установка переменной окружения
process.env.MY_VARIABLE = "some value"
console.log(process.env.MY_VARIABLE) // 'some value'

// Безопасная работа с переменными окружения
const nodeEnv = process.env.NODE_ENV || "development"
console.log(`Текущее окружение: ${nodeEnv}`)
```

## Управление выходом и ошибками

```javascript
// Завершение процесса с кодом
process.exit(0) // Успешное завершение
process.exit(1) // Завершение с ошибкой

// Проверка наличия обработчиков необработанных исключений
if (!process.listenerCount("uncaughtException")) {
  // Установка обработчика необработанных исключений
  process.on("uncaughtException", (err) => {
    console.error("Необработанное исключение:", err)
    // Запись в лог, оповещение и т.д.

    // Завершение процесса с ошибкой
    process.exit(1)
  })
}

// Проверка наличия обработчиков отклоненных промисов
if (!process.listenerCount("unhandledRejection")) {
  // Установка обработчика отклоненных промисов
  process.on("unhandledRejection", (reason, promise) => {
    console.error("Необработанный reject:", reason)
    // В отличие от uncaughtException, process не завершается автоматически
  })
}
```

## Обработка сигналов

```javascript
// Обработка сигнала SIGINT (Ctrl+C)
process.on("SIGINT", () => {
  console.log("Получен SIGINT. Выполнение очистки...")
  // Закрытие соединений с БД, сохранение состояния и т.д.
  process.exit(0)
})

// Обработка сигнала SIGTERM (запрос на корректное завершение)
process.on("SIGTERM", () => {
  console.log("Получен SIGTERM. Завершение работы...")
  // Корректное завершение работы
  server.close(() => {
    console.log("Сервер остановлен")
    process.exit(0)
  })
})

// Важно: не все сигналы можно обработать,
// например, SIGKILL и SIGSTOP нельзя перехватить
```

## Использование аргументов командной строки

```javascript
// Получение аргументов командной строки
const args = process.argv.slice(2) // Убираем 'node' и путь к скрипту

console.log("Аргументы командной строки:", args)

// Парсинг аргументов командной строки
function parseArgs(args) {
  const options = {}
  const commands = []

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]

    if (arg.startsWith("--")) {
      // Опция с именем (--name=value or --name value)
      const match = arg.match(/^--([^=]+)(?:=(.*))?$/)
      if (match) {
        const [, name, value] = match
        if (value === undefined && i + 1 < args.length && !args[i + 1].startsWith("-")) {
          options[name] = args[++i]
        } else {
          options[name] = value || true
        }
      }
    } else if (arg.startsWith("-")) {
      // Короткая опция (-n value or -n)
      const name = arg.substring(1)
      if (i + 1 < args.length && !args[i + 1].startsWith("-")) {
        options[name] = args[++i]
      } else {
        options[name] = true
      }
    } else {
      // Команда
      commands.push(arg)
    }
  }

  return { options, commands }
}

const { options, commands } = parseArgs(args)
console.log("Опции:", options)
console.log("Команды:", commands)

// Использование:
// node script.js command --option1=value1 --option2 value2 -f -v
```

## Мониторинг использования ресурсов

```javascript
// Получение информации об использовании памяти
const memoryUsage = process.memoryUsage()
console.log("Использование памяти:")
console.log(`- Resident Set Size: ${memoryUsage.rss / 1024 / 1024} МБ`)
console.log(`- Heap Total: ${memoryUsage.heapTotal / 1024 / 1024} МБ`)
console.log(`- Heap Used: ${memoryUsage.heapUsed / 1024 / 1024} МБ`)
console.log(`- External: ${memoryUsage.external / 1024 / 1024} МБ`)

// Получение информации о загрузке CPU
const cpuUsage = process.cpuUsage()
console.log("Использование CPU:")
console.log(`- User CPU time: ${cpuUsage.user / 1000} мс`)
console.log(`- System CPU time: ${cpuUsage.system / 1000} мс`)

// Мониторинг использования ресурсов с течением времени
function monitorResources() {
  const initialCpuUsage = process.cpuUsage()
  const initialMemUsage = process.memoryUsage().heapUsed

  // Проверка каждые 5 секунд
  setInterval(() => {
    const currentCpuUsage = process.cpuUsage(initialCpuUsage)
    const currentMemUsage = process.memoryUsage().heapUsed

    console.log(
      `CPU: User ${currentCpuUsage.user / 1000}ms, System ${currentCpuUsage.system / 1000}ms`,
    )
    console.log(`Memory: ${(currentMemUsage - initialMemUsage) / 1024 / 1024} МБ`)
  }, 5000)
}

// Запуск мониторинга
// monitorResources();
```

## Работа с несколькими процессами

```javascript
const { fork } = require("child_process")

// Создание дочернего процесса
const child = fork("child-process.js")

// Отправка сообщения дочернему процессу
child.send({ cmd: "start", data: { param: "value" } })

// Получение сообщения от дочернего процесса
child.on("message", (message) => {
  console.log("Сообщение от дочернего процесса:", message)
})

// Обработка выхода дочернего процесса
child.on("exit", (code) => {
  console.log(`Дочерний процесс завершился с кодом ${code}`)
})

// В дочернем процессе (child-process.js):
/*
process.on('message', (message) => {
  console.log('Получено сообщение от родительского процесса:', message);
  
  // Обработка сообщения
  if (message.cmd === 'start') {
    // ... выполнение задачи ...
    
    // Отправка результата обратно родительскому процессу
    process.send({ result: 'success', data: { /* ... */ /* } });
  }
});
*/
```

## Работа с NextTick и микрозадачами

```javascript
// process.nextTick добавляет колбэк в "nextTick queue"
// Эта очередь обрабатывается после текущей операции и перед событийным циклом
console.log("Начало")

process.nextTick(() => {
  console.log("NextTick callback")
})

console.log("Запланировано")

// Вывод:
// Начало
// Запланировано
// NextTick callback

// Сравнение с Promise (микрозадачи) и setTimeout (макрозадачи)
console.log("Начало")

process.nextTick(() => console.log("NextTick 1"))
Promise.resolve().then(() => console.log("Promise 1"))
setTimeout(() => console.log("setTimeout 1"), 0)
process.nextTick(() => console.log("NextTick 2"))
Promise.resolve().then(() => console.log("Promise 2"))
setTimeout(() => console.log("setTimeout 2"), 0)

console.log("Конец")

// Вывод:
// Начало
// Конец
// NextTick 1
// NextTick 2
// Promise 1
// Promise 2
// setTimeout 1
// setTimeout 2
```

## Обработка завершения процесса

```javascript
// Перехват 'exit' события
process.on("exit", (code) => {
  // Обратите внимание, что здесь можно использовать только синхронные операции
  console.log(`Процесс завершается с кодом ${code}`)
})

// Перехват 'beforeExit' события
process.on("beforeExit", (code) => {
  // Здесь можно использовать асинхронные операции
  console.log(`Процесс готовится к завершению с кодом ${code}`)

  // Запуск асинхронной операции предотвратит выход процесса
  setTimeout(() => {
    console.log("Это выполнится перед завершением")
  }, 100)
})

// Важно: 'beforeExit' не сработает при явном вызове process.exit()
// или при фатальных ошибках
```

## Практические примеры

### Реализация graceful shutdown для HTTP-сервера

```javascript
const http = require("http")

const server = http.createServer((req, res) => {
  res.writeHead(200)
  res.end("Привет, мир!")
})

server.listen(3000, () => {
  console.log("Сервер запущен на порту 3000")
})

// Активные соединения
let connections = []

// Отслеживание соединений
server.on("connection", (connection) => {
  connections.push(connection)

  connection.on("close", () => {
    connections = connections.filter((c) => c !== connection)
  })
})

// Функция плавного завершения
function gracefulShutdown() {
  console.log("Получен сигнал на завершение. Закрытие сервера...")

  // Прекращаем принимать новые соединения
  server.close(() => {
    console.log("Сервер закрыт")
    process.exit(0)
  })

  // Если соединения не закрываются в течение 10 секунд, принудительно завершаем
  setTimeout(() => {
    console.log("Принудительное закрытие соединений")

    // Закрытие всех сохраненных соединений
    connections.forEach((connection) => connection.destroy())

    process.exit(1)
  }, 10000)
}

// Обработка сигналов
process.on("SIGTERM", gracefulShutdown)
process.on("SIGINT", gracefulShutdown)
```

### Обработка аргументов командной строки с помощью внешней библиотеки

```javascript
// Пример с использованием популярной библиотеки yargs
// npm install yargs
const yargs = require("yargs")

const argv = yargs
  .usage("Использование: $0 [опции] <команда>")
  .example("$0 --port 3000 start", "Запуск сервера на порту 3000")
  .option("port", {
    alias: "p",
    description: "Порт для сервера",
    type: "number",
    default: 8080,
  })
  .option("verbose", {
    alias: "v",
    description: "Подробный вывод",
    type: "boolean",
  })
  .command("start", "Запуск сервера", {}, (argv) => {
    console.log(`Запуск сервера на порту ${argv.port}`)
    if (argv.verbose) {
      console.log("Режим подробного вывода включен")
    }
  })
  .command("stop", "Остановка сервера", {}, (argv) => {
    console.log("Остановка сервера")
  })
  .demandCommand(1, "Укажите команду")
  .help()
  .alias("help", "h").argv

// Пример запуска:
// node script.js start --port 3000 --verbose
```

## Отладка процесса Node.js

```javascript
// Запуск отладчика при необходимости
if (process.argv.includes("--debug")) {
  // Установка точки останова
  debugger

  // Код для отладки
  const someVariable = "test"
  console.log(someVariable)
}

// Получение трассировки стека
function getStackTrace() {
  const obj = {}
  Error.captureStackTrace(obj, getStackTrace)
  return obj.stack
}

console.log(getStackTrace())

// Запись дампа кучи
// Требует модуля v8
const v8 = require("v8")
const fs = require("fs")

// Запись дампа кучи в файл
function writeHeapSnapshot() {
  const filename = `heap-${Date.now()}.heapsnapshot`
  const snapshotStream = v8.getHeapSnapshot()
  const fileStream = fs.createWriteStream(filename)
  snapshotStream.pipe(fileStream)
  return new Promise((resolve, reject) => {
    fileStream.on("finish", () => resolve(filename))
    fileStream.on("error", reject)
  })
}

// Запись дампа кучи по требованию
process.on("SIGUSR2", async () => {
  try {
    console.log("Запись дампа кучи...")
    const filename = await writeHeapSnapshot()
    console.log(`Дамп кучи записан в ${filename}`)
  } catch (err) {
    console.error("Ошибка при записи дампа кучи:", err)
  }
})
```

## Заключение

Модуль `process` в Node.js предоставляет мощные возможности для управления процессом приложения:

1. **Доступ к информации о среде выполнения** - получение данных о версии Node.js, аргументах командной строки, переменных окружения и т.д.
2. **Управление процессом** - обработка сигналов, корректное завершение, обработка ошибок.
3. **Работа с потоками ввода-вывода** - управление стандартными потоками stdin, stdout и stderr.
4. **Мониторинг ресурсов** - отслеживание использования памяти и CPU.

Правильное использование возможностей модуля `process` позволяет создавать надежные и отказоустойчивые приложения на Node.js, которые корректно обрабатывают ошибки, сигналы операционной системы и эффективно используют системные ресурсы.

---

[[Назад]]
