---
title: Какие методы асинхронного программирования существуют в JavaScript
draft: false
tags:
  - "#NodeJS"
  - "#JavaScript"
  - "#асинхронность"
  - "#промисы"
  - "#async-await"
  - "#колбэки"
info:
  - "[MDN: Асинхронный JavaScript](https://developer.mozilla.org/ru/docs/Learn/JavaScript/Asynchronous)"
  - "[The Evolution of Async JavaScript](https://blog.risingstack.com/asynchronous-javascript/)"
  - "[JavaScript Promises: an Introduction](https://developers.google.com/web/fundamentals/primers/promises)"
---

# Методы асинхронного программирования в JavaScript

Асинхронное программирование в JavaScript позволяет выполнять операции без блокировки основного потока исполнения. Существует несколько основных методов для работы с асинхронным кодом, каждый со своими особенностями и преимуществами.

## 1. Колбэки (Callbacks)

**Колбэк** — это функция, передаваемая в другую функцию в качестве аргумента и вызываемая по завершении асинхронной операции.

### Особенности

- Самый ранний и базовый подход к асинхронности в JavaScript
- Простой в реализации, но может привести к "колбэк-аду" (callback hell)
- Используется в Node.js API (хотя постепенно заменяется промисами)

### Пример

```javascript
// Пример чтения файла с использованием колбэка
const fs = require("fs")

fs.readFile("config.json", "utf8", (err, data) => {
  if (err) {
    console.error("Ошибка при чтении файла:", err)
    return
  }

  // Обработка прочитанных данных
  const config = JSON.parse(data)
  console.log("Конфигурация загружена:", config)

  // Вложенный колбэк (начало "колбэк-ада")
  fs.readFile(config.dataFile, "utf8", (err, content) => {
    if (err) {
      console.error("Ошибка при чтении данных:", err)
      return
    }

    console.log("Данные загружены:", content)
  })
})

console.log("Этот код выполнится до завершения чтения файла")
```

### Недостатки

- "Колбэк-ад" при работе с множеством вложенных асинхронных операций
- Сложное управление ошибками
- Нет единого стандарта для порядка аргументов (хотя в Node.js обычно используется `(err, result) => {}`)

## 2. Промисы (Promises)

**Промис** — это объект, представляющий результат асинхронной операции, который может находиться в одном из трех состояний: ожидание, выполнено, отклонено.

### Особенности

- Появились в ES6 (ES2015)
- Позволяют организовать цепочки асинхронных операций
- Имеют встроенный механизм обработки ошибок
- Решают проблему "колбэк-ада"

### Пример

```javascript
// Обертка над колбэк-функцией, возвращающая промис
function readFilePromise(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

// Использование промисов
readFilePromise("config.json")
  .then((data) => {
    const config = JSON.parse(data)
    console.log("Конфигурация загружена:", config)
    return readFilePromise(config.dataFile)
  })
  .then((content) => {
    console.log("Данные загружены:", content)
  })
  .catch((err) => {
    console.error("Произошла ошибка:", err)
  })
  .finally(() => {
    console.log("Операция завершена (независимо от результата)")
  })

console.log("Этот код выполнится до разрешения промисов")
```

### Методы Promise

- `Promise.all()` — ожидает выполнения всех промисов в массиве
- `Promise.race()` — ожидает выполнения самого быстрого промиса
- `Promise.allSettled()` — ожидает завершения всех промисов (независимо от успеха/ошибки)
- `Promise.any()` — ожидает выполнения первого успешного промиса

```javascript
// Пример Promise.all()
Promise.all([fetch("/api/users"), fetch("/api/posts"), fetch("/api/comments")])
  .then(([usersResponse, postsResponse, commentsResponse]) => {
    // Обработка всех ответов, полученных параллельно
  })
  .catch((error) => {
    // Обработка любой ошибки (любой из запросов завершился с ошибкой)
  })
```

## 3. Async/Await

**Async/await** — это синтаксический сахар над промисами, который позволяет писать асинхронный код, выглядящий как синхронный.

### Особенности

- Введены в ES2017
- Делают асинхронный код более читаемым и понятным
- Работают поверх промисов (функция async всегда возвращает промис)
- Позволяют использовать try/catch для обработки ошибок

### Пример

```javascript
// Использование async/await
async function loadConfigAndData() {
  try {
    // Ожидание промиса без цепочек .then()
    const data = await readFilePromise("config.json")
    const config = JSON.parse(data)
    console.log("Конфигурация загружена:", config)

    // Следующая асинхронная операция начнется только после завершения предыдущей
    const content = await readFilePromise(config.dataFile)
    console.log("Данные загружены:", content)

    return { config, content }
  } catch (err) {
    console.error("Произошла ошибка:", err)
    throw err // Пробрасываем ошибку дальше
  } finally {
    console.log("Операция завершена")
  }
}

// Вызов async-функции
loadConfigAndData()
  .then((result) => {
    console.log("Все данные:", result)
  })
  .catch((err) => {
    console.error("Ошибка в основном потоке:", err)
  })

console.log("Этот код выполнится до завершения loadConfigAndData()")
```

### Параллельное выполнение с async/await

```javascript
async function loadMultipleData() {
  try {
    // Запускаем асинхронные операции параллельно
    const userPromise = fetch("/api/users")
    const postsPromise = fetch("/api/posts")

    // Ожидаем выполнения обоих промисов
    const userData = await userPromise
    const postsData = await postsPromise

    return {
      users: await userData.json(),
      posts: await postsData.json(),
    }
  } catch (error) {
    console.error("Ошибка при загрузке данных:", error)
  }
}
```

## 4. Генераторы (Generators)

**Генераторы** — это функции, выполнение которых можно приостанавливать и возобновлять, что позволяет использовать их для асинхронного кода.

### Особенности

- Введены в ES6 (ES2015)
- Могут приостанавливать выполнение с помощью ключевого слова `yield`
- Менее распространены для асинхронного программирования, чем async/await
- Требуют использования библиотек вроде `co` для удобного асинхронного использования

### Пример

```javascript
function* genExample() {
  console.log("Начало выполнения")

  // Приостановка выполнения и возврат значения
  const result1 = yield new Promise((resolve) =>
    setTimeout(() => resolve("Первый результат"), 1000),
  )
  console.log("Получен:", result1)

  const result2 = yield new Promise((resolve) =>
    setTimeout(() => resolve("Второй результат"), 1000),
  )
  console.log("Получен:", result2)

  return "Готово"
}

// Функция-обертка для выполнения генератора
function runGenerator(generator) {
  const iterator = generator()

  function handle(yielded) {
    if (yielded.done) return Promise.resolve(yielded.value)

    return Promise.resolve(yielded.value)
      .then((result) => handle(iterator.next(result)))
      .catch((error) => handle(iterator.throw(error)))
  }

  return handle(iterator.next())
}

// Запуск генератора
runGenerator(genExample)
  .then((finalResult) => console.log("Финальный результат:", finalResult))
  .catch((err) => console.error("Ошибка:", err))
```

## 5. Наблюдаемые объекты (Observables)

**Observables** — это паттерн, предоставляющий механизм обработки потоков асинхронных событий.

### Особенности

- Не являются частью стандартного JavaScript (используются через библиотеки, например RxJS)
- Поддерживают работу с потоками данных и событий
- Обеспечивают механизмы трансформации и комбинирования потоков данных
- Особенно полезны для обработки событий пользовательского интерфейса

### Пример (с использованием RxJS)

```javascript
// Необходима установка библиотеки RxJS
// npm install rxjs

const { fromEvent } = require("rxjs")
const { debounceTime, map } = require("rxjs/operators")

// На клиентской стороне, отслеживание ввода в поле поиска
const searchInput = document.getElementById("search")

// Создание Observable из события ввода
const searchObservable = fromEvent(searchInput, "input").pipe(
  // Получение значения из поля ввода
  map((event) => event.target.value),
  // Задержка запроса до прекращения ввода
  debounceTime(300),
)

// Подписка на Observable
const subscription = searchObservable.subscribe(
  // Обработчик данных
  (searchTerm) => {
    console.log("Поиск по запросу:", searchTerm)
    fetch(`/api/search?q=${searchTerm}`)
      .then((response) => response.json())
      .then((results) => {
        console.log("Результаты поиска:", results)
      })
  },
  // Обработчик ошибок
  (error) => console.error("Ошибка:", error),
  // Обработчик завершения (вызывается при unsubscribe)
  () => console.log("Поиск завершен"),
)

// Отписка от Observable (когда она больше не нужна)
// subscription.unsubscribe();
```

## Сравнение методов асинхронного программирования

| Метод       | Преимущества                                        | Недостатки                                                  | Когда использовать                                      |
| ----------- | --------------------------------------------------- | ----------------------------------------------------------- | ------------------------------------------------------- |
| Колбэки     | Простота реализации, поддержка во всех версиях JS   | "Колбэк-ад", сложное управление ошибками                    | Простые асинхронные операции, работа с устаревшими API  |
| Промисы     | Цепочки операций, централизованная обработка ошибок | Сложнее колбэков, ограниченная поддержка в старых браузерах | Последовательные асинхронные операции, современные API  |
| Async/Await | Простой синтаксис, похожий на синхронный код        | Требуют транспиляции для старых сред                        | Сложные асинхронные потоки, современный JavaScript      |
| Генераторы  | Тонкий контроль над асинхронным потоком             | Сложный синтаксис, необходимость вспомогательных библиотек  | Сложная логика управления состоянием, конечные автоматы |
| Observables | Работа с потоками данных, отмена операций           | Требуют внешних библиотек                                   | Реактивное программирование, потоки событий, UI         |

## Современные тенденции

В современной разработке на JavaScript:

- **Async/await** стал стандартом для большинства асинхронных операций
- **Промисы** используются как основа для async/await и для параллельного выполнения
- **Observables** применяются для сложных потоков событий, особенно в реактивном программировании
- **Колбэки** всё еще используются в API на основе событий и некоторых библиотеках
- **Генераторы** редко используются напрямую для асинхронности, чаще для итерируемых объектов

Выбор метода асинхронного программирования зависит от конкретной задачи, среды исполнения и личных предпочтений разработчика.

---

[[002 Node.js|Назад]]
