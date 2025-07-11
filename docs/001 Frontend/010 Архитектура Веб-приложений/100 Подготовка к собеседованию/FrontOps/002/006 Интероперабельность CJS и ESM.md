---
title: Интероперабельность CJS и ESM
draft: true
tags:
  - ECMAScript
  - CommonJS
  - ESModules
  - PureESM
info:
---
### Интероперабельность CJS и ESM

##### Проблема совместимости

Современные приложения часто используют пакеты в разных модульных системах.

##### ESM импортирует CJS

```javascript
// cjs-module.js (CommonJS)
module.exports = {
    add: (a, b) => a + b,
    multiply: (a, b) => a * b
};

// esm-module.js (ESM)
import cjsModule from './cjs-module.js';
const { add, multiply } = cjsModule;

// Или с деструктуризацией (экспериментально)
import { add, multiply } from './cjs-module.js';
```

##### CJS импортирует ESM

```javascript
// esm-module.js (ESM)
export const add = (a, b) => a + b;
export const multiply = (a, b) => a * b;

// cjs-module.js (CommonJS)
// Динамический импорт
(async () => {
    const { add, multiply } = await import('./esm-module.js');
    console.log(add(5, 3));
})();

// Или с createRequire
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
```

##### Маркер __esModule

```javascript
// Babel транспилирует ESM в CJS с маркером
module.exports = {
    __esModule: true,
    add: (a, b) => a + b,
    default: (a, b) => a + b
};

// Проверка при импорте
const module = require('./transpiled-module.js');
if (module.__esModule) {
    // Обработка как ESM
    const add = module.default || module.add;
}
```

##### Расширения файлов

```javascript
// package.json
{
    "type": "module", // Все .js файлы как ESM
    "main": "index.js",
    "exports": {
        ".": {
            "import": "./index.js",
            "require": "./index.cjs"
        }
    }
}
```

```javascript
// Явное указание типа
import utils from './utils.mjs'; // ESM
const utils = require('./utils.cjs'); // CJS
```

##### PureESM пакеты

```javascript
// Пакеты, которые поставляются только в ESM
{
    "type": "module",
    "exports": {
        ".": "./index.js"
    }
}

// Проблема для CJS проектов
// Нужна миграция или использование динамических импортов
```

___
