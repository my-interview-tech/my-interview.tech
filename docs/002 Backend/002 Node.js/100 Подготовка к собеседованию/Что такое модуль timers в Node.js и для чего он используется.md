---
title: Что такое модуль timers в Node.js и для чего он используется
draft: false
tags:
  - "#NodeJS"
  - "#timers"
  - "#асинхронность"
  - "#событийный_цикл"
  - "#производительность"
info:
  - "[Документация Node.js - Timers](https://nodejs.org/api/timers.html)"
  - "[Документация Node.js - Timers API в промисах](https://nodejs.org/api/timers.html#timers-promises-api)"
---

![[node-timers.png|600]]

## Что такое модуль timers в Node.js

`timers` – это встроенный модуль Node.js, который предоставляет функции для выполнения кода через определенные промежутки времени. Фактически, этот модуль реализует API таймеров, знакомое из браузерного JavaScript (setTimeout, setInterval), но с некоторыми дополнениями и особенностями, специфичными для Node.js.

На низком уровне таймеры связаны с циклом событий Node.js, который координирует выполнение колбэков и асинхронных операций.

## Основные функции модуля timers

### setTimeout и clearTimeout

`setTimeout()` планирует выполнение функции через указанное количество миллисекунд:

```javascript
const timers = require("timers")

// Базовое использование
const timeoutId = timers.setTimeout(() => {
  console.log("Это сообщение появится через 2 секунды")
}, 2000)

// Отмена запланированного таймера
timers.clearTimeout(timeoutId)
```

В Node.js эти функции также доступны глобально, поэтому обычно модуль не импортируют явно:

```javascript
// Глобальное использование setTimeout
const timeoutId = setTimeout(() => {
  console.log("Это сообщение появится через 2 секунды")
}, 2000)

// Передача аргументов в функцию обратного вызова
setTimeout(
  (name) => {
    console.log(`Привет, ${name}!`)
  },
  1000,
  "Мир",
)
```

### setInterval и clearInterval

`setInterval()` выполняет функцию через равные промежутки времени:

```javascript
// Запуск функции каждые 3 секунды
const intervalId = setInterval(() => {
  console.log("Прошло 3 секунды")
}, 3000)

// Остановка интервала через 10 секунд
setTimeout(() => {
  clearInterval(intervalId)
  console.log("Интервал остановлен")
}, 10000)
```

### setImmediate и clearImmediate

`setImmediate()` – это функция, специфичная для Node.js, которая выполняет колбэк в следующей итерации цикла событий:

```javascript
console.log("1. Начало")

setTimeout(() => {
  console.log("2. setTimeout")
}, 0)

setImmediate(() => {
  console.log("3. setImmediate")
})

process.nextTick(() => {
  console.log("4. nextTick")
})

console.log("5. Конец")

// Порядок вывода:
// 1. Начало
// 5. Конец
// 4. nextTick
// 2. setTimeout или 3. setImmediate (порядок может варьироваться)
```

Функция `setImmediate()` похожа на `setTimeout(() => {}, 0)`, но есть тонкие различия в порядке выполнения в цикле событий.

## Особенности и нюансы таймеров в Node.js

### 1. Точность таймеров

Важно понимать, что таймеры в Node.js не гарантируют точное выполнение по времени:

```javascript
const start = Date.now()

setTimeout(() => {
  const delay = Date.now() - start
  console.log(`Задержка составила ${delay} мс`)
}, 100)

// Блокировка цикла событий
for (let i = 0; i < 1000000000; i++) {}
```

В этом примере функция будет выполнена не через 100 мс, а после завершения тяжелой синхронной операции, которая блокирует цикл событий.

### 2. Минимальная задержка таймеров

В Node.js есть минимальное значение задержки для `setTimeout()` и `setInterval()`. Если вы указываете значение меньше 1, оно автоматически становится равным 1.

### 3. Порядок выполнения: setTimeout vs setImmediate vs process.nextTick

Порядок выполнения этих функций зависит от контекста:

```javascript
// Вне I/O цикла порядок setTimeout(0) и setImmediate не гарантирован
setTimeout(() => console.log("setTimeout"), 0)
setImmediate(() => console.log("setImmediate"))

// Внутри I/O колбэка setImmediate всегда выполняется перед setTimeout
fs.readFile("file.txt", () => {
  setTimeout(() => console.log("setTimeout в I/O"), 0)
  setImmediate(() => console.log("setImmediate в I/O"))
  // 'setImmediate в I/O' всегда будет выведено первым
})

// process.nextTick всегда выполняется перед другими таймерами
setTimeout(() => console.log("setTimeout"), 0)
setImmediate(() => console.log("setImmediate"))
process.nextTick(() => console.log("nextTick"))
// 'nextTick' всегда будет выведено первым
```

## Промисы в API таймеров

Начиная с Node.js 15.0.0, модуль таймеров предоставляет API на основе промисов:

```javascript
const { setTimeout, setImmediate, setInterval } = require("timers/promises")

// Использование setTimeout с промисами
async function delayedHello() {
  console.log("Ждем 2 секунды...")
  await setTimeout(2000)
  console.log("Привет после задержки!")
}

delayedHello()

// Использование setImmediate с промисами
async function immediateExample() {
  console.log("Перед immediate")
  await setImmediate()
  console.log("После immediate")
}

immediateExample()

// Использование setInterval с промисами и for-await-of
async function intervalExample() {
  const interval = setInterval(1000, "tick")

  let counter = 0
  for await (const tick of interval) {
    console.log(tick) // 'tick'
    counter++

    if (counter >= 5) {
      break // Выход из цикла останавливает интервал
    }
  }

  console.log("Интервал завершен")
}

intervalExample()
```

## Рекурсивные таймеры vs интервалы

Иногда вместо `setInterval` рекомендуется использовать рекурсивный `setTimeout`:

```javascript
// Использование setInterval
let intervalCounter = 0
const intervalId = setInterval(() => {
  console.log(`setInterval: ${intervalCounter}`)
  intervalCounter++

  if (intervalCounter >= 5) {
    clearInterval(intervalId)
  }
}, 1000)

// Использование рекурсивного setTimeout
function recursiveTimeout(counter = 0) {
  setTimeout(() => {
    console.log(`recursiveTimeout: ${counter}`)

    if (counter < 4) {
      recursiveTimeout(counter + 1)
    }
  }, 1000)
}

recursiveTimeout()
```

Преимущество рекурсивного `setTimeout`:

- Гарантирует, что следующий вызов произойдет после завершения текущего колбэка
- Позволяет динамически менять задержку между вызовами
- Предотвращает накопление вызовов при тяжелых операциях

## Ref и Unref таймеров

Node.js предоставляет методы `ref()` и `unref()` для таймеров:

```javascript
const timer = setTimeout(() => {
  console.log("Это сообщение может не появиться")
}, 30000)

// Таймер не будет удерживать процесс активным
timer.unref()

// Если нужно снова заставить таймер удерживать процесс
// timer.ref();
```

Когда вы используете `unref()`, таймер не будет удерживать процесс Node.js активным. Это означает, что если все остальные операции в приложении завершены, процесс завершится, несмотря на активный таймер.

## Практические примеры использования

### Реализация задержки в асинхронной функции

```javascript
// Создание промиса с задержкой
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// Использование в асинхронной функции
async function processWithDelay() {
  console.log("Начало обработки")
  await delay(2000)
  console.log("После задержки в 2 секунды")
  await delay(1000)
  console.log("После еще одной задержки в 1 секунду")
  return "Готово!"
}

processWithDelay().then(console.log)
```

### Реализация повторных попыток с экспоненциальной задержкой

```javascript
async function fetchWithRetry(url, maxRetries = 3) {
  let retries = 0

  while (retries < maxRetries) {
    try {
      const response = await fetch(url)
      return await response.json()
    } catch (error) {
      retries++
      if (retries >= maxRetries) throw error

      // Экспоненциальная задержка: 1000, 2000, 4000 мс
      const delay = 1000 * Math.pow(2, retries - 1)
      console.log(`Попытка ${retries} не удалась. Повтор через ${delay} мс...`)
      await new Promise((resolve) => setTimeout(resolve, delay))
    }
  }
}

fetchWithRetry("https://api.example.com/data")
  .then((data) => console.log("Получены данные:", data))
  .catch((error) => console.error("Ошибка после всех попыток:", error))
```

### Ограничение времени выполнения операции

```javascript
function withTimeout(promise, timeoutMs) {
  let timeoutId

  const timeoutPromise = new Promise((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error(`Операция прервана по таймауту (${timeoutMs} мс)`))
    }, timeoutMs)
  })

  return Promise.race([promise, timeoutPromise]).finally(() => {
    clearTimeout(timeoutId)
  })
}

// Пример использования
async function longOperation() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Результат операции"), 5000)
  })
}

withTimeout(longOperation(), 3000)
  .then((result) => console.log(result))
  .catch((error) => console.error(error.message))
// Вывод: "Операция прервана по таймауту (3000 мс)"
```

## Советы по работе с таймерами

1. **Избегайте вложенных таймеров** - они могут привести к непредсказуемому поведению и утечкам памяти.

2. **Не используйте очень маленькие задержки** - Node.js не является средой реального времени.

3. **Всегда сохраняйте и очищайте идентификаторы таймеров** - неочищенные таймеры могут привести к утечкам памяти.

4. **Учитывайте блокировку цикла событий** - тяжелые синхронные операции могут отложить срабатывание таймеров.

5. **Выбирайте правильный тип таймера** - используйте `setImmediate()` для I/O-зависимых колбэков и `process.nextTick()` для немедленного выполнения.

---

[[002 Node.js|Назад]]
