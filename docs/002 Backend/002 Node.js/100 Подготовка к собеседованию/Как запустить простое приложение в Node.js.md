---
title: Как запустить простое приложение в Node.js?
draft: false
tags:
  - NodeJS
  - ExpressJS
info:
---

Если ты хочешь использовать фреймворк Express.js для создания более сложных приложений, выполни следующие шаги:

1. Установи Express:

```bash
    npm install express
```

2. Создай файл `app.js` и добавь следующий код:

```javascript
    const express = require('express');
    const app = express();
    const port = 3000;
    
    app.get('/', (req, res) => {
      res.send('Hello, World!');
    });
    
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
```

3. Запусти приложение:

```bash
    node app.js
```

