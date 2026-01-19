---
title: Как дописать данные в файл (fs.appendFile() fs.appendFileSync())
draft: false
tags:
  - "#NodeJS"
  - "#fs"
  - "#файловая_система"
  - "#асинхронность"
  - "#синхронность"
  - "#IO"
info:
  - https://nodejs.org/api/fs.html#fsappendfilepath-data-options-callback
  - https://nodejs.org/api/fs.html#fsappendfilesyncpath-data-options
---

В Node.js для добавления данных в конец файла (без перезаписи существующего содержимого) используются функции `fs.appendFile()` и `fs.appendFileSync()` из встроенного модуля `fs`.

## 1. Асинхронный способ: `fs.appendFile()`

Метод `fs.appendFile()` добавляет данные в файл **асинхронно**, не блокируя основной поток выполнения программы.

**Если файла не существует**, он будет создан автоматически.

```javascript
const fs = require("fs")

fs.appendFile("log.txt", "Новая строка\n", (err) => {
  if (err) {
    console.error("Ошибка при записи:", err)
    return
  }
  console.log("Данные добавлены в файл")
})
```

**Преимущества**:

- Не блокирует выполнение кода во время записи
- Идеально подходит для серверных приложений и асинхронных операций
- Позволяет продолжать обработку запросов, пока идет запись

## 2. Синхронный способ: `fs.appendFileSync()`

Функция `fs.appendFileSync()` добавляет данные в файл в **синхронном** режиме, блокируя выполнение программы до завершения операции записи.

```javascript
const fs = require("fs")

try {
  fs.appendFileSync("log.txt", "Синхронная запись\n")
  console.log("Файл обновлен")
} catch (err) {
  console.error("Ошибка при записи:", err)
}
```

**Особенности**:

- Блокирует выполнение программы до завершения записи
- Полезен в скриптах, где операции должны выполняться последовательно
- Проще для обработки ошибок (через try-catch)

## 3. Управление кодировкой и опциями

По умолчанию Node.js записывает файлы в байтовом режиме. Для задания кодировки и других опций используется третий параметр:

### Асинхронный вариант с кодировкой:

```javascript
fs.appendFile("log.txt", "Добавлено с UTF-8\n", "utf8", (err) => {
  if (err) throw err
  console.log("Данные добавлены с кодировкой UTF-8")
})
```

### Более подробные опции:

```javascript
fs.appendFile(
  "log.txt",
  "Строка с опциями\n",
  {
    encoding: "utf8",
    mode: 0o666, // права доступа к файлу
    flag: "a", // 'a' означает append (по умолчанию)
  },
  (err) => {
    if (err) throw err
    console.log("Данные добавлены с дополнительными опциями")
  },
)
```

### Синхронный вариант с кодировкой:

```javascript
fs.appendFileSync("log.txt", "Еще одна строка\n", "utf8")
```

## 4. Работа с промисами (fs/promises)

Начиная с Node.js v14, можно использовать модуль `fs/promises` для работы с промисами:

```javascript
const fsPromises = require("fs/promises")

async function appendToFile() {
  try {
    await fsPromises.appendFile("log.txt", "Асинхронная запись с промисами\n", "utf8")
    console.log("Файл успешно обновлен")
  } catch (err) {
    console.error("Ошибка при записи:", err)
  }
}

appendToFile()
```

## 5. Примеры использования

### Ведение лога приложения:

```javascript
function log(message) {
  const timestamp = new Date().toISOString()
  fs.appendFile("app.log", `${timestamp} - ${message}\n`, (err) => {
    if (err) console.error("Ошибка записи в лог:", err)
  })
}

log("Приложение запущено")
log("Пользователь вошел в систему")
```

### Сохранение данных в CSV:

```javascript
function addRecordToCsv(record) {
  const csvLine = record.join(",") + "\n"

  fs.appendFileSync("data.csv", csvLine, "utf8")
}

// Добавление заголовков, если файл новый
if (!fs.existsSync("data.csv")) {
  addRecordToCsv(["ID", "Имя", "Возраст", "Email"])
}

// Добавление записей
addRecordToCsv(["1", "Иван", "30", "ivan@example.com"])
addRecordToCsv(["2", "Мария", "25", "maria@example.com"])
```

## Итог

- `fs.appendFile()` — **асинхронное** добавление данных (не блокирует выполнение)
- `fs.appendFileSync()` — **синхронное** добавление (блокирует поток)
- Оба метода **создают файл**, если он не существует
- Можно указывать **кодировку**, например `'utf8'`

В большинстве случаев рекомендуется использовать `fs.appendFile()` для асинхронных приложений, особенно для серверов, чтобы избежать блокировки обработки запросов во время операций ввода-вывода.

---

[[002 Node.js|Назад]]
