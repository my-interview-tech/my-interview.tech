---
title: Создайте модуль math.js экспортирующий функции add и multiply и используйте его в app.js
draft: false
tags:
  - "#NodeJS"
  - "#модули"
  - "#экспорт"
  - "#require"
  - "#CommonJS"
  - "#ESModules"
info:
  - https://nodejs.org/api/modules.html
  - https://nodejs.org/api/esm.html
  - https://habr.com/ru/companies/timeweb/articles/682406/
---

# Создание и использование модуля в Node.js

В Node.js существует два основных подхода к работе с модулями: традиционный CommonJS и более современный ES Modules. Рассмотрим оба варианта для решения задачи.

## Вариант 1: CommonJS (Традиционный подход)

### math.js

```javascript
// Функция сложения двух чисел
function add(a, b) {
  return a + b
}

// Функция умножения двух чисел
function multiply(a, b) {
  return a * b
}

// Экспорт функций через объект module.exports
module.exports = {
  add,
  multiply,
}

// Альтернативная запись:
// module.exports.add = add;
// module.exports.multiply = multiply;
```

### app.js

```javascript
// Импорт модуля math.js
const math = require("./math")

// Использование экспортированных функций
console.log(`Сумма 5 и 3 равна: ${math.add(5, 3)}`) // Сумма 5 и 3 равна: 8
console.log(`Произведение 5 и 3 равно: ${math.multiply(5, 3)}`) // Произведение 5 и 3 равно: 15

// Деструктуризация при импорте (альтернативный подход)
const { add, multiply } = require("./math")
console.log(`Сумма 10 и 2 равна: ${add(10, 2)}`) // Сумма 10 и 2 равна: 12
console.log(`Произведение 10 и 2 равно: ${multiply(10, 2)}`) // Произведение 10 и 2 равно: 20
```

## Вариант 2: ES Modules (Современный подход)

Для использования ES Modules в Node.js необходимо либо использовать расширение файлов `.mjs`, либо добавить `"type": "module"` в файл package.json.

### math.mjs (или math.js с настройкой type: module в package.json)

```javascript
// Функция сложения двух чисел
export function add(a, b) {
  return a + b
}

// Функция умножения двух чисел
export function multiply(a, b) {
  return a * b
}

// Также можно экспортировать значение по умолчанию
export default {
  add,
  multiply,
}
```

### app.mjs (или app.js с настройкой type: module в package.json)

```javascript
// Импорт отдельных функций
import { add, multiply } from "./math.mjs"

console.log(`Сумма 5 и 3 равна: ${add(5, 3)}`) // Сумма 5 и 3 равна: 8
console.log(`Произведение 5 и 3 равно: ${multiply(5, 3)}`) // Произведение 5 и 3 равно: 15

// Импорт модуля целиком с другим именем
import * as mathUtils from "./math.mjs"
console.log(`Сумма 10 и 2 равна: ${mathUtils.add(10, 2)}`) // Сумма 10 и 2 равна: 12

// Импорт значения по умолчанию
import math from "./math.mjs"
console.log(`Произведение 10 и 2 равно: ${math.multiply(10, 2)}`) // Произведение 10 и 2 равно: 20
```

## Вариант 3: Гибридный подход (поддержка обоих форматов)

### math.js

```javascript
// Функции
function add(a, b) {
  return a + b
}

function multiply(a, b) {
  return a * b
}

// Экспорт для CommonJS
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    add,
    multiply,
  }
}

// Экспорт для ES Modules
export { add, multiply }
```

Для этого варианта может потребоваться дополнительная настройка сборщика или использование специальных инструментов.

## Запуск и проверка

Для запуска программы:

```bash
# Для CommonJS
node app.js

# Для ES Modules
node app.mjs
# или
node --experimental-modules app.mjs
```

## Важные замечания

1. **Пути к модулям**:

   - В CommonJS можно опустить расширение файла: `require('./math')`
   - В ES Modules необходимо указывать расширение: `import { add } from './math.js'`

2. **Импорт встроенных модулей**:

   - CommonJS: `const fs = require('fs');`
   - ES Modules: `import fs from 'fs';`

3. **Динамический импорт** (доступен в обоих форматах):

   ```javascript
   // CommonJS
   const mathModule = process.env.NODE_ENV === "test" ? require("./math.mock") : require("./math")

   // ES Modules
   const math = await (process.env.NODE_ENV === "test"
     ? import("./math.mock.js")
     : import("./math.js"))
   ```

4. **Асинхронная природа**: ES Modules загружаются и обрабатываются асинхронно, в отличие от синхронного CommonJS.

## Выбор подхода

- **CommonJS**: Легче использовать в старых проектах, полная поддержка во всех версиях Node.js
- **ES Modules**: Современный стандарт JavaScript, лучшая поддержка статического анализа и tree-shaking, совместимость с браузерным JavaScript

В современных проектах рекомендуется использовать ES Modules, особенно если ваш код должен работать как в Node.js, так и в браузере.

---

[[003 JSCore|Назад]]
