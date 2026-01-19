---
title: Почему нельзя перезаписать exports напрямую (например exports = {...})
draft: false
tags:
  - "#NodeJS"
  - "#модули"
  - "#JavaScript"
  - "#CommonJS"
  - "#экспорт"
  - "#module.exports"
info:
  - https://nodejs.org/api/modules.html#modules_exports_shortcut
  - https://habr.com/ru/articles/151704/
---

# Почему нельзя перезаписать exports напрямую

В Node.js нельзя перезаписать объект `exports` напрямую (например, `exports = {...}`), потому что это приводит к неожиданному поведению. Для понимания причины необходимо разобраться в механизме работы модульной системы CommonJS, используемой в Node.js.

## Механизм экспорта в Node.js

### Что происходит при загрузке модуля

Когда Node.js загружает модуль, происходит следующее:

1. Создается объект `module`
2. Создается пустой объект для `module.exports`
3. Создается переменная `exports`, которая ссылается на `module.exports`
4. Выполняется код модуля
5. Возвращается `module.exports` (не `exports`!)

```javascript
// Упрощенная реализация require:
function require(modulePath) {
  // 1. Создаем объект module
  const module = { exports: {} }

  // 2. Создаем переменную exports, ссылающуюся на module.exports
  let exports = module.exports

  // 3. Выполняем код модуля (здесь может произойти перезапись exports)
  // ...

  // 4. Возвращаем module.exports, а не exports!
  return module.exports
}
```

## Проблема с перезаписью exports

### Разрыв связи с module.exports

Когда вы пишете `exports = {...}`, вы **заменяете ссылку** внутри переменной `exports`, но **не меняете** объект, на который указывает `module.exports`. Это происходит потому, что JavaScript использует передачу по значению для переменных-ссылок.

### Наглядный пример проблемы

```javascript
// myModule.js
exports = {
  method: function () {
    return "This will not be exported!"
  },
}

// В другом файле:
const myModule = require("./myModule")
console.log(myModule) // {}
console.log(myModule.method) // undefined
```

### Визуализация проблемы

#### В начале выполнения модуля:

```
┌─────────────┐            ┌─────────────┐
│   exports   │──reference─▶│     {}     │
└─────────────┘            └─────────────┘
                               ▲
┌─────────────┐               │
│module.exports│──reference───┘
└─────────────┘
```

#### После `exports = { method: ... }`:

```
┌─────────────┐     ┌───────────────────┐
│   exports   │────▶│ { method: ... }   │ (не экспортируется)
└─────────────┘     └───────────────────┘

┌─────────────┐     ┌─────────────┐
│module.exports│────▶│     {}     │ (экспортируется)
└─────────────┘     └─────────────┘
```

## Правильные способы экспорта

### 1. Использование module.exports напрямую:

```javascript
// Правильный подход
module.exports = {
  method: function () {
    return "This will be exported!"
  },
}
```

### 2. Добавление свойств к exports:

```javascript
// Тоже правильно
exports.method = function () {
  return "This will be exported!"
}

exports.anotherMethod = function () {
  return "This too!"
}
```

### 3. Сначала добавление свойств, затем перезапись module.exports:

```javascript
// Не рекомендуется из-за путаницы
exports.tempProperty = "Temporary" // Будет потеряно

module.exports = {
  finalProperty: "This is what gets exported",
}
```

## Почему так работает?

### Технический аспект

Модульная система CommonJS использует `module.exports` как единственную точку экспорта. Переменная `exports` — это просто удобный сокращенный способ добавить свойства к `module.exports` без необходимости писать полное имя каждый раз.

```javascript
// Вместо этого (многословно):
module.exports.method1 = function () {}
module.exports.method2 = function () {}
module.exports.property = "value"

// Можно писать так (короче):
exports.method1 = function () {}
exports.method2 = function () {}
exports.property = "value"
```

### Сущность проблемы в JavaScript

Это связано с тем, как JavaScript обрабатывает ссылки на объекты:

```javascript
let a = { prop: 1 }
let b = a // b ссылается на тот же объект, что и a

b.prop = 2 // изменяет объект, на который ссылаются и a, и b
console.log(a.prop) // 2

b = { prop: 3 } // b теперь ссылается на другой объект
console.log(a.prop) // всё ещё 2, поскольку a не изменился
```

## Практические советы

1. **Никогда не перезаписывайте `exports`** (`exports = ...`)
2. **Используйте `module.exports` для экспорта единого объекта или функции**
3. **Используйте `exports.property` для экспорта нескольких элементов**
4. **Будьте последовательны** в выбранном подходе в рамках одного проекта

## Специфичный случай с ESM

В современных версиях Node.js также поддерживается модульная система ES Modules (ESM), которая использует другой синтаксис:

```javascript
// С ESM проблемы не возникает
export const method = function () {
  return "This works differently!"
}

// Или можно использовать default export
export default {
  method() {
    return "This also works!"
  },
}
```

---

[[003 JSCore|Назад]]
