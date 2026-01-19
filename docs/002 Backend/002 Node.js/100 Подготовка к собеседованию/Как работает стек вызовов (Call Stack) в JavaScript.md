---
title: Как работает стек вызовов (Call Stack) в JavaScript
draft: false
tags:
  - "#NodeJS"
  - "#JavaScript"
  - "#стек_вызовов"
  - "#асинхронность"
  - "#производительность"
info:
  - "[MDN Web Docs: Функции](https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Functions)"
  - "[Understanding Call Stack in JavaScript](https://www.javascripttutorial.net/javascript-call-stack/)"
  - "[JavaScript V8 Engine Explained](https://blog.sessionstack.com/how-does-javascript-actually-work-part-1-b0bacc073cf)"
---

Стек вызовов (Call Stack) — это механизм в JavaScript, который отслеживает текущее положение выполнения кода и порядок выполнения функций. Это основная структура данных в движке JavaScript (например, V8 в Node.js и Chrome), которая работает по принципу LIFO (Last In, First Out) — последним пришёл, первым вышел.

## Основная концепция стека вызовов

Стек вызовов в JavaScript содержит контексты выполнения функций — информацию о том, в каком месте программы происходит выполнение. Движок JavaScript использует один стек вызовов для синхронного выполнения кода (работает в одном потоке).

### Ключевые операции стека вызовов:

1. **Добавление в стек (push)** — происходит, когда функция вызывается
2. **Извлечение из стека (pop)** — когда функция завершает выполнение или выбрасывает исключение

## Как работает стек вызовов?

Рассмотрим простой пример:

```javascript
function multiply(a, b) {
  return a * b
}

function square(n) {
  return multiply(n, n)
}

function printSquare(n) {
  const result = square(n)
  console.log(result)
}

printSquare(5)
```

### Процесс выполнения:

1. **Начало программы**: стек пуст
2. **Вызов `printSquare(5)`**: функция добавляется в стек
3. **Внутри `printSquare` происходит вызов `square(5)`**: `square` добавляется в стек поверх `printSquare`
4. **Внутри `square` происходит вызов `multiply(5, 5)`**: `multiply` добавляется в стек поверх `square`
5. **`multiply` возвращает результат (25)**: `multiply` удаляется из стека
6. **`square` возвращает результат (25)**: `square` удаляется из стека
7. **`printSquare` выводит результат и завершается**: `printSquare` удаляется из стека
8. **Стек вызовов снова пуст**

Визуализация стека на каждом шаге:

```
1. [] (Пустой стек)
2. [printSquare]
3. [printSquare, square]
4. [printSquare, square, multiply]
5. [printSquare, square]
6. [printSquare]
7. []
```

## Ограничения стека вызовов

Стек вызовов имеет ограниченный размер, определяемый движком JavaScript и доступной памятью. Превышение этого размера вызывает ошибку **RangeError: Maximum call stack size exceeded**, также известную как **переполнение стека** (stack overflow).

### Частая причина переполнения стека — бесконечная рекурсия:

```javascript
function recursiveFunction() {
  recursiveFunction() // Вызывает сама себя бесконечно
}

recursiveFunction() // Скоро приведет к ошибке переполнения стека
```

## Стек вызовов и асинхронный JavaScript

JavaScript — однопоточный язык с асинхронными возможностями. Когда возникает асинхронная операция (например, setTimeout, fetch, Promise), JavaScript делегирует её выполнение среде выполнения (браузер или Node.js):

```javascript
console.log("Начало")

setTimeout(function timeout() {
  console.log("Таймер")
}, 0)

Promise.resolve().then(function promise() {
  console.log("Промис")
})

console.log("Конец")

// Вывод:
// Начало
// Конец
// Промис
// Таймер
```

### Процесс выполнения асинхронного кода:

1. `console.log("Начало")` выполняется синхронно и удаляется из стека
2. `setTimeout` регистрирует коллбэк, но не блокирует стек (передается в Web API / Node.js API)
3. `Promise.resolve().then()` регистрирует коллбэк в очереди микрозадач
4. `console.log("Конец")` выполняется синхронно и удаляется из стека
5. Стек освобождается, цикл событий проверяет очереди задач
6. Сначала выполняется коллбэк из очереди микрозадач (`console.log("Промис")`)
7. Затем выполняется коллбэк из очереди таймеров (`console.log("Таймер")`)

## Отладка стека вызовов

При отладке JavaScript-приложений можно исследовать текущий стек вызовов:

1. **В браузере**: используя инструменты разработчика (DevTools), вкладка Sources → Call Stack
2. **В Node.js**: с помощью отладчика или в трассировке ошибок
3. **Программно**: через `new Error().stack` или `console.trace()`

### Пример получения стека вызовов:

```javascript
function third() {
  console.trace("Трассировка стека")
}

function second() {
  third()
}

function first() {
  second()
}

first()
```

## Оптимизация стека вызовов

1. **Избегайте глубокой рекурсии** — используйте итеративный подход или оптимизацию хвостовой рекурсии
2. **Делите большие задачи** — используйте `setTimeout` с нулевой задержкой для предотвращения блокировки
3. **Используйте асинхронные функции** — для операций, которые могут занять длительное время

---

[[002 Node.js|Назад]]
