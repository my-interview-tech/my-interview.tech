---
title: Как обработать SQL-инъекции при использовании пакета mysqljsmysql
draft: true
tags: NodeJS
info:
---
SQL-инъекции возникают, когда данные от пользователя напрямую вставляются в SQL-запрос без экранирования. Чтобы предотвратить это, необходимо использовать **подготовленные запросы (prepared statements)** и **параметризованные запросы**.

---

### **1. Установка библиотеки `mysql`**

bash

КопироватьРедактировать

`npm install mysql`

---

### **2. Опасный способ (НЕ ИСПОЛЬЗОВАТЬ!)**

Этот код уязвим для SQL-инъекций:

js

КопироватьРедактировать

``const userId = "1 OR 1=1"; // Вредоносный ввод  connection.query(`SELECT * FROM users WHERE id = ${userId}`, (err, results) => {   if (err) throw err;   console.log(results); });``

При таком подходе злоумышленник может передать `1 OR 1=1` и получить **все записи из таблицы**.

---

### **3. Безопасный способ: Подготовленные запросы (`?` в SQL)**

js

КопироватьРедактировать

`const mysql = require('mysql');  const connection = mysql.createConnection({   host: 'localhost',   user: 'root',   password: 'password',   database: 'test_db' });  const userId = 1; // Безопасное значение  connection.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {   if (err) {     console.error('Ошибка выполнения запроса:', err.message);     return;   }   console.log('Результат:', results); });`

#### **Как это работает:**

- `?` – **метка для параметра** (значение передается отдельно).
- Массив `[]` передает безопасные значения в запрос.
- Библиотека **автоматически экранирует** данные, предотвращая SQL-инъекции.

---

### **4. Безопасные INSERT, UPDATE и DELETE**

js

КопироватьРедактировать

`const newUser = { name: 'Alice', age: 25 };  connection.query(   'INSERT INTO users (name, age) VALUES (?, ?)',   [newUser.name, newUser.age],   (err, results) => {     if (err) {       console.error('Ошибка вставки:', err.message);       return;     }     console.log('Новая запись добавлена:', results.insertId);   } );`

---

### **5. Экранирование вручную (альтернативный метод)**

Если невозможно использовать `?`, можно вручную экранировать данные:

js

КопироватьРедактировать

`const unsafeInput = "O'Reilly";   const safeInput = mysql.escape(unsafeInput); console.log(safeInput); // Выведет: 'O\'Reilly'`

Но **предпочтительнее** использовать подготовленные запросы.

---

### **6. Использование пула соединений (рекомендуется для продакшена)**

При частых запросах лучше использовать пул соединений:

js

КопироватьРедактировать

`const pool = mysql.createPool({   host: 'localhost',   user: 'root',   password: 'password',   database: 'test_db',   connectionLimit: 10 });  pool.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {   if (err) {     console.error('Ошибка:', err.message);     return;   }   console.log('Данные пользователя:', results); });`

---

### **Вывод**

✅ **Используйте `?` в SQL-запросах** (подготовленные запросы).  
✅ **Никогда не вставляйте данные напрямую в SQL-строку**.  
✅ **Для экранирования вручную используйте `mysql.escape()`**, если нужно.  
✅ **Используйте пул соединений (`createPool()`) для лучшей производительности**.