---
title: Напишите код который добавляет новую запись в таблицу todos и возвращает её ID
draft: false
tags:
  - "#NodeJS"
  - "#MySQL"
  - "#SQL"
  - "#база-данных"
  - "#insert"
  - "#callback"
info:
  - "[Документация по mysql пакету](https://github.com/mysqljs/mysql#readme)"
  - "[Работа с базами данных в Node.js](https://nodejs.dev/learn/nodejs-with-mysql)"
  - "[SQL-запросы с параметрами в Node.js](https://www.npmjs.com/package/mysql#escaping-query-values)"
---

### **Добавление новой записи в таблицу `todos` и получение её ID**

```javascript
const mysql = require("mysql")

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "test_db",
  connectionLimit: 10,
})

function addTodo(title, callback) {
  const query = "INSERT INTO todos (title) VALUES (?)"

  pool.query(query, [title], (err, result) => {
    if (err) {
      console.error("Ошибка вставки:", err.message)
      callback(err, null)
      return
    }
    console.log("Новая запись добавлена, ID:", result.insertId)
    callback(null, result.insertId)
  })
}

// Пример вызова функции
addTodo("Купить молоко", (err, todoId) => {
  if (err) {
    console.error("Ошибка:", err.message)
    return
  }
  console.log("Добавленный todo ID:", todoId)
})
```

---

### **Описание кода:**

1. Создаётся **пул соединений** (`mysql.createPool`).
2. Функция `addTodo(title, callback)` выполняет `INSERT INTO todos (title) VALUES (?)`:
   - `?` используется для защиты от SQL-инъекций.
   - `result.insertId` содержит **ID новой записи**.
3. Результат возвращается через **callback**.
4. Пример вызова функции добавляет задачу `"Купить молоко"` и выводит её ID.

**Таблица `todos` должна существовать**:

```sql
CREATE TABLE todos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL
);
```

**Вывод в консоли при успешной вставке:**

```
Новая запись добавлена, ID: 42
Добавленный todo ID: 42
```

---

[[002 Node.js|Назад]]
