---
title: Что произойдет если в Writable-потоке не вызвать next() в методе _write()
draft: false
tags:
  - "#NodeJS"
  - "#Streams"
  - "#Writable"
  - "#потоки"
  - "#backpressure"
  - "#асинхронность"
  - "#отладка"
info:
  - https://nodejs.org/api/stream.html#writable-streams
  - https://nodejs.org/api/stream.html#implementing-a-writable-stream
  - https://habr.com/ru/articles/479048/
---

# Что произойдет если в Writable-потоке не вызвать next() в методе \_write()

Если в кастомном `Writable`-потоке в методе `_write()` не вызвать колбэк `next()` (или `callback()` в зависимости от именования параметра), то поток окажется в заблокированном состоянии и не сможет обрабатывать новые данные.

## Принцип работы \_write() и callback

### Сигнатура метода \_write()

В Node.js при создании кастомного `Writable`-потока необходимо реализовать метод `_write()`:

```javascript
_write(chunk, encoding, callback) {
  // Обработка данных
  // ...

  // Сигнал о завершении обработки чанка
  callback()
}
```

Где:

- `chunk` — порция данных для записи
- `encoding` — кодировка данных (если chunk — строка)
- `callback` — функция обратного вызова (часто называется `next` или `done`)

### Роль callback

Вызов `callback()` в методе `_write()` выполняет три критически важные функции:

1. **Сигнализирует о завершении** обработки текущего чанка данных
2. **Разблокирует поток** для приёма следующей порции данных
3. **Поддерживает механизм обратного давления** (backpressure)

## Последствия отсутствия вызова callback()

### 1. Блокировка потока

Если `callback()` не вызван, то поток:

- Не сможет обработать следующие вызовы `write()`
- Никогда не завершится (`finish` не будет вызван)
- Не освободит системные ресурсы

### 2. Утечка памяти

Данные будут накапливаться во внутреннем буфере потока, что может привести к:

- Росту потребления памяти
- Снижению производительности приложения
- Потенциальной ошибке `JavaScript heap out of memory`

### 3. Блокировка связанных потоков

Если блокированный поток используется в `pipe()`, то это повлияет на весь пайплайн:

- Readable-поток, подключенный через pipe, остановится из-за backpressure
- Последующие Transform-потоки также будут заблокированы
- Вся цепочка обработки данных "застрянет"

## Пример проблемы: забыли вызвать callback()

```javascript
const { Writable } = require("stream")

class BrokenWritable extends Writable {
  _write(chunk, encoding, callback) {
    console.log("Получены данные:", chunk.toString())

    // ❌ Ошибка: забыли вызвать callback()
    // Поток теперь "замёрз" и не может обрабатывать новые данные
  }
}

const writable = new BrokenWritable()

// Первый чанк будет обработан
writable.write("Первое сообщение")

// Следующий чанк останется в буфере и не будет обработан
writable.write("Второе сообщение")

// Поток никогда не завершится
writable.end("Конец данных")
```

В этом примере в консоли будет выведено только "Получены данные: Первое сообщение", а остальные данные не будут обработаны.

## Как исправить: правильный код с вызовом callback()

```javascript
const { Writable } = require("stream")

class ProperWritable extends Writable {
  _write(chunk, encoding, callback) {
    console.log("Получены данные:", chunk.toString())

    // ✅ Правильно: вызываем callback() после обработки
    callback()
  }
}

const writable = new ProperWritable()

// Все чанки будут обработаны последовательно
writable.write("Первое сообщение")
writable.write("Второе сообщение")
writable.end("Конец данных")
```

Результат в консоли:

```
Получены данные: Первое сообщение
Получены данные: Второе сообщение
Получены данные: Конец данных
```

## Обработка ошибок при вызове callback()

При возникновении ошибки во время обработки данных, её следует передать в `callback()`:

```javascript
_write(chunk, encoding, callback) {
  try {
    // Обработка данных
    const data = JSON.parse(chunk)
    processData(data)

    // Успешное завершение
    callback()
  } catch (err) {
    // Передача ошибки через callback
    callback(err)
  }
}
```

Это позволяет правильно обрабатывать ошибки в потоке:

```javascript
writable.on("error", (err) => {
  console.error("Ошибка потока:", err.message)
})
```

## Асинхронные операции в \_write()

Особенно важно правильно вызывать `callback()` при выполнении асинхронных операций:

```javascript
const fs = require("fs")
const { Writable } = require("stream")

class FileWritable extends Writable {
  constructor(filename) {
    super()
    this.filename = filename
  }

  _write(chunk, encoding, callback) {
    // Асинхронная операция записи в файл
    fs.appendFile(this.filename, chunk, (err) => {
      if (err) {
        return callback(err) // Передаём ошибку в callback
      }

      console.log("Данные записаны в файл")
      callback() // Вызываем callback только после завершения асинхронной операции
    })
  }
}

const fileWriter = new FileWritable("output.txt")
fileWriter.write("Асинхронная запись в файл\n")
fileWriter.end()
```

## Диагностика проблем с потоками

### Признаки того, что callback() не вызывается:

1. Данные перестают обрабатываться в определённый момент
2. Событие 'finish' никогда не срабатывает
3. Память программы растёт непрерывно
4. Потоки ввода-вывода "зависают"

### Отладка с помощью временных метрик:

```javascript
_write(chunk, encoding, callback) {
  const startTime = Date.now()
  console.log(`Начало обработки чанка ${startTime}`)

  processDataAsync(chunk, (err, result) => {
    const endTime = Date.now()
    console.log(`Завершение обработки: ${endTime - startTime} мс`)

    callback(err)
  })
}
```

## Заключение

Вызов `callback()` в методе `_write()` Writable-потока — это обязательная операция, которая:

1. Обеспечивает корректную работу потока
2. Поддерживает механизм обратного давления (backpressure)
3. Управляет асинхронным выполнением операций с данными

Пропуск вызова `callback()` — одна из самых распространённых ошибок при реализации кастомных потоков, которая приводит к "зависанию" потока и потенциальным утечкам памяти.

---

[[003 JSCore|Назад]]
