---
title: Как установить переменную окружения NODE_ENV в production
draft: false
tags:
  - "#NodeJS"
  - "#переменные-окружения"
  - "#NODE_ENV"
  - "#production"
  - "#оптимизация"
info:
  - "[Документация Node.js process.env](https://nodejs.org/api/process.html#processenv)"
  - "[Влияние NODE_ENV на Express.js](https://expressjs.com/en/advanced/best-practice-performance.html#set-node_env-to-production)"
  - "[Документация dotenv](https://www.npmjs.com/package/dotenv)"
---

Установка `NODE_ENV=production` является важным шагом для оптимизации производительности Node.js приложений. В production-режиме многие фреймворки (например, Express, React) автоматически применяют оптимизации, кэширование и отключают отладочную информацию.

## Способы установки NODE_ENV в production

### 1. Через командную строку (временно)

#### В Linux/macOS:

```bash
NODE_ENV=production node app.js
```

#### В Windows (cmd):

```bash
set NODE_ENV=production
node app.js
```

#### В Windows (PowerShell):

```bash
$env:NODE_ENV="production"
node app.js
```

### 2. В package.json

Добавьте соответствующие скрипты в package.json:

```json
{
  "scripts": {
    "start": "NODE_ENV=production node app.js",
    "start:win": "set NODE_ENV=production && node app.js"
  }
}
```

Затем запустите:

```bash
npm run start
```

### 3. Кросс-платформенное решение с cross-env

Установите пакет cross-env:

```bash
npm install cross-env --save-dev
```

Настройте скрипт в package.json:

```json
{
  "scripts": {
    "start": "cross-env NODE_ENV=production node app.js"
  }
}
```

### 4. Через файлы .env

Создайте файл `.env` в корне проекта:

```
NODE_ENV=production
```

Установите пакет dotenv:

```bash
npm install dotenv --save
```

В начале вашего приложения:

```javascript
require("dotenv").config()
console.log(process.env.NODE_ENV) // 'production'
```

### 5. Использование PM2

Если вы используете PM2 для управления процессами:

```bash
pm2 start app.js --env production
```

Или в файле конфигурации `ecosystem.config.js`:

```javascript
module.exports = {
  apps: [
    {
      name: "app",
      script: "app.js",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
}
```

И затем:

```bash
pm2 start ecosystem.config.js --env production
```

### 6. Установка на системном уровне

#### В Linux/macOS (bash):

```bash
echo 'export NODE_ENV=production' >> ~/.bashrc
source ~/.bashrc
```

#### В Windows (системные переменные):

1. Правый клик на Мой компьютер > Свойства > Дополнительные параметры системы
2. Вкладка "Дополнительно" > кнопка "Переменные среды"
3. Создайте новую переменную: имя - NODE_ENV, значение - production

## Проверка установленного значения

Чтобы убедиться, что `NODE_ENV` установлено корректно:

```javascript
console.log("NODE_ENV:", process.env.NODE_ENV)
```

## Влияние NODE_ENV=production

- **Express.js**: включает кэширование шаблонов, отключает подробные сообщения об ошибках
- **React**: отключает проверки и предупреждения, минимизирует код
- **Webpack**: применяет оптимизации сборки и минимизацию
- **Jest**: изменяет поведение тестов и окружения

## Примечание о безопасности

Убедитесь, что критические данные (пароли, ключи API) не хранятся в файлах `.env`, которые могут быть добавлены в систему контроля версий. Используйте `.env.example` для примера и `.gitignore` для исключения настоящих `.env` файлов из репозитория.

---

[[002 Node.js|Назад]]
