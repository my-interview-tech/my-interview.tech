---
title: Как настроить пул соединений с MySQL
draft: false
tags:
  - "#NodeJS"
  - "#MySQL"
  - "#база-данных"
  - "#пул-соединений"
  - "#Node.js"
info:
  - "[Документация по модулю mysql для Node.js](https://github.com/mysqljs/mysql#pooling-connections)"
  - "[Руководство по работе с MySQL в Node.js](https://www.npmjs.com/package/mysql)"
  - "[Официальная документация MySQL](https://dev.mysql.com/doc/)"
---

Использование пула соединений (`mysql.createPool()`) позволяет **эффективно управлять соединениями**, повторно использовать их и улучшить производительность приложения.

---

### **1. Установка библиотеки**

```bash
npm install mysql
```

---

### **2. Создание пула соединений**

```javascript
const mysql = require("mysql")

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "test_db",
  connectionLimit: 10, // Максимальное количество соединений в пуле
  waitForConnections: true, // Ожидать свободное соединение, если пул заполнен
  queueLimit: 0, // 0 — не ограничивать очередь ожидания
})

module.exports = pool
```

#### **Описание параметров:**

| Параметр             | Описание                                                  |
| -------------------- | --------------------------------------------------------- |
| `connectionLimit`    | Максимальное количество соединений в пуле.                |
| `waitForConnections` | Если `true`, запросы будут ждать освобождения соединения. |
| `queueLimit`         | Максимальная длина очереди запросов (0 — неограниченно).  |

---

### **3. Использование пула соединений**

#### **Выполнение запроса через пул**

```javascript
pool.query("SELECT * FROM users", (err, results) => {
  if (err) {
    console.error("Ошибка выполнения запроса:", err.message)
    return
  }
  console.log("Данные пользователей:", results)
})
```

---

### **4. Получение и освобождение соединения вручную**

Иногда нужно явно получить соединение, выполнить несколько запросов и освободить его.

```javascript
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Ошибка получения соединения:", err.message)
    return
  }

  connection.query("SELECT * FROM users", (err, results) => {
    connection.release() // Освобождаем соединение обратно в пул

    if (err) {
      console.error("Ошибка запроса:", err.message)
      return
    }

    console.log("Результат запроса:", results)
  })
})
```

#### **Важно:**

- **Обязательно вызывайте `connection.release()` после использования**, иначе соединение зависнет и не будет доступно другим запросам.

---

### **5. Закрытие пула соединений**

При завершении работы сервера пул можно корректно закрыть:

```javascript
pool.end((err) => {
  if (err) {
    console.error("Ошибка закрытия пула:", err.message)
  } else {
    console.log("Пул соединений закрыт")
  }
})
```

---

### **Вывод**

✅ Используйте `mysql.createPool()` для эффективного управления соединениями.  
✅ Запросы выполняйте через `pool.query()`.  
✅ Если берете соединение вручную (`pool.getConnection()`), не забудьте вызвать `connection.release()`.  
✅ Закрывайте пул при завершении работы (`pool.end()`).

---

[[002 Node.js|Назад]]
