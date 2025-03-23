---
title: Для чего используется библиотека Socket.io?
draft: true
tags:
  - NodeJS
  - SocketIO
  - webSocket
info:
---

**Socket.io** — это библиотека для **реализации веб-сокетов** в Node.js, позволяющая устанавливать **двустороннее соединение в реальном времени** между сервером и клиентом.

**Основные возможности Socket.io:**
1. **Обмен данными в реальном времени**
    - Подходит для чатов, онлайн-игр, торговых платформ и уведомлений.
    - Позволяет передавать сообщения между клиентами и сервером без задержек.
2. **Автоматический выбор транспорта**
    - Использует **WebSockets**, но при их недоступности переключается на **Long Polling**.
    - Гарантирует стабильное соединение на любых устройствах.
3. **Поддержка комнат (Rooms) и пространств имен (Namespaces)**
    - **Rooms** позволяют отправлять сообщения только определенным группам пользователей.
    - **Namespaces** помогают разделять логику разных частей приложения.
4. **Переподключение при разрыве соединения**
    - Клиенты автоматически переподключаются в случае потери соединения.
5. **Простая интеграция с Express и другими фреймворками**
    - Легко работает с существующими HTTP-серверами.

---

```js
const express = require('express'); 
const http = require('http'); 
const { Server } = require('socket.io');  
const app = express(); 

const server = http.createServer(app); 
const io = new Server(server);  

io.on('connection', (socket) => {   
	console.log('Новый пользователь подключен');    
	socket.on('message', (data) => {     
		io.emit('message', data); // Отправка сообщения всем клиентам   
	});    

	socket.on('disconnect', () => {     
		console.log('Пользователь отключился');   
	}); 
});  

server.listen(3000, () => console.log('Сервер запущен на порту 3000'));`
```

```html
<script src="/socket.io/socket.io.js"></script> 

<script>   
	const socket = io();    
	socket.on('message', (data) => {     
		console.log('Новое сообщение:', data);   
	});    

	function sendMessage() {     
		socket.emit('message', 'Привет от клиента!');   
	} 
</script> 

<button onclick="sendMessage()">Отправить сообщение</button>`
```

---

