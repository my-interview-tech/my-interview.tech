---
title: Как выполнить запрос SELECT FROM users WHERE id = с параметром
draft: false
tags:
  - "#NodeJS"
  - "#SQL"
  - "#database"
  - "#mysql"
  - "#параметризация"
  - "#security"
info:
  - https://github.com/sidorares/node-mysql2#using-prepared-statements
  - https://www.npmjs.com/package/mysql
  - https://owasp.org/www-community/attacks/SQL_Injection
---

Выполнение SQL-запросов с параметрами — важная практика для обеспечения безопасности приложения и предотвращения SQL-инъекций. Рассмотрим, как правильно выполнять параметризованные запросы типа `SELECT * FROM users WHERE id = ?` в Node.js.

## Почему нужно использовать параметры?

Использование параметров в запросах вместо прямой вставки значений в строку SQL:

- **Предотвращает SQL-инъекции** — одну из самых распространенных уязвимостей веб-приложений
- **Улучшает производительность** благодаря возможному кэшированию запроса на уровне СУБД
- **Делает код более читаемым и безопасным**

## Примеры реализации с разными библиотеками

### 1. Использование библиотеки mysql2 (рекомендуется)

```javascript
const mysql = require("mysql2")

// Создаем соединение
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "mydb",
})

// Параметр, который нужно подставить
const userId = 5

// Вариант 1: Использование плейсхолдеров с массивом параметров (рекомендуется)
connection.query("SELECT * FROM users WHERE id = ?", [userId], function (err, results) {
  if (err) {
    console.error("Ошибка при выполнении запроса:", err)
    return
  }
  console.log("Результат запроса:", results)
})

// Вариант 2: Использование именованных параметров
connection.query(
  "SELECT * FROM users WHERE id = :userId",
  { userId: userId },
  function (err, results) {
    if (err) {
      console.error("Ошибка при выполнении запроса:", err)
      return
    }
    console.log("Результат запроса:", results)
  },
)
```

### 2. Использование Prepared Statements в mysql2

Prepared Statements обеспечивают дополнительную производительность при повторном выполнении одного и того же запроса с разными параметрами:

```javascript
const mysql = require("mysql2")

// Создаем соединение с поддержкой подготовленных запросов
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "mydb",
})

// Подготавливаем запрос
const statement = connection.prepare("SELECT * FROM users WHERE id = ?")

// Выполняем подготовленный запрос с параметром
statement.execute([5], (err, results) => {
  if (err) {
    console.error("Ошибка при выполнении запроса:", err)
    return
  }
  console.log("Результат запроса для id=5:", results)

  // Повторное выполнение с другим параметром
  statement.execute([10], (err, results) => {
    console.log("Результат запроса для id=10:", results)
  })
})
```

### 3. Использование async/await с mysql2/promise

Для более современного подхода можно использовать Promise API:

```javascript
const mysql = require("mysql2/promise")

async function getUserById(id) {
  try {
    // Создаем соединение
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "password",
      database: "mydb",
    })

    // Выполняем запрос с параметром
    const [rows, fields] = await connection.execute("SELECT * FROM users WHERE id = ?", [id])

    // Закрываем соединение
    await connection.end()

    return rows[0] // Возвращаем первую запись (или undefined, если не найдена)
  } catch (error) {
    console.error("Ошибка при выполнении запроса:", error)
    throw error
  }
}

// Использование функции
getUserById(5)
  .then((user) => console.log("Пользователь:", user))
  .catch((err) => console.error("Не удалось получить пользователя:", err))
```

### 4. Использование пула соединений

Для производственных приложений лучше использовать пул соединений:

```javascript
const mysql = require("mysql2")

// Создаем пул соединений
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "mydb",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

function getUserById(id, callback) {
  pool.query("SELECT * FROM users WHERE id = ?", [id], function (err, results) {
    if (err) {
      callback(err, null)
      return
    }
    callback(null, results[0])
  })
}

// Использование функции
getUserById(5, (err, user) => {
  if (err) {
    console.error("Ошибка:", err)
    return
  }

  if (user) {
    console.log("Найден пользователь:", user)
  } else {
    console.log("Пользователь не найден")
  }
})
```

## Множественные параметры и условия

### Несколько параметров в запросе

```javascript
// Запрос с несколькими параметрами
connection.query(
  "SELECT * FROM users WHERE age > ? AND role = ?",
  [18, "user"],
  function (err, results) {
    if (err) throw err
    console.log("Найдено пользователей:", results.length)
  },
)
```

### Динамические параметры IN

Для запросов с оператором IN:

```javascript
const userIds = [1, 5, 10, 15]

// Запрос со списком ID
connection.query("SELECT * FROM users WHERE id IN (?)", [userIds], function (err, results) {
  if (err) throw err
  console.log("Найдено пользователей:", results.length)
})
```

## Распространенные ошибки и их избежание

### ❌ Никогда не делайте так:

```javascript
// НЕБЕЗОПАСНО! Подвержено SQL-инъекциям!
const userId = req.params.id
const query = `SELECT * FROM users WHERE id = ${userId}`
connection.query(query, function (err, results) {
  // ...
})
```

### ✅ Правильный подход:

```javascript
// Безопасно, используются параметры
const userId = req.params.id
connection.query("SELECT * FROM users WHERE id = ?", [userId], function (err, results) {
  // ...
})
```

## Заключение

Параметризованные запросы — это не просто хорошая практика, а необходимая мера безопасности для любого приложения, работающего с базами данных. Всегда используйте параметры вместо прямой вставки значений в SQL-запросы для защиты от SQL-инъекций.

- Используйте `?` в качестве плейсхолдеров для параметров
- Передавайте значения отдельно от текста запроса
- Для более сложных запросов рассмотрите использование ORM, таких как Sequelize или TypeORM

---

[[002 Node.js|Назад]]
