---
title: CommonJS
draft: true
tags:
  - NodeJS
  - CommonJS
  - CJS
info:
---
### CommonJS (CJS)

CommonJS — это модульная система, изначально созданная для Node.js. Главная особенность — супер динамическая работа с модулями.

#### Синтаксис CommonJS

```javascript
// math.js
function add(a, b) {
    return a + b;
}

function multiply(a, b) {
    return a * b;
}

// Экспорт
module.exports = {
    add,
    multiply
};

// Альтернативный экспорт
exports.subtract = function(a, b) {
    return a - b;
};
```

```javascript
// main.js
const math = require('./math');
const { add, multiply } = require('./math');

console.log(math.add(5, 3)); // 8
console.log(multiply(4, 2)); // 8
```

#### Свойства CommonJS

1. Синхронная загрузка

```javascript
// Модуль загружается синхронно
const fs = require('fs');
const data = fs.readFileSync('file.txt', 'utf8');
```

2. Изоляция пространства имен
Каждый файл имеет собственную область видимости.

3. Единичный экспорт через module.exports

```javascript
// Правильно
module.exports = { add, multiply };

// Неправильно - затирает предыдущий экспорт
module.exports = add;
module.exports = multiply; // add потерялся
```

4. Позднее связывание (lazy linking)

```javascript
// Модуль загружается только при первом require
if (process.env.NODE_ENV === 'development') {
    const debugModule = require('./debug'); // Загружается условно
}
```

5. Локальные зависимости
   
```javascript
// Относительные пути
const localModule = require('./local-module');
const siblingModule = require('../sibling/module');
```

6. Кеширование модулей

```javascript
// utils.js
console.log('Модуль загружается');
module.exports = { version: '1.0.0' };
```

```javascript
// main.js
const utils1 = require('./utils'); // Выведет: "Модуль загружается"
const utils2 = require('./utils'); // Ничего не выведет - модуль из кеша

console.log(utils1 === utils2); // true - одна и та же ссылка

// Просмотр кеша
console.log(require.cache);

// Удаление из кеша
delete require.cache[require.resolve('./utils')];
const utils3 = require('./utils'); // Снова выведет: "Модуль загружается"
```

##### Как работает CommonJS под капотом?

```javascript
// Node.js оборачивает каждый модуль в функцию
(function(exports, require, module, __filename, __dirname) {
    function add(a, b) {
        return a + b;
    }
    
    module.exports = { add };
    
    // Доступные переменные:
    console.log(__filename); // Полный путь к файлу
    console.log(__dirname);  // Директория файла
});
```

___
