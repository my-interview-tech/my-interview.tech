---
uid: lraVKQFxYvXeApnPh0LMY
title: Карманная книга по TS. Часть 8. Модули
tags:
  - TypeScript
info:
  - "https://habr.com/ru/companies/macloud/articles/563722/"
draft: false
technology: TypeScript
specialty: Frontend
tools: []
order: 0
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

# Определение модуля

В `TS`, как и в `ECMAScript2015`, любой файл, содержащий `import` или `export` верхнего уровня (глобальный), считается модулем.

Файл, не содержащий указанных ключевых слов, является глобальным скриптом.

Модули выполняются в собственной области видимости, а не в глобальной. Это означает, что переменные, функции, классы и т.д., объявленные в модуле, недоступны за пределами модуля до тех пор, пока они в явном виде не будут из него экспортированы. Кроме того, перед использованием экспортированных сущностей, их следует импортировать в соответствующий файл.

# Не модули

Для начала, давайте разберемся, что `TS` считает модулем. Спецификация `JS` определяет, что любой файл без `export` или `await` верхнего уровня является скриптом, а не модулем.

Переменные и типы, объявленные в скрипте, являются глобальными (имеют глобальную область видимости), для объединения нескольких файлов на входе в один на выходе следует использовать либо настроку компилятора `outFile`, либо несколько элементов `script` в разметке (указанных в правильном порядке).

Если у нас имеется файл, который не содержит `import` или `export`, но мы хотим, чтобы этот файл считался модулем, просто добавляем в него такую строку:

```
export {}
```

# Модули в `TS`

Существует 3 вещи, на которые следует обращать внимание при работе с модулями в `TS`:

- Синтаксис: какой синтаксис я хочу использовать для импорта и экспорта сущностей?
- Разрешение модулей: каковы отношения между названиями модулей (или их путями) и файлами на диске?
- Результат: на что должен быть похож код модуля?

## Синтаксис

Основной экспорт в файле определяется с помощью `export default`:

```
// @filename: hello.ts
export default function helloWorld() {
  console.log('Привет, народ!')
}
```

Затем данная функция импортируется следующим образом:

```
import hello from './hello.js'
hello()
```

В дополнению к экспорту по умолчанию, из файла может экспортироваться несколько переменных и функций с помощью `export` (без `default`):

```
// @filename: maths.ts
export var pi = 3.14
export let squareTwo = 1.41
export const phi = 1.61

export class RandomNumberGenerator {}

export function absolute(num: number) {
  if (num < 0) return num * -1
  return num
}
```

Указанные сущности импортируются так:

```
import { pi, phi, absolute } from './maths.js'

console.log(pi)
const absPhi = absolute(phi)
  // const absPhi: number
```

## Дополнительный синтаксис импорта

Название импортируемой сущности можно менять с помощью `import { old as new }`:

```
import { pi as π } from './maths.js'

console.log(π)
        /*
          (alias) var π: number
          import π
        */
```

Разные способы импорта можно смешивать:

```
// @filename: maths.ts
export const pi = 3.14
export default class RandomNumberGenerator {}

// @filename: app.ts
import RNGen, { pi as π } from './maths.js'

RNGen
/*
  (alias) class RNGen
  import RNGen
*/

console.log(π)
/*
  (alias) const π: 3.14
  import π
*/
```

Все экспортированные объекты при импорте можно поместить в одно пространство имен с помощью `* as name`:

```
// @filename: app.ts
import * as math from './maths.js'

console.log(math.pi)
const positivePhi = math.absolute(math.phi)
  // const positivePhi: number
```

Файлы можно импортировать без указания переменных:

```
// @filename: app.ts
import './maths.js'

console.log('3.14')
```

В данном случае `import` ничего не делает. Тем не менее, весь код из `maths.ts` вычисляется (оценивается), что может привести к запуску побочных эффектов, влияющих на другие объекты.

### Специфичный для `TS` синтаксис модулей

Типы могут экспортироваться и импортироваться с помощью такого же синтаксиса, что и значения в `JS`:

```
// @filename: animal.ts
export type Cat = { breed: string, yearOfBirth: number }

export interface Dog {
  breeds: string[]
  yearOfBirth: number
}

// @filename: app.ts
import { Cat, Dog } from './animal.js'
type Animals = Cat | Dog
```

`TS` расширяет синтаксис `import` с помощью `import type`, что позволяет импортировать только типы.

```
// @filename: animal.ts
export type Cat = { breed: string, yearOfBirth: number }
// 'createCatName' cannot be used as a value because it was imported using 'import type'.
// 'createCatName' не может использоваться в качестве значения, поскольку импортируется с помощью 'import type'
export type Dog = { breeds: string[], yearOfBirth: number }
export const createCatName = () => 'fluffy'

// @filename: valid.ts
import type { Cat, Dog } from './animal.js'
export type Animals = Cat | Dog

// @filename: app.ts
import type { createCatName } from './animal.js'
const name = createCatName()
```

Такой импорт сообщает транспиляторам, вроде `Babel`, `swc` или `esbuild`, какой импорт может быть безопасно удален.

### Синтаксис `ES-модулей` с поведением `CommonJS`

Синтаксис `ES-модулей` в `TS` напрямую согласуется с `CommonJS` и `require` из `AMD`. Импорт с помощью `ES-модулей` в большинстве случаев представляет собой тоже самое, что `require` в указанных окружениях, он позволяет обеспечить полное совпадение `TS-файла` с результатом `CommonJS`:

```
import fs = require('fs')
const code = fs.readFileSync('hello.ts', 'utf8')
```

# Синтаксис `CommonJS`

`CommonJS` — это формат, используемый большинством `npm-пакетов`. Даже если вы используете только синтаксис `ES-модулей`, понимание того, как работает `CommonJS`, поможет вам в отладке приложений.

## Экспорт

Идентификаторы экпортируются посредством установки свойства `exports` глобальной переменной `module`:

```
function absolute(num: number) {
  if (num < 0) return num * -1
  return num
}

module.exports = {
  pi: 3.14,
  squareTwo: 1.41,
  phi: 1.61,
  absolute
}
```

Затем эти файлы импортируются с помощью инструкции `require`:

```
const maths = require('maths')
maths.pi
  // any
```

В данном случае импорт можно упростить с помощью деструктуризации:

```
const { squareTwo } = require('maths')
squareTwo
  // const squareTwo: any
```

## Взаимодействие `CommonJS` с `ES-модулями`

Между `CommonJS` и `ES-модулями` имеется несовпадение, поскольку `ES-модули` поддерживают "дефолтный" экспорт только объектов, но не функций. Для преодоления данного несовпадения в `TS` используется флаг компиляции [`esModuleInterop`](https://www.typescriptlang.org/tsconfig#esModuleInterop).

# Настройки, связанные с разрешением модулей

Разрешение модулей — это процесс определения файла, указанного в качестве ссылки в строке из инструкции `import` или `require`.

`TS` предоставляет две стратегии разрешения модулей: классическую и `Node`. Классическая стратегия является стратегией по умолчанию (когда флаг [`module`](https://www.typescriptlang.org/tsconfig#module) имеет значение, отличное от `commonjs`) и включается для обеспечения обратной совместимости. Стратегия `Node` имитирует работу `Node.js` в режиме `CommonJS` с дополнительными проверками для `.ts` и `.d.ts`.

Существует большое количество флагов, связанных с разрешением модулей: [`moduleResolution`](https://www.typescriptlang.org/tsconfig#moduleResolution), [`baseUrl`](https://www.typescriptlang.org/tsconfig#baseUrl), [`paths`](https://www.typescriptlang.org/tsconfig#paths), [`rootDirs`](https://www.typescriptlang.org/tsconfig#rootDirs) и др.

# Настройки для результатов разрешения модулей

Имеется две настройки, которые влияют на результирующий `JS-код`:

- [`target`](https://www.typescriptlang.org/tsconfig#target) — определяет версию `JS`, в которую компилируется `TS-код`
- [`module`](https://www.typescriptlang.org/tsconfig#module) — определяет, какой код используется для взаимодействия модулей между собой

То, какую цель (target) использовать, зависит от того, в какой среде будет выполняться код (какие возможности поддерживаются этой средой). Это может включать в себя поддержку старых браузеров, более низкую версию `Node.js` или специфические ограничения, накладываемые такими средами выполнения, как, например, `Electron`.

Коммуникация между модулями происходит через загрузчик модулей (module loader), определяемый в настройке `module`. Во время выполнения загрузчик отвечает за локализацию и установку всех зависимостей модуля перед его выполнением.

Ниже приведено несколько примеров использования синтаксиса `ES-модулей` с разными настройками `module`:

```
import { valueOfPi } from './constants.js'

export const twoPi = valueOfPi * 2
```

## `ES2020`

```
import { valueOfPi } from './constants.js'
export const twoPi = valueOfPi * 2
```

## `CommonJS`

```
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.twoPi = void 0;
const constants_js_1 = require("./constants.js");
exports.twoPi = constants_js_1.valueOfPi * 2;
```

## `UMD`

```
(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined) module.exports = v;
  }
  else if (typeof define === "function" && define.amd) {
    define(["require", "exports", "./constants.js"], factory);
  }
})(function (require, exports) {
  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.twoPi = void 0;
  const constants_js_1 = require("./constants.js");
  exports.twoPi = constants_js_1.valueOfPi * 2;
});
```

# Пространства имен (namespaces)

`TS` имеет собственный модульный формат, который называется `namespaces`. Данный синтаксис имеет множество полезных возможностей по созданию сложных файлов определений и по-прежнему активно используется в [`DefinitelyTyped`](https://www.typescriptlang.org/dt/). Несмотря на то, что `namespaces` не признаны устаревшими (deprecated), большая часть его возможностей нашла воплощение в `ES-модулях`, поэтому настоятельно рекомендуется использовать официальный синтаксис.
