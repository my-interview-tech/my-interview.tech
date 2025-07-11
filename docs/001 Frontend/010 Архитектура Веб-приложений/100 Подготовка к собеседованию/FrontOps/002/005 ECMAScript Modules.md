---
title: ECMAScript Modules (ESM)
draft: true
tags:
  - ECMAScript
info:
---
### ECMAScript Modules (ESM)

ESM стал частью спецификации языка JavaScript, что означает нативную поддержку модулей.

##### Синтаксис ESM

```javascript
// math.js
export const add = (a, b) => a + b;
export const multiply = (a, b) => a * b;

// Экспорт по умолчанию
export default function subtract(a, b) {
    return a - b;
}

// Именованный экспорт объекта
export { add as sum, multiply };
```

```javascript
// main.js
import subtract, { add, multiply as mult } from './math.js';
import * as math from './math.js';

console.log(add(5, 3)); // 8
console.log(mult(4, 2)); // 8
console.log(subtract(10, 3)); // 7
console.log(math.add(1, 2)); // 3
```

##### Проблемы с export default

```javascript
// Проблема 1: Неявное переименование
export default function() {} // Нет имени
import MyFunction from './module.js'; // Любое имя при импорте

// Проблема 2: Смешивание default и named exports
export default class MyClass {}
export const helper = () => {};

// Импорт становится неконсистентным
import MyClass, { helper } from './module.js';
```

##### Свойства ESM

1. Синхронная и асинхронная загрузка

```javascript
// Статический импорт (синхронный)
import { feature } from './module.js';

// Динамический импорт (асинхронный)
const module = await import('./module.js');
```

2. Изоляция пространства имен

```javascript
// module1.js
const privateVar = 'private';
export const publicVar = 'public';

// module2.js
import { publicVar } from './module1.js';
// privateVar недоступен
```

3. Кеширование модулей

```javascript
// counter.js
let count = 0;
export const increment = () => ++count;
export const getCount = () => count;

// main.js
import { increment, getCount } from './counter.js';
import { increment as inc2 } from './counter.js'; // Тот же модуль

increment();
console.log(getCount()); // 1
inc2();
console.log(getCount()); // 2 - состояние разделяется
```

##### Преимущества ESM

1. Часть спецификации языка

```javascript
// Нативная поддержка без дополнительных библиотек
import { useState } from 'react';
```

2. Поддержка всеми платформами

```javascript
// Один синтаксис для браузера и Node.js
import fs from 'fs/promises';
```

3. Динамическое подключение

```javascript
// Условная загрузка
const isDevelopment = process.env.NODE_ENV === 'development';
if (isDevelopment) {
    const { debugTools } = await import('./debug-tools.js');
    debugTools.init();
}
```

4. Tree Shaking

```javascript
// utils.js
export const add = (a, b) => a + b;
export const multiply = (a, b) => a * b;
export const unused = () => console.log('Not used'); // Будет удалено

// main.js
import { add } from './utils.js'; // Только add попадет в сборку
```

##### Tree Shaking в деталях

```javascript
// lodash-es example
import { debounce } from 'lodash-es'; // Только debounce
import _ from 'lodash'; // Вся библиотека

// Side effects проблема
// logger.js
console.log('Logger initialized'); // Side effect
export const log = (msg) => console.log(msg);

// main.js
import { log } from './logger.js'; // console.log выполнится
```

##### Работает ли Tree Shaking в динамических импортах?

```javascript
// Tree shaking работает менее эффективно
const { add } = await import('./utils.js'); // Может загрузить больше кода

// Лучше использовать статические импорты где возможно
import { add } from './utils.js';
```

___
