---
title: Чем отличается exports от module.exports
draft: false
tags:
  - "#NodeJS"
  - "#модули"
  - "#JavaScript"
  - "#экспорт"
  - "#CommonJS"
  - "#модульная-система"
info:
  - https://nodejs.org/api/modules.html#modules_exports_shortcut
  - https://habr.com/ru/articles/273497/
---

# Различия между exports и module.exports в Node.js

В Node.js `exports` и `module.exports` используются для экспорта функциональности из модуля, но между ними есть важные различия, которые необходимо понимать.

## Основные отличия

### 1. Природа отношений между exports и module.exports

`exports` — это просто **ссылка** (reference) на объект `module.exports`. Когда модуль инициализируется, Node.js устанавливает следующее отношение:

```javascript
// Это происходит неявно при загрузке модуля
exports = module.exports = {}
```

Это означает, что изначально оба идентификатора указывают на один и тот же пустой объект.

### 2. Присваивание свойств vs. перезапись объекта

#### Добавление свойств работает одинаково

```javascript
// module.js
exports.method1 = function () {
  return "Hello from method1"
}

module.exports.method2 = function () {
  return "Hello from method2"
}
```

```javascript
// main.js
const myModule = require("./module")
console.log(myModule.method1()) // 'Hello from method1'
console.log(myModule.method2()) // 'Hello from method2'
```

#### Перезапись объекта работает по-разному

```javascript
// module_wrong.js
exports = {
  method: function () {
    return "This will NOT be exported"
  },
}
```

```javascript
// module_correct.js
module.exports = {
  method: function () {
    return "This WILL be exported"
  },
}
```

В первом случае (`module_wrong.js`) модуль экспортирует пустой объект, потому что перезапись `exports` не влияет на `module.exports`.

## Визуальное объяснение

### При инициализации модуля:

```
┌─────────────┐                  ┌─────────────┐
│   exports   │───────refers to──▶│     {}     │
└─────────────┘                  └─────────────┘
                                     ▲
┌─────────────┐                      │
│module.exports│────────refers to────┘
└─────────────┘
```

### После добавления свойств:

```
┌─────────────┐                  ┌─────────────────────┐
│   exports   │───────refers to──▶│ { method1, method2 }│
└─────────────┘                  └─────────────────────┘
                                     ▲
┌─────────────┐                      │
│module.exports│────────refers to────┘
└─────────────┘
```

### После перезаписи exports:

```
┌─────────────┐      ┌─────────────────┐
│   exports   │─────▶│ { newObject... }│ (не экспортируется)
└─────────────┘      └─────────────────┘

┌─────────────┐      ┌─────────────────────┐
│module.exports│─────▶│ { method1, method2 }│ (экспортируется)
└─────────────┘      └─────────────────────┘
```

## Правила использования

1. **Для простого добавления свойств** можно использовать и `exports`, и `module.exports`:

```javascript
exports.prop1 = "value1"
exports.method1 = function () {
  /* ... */
}

// Или
module.exports.prop2 = "value2"
module.exports.method2 = function () {
  /* ... */
}
```

2. **Для экспорта единого объекта, функции или класса** всегда используйте `module.exports`:

```javascript
// Экспорт функции
module.exports = function () {
  return "I am a function"
}

// Экспорт класса
module.exports = class MyClass {
  constructor() {
    this.name = "MyClass"
  }
}

// Экспорт объекта
module.exports = {
  prop: "value",
  method: function () {
    /* ... */
  },
}
```

3. **Возможен смешанный подход**, но он может быть запутанным:

```javascript
// Добавляем свойства к exports
exports.prop1 = "value1"

// Затем перезаписываем module.exports
module.exports = function () {
  return "I am a function with properties"
}

// Добавляем свойства к новой функции
module.exports.additionalProp = "value2"
```

В этом примере `prop1` будет утеряно, потому что `module.exports` был перезаписан.

## Рекомендации

- **Используйте `module.exports` для единого экспорта** (функция, класс, объект)
- **Используйте `exports.property`** для экспорта множества отдельных элементов
- **Избегайте смешивания подходов** в одном модуле для ясности
- **Никогда не перезаписывайте `exports`** напрямую (`exports = ...`)

## Примеры распространенных шаблонов экспорта

### 1. Экспорт объекта конфигурации:

```javascript
// config.js
module.exports = {
  port: 3000,
  database: {
    host: "localhost",
    name: "mydb",
    user: "admin",
    password: "secret",
  },
  apiKey: "abc123",
}
```

### 2. Экспорт утилит в виде отдельных функций:

```javascript
// utils.js
exports.formatDate = function (date) {
  // Форматирование даты
}

exports.calculateTax = function (amount) {
  // Расчет налога
}

exports.validateEmail = function (email) {
  // Валидация email
}
```

### 3. Экспорт класса:

```javascript
// user-model.js
class User {
  constructor(name, email) {
    this.name = name
    this.email = email
  }

  save() {
    // Сохранение пользователя
  }

  static findById(id) {
    // Поиск пользователя по ID
  }
}

module.exports = User
```

---

[[003 JSCore|Назад]]
