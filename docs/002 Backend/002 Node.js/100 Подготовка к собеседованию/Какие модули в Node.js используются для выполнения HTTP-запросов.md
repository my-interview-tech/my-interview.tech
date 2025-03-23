---
title: Какие модули в Node.js используются для выполнения HTTP-запросов
draft: true
tags: NodeJS
info:
---
В **Node.js** для выполнения HTTP-запросов можно использовать несколько встроенных и внешних модулей. Вот основные из них:

### 1. **Встроенные модули Node.js:**

#### a) **http**

- Модуль `http` является встроенным и предоставляет базовую функциональность для работы с HTTP-запросами и ответами. Это низкоуровневый модуль, который позволяет отправлять HTTP-запросы (например, с помощью метода `http.request()`).
- **Пример:**
    
    js
    
    КопироватьРедактировать
    
    `const http = require('http');  const options = {   hostname: 'www.example.com',   port: 80,   path: '/',   method: 'GET', };  const req = http.request(options, (res) => {   let data = '';   res.on('data', (chunk) => {     data += chunk;   });   res.on('end', () => {     console.log(data);   }); });  req.on('error', (error) => {   console.error(error); });  req.end();`
    

#### b) **https**

- Модуль `https` работает аналогично `http`, но поддерживает зашифрованные соединения через SSL/TLS. Он используется для выполнения HTTPS-запросов.
- **Пример:**
    
    js
    
    КопироватьРедактировать
    
    `const https = require('https');  const options = {   hostname: 'www.example.com',   port: 443,   path: '/',   method: 'GET', };  const req = https.request(options, (res) => {   let data = '';   res.on('data', (chunk) => {     data += chunk;   });   res.on('end', () => {     console.log(data);   }); });  req.on('error', (error) => {   console.error(error); });  req.end();`
    

---

### 2. **Внешние библиотеки:**

#### a) **axios**

- `axios` — это популярная библиотека для работы с HTTP-запросами, которая предоставляет более удобный интерфейс для выполнения асинхронных запросов с использованием **Promises**. Она поддерживает как HTTP, так и HTTPS запросы.
- **Установка:**
    
    bash
    
    КопироватьРедактировать
    
    `npm install axios`
    
- **Пример:**
    
    js
    
    КопироватьРедактировать
    
    `const axios = require('axios');  axios.get('https://www.example.com')   .then((response) => {     console.log(response.data);   })   .catch((error) => {     console.error(error);   });`
    

#### b) **node-fetch**

- `node-fetch` — это легковесная библиотека для работы с HTTP-запросами, основанная на API `fetch`, который знаком многим разработчикам, работавшим с JavaScript в браузере. Она предоставляет API для выполнения запросов с использованием **Promises**.
- **Установка:**
    
    bash
    
    КопироватьРедактировать
    
    `npm install node-fetch`
    
- **Пример:**
    
    js
    
    КопироватьРедактировать
    
    `const fetch = require('node-fetch');  fetch('https://www.example.com')   .then((res) => res.text())   .then((body) => {     console.log(body);   })   .catch((error) => {     console.error(error);   });`
    

#### c) **request (устаревший)**

- Модуль `request` был одним из самых популярных решений для выполнения HTTP-запросов, но он был **декларирован устаревшим** и больше не поддерживается. Вместо него рекомендуется использовать другие библиотеки, такие как `axios` или `node-fetch`.
- **Установка (если все-таки необходимо):**
    
    bash
    
    КопироватьРедактировать
    
    `npm install request`
    
- **Пример:**
    
    js
    
    КопироватьРедактировать
    
    `const request = require('request');  request('https://www.example.com', (error, response, body) => {   if (error) {     console.error(error);   } else {     console.log(body);   } });`
    

---

### 3. **Другие популярные библиотеки:**

#### a) **superagent**

- `superagent` — это еще одна популярная библиотека для работы с HTTP-запросами, поддерживающая множество расширенных возможностей, таких как отправка форм, загрузка файлов и многое другое.
- **Установка:**
    
    bash
    
    КопироватьРедактировать
    
    `npm install superagent`
    
- **Пример:**
    
    js
    
    КопироватьРедактировать
    
    `const superagent = require('superagent');  superagent.get('https://www.example.com')   .then((res) => {     console.log(res.text);   })   .catch((err) => {     console.error(err);   });`
    

---

### Итоги:

- Для **базовых HTTP/HTTPS запросов** в Node.js можно использовать модули `http` или `https`, которые уже входят в стандартную библиотеку.
- Для **более удобной работы с HTTP** и поддержки асинхронных запросов с использованием **Promises** лучше использовать библиотеки, такие как `axios`, `node-fetch` или `superagent`.