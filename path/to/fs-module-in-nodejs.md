---
title: Модуль fs в Node.js и работа с файловой системой
draft: false
tags:
  - "#NodeJS"
  - "#fs"
  - "#filesystem"
  - "#backend"
  - "#асинхронность"
info:
---

`fs` (File System) - это встроенный модуль Node.js, который предоставляет API для взаимодействия с файловой системой операционной системы. Модуль позволяет создавать, читать, обновлять, удалять файлы и директории.

## Синхронные и асинхронные методы

Модуль `fs` предоставляет как синхронные, так и асинхронные версии методов. Синхронные методы имеют суффикс `Sync` и блокируют основной поток выполнения до завершения операции.

```javascript
const fs = require("fs")

// Асинхронное чтение с колбэком
fs.readFile("file.txt", "utf8", (err, data) => {
  if (err) throw err
  console.log(data)
})

// Синхронное чтение (блокирует основной поток)
try {
  const data = fs.readFileSync("file.txt", "utf8")
  console.log(data)
} catch (err) {
  console.error(err)
}
```

## Промисы с fs/promises

Начиная с Node.js v14, доступен модуль `fs/promises`, предоставляющий API на основе промисов:

```javascript
const fs = require("fs/promises")

async function readFile() {
  try {
    const data = await fs.readFile("file.txt", "utf8")
    console.log(data)
  } catch (err) {
    console.error(err)
  }
}

readFile()
```

## Основные операции с файлами

### Чтение файла

```javascript
// С промисами
const fs = require("fs/promises")

async function readFileContent() {
  try {
    const data = await fs.readFile("file.txt", "utf8")
    return data
  } catch (err) {
    console.error("Ошибка чтения файла:", err)
    throw err
  }
}
```

### Запись в файл

```javascript
const fs = require("fs/promises")

async function writeToFile() {
  try {
    await fs.writeFile("file.txt", "Содержимое файла", "utf8")
    console.log("Файл успешно записан")
  } catch (err) {
    console.error("Ошибка записи файла:", err)
  }
}
```

### Добавление в файл

```javascript
const fs = require("fs/promises")

async function appendToFile() {
  try {
    await fs.appendFile("file.txt", "\nНовая строка", "utf8")
    console.log("Данные добавлены в файл")
  } catch (err) {
    console.error("Ошибка добавления в файл:", err)
  }
}
```

### Удаление файла

```javascript
const fs = require("fs/promises")

async function deleteFile() {
  try {
    await fs.unlink("file.txt")
    console.log("Файл успешно удален")
  } catch (err) {
    console.error("Ошибка удаления файла:", err)
  }
}
```

## Работа с директориями

### Создание директории

```javascript
const fs = require("fs/promises")

async function createDir() {
  try {
    await fs.mkdir("newDir", { recursive: true })
    console.log("Директория создана")
  } catch (err) {
    console.error("Ошибка создания директории:", err)
  }
}
```

### Чтение содержимого директории

```javascript
const fs = require("fs/promises")

async function readDir() {
  try {
    const files = await fs.readdir("dir")
    console.log("Содержимое директории:", files)
    return files
  } catch (err) {
    console.error("Ошибка чтения директории:", err)
    throw err
  }
}
```

### Удаление директории

```javascript
const fs = require("fs/promises")

async function removeDir() {
  try {
    await fs.rmdir("dir")
    console.log("Директория удалена")
  } catch (err) {
    console.error("Ошибка удаления директории:", err)
  }
}

// Рекурсивное удаление директории (с содержимым)
async function removeDirRecursive() {
  try {
    await fs.rm("dir", { recursive: true, force: true })
    console.log("Директория удалена со всем содержимым")
  } catch (err) {
    console.error("Ошибка удаления директории:", err)
  }
}
```

## Работа с потоками

Для больших файлов эффективнее использовать потоки:

```javascript
const fs = require("fs")

// Чтение файла через поток
const readStream = fs.createReadStream("largeFile.txt", { encoding: "utf8" })
readStream.on("data", (chunk) => {
  console.log("Получен фрагмент данных:", chunk.length)
})
readStream.on("end", () => {
  console.log("Чтение завершено")
})
readStream.on("error", (err) => {
  console.error("Ошибка чтения:", err)
})

// Запись файла через поток
const writeStream = fs.createWriteStream("output.txt")
writeStream.write("Строка 1\n")
writeStream.write("Строка 2\n")
writeStream.end("Последняя строка")
writeStream.on("finish", () => {
  console.log("Запись завершена")
})
```

### Копирование файла с использованием потоков

```javascript
const fs = require("fs")

function copyFile(source, destination) {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(source)
    const writeStream = fs.createWriteStream(destination)

    readStream.on("error", reject)
    writeStream.on("error", reject)
    writeStream.on("finish", resolve)

    readStream.pipe(writeStream)
  })
}

// Использование
copyFile("source.txt", "destination.txt")
  .then(() => console.log("Файл скопирован"))
  .catch((err) => console.error("Ошибка копирования:", err))
```

## Слежение за изменениями

Модуль `fs` позволяет отслеживать изменения файлов и директорий:

```javascript
const fs = require("fs")

const watcher = fs.watch("file.txt", (eventType, filename) => {
  console.log(`Изменение в файле ${filename}: ${eventType}`)
})

// Остановка слежения
// watcher.close();
```

### Пример более надежного слежения за изменениями

```javascript
const fs = require("fs")
const path = require("path")

function watchDirectory(directoryPath, callback) {
  // Проверяем существование директории
  if (!fs.existsSync(directoryPath)) {
    throw new Error(`Директория '${directoryPath}' не существует`)
  }

  // Создаем watcher для директории
  const watcher = fs.watch(directoryPath, { recursive: true }, (eventType, filename) => {
    if (filename) {
      const filePath = path.join(directoryPath, filename)

      // Проверяем существование файла перед вызовом колбэка
      // (может быть уже удален к моменту проверки)
      fs.access(filePath, fs.constants.F_OK, (err) => {
        if (!err) {
          callback(eventType, filePath)
        }
      })
    }
  })

  console.log(`Слежение запущено для: ${directoryPath}`)
  return watcher
}

// Пример использования
try {
  const watcher = watchDirectory("./src", (eventType, filePath) => {
    console.log(`Событие '${eventType}' для файла: ${filePath}`)

    // Дополнительная логика обработки изменений
    if (eventType === "change" && path.extname(filePath) === ".js") {
      console.log("Обнаружено изменение JavaScript файла")
    }
  })

  // Остановка слежения через 5 минут
  setTimeout(() => {
    watcher.close()
    console.log("Слежение остановлено")
  }, 300000)
} catch (err) {
  console.error("Ошибка при запуске слежения:", err.message)
}
```

## Получение информации о файле

```javascript
const fs = require("fs/promises")

async function getFileInfo() {
  try {
    const stats = await fs.stat("file.txt")
    console.log("Размер файла:", stats.size)
    console.log("Это директория?", stats.isDirectory())
    console.log("Это файл?", stats.isFile())
    console.log("Дата создания:", stats.birthtime)
    console.log("Дата последнего изменения:", stats.mtime)
    return stats
  } catch (err) {
    console.error("Ошибка получения информации о файле:", err)
    throw err
  }
}
```

### Основные свойства и методы объекта stats

```javascript
const fs = require("fs/promises")

async function showFileStats(filePath) {
  try {
    const stats = await fs.stat(filePath)

    // Размеры и время
    console.log({
      size: stats.size, // размер в байтах
      birthtime: stats.birthtime, // время создания
      atime: stats.atime, // время последнего доступа
      mtime: stats.mtime, // время последней модификации
      ctime: stats.ctime, // время последнего изменения статуса
    })

    // Методы для проверки типа файла
    console.log({
      isFile: stats.isFile(), // это обычный файл?
      isDirectory: stats.isDirectory(), // это директория?
      isSymbolicLink: stats.isSymbolicLink(), // это символическая ссылка?
      isSocket: stats.isSocket(), // это сокет?
      isFIFO: stats.isFIFO(), // это FIFO / именованный канал?
      isBlockDevice: stats.isBlockDevice(), // это блочное устройство?
      isCharacterDevice: stats.isCharacterDevice(), // это символьное устройство?
    })

    // Права доступа (в POSIX системах)
    console.log({
      mode: stats.mode.toString(8), // права доступа в восьмеричном формате
      uid: stats.uid, // ID пользователя-владельца
      gid: stats.gid, // ID группы-владельца
    })

    return stats
  } catch (err) {
    console.error(`Ошибка получения информации о ${filePath}:`, err)
    throw err
  }
}
```

## Копирование и перемещение файлов

```javascript
const fs = require("fs/promises")

async function copyFile() {
  try {
    await fs.copyFile("source.txt", "destination.txt")
    console.log("Файл успешно скопирован")
  } catch (err) {
    console.error("Ошибка копирования файла:", err)
  }
}

async function renameFile() {
  try {
    await fs.rename("oldName.txt", "newName.txt")
    console.log("Файл успешно переименован")
  } catch (err) {
    console.error("Ошибка переименования файла:", err)
  }
}
```

## Управление правами доступа

```javascript
const fs = require("fs/promises")

async function changeFilePermissions() {
  try {
    // Изменение прав доступа (только для UNIX-подобных систем)
    await fs.chmod("file.txt", 0o755) // rwxr-xr-x
    console.log("Права доступа изменены")

    // Изменение владельца (требуются права root)
    // await fs.chown("file.txt", uid, gid)
  } catch (err) {
    console.error("Ошибка изменения прав доступа:", err)
  }
}
```

## Проверка доступа к файлу

```javascript
const fs = require("fs/promises")

async function checkFileAccess(filePath) {
  try {
    // Проверка существования файла
    await fs.access(filePath, fs.constants.F_OK)
    console.log(`Файл ${filePath} существует`)

    // Проверка прав на чтение и запись
    await fs.access(filePath, fs.constants.R_OK | fs.constants.W_OK)
    console.log(`Файл ${filePath} доступен для чтения и записи`)

    return true
  } catch (err) {
    if (err.code === "ENOENT") {
      console.error(`Файл ${filePath} не существует`)
    } else if (err.code === "EACCES") {
      console.error(`Нет доступа к файлу ${filePath}`)
    } else {
      console.error(`Ошибка проверки доступа к ${filePath}:`, err)
    }
    return false
  }
}
```

## Примеры практического использования

### Обход директории рекурсивно

```javascript
const fs = require("fs/promises")
const path = require("path")

async function walkDirectory(dirPath) {
  const results = []

  async function walk(currentPath, relativePath = "") {
    const entries = await fs.readdir(currentPath, { withFileTypes: true })

    for (const entry of entries) {
      const entryPath = path.join(currentPath, entry.name)
      const entryRelativePath = path.join(relativePath, entry.name)

      if (entry.isDirectory()) {
        await walk(entryPath, entryRelativePath)
      } else {
        results.push({
          path: entryPath,
          relativePath: entryRelativePath,
          name: entry.name,
          extension: path.extname(entry.name),
        })
      }
    }
  }

  await walk(dirPath)
  return results
}

// Использование
async function main() {
  try {
    const files = await walkDirectory("./src")
    console.log(`Найдено ${files.length} файлов:`)

    // Группировка файлов по расширению
    const filesByExtension = files.reduce((acc, file) => {
      const ext = file.extension || "без расширения"
      acc[ext] = acc[ext] || []
      acc[ext].push(file)
      return acc
    }, {})

    for (const [ext, files] of Object.entries(filesByExtension)) {
      console.log(`${ext}: ${files.length} файлов`)
    }
  } catch (err) {
    console.error("Ошибка обхода директории:", err)
  }
}

main()
```

### Чтение и запись JSON-файлов

```javascript
const fs = require("fs/promises")

async function readJsonFile(filePath) {
  try {
    const data = await fs.readFile(filePath, "utf8")
    return JSON.parse(data)
  } catch (err) {
    if (err.code === "ENOENT") {
      console.error(`Файл ${filePath} не найден`)
    } else {
      console.error(`Ошибка чтения или парсинга JSON из ${filePath}:`, err)
    }
    throw err
  }
}

async function writeJsonFile(filePath, data) {
  try {
    const jsonString = JSON.stringify(data, null, 2)
    await fs.writeFile(filePath, jsonString, "utf8")
    console.log(`Данные успешно записаны в ${filePath}`)
  } catch (err) {
    console.error(`Ошибка записи JSON в ${filePath}:`, err)
    throw err
  }
}

// Пример использования
async function updateConfig() {
  try {
    // Чтение существующего конфига
    const config = await readJsonFile("config.json")

    // Обновление данных
    config.lastUpdated = new Date().toISOString()
    config.version = config.version ? config.version + 1 : 1

    // Запись обновленного конфига
    await writeJsonFile("config.json", config)
  } catch (err) {
    // Если файл не существует, создаем новый конфиг
    if (err.code === "ENOENT") {
      const newConfig = {
        version: 1,
        lastUpdated: new Date().toISOString(),
        settings: { theme: "default" },
      }
      await writeJsonFile("config.json", newConfig)
    }
  }
}
```

### Создание временных файлов и директорий

```javascript
const fs = require("fs/promises")
const path = require("path")
const os = require("os")
const crypto = require("crypto")

async function createTempFile(data, prefix = "tmp-", extension = ".txt") {
  try {
    // Генерация уникального имени файла
    const randomStr = crypto.randomBytes(8).toString("hex")
    const fileName = `${prefix}${randomStr}${extension}`

    // Создание полного пути к временному файлу
    const filePath = path.join(os.tmpdir(), fileName)

    // Запись данных
    await fs.writeFile(filePath, data)

    // Функция для удаления временного файла
    const cleanup = async () => {
      try {
        await fs.unlink(filePath)
      } catch (err) {
        console.error(`Ошибка удаления временного файла ${filePath}:`, err)
      }
    }

    return { filePath, cleanup }
  } catch (err) {
    console.error("Ошибка создания временного файла:", err)
    throw err
  }
}

async function createTempDir(prefix = "tmp-") {
  try {
    // Генерация уникального имени директории
    const randomStr = crypto.randomBytes(8).toString("hex")
    const dirName = `${prefix}${randomStr}`

    // Создание полного пути к временной директории
    const dirPath = path.join(os.tmpdir(), dirName)

    // Создание директории
    await fs.mkdir(dirPath)

    // Функция для удаления временной директории
    const cleanup = async () => {
      try {
        await fs.rm(dirPath, { recursive: true, force: true })
      } catch (err) {
        console.error(`Ошибка удаления временной директории ${dirPath}:`, err)
      }
    }

    return { dirPath, cleanup }
  } catch (err) {
    console.error("Ошибка создания временной директории:", err)
    throw err
  }
}

// Пример использования
async function processingExample() {
  let tempFile = null
  let tempDir = null

  try {
    // Создание временного файла
    tempFile = await createTempFile("Тестовые данные")
    console.log(`Временный файл создан: ${tempFile.filePath}`)

    // Создание временной директории
    tempDir = await createTempDir()
    console.log(`Временная директория создана: ${tempDir.dirPath}`)

    // Выполнение операций с временными объектами...
  } catch (err) {
    console.error("Ошибка обработки:", err)
  } finally {
    // Очистка временных объектов
    if (tempFile) await tempFile.cleanup()
    if (tempDir) await tempDir.cleanup()
  }
}
```

## Сравнение подходов к работе с файлами

| Подход                         | Преимущества                          | Недостатки                          | Рекомендуется для                              |
| ------------------------------ | ------------------------------------- | ----------------------------------- | ---------------------------------------------- |
| Синхронные методы              | Простой код, предсказуемое выполнение | Блокирует основной поток            | Скриптов и утилит, небольших файлов            |
| Асинхронные методы с колбэками | Не блокирует основной поток           | Сложный код при вложенных операциях | Небольших обработчиков, обратной совместимости |
| Промисы (fs/promises)          | Удобное обращение через async/await   | Требует Node.js 10+                 | Современных приложений, сложных операций       |
| Потоки (streams)               | Эффективная работа с большими файлами | Сложнее в использовании             | Больших файлов, процессов обработки данных     |

## Особенности fs модуля

1. **Эффективность** - для больших файлов лучше использовать потоки (`fs.createReadStream`/`fs.createWriteStream`), чтобы избежать проблем с памятью.
2. **Платформенная совместимость** - пути к файлам должны обрабатываться через модуль `path` для работы на разных операционных системах.
3. **Производительность** - операции с файловой системой могут быть медленными, поэтому рекомендуется использовать асинхронные методы.
4. **Безопасность** - необходимо тщательно проверять пути к файлам, особенно полученные от пользователей, для избежания атак через файловую систему.
5. **Обработка ошибок** - всегда обрабатывайте ошибки при операциях с файлами, так как они могут возникать по множеству причин (права доступа, несуществующие файлы и т.д.).

## Заключение

Модуль `fs` в Node.js предоставляет мощный и гибкий набор инструментов для работы с файловой системой. Комбинируя различные методы модуля `fs` с другими модулями, такими как `path`, `stream` и `util`, разработчики могут создавать эффективные и надежные приложения для работы с файлами и директориями.

Для современной разработки рекомендуется использовать API на основе промисов (`fs/promises`), который упрощает написание асинхронного кода и делает его более понятным. При работе с большими файлами обязательно применяйте потоки, а для корректной обработки путей всегда используйте модуль `path`.

---

[[Назад]]
