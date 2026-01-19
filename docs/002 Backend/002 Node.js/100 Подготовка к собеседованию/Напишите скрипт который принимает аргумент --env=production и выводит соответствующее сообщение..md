---
title: Напишите скрипт который принимает аргумент --env=production и выводит соответствующее сообщение
draft: false
tags:
  - "#NodeJS"
  - "#CLI"
  - "#аргументы-командной-строки"
  - "#process.argv"
  - "#скрипты"
info:
  - https://nodejs.org/api/process.html#processargv
  - https://habr.com/ru/articles/736756/
---

# Обработка аргументов командной строки в Node.js

В Node.js существует несколько способов обработки аргументов командной строки. Рассмотрим различные подходы, начиная от базового использования `process.argv` до более продвинутых библиотек.

## Вариант 1: Использование process.argv

Простейший способ обработки аргументов — анализ массива `process.argv`. Этот массив содержит все аргументы командной строки, где первые два элемента:

1. Путь к исполняемому файлу Node.js
2. Путь к исполняемому скрипту

Следующие элементы — это переданные аргументы.

```javascript
// script.js
const args = process.argv.slice(2) // Отбрасываем первые два элемента

// Функция для поиска аргумента по имени
function getArgValue(argName) {
  for (const arg of args) {
    // Проверяем аргумент формата --имя=значение
    if (arg.startsWith(`--${argName}=`)) {
      return arg.split("=")[1]
    }
    // Проверяем аргумент формата --имя значение
    if (arg === `--${argName}` && args.indexOf(arg) < args.length - 1) {
      return args[args.indexOf(arg) + 1]
    }
  }
  return null
}

// Получаем значение --env
const env = getArgValue("env")

if (env === "production") {
  console.log("Запуск в производственном режиме")
} else if (env === "development") {
  console.log("Запуск в режиме разработки")
} else {
  console.log("Среда выполнения не указана или неизвестна")
}

// Вывести все полученные аргументы
console.log("Все аргументы:", args)
```

Запуск этого скрипта:

```bash
node script.js --env=production
# Вывод: Запуск в производственном режиме
```

## Вариант 2: Использование библиотеки minimist

Библиотека `minimist` упрощает парсинг аргументов командной строки:

```javascript
// Сначала устанавливаем библиотеку
// npm install minimist

// script-minimist.js
const minimist = require("minimist")

// Парсим аргументы
const args = minimist(process.argv.slice(2))

// Получаем значение аргумента env
const env = args.env

if (env === "production") {
  console.log("Запуск в производственном режиме")
} else if (env === "development") {
  console.log("Запуск в режиме разработки")
} else {
  console.log("Среда выполнения не указана или неизвестна")
}

// Вывести все полученные аргументы в структурированном виде
console.log("Параметры:", args)
```

Запуск:

```bash
node script-minimist.js --env=production
# Или
node script-minimist.js --env production
```

## Вариант 3: Использование yargs для создания полноценного CLI

Библиотека `yargs` предоставляет расширенные возможности для создания CLI-приложений:

```javascript
// Сначала устанавливаем библиотеку
// npm install yargs

// script-yargs.js
const yargs = require("yargs")

// Определяем и парсим аргументы
const argv = yargs
  .option("env", {
    alias: "e",
    description: "Среда выполнения",
    type: "string",
    choices: ["development", "production", "testing"],
    demandOption: true,
  })
  .help()
  .alias("help", "h").argv

// Получаем значение env
const env = argv.env

// Выводим сообщение в зависимости от значения
switch (env) {
  case "production":
    console.log("Запуск в производственном режиме")
    break
  case "development":
    console.log("Запуск в режиме разработки")
    break
  case "testing":
    console.log("Запуск в тестовом режиме")
    break
  default:
    console.log("Неизвестный режим запуска")
}
```

Запуск:

```bash
node script-yargs.js --env production
# Или сокращенно
node script-yargs.js -e production
```

## Вариант 4: Использование commander.js

Библиотека `commander` также популярна для создания CLI-приложений:

```javascript
// Сначала устанавливаем библиотеку
// npm install commander

// script-commander.js
const { program } = require("commander")

// Определяем параметры
program
  .option("-e, --env <type>", "среда выполнения (development, production, testing)")
  .parse(process.argv)

const options = program.opts()
const env = options.env

if (env === "production") {
  console.log("Запуск в производственном режиме")
} else if (env === "development") {
  console.log("Запуск в режиме разработки")
} else if (env === "testing") {
  console.log("Запуск в тестовом режиме")
} else {
  console.log("Среда выполнения не указана или неизвестна")
}
```

Запуск:

```bash
node script-commander.js --env production
# Или сокращенно
node script-commander.js -e production
```

## Лучшие практики обработки аргументов

1. **Предоставляйте справку**: Обязательно добавляйте команду `--help` или `-h` для отображения справки.
2. **Используйте короткие и длинные формы**: Для удобства предлагайте оба варианта (например, `-e` и `--env`).
3. **Проверяйте ввод**: Валидируйте значения аргументов перед использованием.
4. **Устанавливайте значения по умолчанию**: Если аргумент не передан, используйте разумные значения по умолчанию.
5. **Группируйте связанные аргументы**: Организуйте аргументы в логические группы для улучшения пользовательского опыта.

Для большинства простых сценариев достаточно использовать `process.argv` напрямую, но для более сложных CLI-приложений рекомендуется применять специализированные библиотеки.

---

[[003 JSCore|Назад]]
