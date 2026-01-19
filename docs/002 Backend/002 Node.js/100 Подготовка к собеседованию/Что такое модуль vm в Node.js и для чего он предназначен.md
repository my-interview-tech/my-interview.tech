---
title: Что такое модуль vm в Node.js и для чего он предназначен
draft: false
tags:
  - "#NodeJS"
  - "#vm"
  - "#безопасность"
  - "#изоляция"
  - "#динамическое_выполнение"
info:
  - "[Документация Node.js - VM](https://nodejs.org/api/vm.html)"
  - "[Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)"
---

![[node-vm.png|600]]

## Что такое модуль vm в Node.js

`vm` (виртуальная машина) - это встроенный модуль Node.js, который позволяет компилировать и выполнять JavaScript-код в изолированном контексте. Фактически, он предоставляет способ создания "песочниц" (sandboxes) для безопасного выполнения кода.

Этот модуль позволяет выполнять код в отдельном контексте глобальных переменных, что даёт возможность изолировать выполняемый код от основного процесса Node.js, хотя уровень изоляции ограничен.

## Основные компоненты и функции модуля vm

### 1. Создание и выполнение скриптов

```javascript
const vm = require("vm")

// Создание скрипта
const script = new vm.Script('x = 1; console.log("Результат:", x + y)')

// Создание контекста
const context = {
  x: 0, // будет перезаписано скриптом
  y: 2, // будет прочитано скриптом
}

// Создание контекстифицированного объекта
vm.createContext(context)

// Выполнение скрипта в заданном контексте
script.runInContext(context)
// Вывод: "Результат: 3"

// Проверка контекста после выполнения
console.log(context.x) // 1 (изменено скриптом)
console.log(context.y) // 2 (не изменено)
```

### 2. Быстрое выполнение кода

```javascript
const vm = require("vm")

// Выполнение строки кода в текущем контексте
vm.runInThisContext("console.log('Привет из VM')")
// Вывод: "Привет из VM"

// Выполнение в новом контексте
const context = { name: "Node.js" }
vm.createContext(context)
vm.runInContext("console.log(`Привет, ${name}!`)", context)
// Вывод: "Привет, Node.js!"
```

### 3. Использование с таймаутом и другими опциями

```javascript
const vm = require("vm")

// Создание контекста
const sandbox = { result: null }
vm.createContext(sandbox)

try {
  // Установка таймаута для предотвращения бесконечных циклов
  vm.runInContext(
    `
    // Потенциально опасный код с бесконечным циклом
    let i = 0
    while (true) {
      i++
      if (i > 1000000) break
      result = i
    }
  `,
    sandbox,
    { timeout: 100 },
  ) // таймаут в миллисекундах
} catch (err) {
  console.error("Ошибка выполнения:", err.message)
}

console.log("Результат:", sandbox.result)
```

## Практические примеры использования

### 1. Безопасное выполнение пользовательского кода

```javascript
const vm = require("vm")

function executeSafeUserCode(userCode, userInput) {
  // Создаем песочницу с ограниченным API
  const sandbox = {
    input: userInput,
    output: null,
    console: {
      log: (...args) => {
        console.log("Пользовательский код:", ...args)
      },
    },
  }

  // Создаем изолированный контекст
  vm.createContext(sandbox)

  try {
    // Выполняем код с таймаутом
    vm.runInContext(userCode, sandbox, {
      timeout: 1000,
      displayErrors: true,
    })

    return {
      success: true,
      output: sandbox.output,
    }
  } catch (error) {
    return {
      success: false,
      error: error.message,
    }
  }
}

// Пример использования
const result = executeSafeUserCode(
  `
  console.log("Получен ввод:", input)
  output = input.toUpperCase()
`,
  "hello world",
)

console.log("Результат выполнения:", result)
// Вывод:
// Пользовательский код: Получен ввод: hello world
// Результат выполнения: { success: true, output: 'HELLO WORLD' }
```

### 2. Динамические шаблоны

```javascript
const vm = require("vm")

function renderTemplate(template, data) {
  // Создание контекста с данными
  const context = { ...data, result: "" }
  vm.createContext(context)

  // Преобразование шаблона в JavaScript код
  const templateCode = `
    result = \`${template}\`
  `

  try {
    // Выполнение шаблона
    vm.runInContext(templateCode, context, {
      timeout: 100,
      filename: "template.vm",
    })

    return context.result
  } catch (error) {
    return `Ошибка в шаблоне: ${error.message}`
  }
}

// Пример использования
const html = renderTemplate(
  "<h1>Приветствую, ${name}!</h1><p>Сегодня: ${new Date().toLocaleDateString()}</p>",
  { name: "Пользователь" },
)

console.log(html)
// Вывод: "<h1>Приветствую, Пользователь!</h1><p>Сегодня: 01.01.2023</p>"
```

### 3. Создание плагинов

```javascript
const vm = require("vm")
const fs = require("fs")
const path = require("path")

class PluginSystem {
  constructor() {
    this.plugins = new Map()
    this.api = {
      // Предоставляемый плагинам API
      log: console.log,
      fetch: async (url) => {
        // Упрощенная имитация fetch
        return { text: () => Promise.resolve(`Данные из ${url}`) }
      },
    }
  }

  // Загрузка плагина из файла
  loadPlugin(name, filePath) {
    try {
      const code = fs.readFileSync(filePath, "utf8")

      // Создание контекста для плагина
      const context = {
        exports: {},
        console: {
          log: (...args) => console.log(`[Plugin ${name}]:`, ...args),
        },
        // Имитация require
        require: (moduleName) => {
          if (moduleName === "api") return this.api
          throw new Error(`Модуль "${moduleName}" недоступен в контексте плагина`)
        },
      }

      vm.createContext(context)

      // Выполнение кода плагина
      vm.runInContext(code, context, {
        filename: name,
        timeout: 1000,
      })

      // Сохранение экспортированных функций
      this.plugins.set(name, context.exports)
      console.log(`Плагин "${name}" успешно загружен`)
      return true
    } catch (error) {
      console.error(`Ошибка загрузки плагина "${name}":`, error.message)
      return false
    }
  }

  // Вызов метода плагина
  async callPlugin(name, method, ...args) {
    const plugin = this.plugins.get(name)
    if (!plugin) {
      throw new Error(`Плагин "${name}" не найден`)
    }

    if (typeof plugin[method] !== "function") {
      throw new Error(`Метод "${method}" не найден в плагине "${name}"`)
    }

    try {
      return await plugin[method](...args)
    } catch (error) {
      console.error(`Ошибка в плагине "${name}.${method}":`, error.message)
      throw error
    }
  }
}

// Пример использования
// Содержимое плагина (например, в файле "my-plugin.js"):
/*
const api = require('api')

exports.greet = function(name) {
  api.log(`Привет, ${name}!`)
  return `Плагин приветствует ${name}`
}

exports.fetchData = async function(url) {
  const response = await api.fetch(url)
  const text = await response.text()
  return `Получены данные: ${text}`
}
*/

// Использование системы плагинов
/*
const pluginSystem = new PluginSystem()
pluginSystem.loadPlugin("greeting", "./plugins/my-plugin.js")

// Синхронный вызов
pluginSystem.callPlugin("greeting", "greet", "Пользователь")
  .then(result => console.log("Результат:", result))

// Асинхронный вызов
pluginSystem.callPlugin("greeting", "fetchData", "https://example.com")
  .then(result => console.log("Результат:", result))
*/
```

## Ограничения и соображения безопасности

Несмотря на то, что модуль `vm` предоставляет некоторую изоляцию, важно понимать его ограничения:

### 1. Неполная изоляция

Изоляция, предоставляемая модулем `vm`, не является полноценной "песочницей" и имеет значительные ограничения:

```javascript
const vm = require("vm")

const sandbox = { escape: null }
vm.createContext(sandbox)

// Злонамеренный код может "сбежать" из песочницы
vm.runInContext(
  `
  // Получение доступа к конструктору Function
  const constructor = [].constructor.constructor
  
  // Создание функции для доступа к глобальному объекту
  const getGlobal = constructor("return this")
  
  // Получение доступа к глобальному объекту
  const globalObject = getGlobal()
  
  // Сохранение ссылки на process
  escape = globalObject.process
`,
  sandbox,
)

if (sandbox.escape) {
  console.log("Произошел выход из песочницы! Получен доступ к:", sandbox.escape.title)
  // Вывод: "Произошел выход из песочницы! Получен доступ к: node"
}
```

### 2. Контрмеры и рекомендации

Для повышения безопасности при использовании `vm`:

```javascript
const vm = require("vm")

function safeEval(code) {
  // 1. Установите таймаут
  // 2. Ограничьте доступные API
  // 3. Проверяйте входные данные

  const sandbox = Object.create(null) // Пустой объект без прототипа

  // Добавляем только необходимые функции
  sandbox.console = {
    log: (...args) => console.log("[Sandbox]:", ...args),
  }

  vm.createContext(sandbox)

  try {
    const result = vm.runInContext(code, sandbox, {
      timeout: 100,
      displayErrors: true,
      contextCodeGeneration: {
        strings: false, // Запретить создание функций из строк
        wasm: false, // Запретить компиляцию WebAssembly
      },
    })

    return { success: true, result }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Тестирование
console.log(safeEval("2 + 2"))
// { success: true, result: 4 }

console.log(safeEval("while(true){}"))
// { success: false, error: "Script execution timed out." }
```

### 3. Альтернативы для более надежной изоляции

Для более строгой изоляции рекомендуется использовать:

- Отдельные процессы с `child_process`
- Рабочие потоки с `worker_threads`
- Сторонние библиотеки, такие как `vm2` или `isolated-vm`

## Производительность и оптимизация

При работе с `vm` следует учитывать вопросы производительности:

```javascript
const vm = require("vm")
const { performance } = require("perf_hooks")

// Сравнение производительности
function benchmarkVm() {
  const iterations = 10000
  const code = "let sum = 0; for (let i = 0; i < 100; i++) { sum += i } return sum"

  // Измерение обычного выполнения
  const start1 = performance.now()
  for (let i = 0; i < iterations; i++) {
    eval(code)
  }
  const time1 = performance.now() - start1

  // Создание скрипта VM
  const script = new vm.Script(code)
  const context = {}
  vm.createContext(context)

  // Измерение VM.Script
  const start2 = performance.now()
  for (let i = 0; i < iterations; i++) {
    script.runInContext(context)
  }
  const time2 = performance.now() - start2

  // Измерение runInContext без предварительной компиляции
  const start3 = performance.now()
  for (let i = 0; i < iterations; i++) {
    vm.runInContext(code, context)
  }
  const time3 = performance.now() - start3

  console.log(`eval: ${time1.toFixed(2)} мс`)
  console.log(`vm.Script: ${time2.toFixed(2)} мс (${(time2 / time1).toFixed(2)}x)`)
  console.log(`vm.runInContext: ${time3.toFixed(2)} мс (${(time3 / time1).toFixed(2)}x)`)
}

benchmarkVm()
// Примерный вывод:
// eval: 150.45 мс
// vm.Script: 320.78 мс (2.13x)
// vm.runInContext: 980.56 мс (6.52x)
```

## Типичные сценарии использования

### 1. Интерпретаторы языков и DSL (предметно-ориентированных языков)

```javascript
const vm = require("vm")

// Простой интерпретатор для мини-языка
function interpretSimpleLanguage(code) {
  // Преобразование кода в JavaScript
  let jsCode = "let result = '';\n"

  // Разбор строк кода
  const lines = code.split("\n")
  for (const line of lines) {
    const trimmed = line.trim()

    if (trimmed.startsWith("PRINT ")) {
      const value = trimmed.substring(6)
      jsCode += `result += (${value}) + '\\n';\n`
    } else if (trimmed.startsWith("VAR ")) {
      const declaration = trimmed.substring(4)
      const parts = declaration.split("=")
      jsCode += `let ${parts[0].trim()} = ${parts[1].trim()};\n`
    } else if (trimmed.startsWith("IF ")) {
      const condition = trimmed.substring(3)
      jsCode += `if (${condition}) {\n`
    } else if (trimmed === "ENDIF") {
      jsCode += "}\n"
    }
  }

  // Создаем контекст и выполняем код
  const context = {}
  vm.createContext(context)

  try {
    vm.runInContext(jsCode, context)
    return context.result
  } catch (error) {
    return `Ошибка: ${error.message}`
  }
}

// Пример использования
const miniCode = `
VAR x = 10
VAR y = 20
PRINT 'Значение x: ' + x
IF x < y
PRINT 'y больше чем x'
ENDIF
PRINT 'Сумма: ' + (x + y)
`

console.log(interpretSimpleLanguage(miniCode))
// Вывод:
// Значение x: 10
// y больше чем x
// Сумма: 30
```

### 2. Динамическая генерация и выполнение функций

```javascript
const vm = require("vm")

// Создание функций на основе конфигурации
function createValidationFunction(schema) {
  // Генерация кода функции валидации на основе схемы
  let code = "function validate(data) {\n"
  code += "  const errors = [];\n"

  // Генерация проверок полей
  for (const field in schema) {
    const rules = schema[field]

    code += `  // Валидация поля "${field}"\n`

    // Обязательное поле
    if (rules.required) {
      code += `  if (!data.hasOwnProperty('${field}') || data.${field} === null || data.${field} === undefined) {\n`
      code += `    errors.push('Поле "${field}" обязательно');\n`
      code += "  } else {\n"

      // Тип
      if (rules.type) {
        code += `    if (typeof data.${field} !== '${rules.type}') {\n`
        code += `      errors.push('Поле "${field}" должно быть типа ${rules.type}');\n`
        code += "    }\n"
      }

      // Минимальная длина
      if (rules.minLength) {
        code += `    if (data.${field}.length < ${rules.minLength}) {\n`
        code += `      errors.push('Поле "${field}" должно содержать не менее ${rules.minLength} символов');\n`
        code += "    }\n"
      }

      // Проверка значения
      if (rules.min !== undefined) {
        code += `    if (data.${field} < ${rules.min}) {\n`
        code += `      errors.push('Поле "${field}" должно быть не менее ${rules.min}');\n`
        code += "    }\n"
      }

      if (rules.max !== undefined) {
        code += `    if (data.${field} > ${rules.max}) {\n`
        code += `      errors.push('Поле "${field}" должно быть не более ${rules.max}');\n`
        code += "    }\n"
      }

      // Пользовательская проверка через регулярное выражение
      if (rules.pattern) {
        code += `    if (!/${rules.pattern}/.test(data.${field})) {\n`
        code += `      errors.push('Поле "${field}" не соответствует формату');\n`
        code += "    }\n"
      }

      code += "  }\n"
    }
  }

  code += "  return errors;\n"
  code += "}\n"
  code += "return validate;"

  // Компиляция и выполнение
  const context = {}
  vm.createContext(context)
  return vm.runInContext(code, context)
}

// Пример использования
const userSchema = {
  username: {
    required: true,
    type: "string",
    minLength: 3,
    pattern: "^[a-zA-Z0-9_]+$",
  },
  age: {
    required: true,
    type: "number",
    min: 18,
    max: 120,
  },
  email: {
    required: true,
    type: "string",
    pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
  },
}

const validateUser = createValidationFunction(userSchema)

// Тестирование функции
const user1 = {
  username: "john_doe",
  age: 25,
  email: "john@example.com",
}

const user2 = {
  username: "ab",
  age: 15,
  email: "not-an-email",
}

console.log("Ошибки для user1:", validateUser(user1))
// Вывод: Ошибки для user1: []

console.log("Ошибки для user2:", validateUser(user2))
// Вывод: Ошибки для user2: [
//   'Поле "username" должно содержать не менее 3 символов',
//   'Поле "age" должно быть не менее 18',
//   'Поле "email" не соответствует формату'
// ]
```

## Заключение

Модуль `vm` в Node.js предоставляет мощный инструмент для изолированного выполнения JavaScript-кода, который может быть полезен во множестве сценариев - от создания DSL и шаблонизаторов до систем плагинов и безопасного выполнения пользовательского кода.

Однако важно помнить об ограничениях этого модуля в плане безопасности. Для критически важных приложений, требующих полной изоляции, рекомендуется использовать более надежные подходы, такие как отдельные процессы или специализированные библиотеки.

---

[[002 Node.js|Назад]]
