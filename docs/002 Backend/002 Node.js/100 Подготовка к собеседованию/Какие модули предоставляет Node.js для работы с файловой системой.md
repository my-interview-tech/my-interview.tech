---
title: Какие модули предоставляет Node.js для работы с файловой системой
draft: false
tags:
  - "#NodeJS"
  - "#fs"
  - "#require"
  - "#readFileSync"
  - "#writeFile"
  - "#writeFileSync"
  - "#appendFile"
  - "#appendFileSync"
  - "#unlink"
  - "#unlinkSync"
  - "#mkdir"
  - "#rmdir"
  - "#readdir"
  - "#access"
  - "#accessSync"
  - "#chmod"
  - "#chmodSync"
  - "#rename"
  - "#renameSync"
  - "#createReadStream"
  - "#createWriteStream"
  - "#stat"
  - "#statSync"
info:
  - "[Официальная документация Node.js по fs](https://nodejs.org/api/fs.html)"
  - "[Документация по fs/promises](https://nodejs.org/api/fs.html#promises-api)"
  - "[Работа с путями в Node.js](https://nodejs.org/api/path.html)"
  - "[Потоки в Node.js](https://nodejs.org/api/stream.html)"
---

# Модули для работы с файловой системой в Node.js

Node.js предоставляет несколько модулей для работы с файловой системой, позволяющих выполнять различные операции с файлами и директориями.

## 1. Основной модуль `fs`

Модуль **`fs`** (File System) является основным встроенным модулем для работы с файловой системой. Он предоставляет как синхронные, так и асинхронные методы для различных операций.

### Основные методы модуля `fs`

#### 1.1 Чтение файлов

- **Асинхронное чтение**:

```javascript
const fs = require("fs")

fs.readFile("file.txt", "utf8", (err, data) => {
  if (err) throw err
  console.log(data)
})
```

- **Синхронное чтение**:

```javascript
const fs = require("fs")

try {
  const data = fs.readFileSync("file.txt", "utf8")
  console.log(data)
} catch (err) {
  console.error(err)
}
```

#### 1.2 Запись в файл

- **Асинхронная запись**:

```javascript
const fs = require("fs")

fs.writeFile("file.txt", "Hello, World!", (err) => {
  if (err) throw err
  console.log("File written successfully")
})
```

- **Синхронная запись**:

```javascript
const fs = require("fs")

try {
  fs.writeFileSync("file.txt", "Hello, World!")
  console.log("File written successfully")
} catch (err) {
  console.error(err)
}
```

#### 1.3 Добавление данных в файл

- **Асинхронное добавление**:

```javascript
const fs = require("fs")

fs.appendFile("file.txt", "\nNew data", (err) => {
  if (err) throw err
  console.log("Data appended")
})
```

- **Синхронное добавление**:

```javascript
const fs = require("fs")

try {
  fs.appendFileSync("file.txt", "\nNew data")
  console.log("Data appended")
} catch (err) {
  console.error(err)
}
```

#### 1.4 Удаление файла

- **Асинхронное удаление**:

```javascript
const fs = require("fs")

fs.unlink("file.txt", (err) => {
  if (err) throw err
  console.log("File deleted")
})
```

- **Синхронное удаление**:

```javascript
const fs = require("fs")

try {
  fs.unlinkSync("file.txt")
  console.log("File deleted")
} catch (err) {
  console.error(err)
}
```

#### 1.5 Работа с директориями

- **Создание директории**:

```javascript
const fs = require("fs")

fs.mkdir("newDir", (err) => {
  if (err) throw err
  console.log("Directory created")
})
```

- **Удаление директории**:

```javascript
const fs = require("fs")

fs.rmdir("newDir", (err) => {
  if (err) throw err
  console.log("Directory deleted")
})
```

- **Чтение содержимого директории**:

```javascript
const fs = require("fs")

fs.readdir("./", (err, files) => {
  if (err) throw err
  console.log("Files:", files)
})
```

#### 1.6 Проверка существования файла или директории

- **Асинхронная проверка**:

```javascript
const fs = require("fs")

fs.access("file.txt", fs.constants.F_OK, (err) => {
  if (err) {
    console.log("File does not exist")
  } else {
    console.log("File exists")
  }
})
```

- **Синхронная проверка**:

```javascript
const fs = require("fs")

try {
  fs.accessSync("file.txt", fs.constants.F_OK)
  console.log("File exists")
} catch (err) {
  console.log("File does not exist")
}
```

#### 1.7 Изменение прав доступа

- **Асинхронное изменение**:

```javascript
const fs = require("fs")

fs.chmod("file.txt", 0o755, (err) => {
  if (err) throw err
  console.log("Permissions changed")
})
```

- **Синхронное изменение**:

```javascript
const fs = require("fs")

try {
  fs.chmodSync("file.txt", 0o755)
  console.log("Permissions changed")
} catch (err) {
  console.error(err)
}
```

#### 1.8 Переименование файла или директории

- **Асинхронное переименование**:

```javascript
const fs = require("fs")

fs.rename("oldName.txt", "newName.txt", (err) => {
  if (err) throw err
  console.log("File renamed")
})
```

- **Синхронное переименование**:

```javascript
const fs = require("fs")

try {
  fs.renameSync("oldName.txt", "newName.txt")
  console.log("File renamed")
} catch (err) {
  console.error(err)
}
```

#### 1.9 Работа с потоками (Streams)

- **Чтение файла потоком**:

```javascript
const fs = require("fs")

const readStream = fs.createReadStream("file.txt", { encoding: "utf8" })
readStream.on("data", (chunk) => {
  console.log(chunk)
})
readStream.on("error", (err) => {
  console.error(err)
})
```

- **Запись в файл потоком**:

```javascript
const fs = require("fs")

const writeStream = fs.createWriteStream("file.txt")
writeStream.write("Hello, World!")
writeStream.end()
writeStream.on("finish", () => {
  console.log("Write completed")
})
writeStream.on("error", (err) => {
  console.error(err)
})
```

#### 1.10 Получение информации о файле

- **Асинхронное получение информации**:

```javascript
const fs = require("fs")

fs.stat("file.txt", (err, stats) => {
  if (err) throw err
  console.log("File size:", stats.size)
  console.log("Is file?", stats.isFile())
  console.log("Is directory?", stats.isDirectory())
  console.log("Last modified:", stats.mtime)
})
```

- **Синхронное получение информации**:

```javascript
const fs = require("fs")

try {
  const stats = fs.statSync("file.txt")
  console.log("File size:", stats.size)
  console.log("Is file?", stats.isFile())
} catch (err) {
  console.error(err)
}
```

## 2. Модуль `fs/promises`

Начиная с Node.js 10, доступен модуль `fs/promises`, который предоставляет API на основе промисов для всех асинхронных операций файловой системы.

### Пример использования:

```javascript
const fs = require("fs/promises")
// или
// const { promises: fsPromises } = require('fs');

async function example() {
  try {
    // Чтение файла
    const data = await fs.readFile("file.txt", "utf8")
    console.log(data)

    // Запись в файл
    await fs.writeFile("output.txt", "Данные для записи")

    // Добавление данных в файл
    await fs.appendFile("output.txt", "\nДополнительные данные")

    // Получение списка файлов в директории
    const files = await fs.readdir("./")
    console.log("Files:", files)

    // Получение статистики файла
    const stats = await fs.stat("output.txt")
    console.log("File size:", stats.size)
  } catch (err) {
    console.error("Error:", err)
  }
}

example()
```

### Преимущества `fs/promises`:

- Использование современного синтаксиса `async/await`
- Избегание "колбэк-ада"
- Удобное последовательное выполнение операций
- Цепочки операций с Promise

## 3. Модуль `path`

Модуль `path` помогает работать с путями к файлам и директориям, обеспечивая кроссплатформенность.

```javascript
const path = require("path")

// Объединение путей
const fullPath = path.join(__dirname, "files", "data.txt")
console.log("Full path:", fullPath)

// Получение имени файла из пути
const fileName = path.basename(fullPath)
console.log("File name:", fileName)

// Получение расширения файла
const extension = path.extname(fullPath)
console.log("Extension:", extension)

// Получение директории файла
const directory = path.dirname(fullPath)
console.log("Directory:", directory)

// Нормализация пути
const normalizedPath = path.normalize("/users//john/../jane/./documents")
console.log("Normalized:", normalizedPath) // '/users/jane/documents'

// Разбор объекта пути
const parsedPath = path.parse(fullPath)
console.log("Parsed path:", parsedPath)
/*
{
  root: '/',
  dir: '/path/to/files',
  base: 'data.txt',
  ext: '.txt',
  name: 'data'
}
*/
```

## 4. Модуль `stream`

Модуль `stream` предоставляет интерфейс для работы с потоками данных, что особенно полезно при обработке больших файлов.

```javascript
const fs = require("fs")
const zlib = require("zlib")

// Цепочка потоков для чтения, сжатия и записи файла
fs.createReadStream("input.txt")
  .pipe(zlib.createGzip()) // Сжатие данных
  .pipe(fs.createWriteStream("input.txt.gz"))
  .on("finish", () => {
    console.log("File compression completed")
  })
  .on("error", (err) => {
    console.error("Error during compression:", err)
  })
```

## 5. Модуль `readline`

Модуль `readline` позволяет читать данные из потока построчно, что удобно для обработки больших текстовых файлов.

```javascript
const fs = require("fs")
const readline = require("readline")

const fileStream = fs.createReadStream("large-file.txt")
const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity,
})

// Обработка файла построчно
rl.on("line", (line) => {
  console.log(`Line from file: ${line}`)
})

rl.on("close", () => {
  console.log("File processing completed")
})
```

## 6. Модуль `fsevents` (macOS) и `fs-extra`

- **`fsevents`**: Предоставляет нативные события файловой системы для macOS.
- **`fs-extra`**: Популярный сторонний модуль, расширяющий возможности встроенного модуля `fs`.

```javascript
// fs-extra пример
const fse = require("fs-extra")

// Копирование директории со всем содержимым
fse
  .copy("/source", "/destination")
  .then(() => console.log("Directory copied successfully"))
  .catch((err) => console.error(err))

// Пустая директория, если она уже существует
fse
  .emptyDir("/path/to/dir")
  .then(() => console.log("Directory emptied"))
  .catch((err) => console.error(err))
```

## Сравнение подходов для работы с файловой системой

| Подход                | Преимущества                          | Недостатки                         | Рекомендуемое использование                     |
| --------------------- | ------------------------------------- | ---------------------------------- | ----------------------------------------------- |
| Синхронные методы     | Простой линейный код                  | Блокируют событийный цикл          | Только при инициализации или скриптах           |
| Колбэк-методы         | Не блокируют цикл событий             | Могут привести к "колбэк-аду"      | Устаревший подход, если требуется совместимость |
| Промисы (fs/promises) | Элегантное асинхронное API            | Не поддерживается в старых версиях | Современные приложения на Node.js               |
| Потоки (streams)      | Эффективная работа с большими файлами | Более сложный API                  | Большие файлы, трансформации данных             |

## Заключение

Node.js предоставляет богатый набор модулей для работы с файловой системой, от низкоуровневых API до высокоуровневых абстракций. Выбор нужного инструмента зависит от ваших задач:

1. **Базовые операции с файлами**: используйте `fs` (или лучше `fs/promises` для современного кода)
2. **Пути к файлам**: используйте `path` для кроссплатформенности
3. **Большие файлы**: используйте `stream` для потоковой обработки
4. **Построчная обработка**: используйте `readline`
5. **Расширенные возможности**: рассмотрите сторонние модули, например `fs-extra`

В современных приложениях рекомендуется использовать `fs/promises` в сочетании с `async/await` для наиболее читаемого и поддерживаемого кода, обращаясь к потокам для эффективной обработки больших файлов.

---

[[002 Node.js|Назад]]
