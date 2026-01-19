---
title: Что делает флаг --save-dev при установке пакета
draft: false
tags:
  - "#NodeJS"
  - "#npm"
  - "#зависимости"
  - "#devDependencies"
  - "#пакетный-менеджер"
  - "#разработка"
info:
  - https://docs.npmjs.com/cli/v9/commands/npm-install
  - https://docs.npmjs.com/specifying-dependencies-and-devdependencies-in-a-package-json-file
  - https://habr.com/ru/articles/133363/
---

# Что делает флаг --save-dev при установке пакета

Флаг `--save-dev` (или короткая форма `-D`) при установке пакета с помощью npm используется для добавления пакета в раздел `devDependencies` файла `package.json`. Это означает, что устанавливаемый пакет необходим **только на этапе разработки** и не требуется для работы приложения в продакшн-среде.

## Принцип работы флага --save-dev

### Синтаксис использования

```bash
# Длинная форма
npm install webpack --save-dev

# Короткая форма
npm install webpack -D
```

### Результат в package.json

После выполнения команды с флагом `--save-dev`, пакет добавляется в раздел `devDependencies`:

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "dependencies": {
    "express": "^4.17.1"
  },
  "devDependencies": {
    "webpack": "^5.65.0"
  }
}
```

## Различия между dependencies и devDependencies

| Характеристика                         | dependencies                              | devDependencies                           |
| -------------------------------------- | ----------------------------------------- | ----------------------------------------- |
| Назначение                             | Пакеты, необходимые для работы приложения | Пакеты, необходимые только для разработки |
| Включаются при установке в prod-режиме | ✓                                         | ✗                                         |
| Включаются при стандартной установке   | ✓                                         | ✓                                         |
| Флаг для установки                     | `--save` или `-S` (по умолчанию с npm 5+) | `--save-dev` или `-D`                     |

## Когда использовать флаг --save-dev

### 1. Инструменты сборки и компиляции

```bash
# Webpack для сборки проекта
npm install webpack webpack-cli -D

# Babel для транспиляции JavaScript
npm install @babel/core @babel/preset-env -D

# TypeScript компилятор
npm install typescript -D
```

### 2. Линтеры и форматеры кода

```bash
# ESLint для проверки качества кода
npm install eslint -D

# Prettier для форматирования кода
npm install prettier -D

# Stylelint для CSS
npm install stylelint -D
```

### 3. Утилиты для тестирования

```bash
# Jest для модульного тестирования
npm install jest -D

# Mocha и Chai для тестирования
npm install mocha chai -D

# Supertest для тестирования HTTP
npm install supertest -D
```

### 4. Инструменты разработки

```bash
# Nodemon для автоматического перезапуска приложения
npm install nodemon -D

# Локальный сервер разработки
npm install http-server -D

# Генераторы документации
npm install jsdoc -D
```

## Практические примеры использования

### Базовая настройка проекта Node.js с Express

```bash
# Устанавливаем основные зависимости
npm install express mongoose dotenv

# Устанавливаем зависимости для разработки
npm install nodemon jest supertest eslint prettier -D
```

Результат в `package.json`:

```json
{
  "name": "node-api",
  "version": "1.0.0",
  "dependencies": {
    "express": "^4.17.1",
    "mongoose": "^6.0.13",
    "dotenv": "^10.0.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.15",
    "jest": "^27.4.3",
    "supertest": "^6.1.6",
    "eslint": "^8.4.1",
    "prettier": "^2.5.1"
  },
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest",
    "lint": "eslint ."
  }
}
```

## Преимущества разделения зависимостей

### 1. Оптимизация размера продакшн-сборки

При использовании `npm install --production` или при установке зависимостей с флагом `NODE_ENV=production`, пакеты из раздела `devDependencies` не устанавливаются, что:

- Уменьшает размер директории `node_modules`
- Сокращает время установки
- Снижает размер Docker-образов

```bash
# Установка только продакшн-зависимостей
npm install --production

# или использование переменной окружения
NODE_ENV=production npm install
```

### 2. Повышение безопасности

Разделение зависимостей снижает риск уязвимостей в продакшн-среде, так как:

- Меньше пакетов — меньше потенциальных уязвимостей
- Инструменты разработки часто имеют больше зависимостей

### 3. Улучшение документации проекта

Чёткое разделение зависимостей делает структуру проекта более понятной для других разработчиков, показывая:

- Какие библиотеки используются непосредственно в коде приложения
- Какие инструменты используются в процессе разработки

## Рекомендации по организации зависимостей

1. **Используйте `--save-dev` для всех инструментов разработки**
   - Компиляторы, линтеры, инструменты тестирования
2. **Регулярно проверяйте и обновляйте devDependencies**

   ```bash
   # Проверка устаревших devDependencies
   npm outdated --dev

   # Обновление devDependencies
   npm update --dev
   ```

3. **Разделяйте скрипты для разработки и продакшна в package.json**
   ```json
   {
     "scripts": {
       "start": "node dist/server.js",
       "dev": "nodemon src/server.js",
       "build": "babel src -d dist"
     }
   }
   ```

## Заключение

Флаг `--save-dev` — это важный инструмент для организации зависимостей в Node.js проектах. Правильное разделение пакетов на основные зависимости и зависимости для разработки помогает оптимизировать размер приложения, повысить производительность и обеспечить более чистую структуру проекта.

---

[[003 JSCore|Назад]]
