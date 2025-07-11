---
title: Что такое модуль zlib в Node.js и как он используется
draft: false
tags:
  - "#NodeJS"
  - "#zlib"
  - "#сжатие"
  - "#производительность"
  - "#оптимизация"
info:
  - "[Документация Node.js - Zlib](https://nodejs.org/api/zlib.html)"
  - "[MDN - HTTP compression](https://developer.mozilla.org/ru/docs/Web/HTTP/Compression)"
---

![[node-zlib.png|600]]

## Что такое модуль zlib в Node.js

`zlib` - это встроенный модуль Node.js, который предоставляет функциональность сжатия и распаковки данных с использованием алгоритмов Gzip, Deflate, Brotli и других. Модуль представляет собой обертку над библиотекой сжатия zlib, написанной на языке C.

Основная цель использования `zlib` - уменьшение размера данных для экономии дискового пространства или сетевого трафика, что особенно важно для веб-серверов и API.

## Основные функции модуля zlib

### 1. Сжатие и распаковка буферов и строк

```javascript
const zlib = require("zlib")

// Сжатие данных с использованием gzip
const input = "Это строка, которую мы собираемся сжать используя gzip!"
zlib.gzip(input, (err, compressed) => {
  if (err) {
    console.error("Ошибка при сжатии:", err)
    return
  }

  console.log("Оригинальный размер:", input.length)
  console.log("Сжатый размер:", compressed.length)

  // Распаковка данных
  zlib.gunzip(compressed, (err, decompressed) => {
    if (err) {
      console.error("Ошибка при распаковке:", err)
      return
    }

    console.log("Распакованная строка:", decompressed.toString())
  })
})
```

### 2. Синхронные версии методов

```javascript
const zlib = require("zlib")

// Синхронное сжатие
try {
  const input = Buffer.from("Данные для сжатия")

  const compressedDeflate = zlib.deflateSync(input)
  console.log("Сжато Deflate:", compressedDeflate.length)

  const compressedGzip = zlib.gzipSync(input)
  console.log("Сжато Gzip:", compressedGzip.length)

  const compressedBrotli = zlib.brotliCompressSync(input)
  console.log("Сжато Brotli:", compressedBrotli.length)

  // Распаковка
  const decompressedDeflate = zlib.inflateSync(compressedDeflate)
  const decompressedGzip = zlib.gunzipSync(compressedGzip)
  const decompressedBrotli = zlib.brotliDecompressSync(compressedBrotli)

  // Проверка результатов
  console.log(
    "Все методы дали одинаковый результат:",
    decompressedDeflate.toString() === decompressedGzip.toString() &&
      decompressedGzip.toString() === decompressedBrotli.toString(),
  )
} catch (error) {
  console.error("Ошибка при работе с zlib:", error)
}
```

### 3. Потоковое сжатие и распаковка

```javascript
const fs = require("fs")
const zlib = require("zlib")
const path = require("path")

// Создание потока сжатия для файла
function compressFile(inputPath, outputPath) {
  const input = fs.createReadStream(inputPath)
  const output = fs.createWriteStream(outputPath)
  const gzip = zlib.createGzip()

  // Соединение потоков: input -> gzip -> output
  input.pipe(gzip).pipe(output)

  output.on("finish", () => {
    console.log(`Файл успешно сжат и сохранен в ${outputPath}`)
  })

  input.on("error", handleError)
  output.on("error", handleError)
  gzip.on("error", handleError)

  function handleError(err) {
    console.error("Ошибка при сжатии файла:", err)
  }
}

// Распаковка файла
function decompressFile(inputPath, outputPath) {
  const input = fs.createReadStream(inputPath)
  const output = fs.createWriteStream(outputPath)
  const gunzip = zlib.createGunzip()

  input.pipe(gunzip).pipe(output)

  output.on("finish", () => {
    console.log(`Файл успешно распакован в ${outputPath}`)
  })

  input.on("error", handleError)
  output.on("error", handleError)
  gunzip.on("error", handleError)

  function handleError(err) {
    console.error("Ошибка при распаковке файла:", err)
  }
}

// Пример использования
const filePath = path.join(__dirname, "example.txt")
const compressedPath = path.join(__dirname, "example.txt.gz")
const decompressedPath = path.join(__dirname, "example_decompressed.txt")

// Сжатие и распаковка
compressFile(filePath, compressedPath)
// После успешного сжатия можно вызвать:
// decompressFile(compressedPath, decompressedPath)
```

## Поддерживаемые алгоритмы сжатия

Модуль `zlib` поддерживает несколько алгоритмов сжатия:

1. **Deflate/Inflate** - базовый алгоритм сжатия.
2. **Gzip/Gunzip** - формат сжатия, который добавляет заголовки и контрольные суммы к данным Deflate.
3. **Brotli** - более современный алгоритм сжатия, который обычно обеспечивает лучшее сжатие, чем gzip.
4. **DeflateRaw/InflateRaw** - Deflate без дополнительных заголовков.

```javascript
const zlib = require("zlib")

// Пример с разными алгоритмами сжатия
const input = Buffer.from("X".repeat(1000))

// Сравнение разных алгоритмов сжатия
console.log(`Исходный размер: ${input.length} байт`)
console.log(`Deflate: ${zlib.deflateSync(input).length} байт`)
console.log(`Gzip: ${zlib.gzipSync(input).length} байт`)
console.log(`DeflateRaw: ${zlib.deflateRawSync(input).length} байт`)
console.log(`Brotli: ${zlib.brotliCompressSync(input).length} байт`)
```

## Настройка параметров сжатия

Все методы сжатия в `zlib` принимают опциональные параметры для настройки:

```javascript
const zlib = require("zlib")

const input = Buffer.from("Текст для сжатия".repeat(100))

// Настройка уровня сжатия для Gzip (от 0 до 9)
const gzipLow = zlib.gzipSync(input, { level: 1 }) // Быстрое, но менее эффективное сжатие
const gzipDefault = zlib.gzipSync(input) // Уровень по умолчанию (6)
const gzipMax = zlib.gzipSync(input, { level: 9 }) // Максимальное сжатие

console.log(`Gzip (уровень 1): ${gzipLow.length} байт`)
console.log(`Gzip (уровень 6): ${gzipDefault.length} байт`)
console.log(`Gzip (уровень 9): ${gzipMax.length} байт`)

// Настройка для Brotli
const brotliOptions = {
  params: {
    [zlib.constants.BROTLI_PARAM_MODE]: zlib.constants.BROTLI_MODE_TEXT, // Оптимизация для текста
    [zlib.constants.BROTLI_PARAM_QUALITY]: 11, // Качество от 0 до 11
    [zlib.constants.BROTLI_PARAM_SIZE_HINT]: input.length, // Подсказка о размере
  },
}

const brotliCompressed = zlib.brotliCompressSync(input, brotliOptions)
console.log(`Brotli (настроенный): ${brotliCompressed.length} байт`)
```

## Практические примеры использования

### 1. HTTP-сервер с компрессией

```javascript
const http = require("http")
const zlib = require("zlib")
const fs = require("fs")
const path = require("path")

const server = http.createServer((req, res) => {
  // Путь к файлу (например, HTML-страница)
  const filePath = path.join(__dirname, "index.html")

  // Чтение файла
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.statusCode = 500
      res.end(`Ошибка: ${err.message}`)
      return
    }

    // Проверка, поддерживает ли клиент сжатие
    const acceptEncoding = req.headers["accept-encoding"] || ""

    // Устанавливаем заголовки для контента
    res.setHeader("Content-Type", "text/html")
    res.setHeader("Vary", "Accept-Encoding") // Важный заголовок для кеширования

    // Выбор метода сжатия в зависимости от поддержки клиентом
    if (/\bbr\b/.test(acceptEncoding)) {
      // Brotli
      res.setHeader("Content-Encoding", "br")
      zlib.brotliCompress(data, (err, compressed) => {
        if (err) {
          res.statusCode = 500
          res.end(`Ошибка сжатия: ${err.message}`)
          return
        }
        res.end(compressed)
      })
    } else if (/\bgzip\b/.test(acceptEncoding)) {
      // Gzip
      res.setHeader("Content-Encoding", "gzip")
      zlib.gzip(data, (err, compressed) => {
        if (err) {
          res.statusCode = 500
          res.end(`Ошибка сжатия: ${err.message}`)
          return
        }
        res.end(compressed)
      })
    } else if (/\bdeflate\b/.test(acceptEncoding)) {
      // Deflate
      res.setHeader("Content-Encoding", "deflate")
      zlib.deflate(data, (err, compressed) => {
        if (err) {
          res.statusCode = 500
          res.end(`Ошибка сжатия: ${err.message}`)
          return
        }
        res.end(compressed)
      })
    } else {
      // Без сжатия, если клиент не поддерживает
      res.end(data)
    }
  })
})

server.listen(3000, () => {
  console.log("Сервер запущен на порту 3000")
})
```

### 2. Архивирование и разархивирование файлов

```javascript
const fs = require("fs")
const zlib = require("zlib")
const path = require("path")

// Функция для архивации директории
async function archiveDirectory(dirPath, outputPath) {
  try {
    // Создаем поток записи для выходного файла
    const output = fs.createWriteStream(outputPath)
    const gzip = zlib.createGzip()

    // Массив для хранения промисов
    const promises = []

    // Функция для рекурсивного чтения директории
    async function processDirectory(currentPath, relativePath = "") {
      const entries = await fs.promises.readdir(currentPath, { withFileTypes: true })

      for (const entry of entries) {
        const fullPath = path.join(currentPath, entry.name)
        const entryRelativePath = path.join(relativePath, entry.name)

        if (entry.isDirectory()) {
          // Рекурсивно обрабатываем поддиректории
          await processDirectory(fullPath, entryRelativePath)
        } else {
          // Обрабатываем файлы
          promises.push(
            new Promise((resolve, reject) => {
              // Читаем файл
              fs.readFile(fullPath, (err, data) => {
                if (err) return reject(err)

                // Формируем метаданные о файле (путь и размер)
                const metadata = JSON.stringify({
                  path: entryRelativePath,
                  size: data.length,
                })

                // Записываем метаданные и контент в архив
                gzip.write(metadata + "\n", (err) => {
                  if (err) return reject(err)

                  gzip.write(data, (err) => {
                    if (err) return reject(err)

                    // Маркер конца файла
                    gzip.write("\0\0\0\0", resolve)
                  })
                })
              })
            }),
          )
        }
      }
    }

    // Начинаем обработку корневой директории
    await processDirectory(dirPath)

    // Ждем завершения всех операций записи
    await Promise.all(promises)

    // Закрываем потоки
    gzip.end()

    return new Promise((resolve, reject) => {
      output.on("finish", resolve)
      output.on("error", reject)
      gzip.pipe(output)
    })
  } catch (err) {
    console.error("Ошибка при архивации:", err)
    throw err
  }
}

// Пример использования
archiveDirectory("./my-project", "./my-project.archive.gz")
  .then(() => console.log("Архивация завершена"))
  .catch((err) => console.error("Ошибка:", err))
```

## Работа с HTTP-запросами и ответами

Node.js автоматически обрабатывает сжатие HTTP-контента с помощью встроенной поддержки в модулях http и https:

```javascript
const http = require("http")
const zlib = require("zlib")

// Пример клиентского запроса с поддержкой сжатия
function fetchCompressed(url) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        "Accept-Encoding": "gzip, deflate, br",
      },
    }

    http
      .get(url, options, (res) => {
        let data = []

        // Проверяем, используется ли сжатие в ответе
        const contentEncoding = res.headers["content-encoding"]

        // Выбираем соответствующий поток распаковки
        let stream = res
        if (contentEncoding === "gzip") {
          stream = res.pipe(zlib.createGunzip())
        } else if (contentEncoding === "deflate") {
          stream = res.pipe(zlib.createInflate())
        } else if (contentEncoding === "br") {
          stream = res.pipe(zlib.createBrotliDecompress())
        }

        // Собираем данные
        stream.on("data", (chunk) => {
          data.push(chunk)
        })

        stream.on("end", () => {
          const buffer = Buffer.concat(data)
          resolve(buffer.toString())
        })

        stream.on("error", reject)
      })
      .on("error", reject)
  })
}

// Использование
fetchCompressed("http://example.com")
  .then((data) => console.log("Получены данные:", data.substring(0, 100) + "..."))
  .catch((err) => console.error("Ошибка при запросе:", err))
```

## Производительность и оптимизация

При работе с модулем `zlib` следует учитывать несколько аспектов производительности:

1. **Уровень сжатия** - выше уровень = лучшее сжатие, но медленнее работа.
2. **Выбор алгоритма** - Brotli обычно дает лучшие результаты сжатия, но может быть медленнее.
3. **Потоковая обработка** - всегда предпочтительнее для больших данных.
4. **Кеширование** - сжатие ресурсоемкая операция, результаты сжатия часто полезно кешировать.

```javascript
const zlib = require("zlib")
const fs = require("fs")
const crypto = require("crypto")

// Функция для умного сжатия с кешированием
function smartCompress(data, cacheDir = "./cache") {
  return new Promise(async (resolve, reject) => {
    try {
      // Создаем хеш данных для имени в кеше
      const hash = crypto.createHash("md5").update(data).digest("hex")
      const cachePath = `${cacheDir}/${hash}.gz`

      // Проверяем, есть ли файл в кеше
      try {
        if (fs.existsSync(cachePath)) {
          // Файл найден в кеше, возвращаем его
          const cachedData = fs.readFileSync(cachePath)
          return resolve(cachedData)
        }
      } catch (err) {
        // Игнорируем ошибки доступа к кешу
      }

      // Определяем оптимальные настройки сжатия в зависимости от размера
      let options = {}
      if (data.length < 1024) {
        // Для маленьких данных используем быстрое сжатие
        options = { level: 1 }
      } else if (data.length > 1024 * 1024) {
        // Для больших данных используем потоковую обработку
        const input = fs.createReadStream(Buffer.from(data))
        const output = fs.createWriteStream(cachePath)
        const gzip = zlib.createGzip({ level: 6 })

        return new Promise((resolve, reject) => {
          output.on("finish", async () => {
            const compressed = await fs.promises.readFile(cachePath)
            resolve(compressed)
          })
          input.pipe(gzip).pipe(output)
        })
      } else {
        // Для средних размеров используем стандартное сжатие
        options = { level: 6 }
      }

      // Сжимаем данные
      zlib.gzip(data, options, async (err, compressed) => {
        if (err) return reject(err)

        // Сохраняем в кеш
        try {
          // Создаем директорию кеша, если её нет
          if (!fs.existsSync(cacheDir)) {
            await fs.promises.mkdir(cacheDir, { recursive: true })
          }

          await fs.promises.writeFile(cachePath, compressed)
        } catch (err) {
          // Игнорируем ошибки записи кеша
          console.warn("Не удалось записать в кеш:", err.message)
        }

        resolve(compressed)
      })
    } catch (err) {
      reject(err)
    }
  })
}

// Пример использования
smartCompress(Buffer.from("Пример текста для сжатия"))
  .then((compressed) => console.log(`Сжатый размер: ${compressed.length} байт`))
  .catch((err) => console.error("Ошибка:", err))
```

## Заключение

Модуль `zlib` в Node.js предоставляет мощные инструменты для сжатия и распаковки данных, что особенно важно для оптимизации веб-приложений и работы с большими объемами информации. Правильное использование сжатия может значительно сократить объем передаваемых данных, уменьшить нагрузку на сеть и ускорить загрузку веб-страниц или API-ответов.

---

[[002 Node.js|Назад]]
