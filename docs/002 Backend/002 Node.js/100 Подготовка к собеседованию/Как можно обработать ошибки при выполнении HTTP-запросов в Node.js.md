---
title: Как можно обработать ошибки при выполнении HTTP-запросов в Node.js
draft: true
tags: NodeJS
info:
---
В **Node.js** при выполнении **HTTP-запросов** (с использованием модуля `http` или `https`) важно правильно обрабатывать ошибки. Ошибки могут возникать как на уровне соединения (например, проблемы с сетью), так и на уровне ответа от сервера (например, неудачный статус код).

Вот как можно обработать ошибки при выполнении HTTP-запросов:

### 1. Обработка ошибок при запросах с использованием `http` или `https`

#### Пример с использованием модуля `https`:

javascript

КопироватьРедактировать

`const https = require('https');  // Определяем параметры запроса const options = {   hostname: 'www.example.com',   port: 443,   path: '/',   method: 'GET' };  const req = https.request(options, (res) => {   let data = '';    // Слушаем данные ответа   res.on('data', (chunk) => {     data += chunk;   });    // Когда все данные получены   res.on('end', () => {     console.log('Response Body:', data);   });    // Обработка ошибок статуса (например, 404 или 500)   res.on('error', (error) => {     console.error('Error while receiving response:', error);   }); });  // Обработка ошибок на уровне соединения (например, проблемы с сетью) req.on('error', (error) => {   console.error('Request failed:', error); });  // Завершаем запрос req.end();`

### Важные моменты:

1. **Ошибка соединения**:
    
    - В случае проблем с подключением к серверу (например, если сервер недоступен), ошибка будет вызвана событием `error` на объекте запроса `req`.
    - Для этого мы добавляем обработчик ошибки через `req.on('error', callback)`.
2. **Ошибка при получении ответа**:
    
    - Даже если соединение было установлено успешно, может быть проблема с самим ответом от сервера (например, сервер вернул статус `404` или `500`).
    - Для этого можно проверять статус код ответа в колбэк-функции для события `res`. Например, если статус код не равен `200`, можно обработать ошибку, сгенерировав собственное исключение:
        
        javascript
        
        КопироватьРедактировать
        
        ``if (res.statusCode !== 200) {   console.error(`Request failed with status code: ${res.statusCode}`); }``
        
3. **Ошибки данных**:
    
    - В случае ошибок при получении данных (например, в случае прерывания ответа), используйте событие `error` на объекте ответа `res`:
        
        javascript
        
        КопироватьРедактировать
        
        `res.on('error', (error) => {   console.error('Error while receiving response:', error); });`
        

### 2. Обработка ошибок с использованием библиотек, таких как `axios` или `node-fetch`

Если вы используете библиотеки, такие как `axios` или `node-fetch`, которые возвращают **Promises**, ошибки можно обрабатывать с помощью `try-catch` или с использованием `.catch()`.

#### Пример с использованием `axios`:

javascript

КопироватьРедактировать

`const axios = require('axios');  axios.get('https://www.example.com')   .then((response) => {     console.log('Response Body:', response.data);   })   .catch((error) => {     console.error('Request failed:', error.message);     if (error.response) {       // Сервер ответил, но статус код не в диапазоне 2xx       console.error('Status Code:', error.response.status);       console.error('Response Body:', error.response.data);     } else if (error.request) {       // Запрос был отправлен, но ответа не получено       console.error('No response received:', error.request);     } else {       // Ошибка при настройке запроса       console.error('Error setting up request:', error.message);     }   });`

### Объяснение:

- Если запрос выполнен успешно, будет вызван блок `.then()`, и вы можете обработать ответ.
- В случае ошибки будет вызван блок `.catch()`, в котором можно различать разные типы ошибок:
    - `error.response`: ошибка на уровне ответа от сервера (например, статус код 404).
    - `error.request`: ошибка на уровне отправки запроса (например, сервер не отвечает).
    - `error.message`: ошибка при настройке запроса.

### 3. Использование `try-catch` с `async/await` (для асинхронного кода):

Если вы используете **`async/await`**, можно обрабатывать ошибки в `try-catch` блоке.

#### Пример с использованием `axios` и `async/await`:

javascript

КопироватьРедактировать

`const axios = require('axios');  async function fetchData() {   try {     const response = await axios.get('https://www.example.com');     console.log('Response Body:', response.data);   } catch (error) {     console.error('Request failed:', error.message);     if (error.response) {       console.error('Status Code:', error.response.status);       console.error('Response Body:', error.response.data);     } else if (error.request) {       console.error('No response received:', error.request);     } else {       console.error('Error setting up request:', error.message);     }   } }  fetchData();`

### Заключение:

- Для обработки ошибок в **низкоуровневых** запросах через модули `http` и `https` нужно использовать обработчики событий `error` как для самого запроса (`req`), так и для ответа (`res`).
- Если вы используете **Promise-базированные библиотеки** (например, `axios` или `node-fetch`), ошибки можно обрабатывать с помощью `.catch()` или `try-catch` (для `async/await`).