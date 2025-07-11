---
title: В чем разница между resolve и reject
draft: false
tags:
  - "#NodeJS"
  - "#JavaScript"
  - "#Promise"
  - "#асинхронность"
  - "#обработка-ошибок"
info:
  - "[Документация MDN по Promise](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Promise)"
  - "[JavaScript.info: Промисы](https://javascript.info/promise-basics)"
  - "[Node.js документация: Promises](https://nodejs.org/api/util.html#util_util_promisify_original)"
---

# Разница между resolve и reject

`resolve` и `reject` — это две функции-колбэка, которые передаются в конструктор Promise в JavaScript и используются для изменения состояния промиса. Они играют ключевую роль в управлении асинхронными операциями.

## Определение и назначение

### resolve(value)

**resolve** — это функция, которая переводит промис в состояние "выполнено" (fulfilled) с указанным значением результата.

- **Назначение**: Сигнализирует об успешном завершении асинхронной операции
- **Возвращаемое значение**: Передаёт результат выполнения промиса в метод `.then()`
- **Состояние промиса**: Изменяет состояние с pending на fulfilled

### reject(reason)

**reject** — это функция, которая переводит промис в состояние "отклонено" (rejected) с указанной причиной отказа.

- **Назначение**: Сигнализирует о неудачном завершении асинхронной операции
- **Возвращаемое значение**: Передаёт причину ошибки в метод `.catch()` или во второй аргумент `.then()`
- **Состояние промиса**: Изменяет состояние с pending на rejected

## Базовый пример использования

```javascript
const myPromise = new Promise((resolve, reject) => {
  // Асинхронная операция
  const success = true

  if (success) {
    // Операция выполнена успешно
    resolve("Операция завершена успешно")
  } else {
    // Операция завершилась с ошибкой
    reject(new Error("Произошла ошибка"))
  }
})

myPromise
  .then((result) => {
    console.log(result) // Выполнится при resolve
  })
  .catch((error) => {
    console.error(error) // Выполнится при reject
  })
```

## Ключевые различия

| **Характеристика**          | **resolve**                      | **reject**                           |
| --------------------------- | -------------------------------- | ------------------------------------ |
| **Назначение**              | Успешное завершение операции     | Неудачное завершение операции        |
| **Конечное состояние**      | fulfilled                        | rejected                             |
| **Обработчик**              | .then()                          | .catch() или второй аргумент .then() |
| **Цепочка промисов**        | Продолжает нормальное выполнение | Перескакивает к ближайшему .catch()  |
| **Обычно передаёт**         | Данные, результат операции       | Объект ошибки или причину отказа     |
| **Можно вызвать в промисе** | Только один раз                  | Только один раз                      |

## Практические примеры

### Пример 1: Чтение файла

```javascript
const fs = require("fs").promises

function readFileAsync(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf8")
      .then((data) => {
        resolve(data)
      })
      .catch((err) => {
        reject(new Error(`Ошибка при чтении файла: ${err.message}`))
      })
  })
}

// Использование
readFileAsync("config.json")
  .then((data) => {
    console.log("Содержимое файла:", data)
  })
  .catch((error) => {
    console.error("Произошла ошибка:", error.message)
  })
```

### Пример 2: Запрос к API

```javascript
function fetchUserData(userId) {
  return new Promise((resolve, reject) => {
    fetch(`https://api.example.com/users/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP ошибка! Статус: ${response.status}`)
        }
        return response.json()
      })
      .then((data) => resolve(data))
      .catch((error) => reject(error))
  })
}

// Использование
fetchUserData(123)
  .then((user) => {
    console.log("Данные пользователя:", user)
  })
  .catch((error) => {
    console.error("Ошибка при получении данных:", error.message)
  })
```

## Важные особенности

### 1. Однократное изменение состояния

Промис может изменить своё состояние только один раз. После вызова `resolve` или `reject` любые последующие вызовы этих функций игнорируются:

```javascript
const promise = new Promise((resolve, reject) => {
  resolve("Успех") // Промис переходит в состояние fulfilled
  reject(new Error("Ошибка")) // Игнорируется, состояние уже изменено
})

promise.then((result) => console.log(result)) // Выведет "Успех"
```

### 2. Автоматическое преобразование значений

Если передать promise в функцию `resolve`, то исходный промис будет ожидать разрешения переданного промиса:

```javascript
const promise = new Promise((resolve, reject) => {
  resolve(Promise.resolve("Вложенный успех"))
})

promise.then((result) => console.log(result)) // Выведет "Вложенный успех"
```

### 3. Обработка исключений

Исключения, возникающие внутри функции-конструктора Promise, автоматически приводят к отклонению промиса:

```javascript
const promise = new Promise((resolve, reject) => {
  throw new Error("Что-то пошло не так")
  // Это эквивалентно: reject(new Error('Что-то пошло не так'));
})

promise.catch((error) => console.error(error.message)) // Выведет "Что-то пошло не так"
```

## Рекомендации по использованию

1. **Всегда возвращайте значения** из обработчиков `.then()` для корректной работы цепочки промисов.

2. **Используйте reject с объектами Error**, а не с простыми строками для лучшей отладки:

   ```javascript
   // Хорошо
   reject(new Error("Описательное сообщение об ошибке"))

   // Не рекомендуется
   reject("Произошла ошибка")
   ```

3. **Не забывайте обрабатывать отклонённые промисы** с помощью `.catch()` или второго аргумента `.then()`.

4. **Для упрощения можно использовать статические методы**:

   ```javascript
   // Вместо new Promise с resolve
   Promise.resolve(value)

   // Вместо new Promise с reject
   Promise.reject(new Error("Ошибка"))
   ```

## Заключение

`resolve` и `reject` — это два основных механизма контроля потока в промисах:

- **resolve** используется для сигнализации об успешном завершении и передачи результата
- **reject** используется для сигнализации о неудачном завершении и передачи информации об ошибке

Понимание различий между ними позволяет эффективно управлять асинхронными операциями в JavaScript и Node.js, обеспечивая надлежащую обработку как успешных, так и неудачных сценариев.

---

[[002 Node.js|Назад]]
