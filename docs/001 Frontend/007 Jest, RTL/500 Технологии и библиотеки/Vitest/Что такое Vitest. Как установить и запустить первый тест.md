---
uid: hQTs7tYhjmTE18vch0loE
title: Что такое Vitest? Как установить и запустить первый тест?
tags:
  - "#testing"
  - "#vitest"
  - "#react-testing-library"
info:
  - "[[Обзор ViteJS]]"
  - >-
    https://github.com/GizmoDevDev/vitest-tescting/blob/main/docs/basic-knowledge.md
  - >-
    https://markus.oberlehner.net/blog/using-testing-library-jest-dom-with-vitest/
  - "https://www.robinwieruch.de/vitest-react-testing-library/"
draft: false
technology: "Jest, RTL"
specialty: Frontend
tools: []
order: 0
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

![](https://www.youtube.com/watch?v=wUxu1LSmNAo)

#### keywords:

##### Тестирование React

Тестирование React будем проводить с помощью `React Testing Library`

##### Установка и базовая настройка

`yarn add -D vitest` Для установки требуется `vite`

##### Настройка vitest

Есть два способа настройки vitest:

- через vite.config.ts
- через vitest.config.ts

_В данном проекте мы рассмотрим только второй способ_

###### vitest.config.ts

Создаем файл `vitest.config.ts` со следующим содержимым

```ts
import { mergeConfig } from "vite";
import { defineConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {},
  }),
);
```

##### Запуск

- Для запуска тестов используется команда `yarn vitest`
- Для запуска проверки покрытия используется команда `yarn vitest run --coverage`

_Для работы функции coverage необходимо дополнительно установить: `yarn add -D @vitest/coverage-c8'`_

##### Настройка react-testing-library

1. `yarn add -D jsdom` устанавливаем jsdom для доступа к html в vitest
2. Добавляем в настройку vite или vitest jsdom в качестве окружения

```js
test: {
    environment: 'jsdom',
},
```

3. `yarn add -D @testing-library/react @testing-library/jest-dom` подключаем саму библиотеку `React Testing Library`
4. `yarn add -D @testing-library/user-event` добавляем библиотеку, чтобы имитировать действия пользователей
5. Создаем файл setup, чтобы не писать настройки для каждого файла отдельно со следующим содержимым:

```js
//setup.js
import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});
```

6. Дорабатываем настройки vitest:

````js
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'setup.js', // Нужно указать весь путь для файла setup.js
  },
	```
##### Основы тестирования

По умолчанию файлы для тестирования должны иметь следующий вид `**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}` Изменить его можно изменив настройки в файле `vitest.config.ts` добавив поле `include` с нужным шаблоном.

Основные ключевые слова

- describe - позволяет объединить тесты по какому-либо признаку
- it - функция, описывающая один тест
- expect - функция, проверяющая ожидаемое значение с реальным

Пример использования

```ts
//isSortedDescendant.test.ts
import { describe, it, expect } from "vitest";
import { isSortedDescendant } from "./isSortedDescendant";

describe('isSortedDescendant tests', () => {
  it('expect true', () => {
    const array = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
    expect(isSortedDescendant(array)).toBeTruthy();
  })

  it('expect false', () => {
    const array = [10, 90, 8, 7, 6, 5, 4, 3, 2, 1];
    expect(isSortedDescendant(array)).toBeFalsy();
  })
})
````

###### [](https://github.com/GizmoDevDev/vitest-tescting/blob/main/docs/basic-knowledge.md#%D0%B2%D0%BE%D0%B7%D0%BC%D0%BE%D0%B6%D0%BD%D0%BE%D1%81%D1%82%D0%B8-expect)Возможности **_expect_**

После `expect(testingValue)` через точку нужно указать одну из следующих функций для сравнения

- toBeTruthy() - `testingValue` любое кроме `false`, `0`, `''`, `null`, `undefined` и `NaN`
- toBeFalsy() - `testingValue` равно одному из следующих значений`false`, `0`, `''`, `null`, `undefined` и `NaN`
- toBe(actualValue) | to.equal(actualValue) - `testingValue` равно `actualValue`
- not.toBe(actualValue) | not.to.equal(actualValue) - `testingValue` не равно `actualValue`
- toBeCloseTo(actualValue, decimal)
- toMatchObject(actualValue) - позволяет сравнивать объекты неполным вхождением
- toThrowError() - проверяет, что было выброшено исключение
- resolves() rejects() - проверяет, что промис завершился с указанным статусом
- arrayContaining(actualValue) - проверяет, что в массиве ест ьвсе перечисленные элементы

###### [](https://github.com/GizmoDevDev/vitest-tescting/blob/main/docs/basic-knowledge.md#%D1%83%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B7%D0%B0%D0%BF%D1%83%D1%81%D0%BA%D0%B0%D0%B5%D0%BC%D1%8B%D0%BC%D0%B8-%D1%82%D0%B5%D1%81%D1%82%D0%B0%D0%BC%D0%B8)Управление запускаемыми тестами

- `describe.only` - запускает только этот блок с тестами
- `describe.skip` - не запускает это блок с тестами
- `describe.todo` - для заглушек ненаписанных тестов
- `describe.skipIf` - пропускает тест, если условие выполняется

###### [](https://github.com/GizmoDevDev/vitest-tescting/blob/main/docs/basic-knowledge.md#%D0%B4%D0%B5%D0%B9%D1%81%D1%82%D0%B2%D0%B8%D1%8F-%D0%BF%D0%B5%D1%80%D0%B5%D0%B4%D0%BF%D0%BE%D1%81%D0%BB%D0%B5-%D1%82%D0%B5%D1%81%D1%82%D0%BE%D0%B2)Действия перед/после тестов

- `beforeEach` - выполняется перед каждым тестом
- `afterEach` - выполняется после каждого теста
- `beforeAll` - выполняется один раз перед всеми тестами
- `afterAll` - выполняется один раз после всех тестов

###### [](https://github.com/GizmoDevDev/vitest-tescting/blob/main/docs/basic-knowledge.md#%D0%B4%D0%BE%D0%BF-%D0%BE%D0%BF%D1%86%D0%B8%D0%B8)Доп опции

- `describe.each` - позволяет передать набор данных, которые будут использоваться во всех тестах внутри блока

---
