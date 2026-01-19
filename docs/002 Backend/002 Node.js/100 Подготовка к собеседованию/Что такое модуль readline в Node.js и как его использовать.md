---
title: Что такое модуль readline в Node.js и как его использовать
draft: false
tags:
  - "#NodeJS"
  - "#readline"
  - "#интерактивный_ввод"
  - "#CLI"
  - "#консоль"
info:
  - "[Документация Node.js - Readline](https://nodejs.org/api/readline.html)"
  - "[Node.js - Readline Promises API](https://nodejs.org/api/readline.html#promises-api)"
---

![[node-readline.png|600]]

## Что такое модуль readline в Node.js

`readline` - это встроенный модуль Node.js, который предоставляет интерфейс для чтения данных из потока ввода (например, `process.stdin`) построчно. Этот модуль особенно полезен для создания приложений командной строки (CLI), которые принимают ввод от пользователя.

Основное назначение модуля `readline` - обработка ввода из консоли или файла по одной строке за раз, что делает его идеальным для:

- Создания интерактивных консольных приложений
- Разработки интерфейсов командной строки
- Чтения и обработки больших файлов по строкам
- Создания REPL (Read-Eval-Print Loop) окружений

## Основные концепции и функции

### 1. Создание интерфейса readline

```javascript
const readline = require("readline")

// Создание интерфейса для чтения/записи
const rl = readline.createInterface({
  input: process.stdin, // Источник ввода
  output: process.stdout, // Назначение вывода
})

// Использование интерфейса
rl.question("Как вас зовут? ", (answer) => {
  console.log(`Привет, ${answer}!`)

  // Важно закрыть интерфейс, когда он больше не нужен
  rl.close()
})
```

### 2. Методы для интерактивного взаимодействия

```javascript
const readline = require("readline")
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

// Метод question - задать вопрос и дождаться ответа
rl.question("Введите ваш возраст: ", (age) => {
  console.log(`Через 10 лет вам будет ${parseInt(age) + 10} лет`)

  // Продолжение диалога
  rl.question("Хотите продолжить? (да/нет) ", (answer) => {
    if (answer.toLowerCase() === "да") {
      console.log("Продолжаем!")
    } else {
      console.log("До свидания!")
      rl.close()
    }
  })
})

// Событие line - выполняется при вводе строки (нажатие Enter)
rl.on("line", (input) => {
  console.log(`Вы ввели: ${input}`)
})

// Событие close - выполняется при закрытии интерфейса
rl.on("close", () => {
  console.log("Интерфейс readline был закрыт")
})
```

### 3. Использование подсказок и настройка интерфейса

```javascript
const readline = require("readline")

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "Введите команду > ", // Настройка приглашения для ввода
  completer: (line) => {
    // Функция для автодополнения
    const commands = ["help", "hello", "exit", "history", "heapUsage"]
    const hits = commands.filter((c) => c.startsWith(line))
    return [hits.length ? hits : commands, line]
  },
})

// Отображение подсказки
rl.prompt()

// Обработка ввода
rl.on("line", (line) => {
  line = line.trim()

  if (line === "exit") {
    rl.close()
    return
  }

  if (line === "help") {
    console.log("Доступные команды: help, hello, exit, history")
  } else if (line === "hello") {
    console.log("Привет, мир!")
  } else if (line === "history") {
    console.log("История команд: ...")
  } else {
    console.log(`Неизвестная команда: ${line}`)
  }

  // Отображение подсказки снова
  rl.prompt()
})
```

## Практические примеры использования

### 1. Простое консольное меню

```javascript
const readline = require("readline")

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

// Функция для отображения меню
function showMenu() {
  console.log("\n==== МЕНЮ ====")
  console.log("1. Показать время")
  console.log("2. Показать дату")
  console.log("3. Калькулятор")
  console.log("0. Выход")
  rl.question("Выберите пункт меню: ", handleMenuChoice)
}

// Обработка выбора пользователя
function handleMenuChoice(choice) {
  switch (choice) {
    case "1":
      const now = new Date()
      console.log(`Текущее время: ${now.toLocaleTimeString()}`)
      showMenu()
      break
    case "2":
      const today = new Date()
      console.log(`Сегодня: ${today.toLocaleDateString()}`)
      showMenu()
      break
    case "3":
      rl.question("Введите выражение (например, 2 + 2): ", (expr) => {
        try {
          const result = eval(expr)
          console.log(`Результат: ${result}`)
        } catch (error) {
          console.log("Ошибка в выражении!")
        }
        showMenu()
      })
      break
    case "0":
      console.log("До свидания!")
      rl.close()
      break
    default:
      console.log("Неверный выбор. Пожалуйста, попробуйте снова.")
      showMenu()
      break
  }
}

// Запуск программы
console.log("Добро пожаловать в консольное приложение!")
showMenu()
```

### 2. Чтение файла по строкам

```javascript
const fs = require("fs")
const readline = require("readline")
const path = require("path")

// Создание интерфейса для чтения файла
function processFileByLines(filePath) {
  const fileStream = fs.createReadStream(filePath)

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity, // Распознавание всех видов конца строки
  })

  let lineCount = 0
  let totalBytes = 0

  // Обработка каждой строки
  rl.on("line", (line) => {
    lineCount++
    totalBytes += line.length + 1 // +1 для символа новой строки

    // Пример обработки: вывод номеров строк
    console.log(`Строка ${lineCount}: ${line.substring(0, 50)}${line.length > 50 ? "..." : ""}`)
  })

  // Завершение обработки
  rl.on("close", () => {
    console.log(`\nОбработка завершена. Всего строк: ${lineCount}, размер: ${totalBytes} байт`)
  })
}

// Пример использования
const filePath = path.join(__dirname, "example.txt")
processFileByLines(filePath)
```

### 3. Интерактивный чат-бот

```javascript
const readline = require("readline")

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "Вы: ",
})

// Простая база знаний для бота
const responses = {
  привет: ["Привет!", "Здравствуйте!", "Приветствую!"],
  "как дела": ["Всё отлично, спасибо!", "Хорошо, а у вас?", "Нормально, спасибо за вопрос."],
  пока: ["До свидания!", "Пока!", "До новых встреч!"],
  помощь: ["Я могу отвечать на простые вопросы. Попробуйте: 'привет', 'как дела', 'пока'."],
}

// Функция для получения случайного ответа
function getRandomResponse(keyword) {
  const options = responses[keyword] || [
    "Извините, я не понимаю. Напишите 'помощь' для списка команд.",
  ]
  const randomIndex = Math.floor(Math.random() * options.length)
  return options[randomIndex]
}

console.log("Чат-бот запущен. Напишите 'пока' для выхода.")
rl.prompt()

rl.on("line", (input) => {
  const text = input.trim().toLowerCase()

  if (text === "пока") {
    console.log("Бот: " + getRandomResponse("пока"))
    rl.close()
    return
  }

  // Поиск ключевого слова в базе знаний
  let responded = false
  for (const keyword in responses) {
    if (text.includes(keyword)) {
      console.log("Бот: " + getRandomResponse(keyword))
      responded = true
      break
    }
  }

  // Если не нашли соответствия
  if (!responded) {
    console.log("Бот: " + getRandomResponse())
  }

  rl.prompt()
})

rl.on("close", () => {
  console.log("\nЧат-бот выключен.")
})
```

## API на основе промисов (с Node.js 17+)

Начиная с Node.js 17+, модуль `readline` предоставляет API на основе промисов, который упрощает работу с асинхронным вводом:

```javascript
const { createInterface } = require("readline/promises")
const { stdin: input, stdout: output } = require("process")

async function askQuestions() {
  // Создание интерфейса с промисами
  const rl = createInterface({ input, output })

  try {
    // Последовательный ввод данных
    const name = await rl.question("Как вас зовут? ")
    console.log(`Привет, ${name}!`)

    const age = await rl.question("Сколько вам лет? ")
    console.log(`Через 5 лет вам будет ${parseInt(age) + 5}`)

    const favColor = await rl.question("Какой ваш любимый цвет? ")
    console.log(`${favColor} - отличный выбор!`)

    return { name, age, favColor }
  } finally {
    // Закрываем интерфейс в блоке finally, чтобы гарантировать закрытие
    rl.close()
  }
}

// Использование
askQuestions()
  .then((answers) => {
    console.log("\nСводка ответов:")
    console.log(answers)
  })
  .catch((err) => {
    console.error("Произошла ошибка:", err)
  })
```

## Расширенные возможности

### 1. Управление историей ввода

```javascript
const readline = require("readline")
const fs = require("fs")
const path = require("path")

// Путь для сохранения истории команд
const historyPath = path.join(__dirname, ".cli_history")

// Создание интерфейса с историей
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "> ",
  historySize: 100, // Размер истории в памяти
})

// Загрузка истории из файла
try {
  if (fs.existsSync(historyPath)) {
    const history = fs.readFileSync(historyPath, "utf8").split("\n")

    // Добавление истории в интерфейс
    history.forEach((command) => {
      if (command.trim()) {
        rl.history.push(command)
      }
    })

    console.log(`Загружено ${rl.history.length} команд из истории`)
  }
} catch (error) {
  console.log("Не удалось загрузить историю команд")
}

rl.prompt()

rl.on("line", (line) => {
  line = line.trim()

  if (line === "exit") {
    rl.close()
    return
  }

  if (line === "history") {
    // Отображение истории команд
    rl.history.forEach((cmd, i) => {
      console.log(`${i + 1}: ${cmd}`)
    })
  } else if (line) {
    console.log(`Выполнение: ${line}`)

    // Сохранение команды в файл истории
    fs.appendFileSync(historyPath, line + "\n")
  }

  rl.prompt()
})

rl.on("close", () => {
  console.log("Сеанс завершен")
})
```

### 2. Создание REPL для своего языка

```javascript
const readline = require("readline")

// Простая оценка математических выражений
function evaluate(expr) {
  try {
    // Безопасная оценка математических выражений
    // В реальном приложении следует использовать более безопасные методы
    const result = new Function("return " + expr)()
    return result
  } catch (error) {
    return `Ошибка: ${error.message}`
  }
}

function createRepl() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "math> ",
  })

  console.log("Простой математический REPL (введите 'exit' для выхода)")
  console.log("Поддерживаются основные математические операции")

  // Определение переменных для контекста
  let context = {
    last: 0,
    vars: {},
  }

  rl.prompt()

  rl.on("line", (line) => {
    line = line.trim()

    if (line.toLowerCase() === "exit") {
      rl.close()
      return
    }

    if (line === "clear") {
      console.clear()
      rl.prompt()
      return
    }

    if (line === "vars") {
      console.log("Переменные:", context.vars)
      rl.prompt()
      return
    }

    // Присваивание переменной
    if (line.includes("=")) {
      const [name, expr] = line.split("=").map((s) => s.trim())
      if (name && expr) {
        try {
          const result = evaluate(expr)
          context.vars[name] = result
          context.last = result
          console.log(`${name} = ${result}`)
        } catch (error) {
          console.error("Ошибка присваивания:", error.message)
        }
      }
    } else if (line) {
      // Вычисление выражения
      try {
        // Замена ссылок на переменные
        let processedLine = line
        for (const [name, value] of Object.entries(context.vars)) {
          processedLine = processedLine.replace(new RegExp(`\\b${name}\\b`, "g"), value)
        }

        const result = evaluate(processedLine)
        context.last = result
        console.log(`= ${result}`)
      } catch (error) {
        console.error("Ошибка вычисления:", error.message)
      }
    }

    rl.prompt()
  })

  rl.on("close", () => {
    console.log("\nREPL завершен")
  })
}

createRepl()
```

### 3. Мультистрочный ввод

```javascript
const readline = require("readline")

function multilineInput(prompt) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })

    console.log(prompt)
    console.log("(Введите пустую строку для завершения ввода)")

    const lines = []

    rl.prompt()

    rl.on("line", (line) => {
      if (line.trim() === "") {
        rl.close()
        return
      }

      lines.push(line)
      rl.prompt()
    })

    rl.on("close", () => {
      resolve(lines.join("\n"))
    })
  })
}

// Пример использования для создания простого текстового редактора
async function simpleEditor() {
  console.log("=== Простой текстовый редактор ===")

  const text = await multilineInput("Введите текст:")
  console.log("\n--- Результат ---")
  console.log(text)

  const filePath = await askQuestion("Сохранить в файл (путь или пусто для отмены): ")

  if (filePath.trim()) {
    const fs = require("fs")
    try {
      fs.writeFileSync(filePath, text)
      console.log(`Текст сохранен в ${filePath}`)
    } catch (error) {
      console.error(`Ошибка при сохранении: ${error.message}`)
    }
  } else {
    console.log("Сохранение отменено")
  }
}

// Вспомогательная функция для одиночного вопроса
function askQuestion(question) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })

    rl.question(question, (answer) => {
      rl.close()
      resolve(answer)
    })
  })
}

// Запуск редактора
simpleEditor()
```

## Лучшие практики

### 1. Правильное закрытие интерфейса

Всегда закрывайте интерфейс `readline` после использования, чтобы освободить ресурсы и позволить программе завершиться:

```javascript
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

// Использование...

// Закрытие
rl.close()

// С промисами и async/await
try {
  // Использование...
} finally {
  rl.close()
}
```

### 2. Обработка сигналов прерывания

```javascript
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

// Обработка Ctrl+C
rl.on("SIGINT", () => {
  console.log("\nПолучен сигнал прерывания (Ctrl+C)")
  console.log("Сохранение данных перед выходом...")

  // Любая логика очистки...

  console.log("Завершение работы.")
  rl.close()
})
```

### 3. Отделение логики от I/O

Хорошей практикой является отделение бизнес-логики от кода ввода-вывода:

```javascript
// chat-logic.js
class ChatBot {
  constructor() {
    this.responses = {
      привет: ["Привет!", "Здравствуйте!"],
      пока: ["До свидания!", "Пока!"],
    }
  }

  processInput(text) {
    text = text.toLowerCase().trim()

    for (const keyword in this.responses) {
      if (text.includes(keyword)) {
        const options = this.responses[keyword]
        return options[Math.floor(Math.random() * options.length)]
      }
    }

    return "Извините, я не понимаю."
  }
}

module.exports = ChatBot

// chat-cli.js
const readline = require("readline")
const ChatBot = require("./chat-logic")

const bot = new ChatBot()
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

console.log("Начните общение с ботом (напишите 'пока' для выхода)")
rl.prompt()

rl.on("line", (input) => {
  const response = bot.processInput(input)
  console.log(`Бот: ${response}`)

  if (input.toLowerCase().includes("пока")) {
    rl.close()
    return
  }

  rl.prompt()
})
```

## Заключение

Модуль `readline` в Node.js - это мощный инструмент для создания интерактивных консольных приложений и обработки ввода пользователя. Он предоставляет простой, но гибкий API для чтения данных построчно, что делает его незаменимым для разработки CLI-приложений, интерактивных скриптов и обработки текстовых файлов.

С появлением API на основе промисов работа с асинхронным вводом стала еще удобнее, обеспечивая более чистый и понятный код для сложных последовательностей ввода.

При правильном использовании модуль `readline` позволяет создавать удобные и отзывчивые консольные интерфейсы, которые значительно улучшают опыт пользователя в командной строке.

---

[[002 Node.js|Назад]]
