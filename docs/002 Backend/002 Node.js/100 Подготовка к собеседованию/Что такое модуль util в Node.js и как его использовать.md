---
title: Что такое модуль util в Node.js и как его использовать
draft: false
tags:
  - "#NodeJS"
  - "#util"
  - "#утилиты"
  - "#отладка"
  - "#форматирование"
info:
  - "[Документация Node.js - util](https://nodejs.org/api/util.html)"
  - "[Node.js util - Новые возможности](https://nodejs.org/api/util.html#util_util_types)"
---

![[node-util.png|600]]

## Что такое модуль util в Node.js

`util` - это встроенный модуль Node.js, предоставляющий набор вспомогательных функций для различных задач программирования. Этот модуль был создан для внутреннего использования в Node.js, но многие его функции доступны и полезны для разработчиков. Он предлагает инструменты для отладки, форматирования строк, проверки типов и решения других распространенных задач.

Основные области применения модуля `util`:

- Форматирование и работа со строками
- Проверка типов и структур данных
- Отладка и логирование
- Обработка устаревшего (deprecated) кода
- Промисификация колбэк-функций
- Работа с асинхронными операциями

## Основные концепции и функции

### 1. Форматирование строк и инспектирование объектов

```javascript
const util = require("util")

// Инспектирование объектов (util.inspect)
const complexObject = {
  name: "Пример",
  data: [1, 2, 3],
  nested: {
    value: true,
    fn: function () {
      return "Тест"
    },
  },
  [Symbol("key")]: "символьное свойство",
}

// Получение строкового представления объекта с настройками
console.log(
  util.inspect(complexObject, {
    colors: true, // Цветной вывод
    depth: 2, // Глубина вложенности
    showHidden: true, // Показывать скрытые свойства
    showProxy: true, // Показывать прокси
    getters: true, // Вычислять геттеры
  }),
)

// Форматирование строк (устаревший метод, но всё ещё полезный)
const name = "Анна"
const age = 30
console.log(util.format("Привет, %s! Тебе %d лет.", name, age))
// Вывод: "Привет, Анна! Тебе 30 лет."

// Различные спецификаторы формата
console.log(
  util.format(
    "%s: строка, %d: число, %j: JSON, %o: объект",
    "текст",
    42,
    { key: "value" },
    { nested: { prop: true } },
  ),
)
```

### 2. Промисификация функций с колбэками

```javascript
const util = require("util")
const fs = require("fs")

// Преобразование функций, использующих колбэки, в функции с промисами
const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

// Использование промисифицированных функций
async function copyFile(source, destination) {
  try {
    const data = await readFile(source, "utf8")
    await writeFile(destination, data)
    console.log(`Файл успешно скопирован из ${source} в ${destination}`)
    return true
  } catch (error) {
    console.error("Ошибка при копировании файла:", error)
    return false
  }
}

// Использование
copyFile("input.txt", "output.txt").then((success) => {
  if (success) {
    console.log("Операция завершена успешно!")
  }
})
```

### 3. Проверка типов и работа с ними

```javascript
const util = require("util")

// Проверка типов (начиная с Node.js 10+)
const types = util.types

// Примеры использования различных проверок типов
function demonstrateTypeChecks() {
  console.log(types.isDate(new Date())) // true
  console.log(types.isDate({})) // false

  console.log(types.isPromise(Promise.resolve())) // true
  console.log(types.isPromise({})) // false

  console.log(types.isRegExp(/abc/)) // true
  console.log(types.isRegExp("abc")) // false

  console.log(types.isMap(new Map())) // true
  console.log(types.isMap({})) // false

  console.log(types.isSet(new Set())) // true
  console.log(types.isSet([])) // false

  // Проверка ArrayBuffer и TypedArray
  const buffer = new ArrayBuffer(10)
  console.log(types.isArrayBuffer(buffer)) // true
  console.log(types.isTypedArray(new Uint8Array(buffer))) // true

  // Проверка нативных объектов
  console.log(types.isNativeError(new Error())) // true

  // Проверка WeakMap и WeakSet
  console.log(types.isWeakMap(new WeakMap())) // true
  console.log(types.isWeakSet(new WeakSet())) // true
}

demonstrateTypeChecks()
```

### 4. Управление устареванием (deprecation)

```javascript
const util = require("util")

// Маркирование функции как устаревшей
function oldFunction() {
  util.deprecate(
    actualImplementation,
    "Функция oldFunction устарела. Используйте newFunction() вместо неё.",
    "DEP001",
  )()
}

// Реальная реализация
function actualImplementation() {
  console.log("Выполняется старая функциональность")
  return "результат"
}

// Более простой способ пометки функции как устаревшей
const deprecatedFunction = util.deprecate(function () {
  console.log("Это скоро устареет!")
  return 42
}, "deprecatedFunction устарела, используйте newShinyFunction() вместо неё")

// Использование
deprecatedFunction()
// Вывод: (node:1234) [DEP0001] DeprecationWarning: deprecatedFunction устарела, используйте newShinyFunction() вместо неё
```

## Практические примеры использования

### 1. Создание отладочных логов

```javascript
const util = require("util")
const debug = util.debuglog("app")

// Логи будут отображаться только если запущено с NODE_DEBUG=app
function processData(data) {
  debug("Начало обработки данных:", data)

  try {
    // Логика обработки
    const result = data.map((item) => item * 2)

    debug("Промежуточный результат:", result)

    const sum = result.reduce((a, b) => a + b, 0)

    debug("Обработка завершена, итоговый результат:", sum)
    return sum
  } catch (error) {
    debug("Ошибка при обработке данных: %O", error)
    throw error
  }
}

// Запустите приложение с NODE_DEBUG=app node script.js,
// и вы увидите отладочные сообщения в консоли
processData([1, 2, 3, 4, 5])
```

### 2. Улучшенное логирование с инспекцией объектов

```javascript
const util = require("util")

// Создание улучшенной функции логирования
function enhancedLog(label, data) {
  console.log(
    `[${new Date().toISOString()}] ${label}: ${util.inspect(data, {
      colors: true,
      depth: null, // бесконечная глубина
      compact: false,
      breakLength: 80,
    })}`,
  )
}

// Пример использования для логирования сложных объектов
function logUserSession(user, session) {
  enhancedLog("Информация о пользователе", user)
  enhancedLog("Данные сессии", session)
}

// Пример использования
const user = {
  id: 12345,
  name: "Иван Петров",
  roles: ["user", "admin"],
  preferences: {
    theme: "dark",
    notifications: {
      email: true,
      push: {
        enabled: true,
        quiet_hours: ["23:00", "08:00"],
      },
    },
  },
  lastActivity: new Date(),
}

const session = {
  id: "sess_12345abcdef",
  created: new Date(),
  expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  ip: "192.168.1.1",
  userAgent: "Mozilla/5.0 ...",
  history: [
    { action: "login", time: new Date(Date.now() - 3600000) },
    { action: "view_profile", time: new Date(Date.now() - 1800000) },
    { action: "edit_settings", time: new Date() },
  ],
}

logUserSession(user, session)
```

### 3. Промисификация API целиком

```javascript
const util = require("util")
const fs = require("fs")

// Промисификация всего модуля fs
function promisifyModule(module) {
  const promisified = {}

  // Преобразуем все методы, которые принимают колбэки
  for (const key in module) {
    if (typeof module[key] === "function") {
      // Пропускаем методы, которые уже возвращают промисы или не принимают колбэки
      if (key.endsWith("Sync") || key.startsWith("create")) {
        promisified[key] = module[key]
      } else {
        try {
          promisified[key] = util.promisify(module[key])
        } catch (e) {
          // Если не удалось промисифицировать, оставляем оригинальную функцию
          promisified[key] = module[key]
        }
      }
    } else {
      // Копируем свойства
      promisified[key] = module[key]
    }
  }

  return promisified
}

// Промисифицированная версия fs
const fsPromises = promisifyModule(fs)

// Теперь можно использовать API с промисами
async function manipulateFiles() {
  try {
    // Создание директории
    await fsPromises.mkdir("./test-dir", { recursive: true })

    // Запись в файл
    await fsPromises.writeFile("./test-dir/test.txt", "Привет, мир!")

    // Чтение файла
    const content = await fsPromises.readFile("./test-dir/test.txt", "utf8")
    console.log("Содержимое файла:", content)

    // Получение информации о файле
    const stats = await fsPromises.stat("./test-dir/test.txt")
    console.log("Размер файла:", stats.size, "байт")

    // Удаление файла и директории
    await fsPromises.unlink("./test-dir/test.txt")
    await fsPromises.rmdir("./test-dir")

    console.log("Операции с файлами завершены успешно!")
  } catch (error) {
    console.error("Ошибка при работе с файлами:", error)
  }
}

manipulateFiles()
```

### 4. Создание служебной функции для сравнения объектов

```javascript
const util = require("util")

// Создание расширенной функции сравнения объектов на основе util.inspect
function deepCompare(obj1, obj2, options = {}) {
  // Настройки по умолчанию
  const settings = {
    showDifferences: true,
    includeEnumerableProperties: true,
    ...options,
  }

  // Преобразуем оба объекта в строки с помощью util.inspect
  const str1 = util.inspect(obj1, {
    depth: null,
    showHidden: settings.includeEnumerableProperties,
  })

  const str2 = util.inspect(obj2, {
    depth: null,
    showHidden: settings.includeEnumerableProperties,
  })

  // Сравниваем строковые представления
  const isEqual = str1 === str2

  // Если требуется показать различия и объекты не равны
  if (settings.showDifferences && !isEqual) {
    console.log("Различия обнаружены:")
    console.log("Объект 1:", str1)
    console.log("Объект 2:", str2)

    // Простая визуализация различий (для демонстрации)
    // В реальном проекте лучше использовать более продвинутую библиотеку
    try {
      const jsonObj1 = JSON.stringify(obj1, null, 2).split("\n")
      const jsonObj2 = JSON.stringify(obj2, null, 2).split("\n")

      console.log("Детальное сравнение:")
      for (let i = 0; i < Math.max(jsonObj1.length, jsonObj2.length); i++) {
        if (jsonObj1[i] !== jsonObj2[i]) {
          console.log(`Строка ${i + 1}:`)
          console.log(`- ${jsonObj1[i] || "отсутствует"}`)
          console.log(`+ ${jsonObj2[i] || "отсутствует"}`)
        }
      }
    } catch (e) {
      console.log("Не удалось показать детальное сравнение:", e.message)
    }
  }

  return isEqual
}

// Пример использования
const obj1 = {
  name: "Иван",
  age: 30,
  address: {
    city: "Москва",
    street: "Ленина",
    building: 10,
  },
  hobbies: ["чтение", "спорт"],
}

const obj2 = {
  name: "Иван",
  age: 31, // Различие здесь
  address: {
    city: "Москва",
    street: "Ленина",
    building: 10,
  },
  hobbies: ["чтение", "программирование"], // И здесь
}

const areEqual = deepCompare(obj1, obj2)
console.log("Объекты идентичны:", areEqual)
```

## Новые возможности в современных версиях Node.js

### 1. Работа с асинхронными итераторами

```javascript
const util = require("util")
const fs = require("fs")
const stream = require("stream")

// Преобразование потока в асинхронный итератор
const pipeline = util.promisify(stream.pipeline)

async function processLargeFile(filePath) {
  // Создаем поток чтения файла
  const readStream = fs.createReadStream(filePath, {
    encoding: "utf8",
    highWaterMark: 1024, // Размер чанка в байтах
  })

  // Создаем трансформационный поток
  const processChunk = new stream.Transform({
    objectMode: true,
    transform(chunk, encoding, callback) {
      // Обработка данных (например, подсчет слов)
      const wordCount = chunk.toString().split(/\s+/).length
      this.push(`Чанк содержит ${wordCount} слов\n`)
      callback()
    },
  })

  // Создаем поток для записи результатов
  const writeStream = fs.createWriteStream(`${filePath}.analysis.txt`)

  try {
    // Используем pipeline для объединения потоков
    await pipeline(readStream, processChunk, writeStream)
    console.log("Обработка файла завершена успешно")
  } catch (error) {
    console.error("Ошибка при обработке файла:", error)
  }
}

// Использование
processLargeFile("большой_текстовый_файл.txt")
```

### 2. Функция callbackify для обратной совместимости

```javascript
const util = require("util")

// Функция, возвращающая промис
async function findUserById(id) {
  if (!id) {
    throw new Error("ID не должен быть пустым")
  }

  // Имитируем получение данных из базы
  if (id === 1) {
    return { id: 1, name: "Иван", role: "admin" }
  } else if (id === 2) {
    return { id: 2, name: "Мария", role: "user" }
  } else {
    throw new Error(`Пользователь с ID ${id} не найден`)
  }
}

// Преобразование функции с промисами в функцию с колбэками
// для обратной совместимости со старым кодом
const findUserByIdCallback = util.callbackify(findUserById)

// Использование с колбэками
findUserByIdCallback(1, (err, user) => {
  if (err) {
    console.error("Ошибка при поиске пользователя:", err)
    return
  }

  console.log("Пользователь найден:", user)
})

// Проверка обработки ошибок
findUserByIdCallback(999, (err, user) => {
  if (err) {
    console.error("Ожидаемая ошибка:", err.message)
    return
  }

  console.log("Этот код не должен выполниться!")
})
```

### 3. Использование TextEncoder и TextDecoder

```javascript
const util = require("util")

// Получение доступа к TextEncoder и TextDecoder из util
const { TextEncoder, TextDecoder } = util

function demonstrateTextEncoding() {
  // Кодирование текста в байты
  const encoder = new TextEncoder()
  const text = "Привет, мир! 你好，世界！"

  // Преобразование строки в Uint8Array
  const encoded = encoder.encode(text)
  console.log("Закодированные данные:", encoded)
  console.log("Размер в байтах:", encoded.length)

  // Декодирование байтов обратно в текст
  const decoder = new TextDecoder("utf-8")
  const decoded = decoder.decode(encoded)
  console.log("Декодированный текст:", decoded)

  // Проверка, что декодированный текст совпадает с оригиналом
  console.log("Тексты идентичны:", text === decoded)

  // Пример с другой кодировкой (Windows-1251 для кириллицы)
  try {
    const win1251Decoder = new TextDecoder("windows-1251")
    const win1251Text = win1251Decoder.decode(new Uint8Array([202, 238, 235, 235, 229, 227, 224]))
    console.log("Текст в Windows-1251:", win1251Text) // "Коллега"
  } catch (e) {
    console.log("Кодировка windows-1251 не поддерживается")
  }
}

demonstrateTextEncoding()
```

## Лучшие практики

### 1. Унифицированное логирование с помощью util.inspect

```javascript
const util = require("util")

// Создаем настраиваемую функцию логирования
function createLogger(options = {}) {
  const defaultOptions = {
    depth: 4,
    colors: true,
    showHidden: false,
    ...options,
  }

  return {
    log(message, ...args) {
      console.log(
        `[${new Date().toISOString()}] [INFO] ${message}`,
        ...args.map((arg) => (typeof arg === "object" ? util.inspect(arg, defaultOptions) : arg)),
      )
    },

    error(message, ...args) {
      console.error(
        `[${new Date().toISOString()}] [ERROR] ${message}`,
        ...args.map((arg) => {
          if (arg instanceof Error) {
            return util.inspect(
              {
                message: arg.message,
                stack: arg.stack,
                ...arg, // Для захвата дополнительных свойств ошибки
              },
              defaultOptions,
            )
          }
          return typeof arg === "object" ? util.inspect(arg, defaultOptions) : arg
        }),
      )
    },

    debug(message, ...args) {
      if (process.env.DEBUG) {
        console.debug(
          `[${new Date().toISOString()}] [DEBUG] ${message}`,
          ...args.map((arg) =>
            typeof arg === "object" ? util.inspect(arg, { ...defaultOptions, depth: null }) : arg,
          ),
        )
      }
    },
  }
}

// Создание логгера и использование
const logger = createLogger()

// Примеры использования
function demonstrateLogging() {
  logger.log("Приложение запущено")

  const user = {
    id: 1,
    name: "Тестовый пользователь",
    permissions: {
      admin: true,
      modules: ["users", "content", "settings"],
    },
  }

  logger.log("Пользователь авторизован", user)

  try {
    // Имитация ошибки
    throw new Error("Тестовая ошибка")
  } catch (error) {
    // Добавляем контекст к ошибке
    error.context = { userId: user.id, action: "test" }
    logger.error("Произошла ошибка", error)
  }

  // Отладочная информация
  logger.debug("Детальная информация о состоянии", {
    memory: process.memoryUsage(),
    uptime: process.uptime(),
    env: process.env.NODE_ENV,
  })
}

demonstrateLogging()
```

### 2. Промисификация только необходимых функций

```javascript
const util = require("util")
const fs = require("fs")
const childProcess = require("child_process")

// Выборочная промисификация только нужных функций
const execPromise = util.promisify(childProcess.exec)
const readFilePromise = util.promisify(fs.readFile)
const writeFilePromise = util.promisify(fs.writeFile)

// Пример: обработка файла и выполнение команды
async function processConfigFile(configPath) {
  try {
    // Чтение конфигурационного файла
    const configData = await readFilePromise(configPath, "utf8")

    // Разбор JSON
    const config = JSON.parse(configData)

    // Модификация конфигурации
    config.lastUpdated = new Date().toISOString()
    config.environment = process.env.NODE_ENV || "development"

    // Получение информации о системе через командную строку
    const { stdout } = await execPromise("uname -a")
    config.systemInfo = stdout.trim()

    // Запись обновленного файла
    await writeFilePromise(configPath, JSON.stringify(config, null, 2))

    console.log("Конфигурация успешно обновлена!")
    return config
  } catch (error) {
    console.error("Ошибка при обработке конфигурации:", error)
    throw error
  }
}

// Использование
processConfigFile("./config.json")
  .then((config) => {
    console.log("Новая конфигурация:", config)
  })
  .catch((error) => {
    process.exit(1)
  })
```

### 3. Эффективное использование util.types для проверки типов

```javascript
const util = require("util")
const { types } = util

// Функция для безопасной обработки данных с проверкой типов
function safelyProcessData(data) {
  // Проверка типа входных данных и соответствующая обработка
  if (types.isArray(data)) {
    console.log("Обработка массива...")
    return data.map((item) => safelyProcessData(item))
  }

  if (types.isDate(data)) {
    console.log("Обработка даты...")
    return {
      iso: data.toISOString(),
      formatted: data.toLocaleString(),
      timestamp: data.getTime(),
    }
  }

  if (types.isRegExp(data)) {
    console.log("Обработка регулярного выражения...")
    return {
      pattern: data.source,
      flags: data.flags,
    }
  }

  if (types.isMap(data) || types.isSet(data)) {
    console.log(`Обработка ${types.isMap(data) ? "Map" : "Set"}...`)
    return Array.from(data)
  }

  if (types.isArrayBuffer(data) || types.isTypedArray(data)) {
    console.log("Обработка бинарных данных...")
    // Для примера, просто возвращаем длину
    return {
      type: Object.prototype.toString.call(data),
      byteLength: data.byteLength,
    }
  }

  if (types.isPromise(data)) {
    console.log("Обработка промиса...")
    return data.then(safelyProcessData)
  }

  if (typeof data === "object" && data !== null) {
    console.log("Обработка объекта...")
    const result = {}
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        result[key] = safelyProcessData(data[key])
      }
    }
    return result
  }

  // Базовые типы просто возвращаем
  return data
}

// Пример использования
const complexData = {
  name: "Тестовые данные",
  values: [1, 2, 3, 4, 5],
  regex: /test-pattern/gi,
  date: new Date(),
  binaryData: new Uint8Array([1, 2, 3, 4]),
  mapData: new Map([
    ["key1", "value1"],
    ["key2", "value2"],
  ]),
  setData: new Set([1, 2, 3, 3, 4]), // дубликаты автоматически удалятся
  asyncValue: Promise.resolve("результат промиса"),
}

// Обработка сложной структуры данных
const processedData = safelyProcessData(complexData)

// Для обработки промисов мы должны ждать их разрешения
Promise.all([processedData, processedData.asyncValue]).then(() => {
  console.log("Результат обработки:", util.inspect(processedData, { depth: null }))
})
```

## Заключение

Модуль `util` в Node.js предоставляет широкий набор вспомогательных функций, которые значительно упрощают разработку приложений. От форматирования строк и инспекции объектов до промисификации колбэков и проверки типов - этот модуль содержит множество полезных инструментов.

В современных версиях Node.js модуль `util` продолжает развиваться, добавляя новые возможности, такие как работа с асинхронными итераторами, поддержка TextEncoder/TextDecoder и улучшенные методы инспекции.

Правильное использование возможностей модуля `util` может сделать ваш код более чистым, безопасным и поддерживаемым, особенно при работе с асинхронными операциями, сложными объектами и отладкой.

---

[[002 Node.js|Назад]]
