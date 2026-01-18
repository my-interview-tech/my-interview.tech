---
uid: JeAgSC9cf80szEhEjnFb1
title: Тестирование с помощью Vitest
tags:
  - "#testing"
  - "#vitest"
  - "#viteJS"
info:
  - "https://habr.com/ru/articles/664350/"
draft: false
technology: "Jest, RTL"
specialty: Frontend
tools: []
order: 0
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

## Вступление

Vitest — это новая среда тестирования на базе viteJS. Он все еще находится в разработке, и некоторые функции могут быть еще не готовы, но это хорошая альтернатива, которую можно попробовать и изучить.

## Настройка

Давайте создадим новый проект Vite!

Примечание. Для работы Vitest требуется Vite >= v2.7.10 и Node >= v14.

```bash
npm init vite@latest

✔ Project name: · try-vitest
✔ Select a framework: · svelte
✔ Select a variant: · svelte-ts

cd try-vitest
npm install //use the package manager you prefer
npm run dev
```

Теперь, когда наш проект создан, нам нужно установить все зависимости, необходимые для работы Vitest.

```bash
npm i -D vitest jsdom
```

Я добавил jsdom, чтобы иметь возможность мокать DOM API. По умолчанию Vitest будет использовать конфигурацию из vite.config.ts. Я добавлю в неё один плагин для svelte. Отключение hot module replacement при выполнении тестов.

Это должно выглядеть следующим образом:

```tsx
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
  plugins: [svelte({ hot: !process.env.VITEST })],
});
```

Я использую переменную env VITEST, чтобы разделить окружение тестов и разработки, но если ваша конфигурация слишком отличается, вы можете использовать другой файл конфигурации для тестов. Есть несколько вариантов сделать это.

- Создайте файл конфигурации с именем vitest.config.ts: он будет иметь приоритет при запуске тестов.
- Использование флага --config: используйте его как `npx vitest --config <path_to_file>`

## Написание тестов

Давайте напишем несколько тестов для компонента Counter, созданного по умолчанию в нашем проекте.

```tsx

<script lang="ts">
  let count: number = 0
  const increment = () => {
    count += 1
  }
</script>

<button on:click={increment}>
  Clicks: {count}
</button>

<style>
  button {
    font-family: inherit;
    font-size: inherit;
    padding: 1em 2em;
    color: #ff3e00;
    background-color: rgba(255, 62, 0, 0.1);
    border-radius: 2em;
    border: 2px solid rgba(255, 62, 0, 0);
    outline: none;
    width: 200px;
    font-variant-numeric: tabular-nums;
    cursor: pointer;
  }

  button:focus {
    border: 2px solid #ff3e00;
  }

  button:active {
    background-color: rgba(255, 62, 0, 0.2);
  }
</style>
```

Чтобы написать наш первый набор тестов, давайте создадим файл с именем Counter.spec.ts рядом с нашим компонентом.

```tsx
// @vitest-environment jsdom
import { tick } from "svelte";
import { describe, expect, it } from "vitest";
import Counter from "./Counter.svelte";

describe("Counter component", function () {
  it("creates an instance", function () {
    const host = document.createElement("div");
    document.body.appendChild(host);
    const instance = new Counter({ target: host });
    expect(instance).toBeTruthy();
  });

  it("renders", function () {
    const host = document.createElement("div");
    document.body.appendChild(host);
    new Counter({ target: host });
    expect(host.innerHTML).toContain("Clicks: 0");
  });

  it("updates count when clicking a button", async function () {
    const host = document.createElement("div");
    document.body.appendChild(host);
    new Counter({ target: host });
    expect(host.innerHTML).toContain("Clicks: 0");
    const btn = host.getElementsByTagName("button")[0];
    btn.click();
    await tick();
    expect(host.innerHTML).toContain("Clicks: 1");
  });
});
```

Добавление строки комментария `@vitest-environment jsdom` вверху файла позволит нам мокать DOM API для всех тестов в файле. Этого можно избежать в каждом файле с помощью файла конфигурации. Мы также можем удостовериться, что мы импортируем `describe`, `it`, `expect` глобально. Делаем это тоже через конфигурационный файл. Также нам нужно сделать типы доступными, добавив типы `vitest/globals` в ваш файл tsconfig.json (вы можете пропустить это, если не используете TypeScript).

```tsx
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
  plugins: [svelte({ hot: !process.env.VITEST })],
  test: {
    globals: true,
    environment: "jsdom",
  },
});
```

```json
{
  "extends": "@tsconfig/svelte/tsconfig.json",
  "compilerOptions": {
    "target": "esnext",
    "useDefineForClassFields": true,
    "module": "esnext",
    "resolveJsonModule": true,
    "baseUrl": ".",
    "allowJs": true,
    "checkJs": true,
    /**
     *Add the next line if using globals
     */
    "types": ["vitest/globals"]
  },
  "include": ["src/**/*.d.ts", "src/**/*.ts", "src/**/*.js", "src/**/*.svelte"]
}
```

Теперь нашим тестовым файлам не нужно импортировать глобальные переменные, и мы можем удалить настройку среды jsdom.

```tsx
import { tick } from "svelte";
import Counter from "./Counter.svelte";

describe("Counter component", function () {
  // tests are the same
});
```

## Команды

Есть четыре команды для запуска из cli:

- `dev`: запустить vitest в режиме разработки
- `related`: запускает тесты для списка исходных файлов
- `run`: запустить тесты один раз
- `watch`: режим по умолчанию, такой же, как при запуске vitest. Наблюдает за изменениями, а затем повторно запускает тесты.

### Модификаторы тестов

Существуют модификаторы для тестов, которые изменят способ выполнения ваших тестов.

- .only сосредоточится на одном или нескольких тестах, пропустив остальные
- .skip пропустит указанный тест
- .todo пометит тест, которq будtn реализован позже
- .concurrently будет запускать непрерывные тесты, помеченные как concurrent параллельно. Этот модификатор можно комбинировать с предыдущими. Например: `it.concurrently.todo("сделать что-то асинхронное")`

## Assertions

Vitest поставляется с assertions, совместимыми с chai и jest

```tsx
expect(true).toBeTruthy(); //ok
expect(1).toBe(Math.sqrt(4)); // false
```

Список доступных assertions см. в [документации по API](https://vitest.dev/api/#expect).

## Покрытие

Для отчетов о покрытии нам нужно будет установить [c8](https://github.com/bcoe/c8) и запустить тесты с флагом `--coverage`.

```tsx
npm i -D c8

npx vitest --coverage
```

Это даст нам хороший отчет о покрытии.

![](https://habrastorage.org/r/w1560/getpro/habr/upload_files/74e/347/009/74e347009b7cc5eb5c5a1e1b7f54af55.png)

Папка coverage будет создана в корне проекта. Вы можете указать желаемый тип вывода в файле конфигурации.

```tsx
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte({ hot: !process.env.VITEST })],
  test: {
    globals: true,
    environment: "jsdom",
    coverage: {
      reporter: ["text", "json", "html"], // change this property to the desired output
    },
  },
});
```

## UI

Вы также можете запустить vitest с помощью пользовательского интерфейса, который поможет вам визуализировать выполняемые тесты и их результаты. Давайте установим необходимый пакет и запустим его с флагом --ui.

```bash
npm i -D @vitest/ui

npx vitest --ui
```

Мне нравится этот интерфейс. Он даже позволяет вам прочитать код тестов и открыть его в редакторе.

![](https://habrastorage.org/r/w1560/getpro/habr/upload_files/4d7/eee/bb7/4d7eeebb7da1c44905b102d4532e23c1.png)

## Больше возможностей

Vitest поставляется со многими другими функциями, такими как тестирование снепшотами, мокинг, фальшивые таймеры и многое другое, что вы можете знать из других библиотек тестирования.

## Переход на Vitest (из проекта Vite с использованием jest)

Если вы работаете над небольшим проектом или только начинаете его, вам может потребоваться адаптировать файл конфигурации, и на этом все. Если вы используете мокинг функции, Vitest использует TinySpy, а для фальшивых таймеров — @sinonjs/fake-timers. Проверьте совместимость. Кроме того, не забудьте импортировать {vi} из vitest, если вы будете его использовать. Еще одна вещь, которую вам может понадобиться настроить, — это установочный файл. Например, чтобы использовать сопоставители jest-dom, мы можем создать установочный файл.

```tsx
import "@testing-library/jest-dom";
```

и объявим его в нашем конфигурационном файле.

```tsx
export default defineConfig(({ mode }) => ({
  // ...
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["<PATH_TO_SETUP_FILE>"],
  },
}));
```

[Вот](https://github.com/vuejs/vitepress/commit/17aaaf0180972b71d0a5369c95a48209e9cbaa01) пример миграции [VitePress](https://vitepress.vuejs.org/) на Vitest. (Есть некоторые изменения в ts-config, но вы можете увидеть, где добавлен vitest, и файл vitest.config.ts)

## Последние мысли

Несмотря на то, что Vitest все еще находится в разработке, он выглядит очень многообещающе, и тот факт, что они сохранили API, очень похожий на Jest, делает миграцию очень плавной. Он также поставляется с поддержкой TypeScript (без пакета внешних типов). Использование одного и того же файла конфигурации (по умолчанию) позволяет очень быстро сосредоточиться на написании тестов. Я с нетерпением жду v1.0.0
