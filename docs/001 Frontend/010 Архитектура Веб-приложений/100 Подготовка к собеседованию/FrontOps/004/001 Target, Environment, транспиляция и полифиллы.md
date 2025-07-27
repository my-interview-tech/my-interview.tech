# Target, Environment, транспиляция и полифиллы

## Введение

В современной веб-разработке код может выполняться в различных окружениях, каждое из которых имеет свои особенности и ограничения.

## Environment vs Target

### Environment (Окружение выполнения)

Environment определяет, где физически будет выполняться JavaScript код:

- **Browser** (Chrome, Safari, Firefox, Edge)
- **Server** (Node.js, Deno, Bun)
- **Desktop** (Electron, Tauri)
- **Browser Extension** (расширения браузера)
- **Microcontrollers** (Espruino)
- **Web/Service Worker** (фоновые скрипты)

### Target (Цель сборки)

Target — это настройка сборщика, определяющая, для какого окружения оптимизируется код. По умолчанию большинство сборщиков настроены на Browser.

## Проблемы совместимости

Каждое окружение имеет свои особенности:

1. **Разная поддержка возможностей языка**
2. **Различные API и глобальные объекты**
3. **Ограничения безопасности**
4. **Производительность**

## Адаптация кода под окружение

### Транспайлинг

**Транспайлинг** — это преобразование исходного кода в код того же уровня абстракции (например, ES2022 → ES5).

#### Отличие от компиляции

- **Компиляция**: перевод в язык более низкого уровня (C++ → машинный код)
- **Транспайлинг**: перевод в код того же уровня (TypeScript → JavaScript)

#### AST (Abstract Syntax Tree)

AST — это древовидное представление структуры кода. Используется для:

- Транспайлинга
- Трансформеров (ts-morph)
- Миграций (jscodeshift)
- Линтеров (ESLint)
- Сборщиков (Webpack)
- Tree shaking

#### Популярные транспайлеры

**Babel**

```js
// До транспайлинга
const user = {
  name: "John",
  age: 30,
}

const { name, age } = user
const greeting = `Hello, ${name}!`

// После транспайлинга (ES5)
var user = {
  name: "John",
  age: 30,
}

var name = user.name,
  age = user.age
var greeting = "Hello, " + name + "!"
```

**SWC** (написан на Rust, быстрее Babel)

```js
// Конфигурация SWC
{
  "jsc": {
    "parser": {
      "syntax": "ecmascript",
      "jsx": true
    },
    "target": "es2015"
  }
}
```

**TypeScript Compiler (tsc)**

```json
{
  "compilerOptions": {
    "target": "ES2015",
    "module": "ESNext",
    "strict": true
  }
}
```

**Esbuild** (самый быстрый)

```js
// Конфигурация esbuild
esbuild.build({
  entryPoints: ["src/index.js"],
  bundle: true,
  target: ["es2015"],
  outfile: "dist/bundle.js",
})
```

### Полифиллы

**Полифилл** — это код, реализующий функциональность, которая не поддерживается в данном окружении.

#### Когда нужен полифилл?

```js
// ES2022 - Promise.try (не поддерживается в старых браузерах)
Promise.try(() => {
  return fetch("/api/data")
})

// ES2020 - BigInt (не поддерживается в IE)
let bigNumber = BigInt(100)

// ES2019 - IntersectionObserver (не поддерживается в старых браузерах)
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      console.log("Element is visible")
    }
  })
})
```

#### Как написать полифилл?

```js
// Полифилл для Promise.try
if (!Promise.try) {
  Promise.try = function (fn) {
    try {
      return Promise.resolve(fn())
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

// Полифилл для String.prototype.toWellFormed
if (!String.prototype.toWellFormed) {
  String.prototype.toWellFormed = function () {
    return this.replace(/[\uD800-\uDFFF]/g, "\uFFFD")
  }
}
```

#### Ponyfill vs Polyfill

**Polyfill** — модифицирует глобальный объект:

```js
// Polyfill - monkey patch
Number.isNaN ??= function (value) {
  return value !== value
}

Number.isNaN(5) // false
```

**Ponyfill** — предоставляет функцию без модификации глобального объекта:

```js
// Ponyfill - use instead of native
function isNaNPonyfill(value) {
  return value !== value
}

isNaNPonyfill(5) // false
```

## Определение Target

### Проблемы с ES Version

Использование ES версий как target имеет недостатки:

1. **Неоднородность поддержки** фич в разных окружениях
2. **Нет прямой связи** между ES версией и поддержкой в браузерах
3. **Сложность определения** реальной поддержки

### Browserlist — современный подход

Browserlist — это конфигурация, описывающая target сборки:

```json
{
  "browserslist": ["> 1%", "last 2 versions", "not dead", "not ie 11"]
}
```

Или в package.json:

```json
{
  "browserslist": ["defaults", "not IE 11"]
}
```

## Автоматизация полифиллов

### useBuiltIns в Babel

```js
// babel.config.js
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "entry", // Подключает все полифиллы для target
        corejs: 3,
      },
    ],
  ],
}
```

```js
// babel.config.js
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "usage", // Подключает только используемые полифиллы
        corejs: 3,
      },
    ],
  ],
}
```

### Core-js

Основная библиотека полифиллов:

```js
// core-js - модифицирует глобальные объекты
import "core-js/stable"
import "regenerator-runtime/runtime"

// core-js-pure - не модифицирует глобальные объекты
import isNaN from "core-js-pure/features/number/is-nan"

// core-js-compact - оптимизированная версия
import "core-js/compact"
```

## Производительность

### Влияние транспайлинга и полифиллов

1. **Увеличение размера бандла**
2. **Снижение производительности** (трансформированный код медленнее нативного)
3. **Блокирующая загрузка** и инициализация
4. **Чем старше target**, тем более радикальные изменения

### Оптимизация

```js
// Пример оптимизации с условной загрузкой полифиллов
if (!window.IntersectionObserver) {
  // Загружаем полифилл только при необходимости
  import("./polyfills/intersection-observer.js")
}
```

## Специфика окружений

### Browser

Самый сложный target для сборки:

```js
// Варианты модульной системы
// 1. Собственный рантайм + JSONP
// 2. System.js
// 3. Require.js (fetch + eval)
// 4. Нативный ESM
```

### Node.js

Полный контроль над окружением:

```js
// package.json
{
  "type": "module", // ES Modules
  "main": "index.js"
}
```

### Desktop (Electron)

```js
// Контроль над Node.js + фиксированная версия Chromium
// То же, что и Node.js + дополнительные возможности браузера
```

### Browser Extension

Строгие ограничения безопасности:

```js
// manifest.json
{
  "content_security_policy": {
    "extension_pages": "script-src 'self'; object-src 'self'"
  }
}
```

### Service Worker

```js
// Ограниченный доступ к API браузера
// Лучше использовать понифиллы
// Бандлинг всех зависимостей
```

## CSS транспайлинг

### PostCSS

```js
// postcss.config.js
module.exports = {
  plugins: [
    require("postcss-preset-env")({
      stage: 3,
      features: {
        "nesting-rules": true,
        "custom-media-queries": true,
      },
    }),
  ],
}
```

### Lightning CSS

Современная альтернатива PostCSS, написанная на Rust:

```js
// lightningcss.config.js
module.exports = {
  targets: {
    chrome: 80,
    safari: 13,
    firefox: 75,
  },
  include: ["**/*.css"],
  exclude: ["node_modules/**/*"],
}
```

## Сравнение транспайлеров

| Транспайлер | Преимущества                                         | Недостатки                       |
| ----------- | ---------------------------------------------------- | -------------------------------- |
| **Babel**   | Большое количество плагинов, preset-env, browserlist | Медленный (pure JS)              |
| **SWC**     | Быстрый (Rust), preset-env, browserlist              | Меньше плагинов, баги в usage    |
| **tsc**     | Нативная поддержка TypeScript                        | Только ES target, нет полифиллов |
| **Esbuild** | Самый быстрый                                        | Ограниченная конфигурация        |

## Практические примеры

### Настройка Babel для разных окружений

```js
// babel.config.js
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          browsers: ["> 1%", "last 2 versions"],
          node: "current",
        },
        useBuiltIns: "usage",
        corejs: 3,
      },
    ],
  ],
}
```

### Динамическая загрузка полифиллов

```js
// polyfills.js
async function loadPolyfills() {
  const polyfills = []

  if (!window.Promise) {
    polyfills.push(import("core-js/features/promise"))
  }

  if (!window.fetch) {
    polyfills.push(import("whatwg-fetch"))
  }

  if (!window.IntersectionObserver) {
    polyfills.push(import("intersection-observer"))
  }

  await Promise.all(polyfills)
}

// Загружаем полифиллы перед инициализацией приложения
loadPolyfills().then(() => {
  // Инициализация приложения
})
```

## Заключение

Правильный выбор target и environment, а также грамотное использование транспайлинга и полифиллов — ключевые аспекты современной фронтенд-разработки. Понимание этих концепций позволяет создавать эффективные и совместимые приложения для различных платформ.

## Полезные инструменты

- [AST Explorer](https://astexplorer.net/) — интерактивный просмотр AST
- [Can I Use](https://caniuse.com/) — проверка поддержки браузерами
- [Browserslist](https://browsersl.ist/) — генератор browserlist
- [Core-js](https://github.com/zloirock/core-js) — библиотека полифиллов
