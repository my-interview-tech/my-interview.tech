---
title: Что такое модуль assert в Node.js и как его использовать
draft: false
tags:
  - "#NodeJS"
  - "#assert"
  - "#тестирование"
  - "#отладка"
  - "#проверка_условий"
info:
  - "[Документация Node.js - Assert](https://nodejs.org/api/assert.html)"
  - "[Модуль Assert: советы и рекомендации](https://nodejs.org/en/guides/diagnostics/assert/)"
---

![[node-assert.png|600]]

## Что такое модуль assert в Node.js

`assert` - это встроенный модуль Node.js, который предоставляет набор функций для проверки инвариантов в коде. Он обычно используется для написания тестов, но может применяться и для проверки условий в рабочем коде.

Модуль `assert` позволяет выполнять проверки утверждений, и при их невыполнении автоматически генерирует ошибку с подробной информацией о несоответствии, что упрощает отладку.

## Основные функции модуля assert

### 1. Строгие и нестрогие режимы проверки

Node.js поддерживает два режима проверок: **строгий** и **нестрогий**. Различие между ними заключается в способе сравнения значений:

```javascript
const assert = require("assert")

// Нестрогий режим (использует оператор ==)
assert.equal(1, "1") // Пройдет, т.к. 1 == '1'

// Строгий режим (использует оператор ===)
assert.strictEqual(1, "1") // Выбросит AssertionError, т.к. 1 !== '1'

// Современный подход - по умолчанию все методы строгие
assert(1 === 1) // Проверка истинности условия
assert.equal(1, 1) // Проверка равенства (строгая)
assert.notEqual(1, 2) // Проверка неравенства (строгая)
```

### 2. Проверка равенства значений

```javascript
const assert = require("assert")

// Проверка равенства
assert.equal(5, 5) // OK
assert.notEqual(5, 10) // OK

// Строгая проверка равенства
assert.strictEqual(5, 5) // OK
assert.notStrictEqual("5", 5) // OK

// Проверка глубокого равенства объектов
assert.deepEqual({ a: 1, b: 2 }, { a: 1, b: 2 }) // OK
assert.notDeepEqual({ a: 1 }, { a: 2 }) // OK

// Строгая проверка глубокого равенства
assert.deepStrictEqual({ a: 1 }, { a: "1" }) // AssertionError
assert.notDeepStrictEqual({ a: 1 }, { a: "1" }) // OK
```

### 3. Проверка исключений и отказов

```javascript
const assert = require("assert")

// Проверка, что функция выбрасывает исключение
assert.throws(
  () => {
    throw new Error("Ошибка!")
  },
  Error, // Ожидаемый тип ошибки
  "Должна быть выброшена ошибка", // Опциональное сообщение
)

// Проверка исключения с проверкой сообщения
assert.throws(
  () => {
    throw new Error("Неверное значение")
  },
  /Неверное/, // Регулярное выражение для проверки сообщения
)

// Проверка, что функция НЕ выбрасывает исключение
assert.doesNotThrow(() => {
  // Код, который не должен выбрасывать исключение
  return 123
})

// Проверка асинхронного отказа (Promise rejection)
assert.rejects(async () => {
  throw new Error("Асинхронная ошибка")
}, Error)

// Проверка, что промис НЕ отклоняется
assert.doesNotReject(async () => {
  return "success"
})
```

### 4. Другие полезные методы

```javascript
const assert = require("assert")

// Проверка, что значение истинно
assert.ok(true) // OK
assert.ok(1) // OK
assert.ok("") // AssertionError

// Проверка, что значение соответствует регулярному выражению
assert.match("hello world", /hello/) // OK
assert.doesNotMatch("hello world", /bye/) // OK

// Проверка, включает ли массив или строка подзначение
assert.includes([1, 2, 3], 2) // OK
assert.includes("hello world", "world") // OK
assert.notIncludes([1, 2, 3], 5) // OK
```

## Настройка сообщений об ошибках

Каждый метод модуля `assert` позволяет указать пользовательское сообщение, которое будет включено в текст ошибки:

```javascript
const assert = require("assert")

// Базовое использование с сообщением
assert.strictEqual(
  1,
  2,
  "Значения должны быть равны", // Это сообщение будет добавлено к ошибке
)

// Более сложный случай
function divide(a, b) {
  assert(b !== 0, "Делитель не может быть равен нулю")
  return a / b
}

try {
  divide(10, 0)
} catch (error) {
  console.error(error.message) // "Делитель не может быть равен нулю"
}
```

## Создание пользовательских проверок

Вы можете создавать собственные функции для проверки утверждений:

```javascript
const assert = require("assert")

// Функция для проверки, что строка содержит только цифры
function assertIsNumeric(value, message) {
  const isNumeric = /^\d+$/.test(value)
  assert.ok(isNumeric, message || `Ожидалась строка с цифрами, получено: "${value}"`)
}

// Использование
assertIsNumeric("123") // OK
try {
  assertIsNumeric("123a")
} catch (error) {
  console.error(error.message) // 'Ожидалась строка с цифрами, получено: "123a"'
}

// Функция для проверки диапазона значений
function assertInRange(value, min, max, message) {
  const inRange = value >= min && value <= max
  assert.ok(inRange, message || `Значение ${value} должно быть в диапазоне от ${min} до ${max}`)
}

assertInRange(5, 1, 10) // OK
assertInRange(15, 1, 10) // AssertionError
```

## Практические примеры использования

### 1. Проверка входных параметров функций

```javascript
const assert = require("assert")

function createUser(name, age, email) {
  // Проверки входных данных
  assert.ok(name && typeof name === "string", "Имя должно быть непустой строкой")
  assert.ok(
    Number.isInteger(age) && age > 0 && age < 120,
    "Возраст должен быть целым числом от 1 до 119",
  )
  assert.match(
    email,
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    "Email имеет неверный формат",
  )

  return {
    name,
    age,
    email,
  }
}

// Правильное использование
const user = createUser("Иван", 25, "ivan@example.com")
console.log(user)

// Ошибка валидации
try {
  createUser("", 25, "ivan@example.com")
} catch (error) {
  console.error(error.message) // "Имя должно быть непустой строкой"
}
```

### 2. Простое модульное тестирование

```javascript
const assert = require("assert")

// Тестируемая функция
function sum(a, b) {
  return a + b
}

// Простые тесты
function testSum() {
  console.log("Тестирование функции sum...")

  assert.strictEqual(sum(1, 2), 3, "1 + 2 должно быть 3")
  assert.strictEqual(sum(-1, 1), 0, "-1 + 1 должно быть 0")
  assert.strictEqual(sum(0, 0), 0, "0 + 0 должно быть 0")

  // Тестирование с числами с плавающей точкой
  assert.strictEqual(Math.round(sum(0.1, 0.2) * 10) / 10, 0.3, "0.1 + 0.2 должно быть примерно 0.3")

  console.log("Все тесты для sum пройдены!")
}

// Запуск тестов
testSum()
```

### 3. Отладка сложных объектов

```javascript
const assert = require("assert")

function processData(data) {
  // Проверка структуры данных
  assert.ok(data && typeof data === "object", "Ожидается объект")
  assert.ok(Array.isArray(data.items), "data.items должен быть массивом")

  const result = []

  data.items.forEach((item, index) => {
    // Проверка каждого элемента
    assert.ok(item.id, `Элемент #${index} должен иметь id`)
    assert.ok(
      typeof item.name === "string" && item.name.trim() !== "",
      `Элемент #${index} должен иметь непустое имя`,
    )

    result.push({
      id: item.id,
      name: item.name.trim(),
      value: item.value || 0,
    })
  })

  return result
}

// Пример использования
try {
  const result = processData({
    items: [
      { id: 1, name: "Item 1", value: 100 },
      { id: 2, name: "Item 2" },
      { id: 3, name: "" }, // Этот вызовет ошибку
    ],
  })
} catch (error) {
  console.error("Ошибка обработки данных:", error.message)
  // Выведет: "Ошибка обработки данных: Элемент #2 должен иметь непустое имя"
}
```

## Продвинутые возможности assert

### 1. Класс AssertionError

В случае неудачной проверки `assert` генерирует объект `AssertionError` с полезной информацией:

```javascript
const assert = require("assert")

try {
  assert.strictEqual(1, 2)
} catch (error) {
  console.log("Название ошибки:", error.name) // AssertionError
  console.log("Сообщение:", error.message) // "Expected values to be strictly equal: 1 !== 2"
  console.log("Фактическое значение:", error.actual) // 1
  console.log("Ожидаемое значение:", error.expected) // 2
  console.log("Оператор:", error.operator) // "strictEqual"
  console.log("Стек вызовов:", error.stack) // Стек вызовов
}

// Создание собственной ошибки AssertionError
const myError = new assert.AssertionError({
  message: "Что-то пошло не так",
  actual: "полученный результат",
  expected: "ожидаемый результат",
  operator: "strictEqual",
})

console.error(myError)
```

### 2. Проверка объектов с определенной структурой

```javascript
const assert = require("assert")

// Проверка, что объект имеет ожидаемую структуру
function assertHasStructure(obj, template, path = "") {
  assert.ok(obj && typeof obj === "object", `${path || "Объект"} должен быть объектом`)

  for (const [key, value] of Object.entries(template)) {
    const currentPath = path ? `${path}.${key}` : key

    // Проверка наличия ключа
    assert.ok(
      Object.prototype.hasOwnProperty.call(obj, key),
      `Отсутствует обязательное поле: ${currentPath}`,
    )

    // Проверка типа
    if (typeof value === "function") {
      // Если в шаблоне указан конструктор (String, Number и т.д.)
      assert.ok(
        obj[key] instanceof value || typeof obj[key] === value.name.toLowerCase(),
        `Поле ${currentPath} должно иметь тип ${value.name}`,
      )
    } else if (typeof value === "object" && value !== null) {
      // Рекурсивная проверка вложенного объекта
      assertHasStructure(obj[key], value, currentPath)
    }
  }
}

// Пример использования
const userTemplate = {
  id: Number,
  name: String,
  email: String,
  address: {
    city: String,
    zipCode: String,
  },
}

const user = {
  id: 1,
  name: "Иван",
  email: "ivan@example.com",
  address: {
    city: "Москва",
    zipCode: "123456",
  },
  extraField: true, // дополнительные поля допускаются
}

try {
  assertHasStructure(user, userTemplate)
  console.log("Объект валиден!")
} catch (error) {
  console.error("Ошибка валидации:", error.message)
}

// Некорректный объект
const invalidUser = {
  id: "1", // должно быть числом
  name: "Иван",
  email: "ivan@example.com",
  address: {
    city: "Москва",
    // отсутствует zipCode
  },
}

try {
  assertHasStructure(invalidUser, userTemplate)
} catch (error) {
  console.error("Ошибка валидации:", error.message)
  // Выведет: "Поле id должно иметь тип Number" или
  // "Отсутствует обязательное поле: address.zipCode"
}
```

### 3. Интеграция с тестовыми фреймворками

Хотя модуль `assert` полезен сам по себе, его часто используют вместе с тестовыми фреймворками:

```javascript
const assert = require("assert")

// Примитивный тестовый фреймворк
function describe(name, fn) {
  console.log(`\n==== ${name} ====`)
  fn()
}

function it(name, fn) {
  try {
    fn()
    console.log(`✓ ${name}`)
  } catch (error) {
    console.error(`✗ ${name}`)
    console.error(`  ${error.message}`)
  }
}

// Использование в тестах
describe("Математические функции", () => {
  it("должны правильно складывать числа", () => {
    assert.strictEqual(1 + 2, 3)
  })

  it("должны правильно вычитать числа", () => {
    assert.strictEqual(5 - 2, 3)
  })

  it("должны демонстрировать особенности JavaScript", () => {
    assert.strictEqual(0.1 + 0.2, 0.3) // Этот тест не пройдет
  })
})
```

## Сравнение с альтернативами

### 1. assert vs console.assert

Node.js предоставляет функцию `console.assert`, которая похожа на `assert`, но имеет важные отличия:

```javascript
const assert = require("assert")

// Стандартный assert - прерывает выполнение при ошибке
try {
  assert.ok(false, "Это сообщение об ошибке")
  console.log("Этот код не выполнится")
} catch (error) {
  console.error("Перехвачена ошибка:", error.message)
}

// console.assert - только выводит сообщение, не прерывает выполнение
console.assert(false, "Это сообщение об ошибке")
console.log("Этот код выполнится")

// Вывод:
// Перехвачена ошибка: Это сообщение об ошибке
// Assertion failed: Это сообщение об ошибке
// Этот код выполнится
```

### 2. assert vs специализированные библиотеки

Для более сложного тестирования, как правило, используют специализированные библиотеки:

```javascript
const assert = require("assert")

// Сравнение с chai.js (популярная библиотека утверждений)
/*
// chai.js
const { expect } = require('chai');

// Базовые утверждения
expect(42).to.equal(42);
expect(42).to.not.equal(43);
expect({ a: 1 }).to.deep.equal({ a: 1 });

// Цепочки утверждений
expect('foo').to.be.a('string').and.have.lengthOf(3);
expect([1, 2, 3]).to.include(2);
expect({ a: 1, b: 2 }).to.have.property('b', 2);
*/

// Эквивалент с стандартным assert
assert.strictEqual(42, 42)
assert.notStrictEqual(42, 43)
assert.deepStrictEqual({ a: 1 }, { a: 1 })

// Более сложные проверки требуют больше кода
assert.strictEqual(typeof "foo", "string")
assert.strictEqual("foo".length, 3)
assert.ok([1, 2, 3].includes(2))
assert.strictEqual({ a: 1, b: 2 }.b, 2)
```

## Лучшие практики использования assert

1. **Используйте строгие проверки по умолчанию**

```javascript
// Предпочтительно:
assert.strictEqual(a, b)
assert.deepStrictEqual(obj1, obj2)

// Вместо:
assert.equal(a, b)
assert.deepEqual(obj1, obj2)
```

2. **Предоставляйте информативные сообщения об ошибках**

```javascript
// Хорошо:
assert.ok(user.age >= 18, `Пользователь должен быть совершеннолетним (получено: ${user.age})`)

// Плохо:
assert.ok(user.age >= 18)
```

3. **Используйте assert для предусловий и инвариантов**

```javascript
function processTransaction(amount, account) {
  // Предусловия
  assert(amount > 0, "Сумма должна быть положительной")
  assert(account && account.id, "Счет должен быть указан")
  assert(account.balance >= amount, "Недостаточно средств")

  // Выполнение операции
  account.balance -= amount

  // Инвариант
  assert(account.balance >= 0, "Баланс не может быть отрицательным")

  return {
    success: true,
    newBalance: account.balance,
  }
}
```

4. **Для сложных проверок создавайте вспомогательные функции**

```javascript
// Создание специальных функций для частых проверок
function assertIsValidEmail(email, message) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  assert.ok(emailRegex.test(email), message || `Неверный формат email: ${email}`)
}

// Использование
assertIsValidEmail("user@example.com") // OK
assertIsValidEmail("not-an-email") // AssertionError
```

## Заключение

Модуль `assert` в Node.js предоставляет простой и эффективный способ проверки условий в коде. Он особенно полезен для написания тестов, отладки программ и обеспечения правильности входных параметров функций.

Хотя для комплексного тестирования часто используются специализированные библиотеки, стандартный модуль `assert` обладает всеми необходимыми функциями для базовой проверки инвариантов и является важным инструментом в арсенале разработчика Node.js.

---

[[002 Node.js|Назад]]
