---
title: Что такое callback-функции и как они работают
draft: false
tags:
  - "#JavaScript"
  - "#NodeJS"
  - "#callback"
  - "#асинхронность"
  - "#функции"
info:
  - https://habr.com/ru/articles/151045/
  - https://learn.javascript.ru/callbacks
---

**Callback-функции** (функции обратного вызова) - это функции, которые передаются в качестве аргументов другим функциям и вызываются позже, обычно после завершения какой-либо операции.

Callback-функции являются фундаментальной концепцией в JavaScript и особенно важны в Node.js из-за его асинхронной природы.

### Как работают callback-функции:

1. **Передача функции как аргумента** - функция передается в другую функцию как параметр
2. **Выполнение в определенный момент** - вызывающая функция определяет, когда вызвать переданный callback
3. **Обработка результатов** - часто используются для обработки результатов асинхронных операций

### Пример синхронного callback:

```javascript
function greeting(name) {
  console.log(`Привет, ${name}!`)
}

function processUserInput(callback) {
  const name = "Иван"
  callback(name)
}

processUserInput(greeting) // Выведет: "Привет, Иван!"
```

### Пример асинхронного callback (в Node.js):

```javascript
const fs = require("fs")

fs.readFile("file.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Ошибка чтения файла:", err)
    return
  }
  console.log("Содержимое файла:", data)
})

console.log("Эта строка выполнится до завершения чтения файла")
```

В Node.js большинство встроенных API используют callbacks в стиле error-first, где первый параметр callback-функции — это объект ошибки (или null), а второй — результат операции.

Хотя callback-функции мощны, глубокая вложенность callbacks может привести к так называемому "callback hell" (или "пирамиде судьбы"), что делает код трудночитаемым. Современный JavaScript решает эту проблему с помощью Promises и async/await.

---

[[003 JSCore|Назад]]
