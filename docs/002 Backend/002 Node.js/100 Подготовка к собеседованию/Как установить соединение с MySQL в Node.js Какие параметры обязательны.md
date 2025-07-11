---
title: Как установить соединение с MySQL в Node.js Какие параметры обязательны
draft: false
tags:
  - "#NodeJS"
  - "#MySQL"
  - "#база-данных"
  - "#соединение"
  - "#mysql2"
info:
  - "[Документация mysql2](https://github.com/sidorares/node-mysql2#readme)"
  - "[Документация по MySQL Connection Options](https://dev.mysql.com/doc/refman/8.0/en/connection-options.html)"
  - "[Руководство по работе с MySQL в Node.js](https://www.npmjs.com/package/mysql2#using-connection-pools)"
---

## Установка соединения с MySQL в Node.js

Для работы с MySQL в Node.js чаще всего используется библиотека `mysql2` — современная и производительная версия драйвера MySQL для Node.js.

### 1. Установка библиотеки

```bash
npm install mysql2
```

### 2. Подключение к базе данных

Базовый пример создания соединения с MySQL с помощью `mysql2`:

```javascript
const mysql = require("mysql2")

const connection = mysql.createConnection({
  host: "localhost", // Адрес сервера БД
  user: "root", // Имя пользователя
  password: "password", // Пароль
  database: "test_db", // Название базы данных
})

connection.connect((err) => {
  if (err) {
    console.error("Ошибка подключения:", err.message)
    return
  }
  console.log("Успешное подключение к MySQL")
})
```

### 3. Обязательные параметры для подключения

- **`host`** – адрес сервера базы данных (по умолчанию `localhost`).
- **`user`** – имя пользователя MySQL.
- **`password`** – пароль пользователя.
- **`database`** – название базы данных.

### 4. Дополнительные параметры

- **`port`** – порт MySQL (по умолчанию `3306`).
- **`socketPath`** – путь к UNIX сокету (альтернатива host и port).
- **`multipleStatements`** – разрешает выполнение нескольких SQL-запросов в одном выражении (`false` по умолчанию).
- **`connectTimeout`** – время ожидания подключения в миллисекундах.
- **`charset`** – кодировка для соединения (например, 'utf8mb4').
- **`timezone`** – часовой пояс для соединения.
- **`ssl`** – опции SSL/TLS для защищенного соединения.

### 5. Закрытие соединения

После работы с базой данных соединение необходимо закрыть:

```javascript
connection.end((err) => {
  if (err) {
    console.error("Ошибка при закрытии соединения:", err.message)
    return
  }
  console.log("Соединение закрыто")
})
```

## Использование пула соединений

Для приложений с высокой нагрузкой рекомендуется использовать пул соединений:

```javascript
const mysql = require("mysql2")

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "test_db",
  waitForConnections: true,
  connectionLimit: 10, // Максимальное количество соединений в пуле
  queueLimit: 0,
})

// Получение соединения из пула
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Ошибка получения соединения:", err.message)
    return
  }
  console.log("Соединение получено")

  // Выполнение запроса
  connection.query("SELECT 1 + 1 AS result", (err, results) => {
    // Важно! Всегда возвращайте соединение в пул
    connection.release()

    if (err) {
      console.error("Ошибка запроса:", err.message)
      return
    }

    console.log("Результат:", results[0].result)
  })
})
```

## Использование промисов с mysql2

Библиотека mysql2 также предоставляет Promise API:

```javascript
const mysql = require("mysql2/promise")

async function main() {
  try {
    // Создание соединения
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "password",
      database: "test_db",
    })

    // Выполнение запроса
    const [rows, fields] = await connection.execute("SELECT * FROM users WHERE id = ?", [userId])

    console.log("Результат:", rows)

    // Закрытие соединения
    await connection.end()
  } catch (error) {
    console.error("Произошла ошибка:", error.message)
  }
}

main()
```

## Преимущества пула соединений

- **Улучшение производительности**: повторное использование существующих соединений
- **Управление нагрузкой**: ограничение максимального числа соединений
- **Отказоустойчивость**: автоматическое восстановление соединений
- **Масштабируемость**: эффективная работа при большом количестве запросов

## Советы по безопасности

- Никогда не храните учетные данные базы данных в коде напрямую
- Используйте подготовленные запросы для предотвращения SQL-инъекций
- Храните чувствительные данные в переменных окружения или файлах конфигурации вне репозитория
- Используйте SSL/TLS для шифрования соединений с базой данных в production-окружении

---

[[002 Node.js|Назад]]
