---
title: Как работает кэширование модулей в Node.js и можно ли его отключить
draft: false
tags:
  - "#NodeJS"
  - "#Модули"
  - "#Кэширование"
  - "#require"
  - "#CommonJS"
info:
  - "[Документация Node.js - Modules: CommonJS modules](https://nodejs.org/api/modules.html#caching)"
  - "[Node.js модульная система](https://nodejs.org/api/modules.html)"
---

![[Pasted image node-modules-cache.png|600]]

## Механизм кэширования модулей в Node.js

В Node.js используется система кэширования модулей, которая обеспечивает, что модули загружаются и выполняются только один раз, даже если они импортируются несколько раз в разных частях приложения.

При первом вызове `require()` для определенного модуля, Node.js:

1. Разрешает полный путь к файлу модуля
2. Загружает и выполняет код модуля
3. Сохраняет экспортированный объект в кэше
4. Возвращает этот объект

При всех последующих вызовах `require()` для того же модуля, Node.js возвращает закэшированный результат из `require.cache`, без повторного выполнения кода модуля.

## Пример кэширования модулей

Рассмотрим следующую структуру файлов:

**counter.js**:

```javascript
let count = 0

module.exports = {
  increment: function () {
    return ++count
  },
  getCount: function () {
    return count
  },
}
```

**app.js**:

```javascript
const counter1 = require("./counter")
const counter2 = require("./counter")

console.log(counter1.increment()) // 1
console.log(counter2.increment()) // 2
console.log(counter1.getCount()) // 2
console.log(counter2.getCount()) // 2

// Доказательство, что это один и тот же объект
console.log(counter1 === counter2) // true
```

В этом примере, хотя `counter.js` был импортирован дважды, код модуля был выполнен только один раз, и обе переменные `counter1` и `counter2` ссылаются на один и тот же объект.

## Как работает кэш модулей

Кэш модулей доступен через объект `require.cache`. Это объект, где ключами являются абсолютные пути к модулям, а значениями – объекты модулей:

```javascript
console.log(Object.keys(require.cache)) // Выводит массив путей к загруженным модулям

// Пример структуры кэша модулей
// {
//   '/absolute/path/to/module.js': {
//     id: '/absolute/path/to/module.js',
//     exports: {}, // Экспортированный объект модуля
//     loaded: true,
//     ...
//   },
//   ...
// }
```

## Очистка кэша модулей

Хотя в Node.js нет официального способа "отключить" кэширование модулей, можно вручную очистить кэш для конкретного модуля:

```javascript
// Очистка кэша для определенного модуля
function clearModuleCache(modulePath) {
  const resolvedPath = require.resolve(modulePath)
  delete require.cache[resolvedPath]
}

// Пример использования
const counter = require("./counter")
console.log(counter.increment()) // 1

clearModuleCache("./counter")

const freshCounter = require("./counter")
console.log(freshCounter.increment()) // 1 (а не 2, т.к. модуль был перезагружен)
```

## Очистка всего кэша модулей

Можно очистить весь кэш модулей, но это может привести к непредсказуемым последствиям:

```javascript
// Очистка всего кэша модулей
function clearAllCache() {
  Object.keys(require.cache).forEach(function (key) {
    delete require.cache[key]
  })
}
```

## Случаи, когда очистка кэша полезна

1. **Разработка и отладка**: Для перезагрузки модулей без перезапуска приложения
2. **Тестирование**: Для изоляции тестов, требующих свежих экземпляров модулей
3. **Горячая перезагрузка**: Для реализации механизмов горячей перезагрузки кода

## Альтернативные подходы к динамической загрузке модулей

1. **Использование функций-фабрик**:

```javascript
// counter.js
module.exports = function createCounter() {
  let count = 0
  return {
    increment: function () {
      return ++count
    },
    getCount: function () {
      return count
    },
  }
}

// app.js
const counterFactory = require("./counter")
const counter1 = counterFactory()
const counter2 = counterFactory()

console.log(counter1.increment()) // 1
console.log(counter2.increment()) // 1 (отдельный экземпляр)
```

2. **Динамический импорт с помощью `import()`** (для ES модулей):

```javascript
// Динамический импорт модуля
async function loadModule() {
  const module = await import("./dynamicModule.js")
  return module
}
```

## Особенности кэширования ES модулей

В ES модулях (используемых с флагом `--experimental-modules` или в файлах `.mjs`) кэширование работает аналогично CommonJS, но с некоторыми различиями:

```javascript
// ES модули также кэшируются, но используют другой механизм разрешения путей
import { increment } from "./counter.mjs"
```

## Предостережения при работе с кэшем модулей

1. **Циклические зависимости**: При наличии циклических зависимостей модуль может быть доступен до полного выполнения его кода
2. **Состояние глобальных переменных**: Кэширование сохраняет состояния переменных между вызовами
3. **Побочные эффекты**: Код модуля выполняется только один раз, поэтому побочные эффекты также происходят один раз

---

[[002 Node.js|Назад]]
