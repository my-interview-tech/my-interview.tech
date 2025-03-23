---
title: Как использовать разные конфигурации для staging и production
draft: true
tags: NodeJS
info:
---
Для использования разных конфигураций в **staging** (предпродакшн) и **production** (продакшн) средах в Node.js, можно использовать несколько подходов. Основным механизмом управления конфигурациями являются переменные окружения, которые позволяют настраивать различные параметры в зависимости от среды.

Вот как можно реализовать это в Node.js:

### 1. **Использование переменных окружения**

Переменные окружения (например, `NODE_ENV`) позволяют определить, в какой среде работает приложение, и на основе этого загружать соответствующие конфигурации.

#### Шаги:

1. Установите переменную `NODE_ENV` в нужное значение:
    
    - Для **production**:
        
        bash
        
        КопироватьРедактировать
        
        `export NODE_ENV=production`
        
    - Для **staging**:
        
        bash
        
        КопироватьРедактировать
        
        `export NODE_ENV=staging`
        
2. В коде приложения можно использовать эту переменную для выбора конфигурации:
    

js

КопироватьРедактировать

`// config.js  const config = {   development: {     db: 'mongodb://localhost/dev-db',     port: 3000,     logLevel: 'debug',   },   staging: {     db: 'mongodb://localhost/staging-db',     port: 4000,     logLevel: 'info',   },   production: {     db: 'mongodb://prod-db-server/prod-db',     port: 8080,     logLevel: 'error',   }, };  // Выбираем конфигурацию в зависимости от среды const currentConfig = config[process.env.NODE_ENV || 'development'];  module.exports = currentConfig;`

1. Использование конфигурации в коде:

js

КопироватьРедактировать

``const config = require('./config');  console.log(`App running on port: ${config.port}`);``

2. Убедитесь, что в вашей продакшн среде правильно настроены переменные окружения (например, через `.env` файлы или инструменты для управления окружениями, такие как **Docker** или **Kubernetes**).

### 2. **Использование `.env` файлов (dotenv)**

С помощью пакета **dotenv** можно хранить настройки для разных сред в отдельных `.env` файлах. Это позволяет легко переключать конфигурации в разных окружениях.

#### Шаги:

3. Установите пакет **dotenv**:
    
    bash
    
    КопироватьРедактировать
    
    `npm install dotenv`
    
4. Создайте файлы конфигурации:
    
    - `.env.production`:
        
        ini
        
        КопироватьРедактировать
        
        `DB_URI=mongodb://prod-db-server/prod-db PORT=8080 LOG_LEVEL=error`
        
    - `.env.staging`:
        
        ini
        
        КопироватьРедактировать
        
        `DB_URI=mongodb://localhost/staging-db PORT=4000 LOG_LEVEL=info`
        
5. В коде загрузите конфигурацию из соответствующего файла в зависимости от среды:
    

js

КопироватьРедактировать

``require('dotenv').config({   path: `.env.${process.env.NODE_ENV || 'development'}` });  console.log(`DB URI: ${process.env.DB_URI}`); console.log(`Port: ${process.env.PORT}`); console.log(`Log Level: ${process.env.LOG_LEVEL}`);``

6. При запуске приложения задайте `NODE_ENV`:
    
    bash
    
    КопироватьРедактировать
    
    `NODE_ENV=production node app.js`
    
    Для **staging**:
    
    bash
    
    КопироватьРедактировать
    
    `NODE_ENV=staging node app.js`
    

### 3. **Использование разных конфигурационных файлов**

Иногда бывает удобно разделить конфигурации по отдельным файлам для разных сред, например, в структуре проекта могут быть файлы, такие как `config.production.js`, `config.staging.js`, и так далее.

#### Пример:

7. Создайте несколько конфигурационных файлов:
    
    - `config/production.js`
        
        js
        
        КопироватьРедактировать
        
        `module.exports = {   db: 'mongodb://prod-db-server/prod-db',   port: 8080,   logLevel: 'error', };`
        
    - `config/staging.js`
        
        js
        
        КопироватьРедактировать
        
        `module.exports = {   db: 'mongodb://localhost/staging-db',   port: 4000,   logLevel: 'info', };`
        
8. В главном файле `app.js` можно выбрать конфигурацию в зависимости от среды:
    

js

КопироватьРедактировать

``const environment = process.env.NODE_ENV || 'development'; const config = require(`./config/${environment}`);  console.log(`App running on port: ${config.port}`);``

9. Важно, чтобы в продакшн-среде была правильно настроена переменная окружения `NODE_ENV` (например, через систему управления хостингом или сервером).

### 4. **Использование сторонних библиотек для конфигурации**

Можно также использовать библиотеки, такие как **config**, которые упрощают работу с конфигурациями для разных окружений.

10. Установите библиотеку **config**:
    
    bash
    
    КопироватьРедактировать
    
    `npm install config`
    
11. Создайте структуру файлов конфигурации:
    
    - `config/default.json` (общая конфигурация):
        
        json
        
        КопироватьРедактировать
        
        `{   "db": "mongodb://localhost/dev-db",   "port": 3000,   "logLevel": "debug" }`
        
    - `config/production.json` (конфигурация для продакшн):
        
        json
        
        КопироватьРедактировать
        
        `{   "db": "mongodb://prod-db-server/prod-db",   "port": 8080,   "logLevel": "error" }`
        
    - `config/staging.json` (конфигурация для staging):
        
        json
        
        КопироватьРедактировать
        
        `{   "db": "mongodb://localhost/staging-db",   "port": 4000,   "logLevel": "info" }`
        
12. В коде загрузите конфигурацию с помощью библиотеки:
    

js

КопироватьРедактировать

``const config = require('config');  console.log(`App running on port: ${config.get('port')}`);``

### Заключение

Чтобы эффективно использовать разные конфигурации для **staging** и **production** сред, можно использовать следующие подходы:

- Управлять конфигурациями через **переменные окружения**.
- Использовать **dotenv** для загрузки значений из `.env` файлов.
- Разделять конфигурации по отдельным файлам и выбирать нужные при старте приложения.
- Применять сторонние библиотеки, такие как **config**, для упрощения работы с конфигурациями.

Каждый из этих методов позволяет эффективно управлять параметрами, такими как база данных, порты и уровни логирования, для разных сред.