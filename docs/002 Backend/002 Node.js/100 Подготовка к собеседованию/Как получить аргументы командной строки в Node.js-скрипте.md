---
title: Как получить аргументы командной строки в Node.js-скрипте
draft: false
tags:
  - "#NodeJS"
  - "#командная-строка"
  - "#process"
  - "#аргументы"
  - "#yargs"
  - "#commander"
info:
  - "[Документация Node.js по объекту process](https://nodejs.org/api/process.html#process_process_argv)"
  - "[Работа с аргументами командной строки в Node.js](https://nodejs.org/en/knowledge/command-line/how-to-parse-command-line-arguments/)"
  - "[Библиотека yargs для работы с аргументами командной строки](https://github.com/yargs/yargs)"
---

В **Node.js** вы можете получить аргументы командной строки с помощью объекта **`process.argv`**. Этот объект представляет собой массив, который содержит все аргументы, переданные скрипту при его запуске.

### Как работает **`process.argv`**?

Массив **`process.argv`** содержит аргументы в следующем формате:

1. **`process.argv[0]`** — путь к Node.js исполняемому файлу (например, `/usr/local/bin/node`).
2. **`process.argv[1]`** — путь к исполняемому вашему Node.js-скрипту (например, `/path/to/your/script.js`).
3. **`process.argv[2]` и далее** — аргументы, переданные скрипту.

### Пример:

Запустим следующий скрипт `example.js`:

```javascript
// example.js
console.log(process.argv)
```

Запустив его с аргументами в командной строке:

```bash
node example.js arg1 arg2 arg3
```

Вывод будет таким:

```bash
[
  '/usr/local/bin/node',
  '/path/to/your/example.js',
  'arg1',
  'arg2',
  'arg3'
]
```

### Пример обработки аргументов:

Вы можете обрабатывать переданные аргументы, например, так:

```javascript
// example.js
const args = process.argv.slice(2) // Пропускаем первые два элемента (путь к node и скрипту)
console.log("Аргументы:", args)
```

Запустив скрипт:

```bash
node example.js arg1 arg2
```

Вывод:

```bash
Аргументы: [ 'arg1', 'arg2' ]
```

### Работа с флагами и параметрами:

Если вы хотите работать с флагами и параметрами, можно использовать парсинг аргументов вручную или с помощью специализированных библиотек, например, **`yargs`** или **`commander`**.

Пример с флагами:

```javascript
// example.js
const args = process.argv.slice(2)
const flag = args.includes("--flag")
console.log("Флаг передан:", flag)
```

Запустив:

```bash
node example.js --flag
```

Вывод:

```bash
Флаг передан: true
```

### Использование библиотеки **`yargs`**:

Если вы хотите более сложное управление аргументами командной строки, удобнее использовать библиотеки, такие как **`yargs`**. Она позволяет легко парсить аргументы, задавать флаги и параметры.

Установить **`yargs`**:

```bash
npm install yargs
```

Пример с **`yargs`**:

```javascript
// example.js
const yargs = require("yargs")

const argv = yargs.option("name", {
  alias: "n",
  description: "Your name",
  type: "string",
}).argv

console.log(`Hello, ${argv.name || "Guest"}!`)
```

Запуск:

```bash
node example.js --name=John
```

Вывод:

```bash
Hello, John!
```

### Заключение:

**`process.argv`** — это стандартный способ для получения аргументов командной строки в Node.js. Если вам нужно больше возможностей для обработки флагов и параметров, рассмотрите использование библиотек, таких как **`yargs`** или **`commander`**.

---

[[002 Node.js|Назад]]
