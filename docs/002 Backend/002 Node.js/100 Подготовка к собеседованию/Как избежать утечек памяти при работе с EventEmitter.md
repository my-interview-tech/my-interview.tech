---
title: Как избежать утечек памяти при работе с EventEmitter
draft: false
tags:
  - "#NodeJS"
  - "#EventEmitter"
  - "#утечки_памяти"
  - "#производительность"
  - "#events"
info:
  - https://nodejs.org/api/events.html
  - https://nodejs.org/api/events.html#eventemitterremovelistenereventname-listener
---

`EventEmitter` – это ключевой паттерн в Node.js, позволяющий реализовать асинхронное программирование на основе событий. Однако неправильное использование может привести к утечкам памяти, когда слушатели событий продолжают существовать, даже когда объекты, на которые они ссылаются, больше не используются.

## Почему возникают утечки памяти

Утечки памяти при работе с `EventEmitter` обычно происходят, когда:

1. **Слушатели не удаляются**, когда перестают быть нужными
2. **Объекты могут быть удалены сборщиком мусора**, но их слушатели остаются активными
3. **Циклические ссылки** создаются между эмиттером и слушателем

## Методы предотвращения утечек памяти

### 1. Отписывайтесь от событий, когда они больше не нужны

Используйте методы `.removeListener()` или `.off()` для удаления слушателей:

```javascript
const EventEmitter = require("events")
const emitter = new EventEmitter()

function onEvent() {
  console.log("Event triggered")
}

// Подписка на событие
emitter.on("event", onEvent)

// Использование события...

// Отписка, когда событие больше не нужно
emitter.removeListener("event", onEvent)
// или в новых версиях Node.js
// emitter.off('event', onEvent);
```

### 2. Используйте `.once()` для одноразовых слушателей

Если вам нужно обработать событие только один раз, используйте метод `.once()`, который автоматически удаляет слушателя после первого вызова:

```javascript
emitter.once("event", () => {
  console.log("Это сообщение будет выведено только один раз")
})
```

### 3. Удаляйте все слушатели при завершении работы

Когда объект больше не нужен, очищайте все его слушатели:

```javascript
// Удаление всех слушателей конкретного события
emitter.removeAllListeners("event")

// Удаление всех слушателей всех событий
emitter.removeAllListeners()
```

### 4. Следите за количеством слушателей

Node.js предупреждает, если к одному событию добавлено больше 10 слушателей. Это может указывать на утечку памяти. При необходимости можно увеличить лимит:

```javascript
emitter.setMaxListeners(20)
```

Или для всех эмиттеров:

```javascript
require("events").EventEmitter.defaultMaxListeners = 20
```

### 5. Используйте WeakMap/WeakRef для предотвращения циклических зависимостей

В сложных случаях можно использовать `WeakMap` или `WeakRef` для создания "слабых" ссылок, которые не помешают сборке мусора:

```javascript
// Пример с WeakMap
const listeners = new WeakMap()

function setupListener(emitter, target) {
  const listener = () => {
    console.log("Event happened:", target.name)
  }

  listeners.set(target, listener)
  emitter.on("event", listener)

  return () => {
    emitter.removeListener("event", listeners.get(target))
    listeners.delete(target)
  }
}

const obj = { name: "Target object" }
const cleanup = setupListener(myEmitter, obj)

// Позже, когда слушатель больше не нужен
cleanup()
```

### 6. Используйте инструменты для обнаружения утечек

Для выявления утечек памяти используйте инструменты:

- **Node.js Inspector**: `node --inspect`
- **Chrome DevTools**: для анализа памяти в Node.js-приложениях
- **Модули**: `memwatch-next`, `heapdump` для создания снимков памяти

### 7. Пример полного решения

Вот более полный пример, показывающий правильную работу с `EventEmitter`:

```javascript
const EventEmitter = require("events")

class Connection extends EventEmitter {
  constructor(id) {
    super()
    this.id = id
  }

  process() {
    // Эмулируем обработку соединения
    this.emit("data", `Данные от соединения ${this.id}`)
  }

  close() {
    this.emit("close", this.id)

    // Важно: удаляем все слушатели
    this.removeAllListeners()
  }
}

// Использование
function handleConnection(connection) {
  const onData = (data) => {
    console.log("Получены данные:", data)
  }

  const onClose = (id) => {
    console.log(`Соединение ${id} закрыто`)

    // Важно: отписываемся от событий
    connection.removeListener("data", onData)
    connection.removeListener("close", onClose)
  }

  // Подписываемся на события
  connection.on("data", onData)
  connection.on("close", onClose)

  // Делаем что-то с соединением
  connection.process()

  // Закрываем соединение
  setTimeout(() => connection.close(), 1000)
}

const conn = new Connection(123)
handleConnection(conn)
```

## Заключение

Чтобы избежать утечек памяти при работе с `EventEmitter`:

1. **Всегда отписывайтесь от событий**, когда они больше не нужны
2. Используйте **`.once()`** для одноразовых событий
3. **Удаляйте все слушатели** при завершении работы с объектом
4. **Следите за количеством слушателей** с помощью `.setMaxListeners()`
5. При необходимости используйте **`WeakMap`/`WeakRef`** для предотвращения циклических ссылок
6. **Регулярно тестируйте** приложение на наличие утечек памяти

---

[[002 Node.js|Назад]]
