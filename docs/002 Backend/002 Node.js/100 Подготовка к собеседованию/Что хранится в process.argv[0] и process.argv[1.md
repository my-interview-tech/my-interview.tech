---
title: Что хранится в process.argv[0] и process.argv[1]
draft: false
tags:
  - "#NodeJS"
  - "#process"
  - "#argv"
  - "#командная-строка"
  - "#аргументы"
info:
  - "[Документация по process.argv](https://nodejs.org/api/process.html#processargv)"
  - "[Работа с аргументами командной строки в Node.js](https://nodejs.org/en/knowledge/command-line/how-to-parse-command-line-arguments/)"
  - "[Модуль process в Node.js](https://nodejs.org/api/process.html)"
---

В **`process.argv[0]`** и **`process.argv[1]`** хранятся следующие значения:

1. **`process.argv[0]`** — это путь к исполняемому файлу **Node.js**. Он указывает на то, где установлен Node.js на вашей системе.

   - Например, на Unix-подобных системах это может быть что-то вроде `/usr/local/bin/node`.
   - На Windows это может быть что-то вроде `C:\Program Files\nodejs\node.exe`.

2. **`process.argv[1]`** — это путь к вашему скрипту Node.js, который вы запустили.

   - Например, если вы запускаете скрипт `app.js`, то это будет путь к файлу, например `/path/to/your/app.js`.

### Пример:

Запустим следующий скрипт **`example.js`**:

```javascript
console.log(process.argv)
```

Запустив его с помощью команды:

```bash
node example.js arg1 arg2
```

Вы получите следующий вывод:

```javascript
;[
  "/usr/local/bin/node", // Путь к исполняемому файлу Node.js
  "/path/to/your/example.js", // Путь к вашему скрипту
  "arg1", // Переданный аргумент
  "arg2", // Переданный аргумент
]
```

### Резюме:

- **`process.argv[0]`** — путь к Node.js.
- **`process.argv[1]`** — путь к исполняемому скрипту.
- **`process.argv[2]` и далее** — переданные аргументы командной строки.

---

[[002 Node.js|Назад]]
