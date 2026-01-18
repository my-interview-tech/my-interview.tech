---
uid: 0otudH6FnCpKSz2P4rros
title: Как вы управляете globalSetup и globalTeardown в Jest?
tags:
  - testing
  - Jest
  - globalSetup
  - globalTeardown
info:
  - >-
    https://medium.com/@vitor.vicen.te/setting-up-jest-js-for-a-vite-ts-js-react-project-the-ultimate-guide-7816f4c8b738
draft: false
technology: "Jest, RTL"
specialty: Frontend
tools: []
order: 31
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

В Jest, `globalSetup` и `globalTeardown` — это специальные методы, которые позволяют выполнять действия до начала всех тестов и после их завершения соответственно. Эти методы полезны для инициализации глобальных ресурсов, таких как базы данных, или для очистки ресурсов после завершения всех тестов.

1. **Создание файлов для `globalSetup` и `globalTeardown`:**
   Сначала создайте отдельные файлы для каждого метода. Например, файл `./jest.globalSetup.js` может содержать ваш код инициализации, а файл `./jest.globalTeardown.js` — код очистки ресурсов.
   Пример содержимого файла `./jest.globalSetup.js`:

```javascript
module.exports = async () => {
  // Код инициализации, который будет выполнен перед всеми тестами
  console.log("Выполняется globalSetup");
};
```

Пример содержимого файла `./jest.globalTeardown.js`:

```javascript
module.exports = async () => {
  // Код очистки, который будет выполнен после всех тестов
  console.log("Выполняется globalTeardown");
};
```

2. **Указание путей к файлам в конфигурации Jest:**
   Затем укажите пути к этим файлам в конфигурации Jest. Конфигурация обычно находится в файле `package.json` или `jest.config.js`.
   Пример конфигурации в `jest.config.js`:

```javascript
module.exports = {
  globalSetup: "./jest.globalSetup.js",
  globalTeardown: "./jest.globalTeardown.js",
};
```

Пример конфигурации в `package.json`:

```json
{
  "jest": {
    "globalSetup": "./jest.globalSetup.js",
    "globalTeardown": "./jest.globalTeardown.js"
  }
}
```

3. **Использование `globalSetup` и `globalTeardown`:**

   - **`globalSetup`**: Эта функция должна экспортировать асинхронную функцию, которая возвращает Promise. Эта функция будет вызвана один раз перед запуском всех тестовых наборов (test suites).
   - **`globalTeardown`**: Эта функция аналогична `globalSetup`, но вызывается один раз после завершения всех тестовых наборов.

\*\*Пример использования

Предположим, у вас есть база данных, которую нужно инициализировать перед запуском всех тестов и закрыть после их завершения.

**jest.globalSetup.js:**

```javascript
const { setupDatabase } = require("./database");

module.exports = async () => {
  await setupDatabase();
  console.log("База данных инициализирована");
};
```

**jest.globalTeardown.js:**

```javascript
const { closeDatabase } = require("./database");

module.exports = async () => {
  await closeDatabase();
  console.log("База данных закрыта");
};
```

**jest.config.js:**

```javascript
module.exports = {
  globalSetup: "./jest.globalSetup.js",
  globalTeardown: "./jest.globalTeardown.js",
};
```

---

[[007 Jest, RTL|Назад]]
