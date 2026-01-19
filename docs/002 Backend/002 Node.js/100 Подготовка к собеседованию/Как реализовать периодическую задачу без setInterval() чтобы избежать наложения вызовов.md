---
title: Как реализовать периодическую задачу без setInterval() чтобы избежать наложения вызовов
draft: false
tags:
  - "#NodeJS"
  - "#setInterval"
  - "#setTimeout"
  - "#асинхронность"
  - "#производительность"
  - "#memory-leak"
info:
  - "[Документация Node.js по setInterval](https://nodejs.org/api/timers.html#setintervalcallback-delay-args)"
  - "[Документация Node.js по setTimeout](https://nodejs.org/api/timers.html#settimeoutcallback-delay-args)"
  - "[Understanding Event Loop, Timers](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)"
---

Функция `setInterval(fn, delay)` выполняет `fn` **каждые `delay` миллисекунд**, но если `fn` выполняется дольше, чем `delay`, вызовы начнут **накладываться (overlapping)** друг на друга. Это может привести к утечкам памяти, высокой нагрузке на CPU и неожиданным багам.

## Проблема наложения вызовов

Рассмотрим пример с `setInterval`, демонстрирующий проблему:

```javascript
setInterval(async () => {
  console.log("Начало", Date.now())

  // Симуляция долгой задачи (1.5 сек)
  await new Promise((res) => setTimeout(res, 1500))

  console.log("Конец", Date.now())
}, 1000)
```

**Ожидание**: вызовы **каждые 1000 мс**.  
**Реальность**: новый вызов запускается **до завершения предыдущего**, создавая параллельные вызовы.

Со временем это может привести к:

- Высокой нагрузке на CPU и память
- Утечкам памяти
- Непредсказуемому поведению приложения
- Замедлению работы приложения или сервера

## Решение: рекурсивный setTimeout()

Чтобы реализовать **периодическую задачу без `setInterval()`** и избежать наложения вызовов, лучше использовать **рекурсивный `setTimeout()`**. Этот метод **ждёт завершения предыдущего вызова**, прежде чем запустить новый.

### Базовая реализация

```javascript
function periodicTask() {
  console.log("Задача выполнена в", new Date().toISOString())

  // Планируем следующий вызов ПОСЛЕ завершения текущего
  setTimeout(periodicTask, 1000)
}

// Запускаем задачу
periodicTask()
```

**Преимущество**:

- Новый вызов происходит **только после завершения предыдущего**, что гарантирует отсутствие наложений.

### Решение для асинхронных функций

При работе с `async/await` или Promise можно использовать следующий подход:

```javascript
async function periodicTaskAsync() {
  try {
    console.log("Начало задачи:", new Date().toISOString())

    // Асинхронная операция (например, запрос к API)
    await fetch("https://api.example.com/data")
      .then((res) => res.json())
      .then((data) => console.log("Получены данные:", data.length, "записей"))

    console.log("Задача завершена:", new Date().toISOString())
  } catch (error) {
    console.error("Ошибка выполнения задачи:", error)
  } finally {
    // Планируем следующий вызов независимо от результата
    setTimeout(periodicTaskAsync, 1000)
  }
}

// Запускаем асинхронную задачу
periodicTaskAsync()
```

## Альтернативный подход: бесконечный цикл с await

Другой элегантный способ — использование бесконечного цикла с асинхронными операциями:

```javascript
async function periodicExecutor() {
  while (true) {
    console.log("Выполнение задачи в", new Date().toISOString())

    // Выполнение задачи
    try {
      await someAsyncTask()
    } catch (error) {
      console.error("Ошибка:", error)
    }

    // Ждём перед следующим выполнением
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }
}

// Запускаем бесконечный цикл
periodicExecutor()
```

**Преимущества**:

- Очень чистый и понятный код
- Легко добавлять обработку ошибок и логику повторных попыток
- Естественно работает с async/await

## Расширенная реализация с возможностью остановки

Иногда нужна возможность остановить периодическое выполнение:

```javascript
function createPeriodicTask(taskFn, delay) {
  let isRunning = true

  async function execute() {
    if (!isRunning) return

    try {
      await taskFn()
    } catch (error) {
      console.error("Ошибка в задаче:", error)
    }

    // Если задача всё ещё должна выполняться, запланируем следующий запуск
    if (isRunning) {
      setTimeout(execute, delay)
    }
  }

  // Запускаем первое выполнение
  execute()

  // Возвращаем функцию для остановки задачи
  return {
    stop: () => {
      isRunning = false
    },
    isRunning: () => isRunning,
  }
}

// Использование
const task = createPeriodicTask(async () => {
  console.log("Выполнение задачи...")
  await someAsyncOperation()
  console.log("Задача завершена")
}, 2000)

// Остановка задачи через 10 секунд
setTimeout(() => {
  console.log("Останавливаем периодическую задачу")
  task.stop()
}, 10000)
```

## Дополнительные улучшения

### Динамический интервал на основе результата предыдущего выполнения

```javascript
async function adaptivePeriodicTask() {
  while (true) {
    const startTime = Date.now()

    // Выполнение задачи
    const result = await someTask()

    // Рассчитываем интервал на основе результата
    let nextDelay = 1000 // Базовый интервал

    if (result.hasErrors) {
      // При ошибках повторяем чаще
      nextDelay = 500
    } else if (result.noNewData) {
      // Если нет новых данных, можно увеличить интервал
      nextDelay = 5000
    }

    const executionTime = Date.now() - startTime
    console.log(`Задача выполнена за ${executionTime}ms, следующий запуск через ${nextDelay}ms`)

    // Ждём указанное время
    await new Promise((resolve) => setTimeout(resolve, nextDelay))
  }
}
```

### Контроль максимального времени выполнения

Можно добавить таймаут для защиты от слишком долгих операций:

```javascript
async function periodicTaskWithTimeout(fn, interval, timeout) {
  const executeWithTimeout = async () => {
    // Создаем promise с таймаутом
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Timeout")), timeout)
    })

    try {
      // Race между задачей и таймаутом
      await Promise.race([fn(), timeoutPromise])
      console.log("Задача успешно выполнена")
    } catch (error) {
      console.error("Ошибка выполнения:", error.message)
    }

    // Планируем следующее выполнение
    setTimeout(executeWithTimeout, interval)
  }

  // Запускаем первое выполнение
  executeWithTimeout()
}

// Использование - таймаут 3 секунды
periodicTaskWithTimeout(
  async () => {
    /* долгая операция */
  },
  1000, // интервал
  3000, // таймаут
)
```

## Сравнение подходов

| Метод                      | Преимущества                                    | Недостатки                            |
| -------------------------- | ----------------------------------------------- | ------------------------------------- |
| `setInterval()`            | Простота использования                          | Возможно наложение вызовов            |
| Рекурсивный `setTimeout()` | Предотвращает наложение                         | Немного сложнее реализовать остановку |
| Бесконечный цикл с `await` | Очень чистый код, хорошо работает с async/await | Требует использования async/await     |

## Заключение

- Используйте **рекурсивный `setTimeout()`** вместо `setInterval()`, чтобы избежать наложения вызовов и связанных с этим проблем.
- Для **асинхронных задач** удобнее использовать подход с `async/await` и бесконечным циклом.
- Добавляйте **обработку ошибок** и возможность остановки для создания надежных периодических задач.
- Рассмотрите вариант с **динамическим интервалом** для оптимизации использования ресурсов.

---

[[002 Node.js|Назад]]
