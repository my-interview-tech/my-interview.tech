---
title: Что возвращает метод connection.query() при вставке данных (INSERT)
draft: false
tags:
  - "#NodeJS"
  - "#MySQL"
  - "#database"
  - "#SQL"
  - "#INSERT"
  - "#запросы-к-БД"
info:
  - "[Документация по MySQL для Node.js](https://github.com/mysqljs/mysql)"
  - "[Руководство по работе с базами данных в Node.js](https://nodejs.org/en/learn/modules/databases)"
  - "[Официальная документация MySQL по INSERT](https://dev.mysql.com/doc/refman/8.0/en/insert.html)"
---

При успешном выполнении `INSERT` метод `connection.query()` возвращает объект результата (`result`), содержащий следующую информацию:

#### **Пример кода с `INSERT`**

```javascript
const mysql = require("mysql")

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "test_db",
})

const user = { name: "Alice", age: 25 }

connection.query(
  "INSERT INTO users (name, age) VALUES (?, ?)",
  [user.name, user.age],
  (err, result) => {
    if (err) {
      console.error("Ошибка вставки:", err.message)
      return
    }
    console.log("Результат вставки:", result)
  },
)
```

#### **Что содержит `result`:**

```json
{
  "fieldCount": 0,
  "affectedRows": 1,
  "insertId": 42,
  "serverStatus": 2,
  "warningCount": 0,
  "message": "",
  "protocol41": true,
  "changedRows": 0
}
```

### **Описание полей:**

| Поле           | Значение                                                                    |
| -------------- | --------------------------------------------------------------------------- |
| `affectedRows` | Количество вставленных строк (обычно `1`, если вставка прошла успешно).     |
| `insertId`     | ID последней вставленной строки (если таблица использует `AUTO_INCREMENT`). |
| `fieldCount`   | Всегда `0` для `INSERT`.                                                    |
| `serverStatus` | Текущий статус сервера MySQL.                                               |
| `warningCount` | Количество предупреждений MySQL при выполнении запроса.                     |
| `message`      | Сообщение от сервера (обычно пустое для `INSERT`).                          |
| `changedRows`  | Всегда `0` для `INSERT`. Используется в `UPDATE`/`DELETE`.                  |

### **Как получить ID вставленной записи**

```javascript
console.log("ID новой записи:", result.insertId)
```

### **Вывод**

- `affectedRows` показывает, сколько строк было вставлено.
- `insertId` содержит ID вставленной записи, если используется `AUTO_INCREMENT`.
- `changedRows` актуален только для `UPDATE` и `DELETE`.

---

[[002 Node.js|Назад]]
