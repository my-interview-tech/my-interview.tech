---
title: Как работает модуль path в Node.js Почему он полезен
draft: false
tags:
  - "#NodeJS"
  - "#path"
  - "#filesystem"
  - "#backend"
  - "#кросс-платформенность"
info:
  - "[Документация Node.js - Path](https://nodejs.org/api/path.html)"
  - "[Node.js path module - W3Schools](https://www.w3schools.com/nodejs/ref_path.asp)"
---

![[Pasted image node-path.png|600]]

## Что такое модуль path в Node.js

`path` - это встроенный модуль Node.js, который предоставляет утилиты для работы с путями к файлам и директориям. Он помогает решать проблемы с разными форматами путей в разных операционных системах и обеспечивает кросс-платформенную совместимость кода.

## Почему модуль path полезен

1. **Кросс-платформенность**: Автоматически обрабатывает различия в форматах путей между операционными системами:

   - Windows использует обратный слеш `\` (например, `C:\folder\file.txt`)
   - Unix-подобные системы используют прямой слеш `/` (например, `/folder/file.txt`)

2. **Предотвращение ошибок**: Исключает проблемы ручного формирования путей, такие как:

   - Лишние или забытые разделители
   - Некорректная обработка относительных путей
   - Проблемы с экранированием специальных символов

3. **Безопасность**: Помогает предотвратить атаки типа "path traversal" при правильном использовании

## Основные методы модуля path

### path.join()

Соединяет сегменты пути с учетом особенностей операционной системы:

```javascript
const path = require("path")
const filePath = path.join("folder", "subfolder", "file.txt")
// В Windows: 'folder\subfolder\file.txt'
// В Unix: 'folder/subfolder/file.txt'

// Корректно обрабатывает относительные пути
const safePath = path.join("folder", "..", "another", "file.txt")
// 'another/file.txt'
```

### path.resolve()

Преобразует относительные пути в абсолютные:

```javascript
const path = require("path")
const absPath = path.resolve("folder", "subfolder", "file.txt")
// Например: '/Users/username/project/folder/subfolder/file.txt'

// Абсолютные пути перезаписывают предыдущие аргументы
const anotherPath = path.resolve("/tmp", "folder", "file.txt")
// '/tmp/folder/file.txt'
```

### path.basename()

Возвращает имя файла из пути:

```javascript
const path = require("path")
const fileName = path.basename("/users/docs/file.txt")
// 'file.txt'

// С опциональным вторым параметром удаляет указанное расширение
const name = path.basename("/users/docs/file.txt", ".txt")
// 'file'
```

### path.dirname()

Возвращает путь к директории:

```javascript
const path = require("path")
const dir = path.dirname("/users/docs/file.txt")
// '/users/docs'
```

### path.extname()

Возвращает расширение файла:

```javascript
const path = require("path")
const ext = path.extname("/users/docs/file.txt")
// '.txt'
```

### path.normalize()

Нормализует путь, удаляя избыточные сегменты и символы:

```javascript
const path = require("path")
const normalPath = path.normalize("/users/./docs/../file.txt")
// '/users/file.txt'
```

### path.parse()

Разбирает путь на составные части:

```javascript
const path = require("path")
const pathObj = path.parse("/users/docs/file.txt")
// {
//   root: '/',
//   dir: '/users/docs',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file'
// }
```

### path.isAbsolute()

Проверяет, является ли путь абсолютным:

```javascript
const path = require("path")
const isAbs = path.isAbsolute("/users/docs/file.txt")
// true

const isRel = path.isAbsolute("users/docs/file.txt")
// false
```

### path.relative()

Возвращает относительный путь между двумя путями:

```javascript
const path = require("path")
const relPath = path.relative("/users/docs", "/users/docs/files/file.txt")
// 'files/file.txt'
```

### path.sep и path.delimiter

Системно-зависимые разделители:

```javascript
const path = require("path")

// Разделитель компонентов пути
// В Windows: '\\'
// В Unix: '/'
console.log(path.sep)

// Разделитель в переменной окружения PATH
// В Windows: ';'
// В Unix: ':'
console.log(path.delimiter)
```

## Практические примеры использования

### Безопасное объединение путей

```javascript
const path = require("path")

// Безопасно обрабатывает пользовательский ввод
function safeJoinPath(basePath, userInput) {
  // Извлекаем только имя файла для предотвращения path traversal
  const fileName = path.basename(userInput)
  return path.join(basePath, fileName)
}

const safePath = safeJoinPath("/uploads", "../../../etc/passwd")
console.log(safePath) // '/uploads/passwd'
```

### Работа с расширениями файлов

```javascript
const path = require("path")

// Проверка допустимого расширения файла
function isAllowedFileType(filePath, allowedExtensions) {
  const ext = path.extname(filePath).toLowerCase()
  return allowedExtensions.includes(ext)
}

const isImage = isAllowedFileType("vacation.jpg", [".jpg", ".png", ".gif"])
console.log(isImage) // true
```

### Использование с файловой системой

```javascript
const path = require("path")
const fs = require("fs")

// Конструирование пути к файлу относительно файла скрипта
const configPath = path.join(__dirname, "config.json")

// Чтение файла по построенному пути
fs.readFile(configPath, "utf8", (err, data) => {
  if (err) throw err
  console.log(JSON.parse(data))
})
```

---

[[002 Node.js|Назад]]
