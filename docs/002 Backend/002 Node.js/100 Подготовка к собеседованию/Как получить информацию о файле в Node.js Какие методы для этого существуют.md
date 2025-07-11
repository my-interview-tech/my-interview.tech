---
title: Как получить информацию о файле в Node.js Какие методы для этого существуют
draft: false
tags:
  - "#NodeJS"
  - "#fs"
  - "#файлы"
  - "#файловая-система"
  - "#stat"
  - "#информация-о-файле"
info:
  - "[Документация Node.js по модулю fs](https://nodejs.org/api/fs.html)"
  - "[Документация по fs.stat()](https://nodejs.org/api/fs.html#fs_fs_stat_path_options_callback)"
  - "[Документация по классу fs.Stats](https://nodejs.org/api/fs.html#fs_class_fs_stats)"
---

В Node.js для получения информации о файле существует несколько методов, предоставляемых модулем `fs` (File System). Основной из них — это метод `fs.stat()` и его вариации.

### 1. `fs.stat()` и `fs.statSync()`

Это основные методы для получения информации о файле.

#### Асинхронный вариант:

```javascript
const fs = require("fs")

fs.stat("путь_к_файлу", (err, stats) => {
  if (err) {
    console.error("Ошибка:", err)
    return
  }
  console.log("Информация о файле:", stats)
})
```

#### Синхронный вариант:

```javascript
const fs = require("fs")

try {
  const stats = fs.statSync("путь_к_файлу")
  console.log("Информация о файле:", stats)
} catch (err) {
  console.error("Ошибка:", err)
}
```

#### Используя Promise (Node.js v10+):

```javascript
const fs = require("fs").promises

async function getFileInfo() {
  try {
    const stats = await fs.stat("путь_к_файлу")
    console.log("Информация о файле:", stats)
  } catch (err) {
    console.error("Ошибка:", err)
  }
}

getFileInfo()
```

### 2. `fs.lstat()` и `fs.lstatSync()`

Эти методы аналогичны `fs.stat()`, но если файл является символической ссылкой, они возвращают информацию о самой ссылке, а не о файле, на который она указывает.

```javascript
const fs = require("fs")

fs.lstat("путь_к_символической_ссылке", (err, stats) => {
  if (err) {
    console.error("Ошибка:", err)
    return
  }
  console.log("Информация о символической ссылке:", stats)
})
```

### 3. `fs.fstat()` и `fs.fstatSync()`

Эти методы получают информацию о файле, используя его дескриптор, который можно получить с помощью `fs.open()`.

```javascript
const fs = require("fs")

fs.open("путь_к_файлу", "r", (err, fd) => {
  if (err) {
    console.error("Ошибка при открытии файла:", err)
    return
  }

  fs.fstat(fd, (err, stats) => {
    if (err) {
      console.error("Ошибка при получении информации о файле:", err)
      fs.close(fd, () => {}) // Закрываем дескриптор
      return
    }

    console.log("Информация о файле:", stats)
    fs.close(fd, () => {}) // Закрываем дескриптор
  })
})
```

### Что содержит объект `stats`

Объект `stats`, возвращаемый этими методами, содержит следующую информацию:

- **Размер файла**: `stats.size` (в байтах)
- **Время создания**: `stats.birthtime` и `stats.birthtimeMs`
- **Время последнего изменения**: `stats.mtime` и `stats.mtimeMs`
- **Время последнего доступа**: `stats.atime` и `stats.atimeMs`
- **Время последнего изменения статуса**: `stats.ctime` и `stats.ctimeMs`
- **Тип файла** (через методы):
  - `stats.isFile()`: является ли обычным файлом
  - `stats.isDirectory()`: является ли директорией
  - `stats.isSymbolicLink()`: является ли символической ссылкой (только для `lstat`)
  - `stats.isSocket()`: является ли сокетом
  - `stats.isBlockDevice()`: является ли блочным устройством
  - `stats.isCharacterDevice()`: является ли символьным устройством
  - `stats.isFIFO()`: является ли FIFO-каналом
- **Идентификатор устройства**: `stats.dev`
- **Идентификатор файла**: `stats.ino`
- **Режим доступа**: `stats.mode`
- **Количество жестких ссылок**: `stats.nlink`
- **UID владельца**: `stats.uid`
- **GID группы**: `stats.gid`
- **Идентификатор устройства (если специальный файл)**: `stats.rdev`
- **Размер блока для ввода-вывода файловой системы**: `stats.blksize`
- **Количество выделенных блоков**: `stats.blocks`

### Пример использования информации о файле:

```javascript
const fs = require("fs").promises

async function checkFileInfo(filePath) {
  try {
    const stats = await fs.stat(filePath)

    console.log(`Размер файла: ${stats.size} байт`)
    console.log(`Создан: ${stats.birthtime}`)
    console.log(`Последнее изменение: ${stats.mtime}`)

    if (stats.isFile()) {
      console.log("Это обычный файл")
    } else if (stats.isDirectory()) {
      console.log("Это директория")
    }

    console.log(`Права доступа: ${stats.mode.toString(8).slice(-3)}`)
  } catch (err) {
    console.error("Ошибка при получении информации о файле:", err)
  }
}

checkFileInfo("example.txt")
```

Эти методы позволяют получить подробную информацию о файле и использовать её для различных задач, таких как проверка существования файла, определение его типа, получение размера и временных меток.

---

[[002 Node.js|Назад]]
