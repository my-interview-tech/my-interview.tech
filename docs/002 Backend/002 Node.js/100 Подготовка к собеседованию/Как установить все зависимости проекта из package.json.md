---
title: Как установить все зависимости проекта из package.json
draft: false
tags:
  - "#NodeJS"
  - "#npm"
  - "#пакеты"
  - "#зависимости"
  - "#package.json"
info:
  - "[Документация npm install](https://docs.npmjs.com/cli/v9/commands/npm-install)"
  - "[Документация package.json](https://docs.npmjs.com/cli/v9/configuring-npm/package-json)"
---

Чтобы установить все зависимости проекта из файла **`package.json`**, используются различные команды в зависимости от вашего пакетного менеджера и требований.

## Основные команды для npm

### 1. Установка всех зависимостей

Самый простой способ установить все зависимости (как обычные, так и для разработки):

```bash
npm install
```

или сокращенно:

```bash
npm i
```

Эта команда установит все пакеты, перечисленные в разделах `dependencies` и `devDependencies` файла `package.json`.

### 2. Установка только production-зависимостей

Если вы хотите установить только основные зависимости (без devDependencies), например для продакшн-окружения:

```bash
npm install --production
```

или:

```bash
npm install --omit=dev
```

### 3. Установка с определенными настройками

```bash
# Установка с точными версиями (без символов ^ или ~)
npm install --save-exact

# Установка с выводом подробной информации
npm install --verbose

# Установка без добавления в package.json
npm install --no-save
```

## Для пользователей Yarn

Если вы используете Yarn вместо npm:

```bash
# Установка всех зависимостей
yarn

# Только production-зависимости
yarn --production
```

## Для пользователей pnpm

Если вы предпочитаете pnpm:

```bash
# Установка всех зависимостей
pnpm install

# Только production-зависимости
pnpm install --prod
```

## Проверка и решение проблем

### 1. Очистка кэша при проблемах с установкой

```bash
npm cache clean --force
npm install
```

### 2. Обновление npm перед установкой

```bash
npm install -g npm@latest
npm install
```

### 3. Установка с журналированием ошибок

```bash
npm install --loglevel=error > npm-errors.log
```

## Установка зависимостей в CI/CD средах

В системах непрерывной интеграции и доставки часто используют дополнительные флаги:

```bash
# Для CI-систем с кэшированием
npm ci

# Установка без запуска скриптов (для безопасности)
npm install --ignore-scripts
```

## Примеры package.json и install

Пример файла `package.json`:

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "dependencies": {
    "express": "^4.17.1",
    "mongoose": "^5.13.5"
  },
  "devDependencies": {
    "jest": "^27.0.6",
    "nodemon": "^2.0.12"
  }
}
```

После выполнения `npm install` в директории проекта, все указанные пакеты будут установлены в папку `node_modules`.

## Преимущества использования package.json

- **Стандартизация**: все зависимости в одном месте
- **Версионирование**: контроль версий пакетов
- **Портативность**: легкий перенос на другие машины
- **Совместная работа**: одинаковая среда для всех разработчиков

---

[[002 Node.js|Назад]]
