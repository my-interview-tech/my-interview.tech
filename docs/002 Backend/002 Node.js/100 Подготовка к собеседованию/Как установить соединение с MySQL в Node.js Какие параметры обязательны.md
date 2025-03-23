---
title: Как установить соединение с MySQL в Node.js Какие параметры обязательны
draft: true
tags: NodeJS
info:
---
### **Установка соединения с MySQL в Node.js**

Для работы с MySQL в `Node.js` используется библиотека `mysql2`.

### **1. Установка библиотеки**

bash

КопироватьРедактировать

`npm install mysql2`

---

### **2. Подключение к базе данных**

Создадим соединение с MySQL с помощью `mysql2`:

js

КопироватьРедактировать

`const mysql = require('mysql2');  const connection = mysql.createConnection({   host: 'localhost',      // Адрес сервера БД   user: 'root',           // Имя пользователя   password: 'password',   // Пароль   database: 'test_db'     // Название базы данных });  connection.connect((err) => {   if (err) {     console.error('Ошибка подключения:', err.message);     return;   }   console.log('Успешное подключение к MySQL'); });`

---

### **3. Обязательные параметры для подключения**

- **`host`** – адрес сервера (по умолчанию `localhost`).
- **`user`** – имя пользователя MySQL.
- **`password`** – пароль пользователя.
- **`database`** – название базы данных.

Дополнительно можно указать:

- **`port`** – порт MySQL (по умолчанию `3306`).
- **`multipleStatements`** – разрешает выполнение нескольких SQL-запросов в одном выражении (`false` по умолчанию).
- **`connectTimeout`** – время ожидания подключения в миллисекундах.

---

### **4. Закрытие соединения**

После работы с базой данных соединение нужно закрыть:

js

КопироватьРедактировать

`connection.end((err) => {   if (err) {     console.error('Ошибка при закрытии соединения:', err.message);     return;   }   console.log('Соединение закрыто'); });`

---

### **Альтернативный способ: Пул соединений**

Для работы с большим количеством запросов рекомендуется использовать пул соединений:

js

КопироватьРедактировать

`const pool = mysql.createPool({   host: 'localhost',   user: 'root',   password: 'password',   database: 'test_db',   waitForConnections: true,   connectionLimit: 10,  // Максимальное количество соединений в пуле   queueLimit: 0 });  pool.getConnection((err, connection) => {   if (err) {     console.error('Ошибка получения соединения:', err.message);     return;   }   console.log('Соединение получено');    connection.release(); // Возвращаем соединение в пул });`

Использование пула позволяет лучше управлять ресурсами базы данных и избежать проблем с превышением количества соединений.