---
uid: UqiJ5Lwhtv9esrLviU3A0
title: Возможно ли использовать Module Federation вместе с Remix ?
tags:
  - React
  - Remix
  - module-federation
  - esbuild
  - bundle
  - webpack
  - remix-webpack
info: []
draft: false
technology: Remix.run
specialty: Frontend
tools: []
order: 0
access: free
created_at: "2025-02-03T01:48:15+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

Да, использование `Module Federation` вместе с Remix возможно, но это не «из коробки» и требует определённой настройки сборки. По умолчанию `Remix` использует **esbuild** для бандлинга, поэтому чтобы подключить Module Federation, нужно переключиться на использование Webpack (либо внедрить дополнительную настройку поверх стандартного билда). Ниже приведён один из подходов, как это можно сделать.

---

## Подход 1. Сборка Remix с помощью Webpack и настройка Module Federation

### Шаг 1. Настройка проекта на Webpack

Remix по умолчанию не предоставляет возможности тонко настраивать конфигурацию сборки, поэтому потребуется создать собственный конфигурационный файл для Webpack или воспользоваться адаптером, который позволяет заменить esbuild на Webpack. Например, можно воспользоваться [remix-webpack](https://github.com/remix-run/remix/issues/2130) (или аналогичным решением), чтобы интегрировать Webpack в процесс сборки Remix-приложения.

### Шаг 2. Конфигурация Module Federation

После того, как вы настроили проект на использование Webpack, можно подключить Module Federation. Пример файла `webpack.config.js` для Remix-приложения может выглядеть следующим образом:

```js
// webpack.config.js

const path = require("path");
const { ModuleFederationPlugin } = require("webpack").container;
const RemixWebpackPlugin = require("remix-webpack-plugin");

// Гипотетический плагин для интеграции Remix с Webpack

module.exports = {
  mode: process.env.NODE_ENV || "development",
  entry: "./app/entry.client.tsx", // входная точка вашего Remix-приложения
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].js",
    publicPath: "auto",
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react", "@babel/preset-typescript"],
        },
      },
    ],
  },
  plugins: [
    // Плагин для сборки Remix (зависит от выбранного решения интеграции)
    new RemixWebpackPlugin({
      /* настройки, необходимые для Remix */
    }),
    // Настройка Module Federation
    new ModuleFederationPlugin({
      name: "remixApp",
      filename: "remoteEntry.js",
      exposes: {
        // Экспортируем компонент, который хотим сделать доступным для других приложений
        "./Header": "./app/components/Header.tsx",
      },
      remotes: {
        // Подключаем удалённые приложения, собранные с Module Federation
        // Например, remoteApp может быть другим микрофронтендом
        remoteApp: "remoteApp@https://example.com/remoteEntry.js",
      },
      shared: {
        react: {
          singleton: true,
          eager: true,
          requiredVersion: "^17.0.0",
        },
        "react-dom": {
          singleton: true,
          eager: true,
          requiredVersion: "^17.0.0",
        },
      },
    }),
  ],
};
```

### Шаг 3. Динамическая загрузка удалённого модуля в Remix

После настройки сборки и Module Federation можно загружать удалённые модули в компонентах Remix. Например, если вы хотите динамически загрузить компонент из другого микрофронтенда, можно сделать так:

```tsx
// app/routes/index.tsx

import React, {
  Suspense,
  lazy,
  useEffect,
  useState,
  ComponentType,
} from "react";

// Функция для динамической загрузки удалённого модуля

const loadRemoteComponent = (scope: string, module: string) => {
  // @ts-ignore
  return async () => {
    // Инициализация контейнера remoteApp

    await __webpack_init_sharing__("default");
    const container = window[scope];

    // Инициализация разделяемых модулей в контейнере

    await container.init(__webpack_share_scopes__.default);
    const factory = await container.get(module);
    const Module = factory();

    return Module;
  };
};

export default function Index() {
  const [RemoteHeader, setRemoteHeader] = useState<ComponentType | null>(null);

  useEffect(() => {
    // Загружаем компонент "Header" из remoteApp

    loadRemoteComponent("remoteApp", "./Header")().then((module: any) => {
      setRemoteHeader(() => module.default || module);
    });
  }, []);

  return (
    <div>
      <h1>Главная страница Remix</h1>
      <Suspense fallback={<div>Загрузка удалённого компонента...</div>}>
        {RemoteHeader ? <RemoteHeader /> : <div>Компонент не загружен</div>}
      </Suspense>
    </div>
  );
}
```

В этом примере используется механизм Module Federation для динамической загрузки удалённого компонента. Функция `loadRemoteComponent` инициирует обмен разделяемыми зависимостями и загружает требуемый модуль по запросу.

---

## Подход 2. Разделение приложения на микрофронтенды

Если менять сборщик Remix нецелесообразно или сложно, можно реализовать архитектуру микрофронтендов так, что часть приложения (например, отдельные страницы или компоненты) будет собираться отдельно с использованием Webpack и Module Federation, а Remix-приложение будет динамически их импортировать через стандартные механизмы загрузки модулей (например, через `import()`).

---

## Итог

- **Да, Module Federation можно использовать с Remix**, но для этого потребуется настроить сборку с использованием Webpack (либо инжектировать дополнительную конфигурацию поверх дефолтного билда).
- **Подход с Webpack**: настроить кастомный `webpack.config.js`, используя плагин ModuleFederationPlugin, и интегрировать его с процессом сборки Remix.
- **Динамическая загрузка модулей**: можно реализовать механизм загрузки удалённых компонентов непосредственно в компонентах Remix.

Выбор подхода зависит от требований вашего проекта и готовности кастомизировать сборку. Если у вас возникнут дополнительные вопросы или потребуется помощь в интеграции, дайте знать!

---

[[006 Remix.run|Назад]]
