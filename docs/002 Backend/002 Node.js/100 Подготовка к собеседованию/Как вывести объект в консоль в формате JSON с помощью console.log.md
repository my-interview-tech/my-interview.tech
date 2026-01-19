---
title: Как вывести объект в консоль в формате JSON с помощью console.log
draft: false
tags:
  - "#NodeJS"
  - "#JavaScript"
  - "#console"
  - "#debugging"
  - "#JSON"
info:
  - https://nodejs.org/api/util.html#utilinspectobject-options
  - https://developer.mozilla.org/ru/docs/Web/API/Console/log
---

В Node.js есть несколько способов вывести объект в консоль в формате JSON. Рассмотрим основные методы и их особенности.

### 1. Метод `JSON.stringify()`

Самый простой и распространённый способ — использование `JSON.stringify()` с параметром форматирования:

```javascript
const user = {
  name: "Иван",
  age: 30,
  skills: ["JavaScript", "Node.js", "React"],
  address: {
    city: "Москва",
    street: "Ленина",
  },
}

// Вывод с форматированием (с отступами в 2 пробела)
console.log(JSON.stringify(user, null, 2))
```

Результат:

```json
{
  "name": "Иван",
  "age": 30,
  "skills": ["JavaScript", "Node.js", "React"],
  "address": {
    "city": "Москва",
    "street": "Ленина"
  }
}
```

#### Параметры `JSON.stringify()`:

1. **Первый параметр**: объект для сериализации
2. **Второй параметр**: функция-заменитель или массив (можно использовать `null`)
3. **Третий параметр**: отступ для форматирования (число пробелов или строка)

### 2. Использование `console.dir()`

Метод `console.dir()` специально предназначен для вывода объектов с возможностью настройки глубины вывода:

```javascript
const complexObject = {
  level1: {
    level2: {
      level3: {
        data: "Глубоко вложенные данные",
      },
    },
  },
}

// Вывод с максимальной глубиной 4 и включенным цветом
console.dir(complexObject, { depth: 4, colors: true })
```

### 3. Использование `util.inspect()`

Для более гибкой настройки вывода можно использовать метод `util.inspect()`:

```javascript
const util = require("util")

const user = {
  name: "Иван",
  age: 30,
  skills: ["JavaScript", "Node.js", "React"],
}

// Вывод с настройками
console.log(
  util.inspect(user, {
    showHidden: false,
    depth: null,
    colors: true,
    compact: false,
  }),
)
```

### 4. Комбинирование `console.log` и `%j` спецификатор

Node.js поддерживает форматирование с помощью спецификаторов:

```javascript
const user = { name: "Иван", age: 30 }

// Использование %j для форматирования JSON
console.log("Пользователь: %j", user)
```

Результат:

```
Пользователь: {"name":"Иван","age":30}
```

### 5. Упрощённый вывод объектов напрямую

Стандартный `console.log` автоматически форматирует объекты, но не всегда в полном JSON-формате:

```javascript
// Простой вывод без JSON.stringify
console.log(user)
```

Результат:

```
{ name: 'Иван', age: 30, skills: [ 'JavaScript', 'Node.js', 'React' ] }
```

### Особенности и ограничения

1. **Циклические ссылки**: `JSON.stringify()` вызовет ошибку при обработке объектов с циклическими ссылками

   ```javascript
   const circular = {}
   circular.self = circular

   // Вызовет ошибку
   // console.log(JSON.stringify(circular));

   // Можно обойти с помощью util.inspect
   console.log(util.inspect(circular))
   ```

2. **Пользовательская замена**: Второй параметр `JSON.stringify()` позволяет настроить вывод:

   ```javascript
   const user = {
     name: "Иван",
     password: "секретный_пароль",
     age: 30,
   }

   // Скрываем конфиденциальные данные
   console.log(
     JSON.stringify(
       user,
       (key, value) => {
         if (key === "password") return "***"
         return value
       },
       2,
     ),
   )
   ```

### Рекомендуемый подход для отладки

Для повседневной отладки рекомендуется:

```javascript
// Лаконичный и читаемый вывод
console.log(JSON.stringify(объект, null, 2))

// С дополнительной меткой для удобного поиска в консоли
console.log("DEBUG_OBJECT:", JSON.stringify(объект, null, 2))
```

---

[[002 Node.js|Назад]]
