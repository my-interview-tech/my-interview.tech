---
title: Опишите жизненный цикл Node.js-приложения от разработки до продакшена с использованием PAAS
draft: false
tags:
  - "#NodeJS"
  - "#DevOps"
  - "#CI/CD"
  - "#PAAS"
  - "#deployment"
  - "#разработка"
info:
  - https://devcenter.heroku.com/articles/getting-started-with-nodejs
  - https://docs.microsoft.com/azure/app-service/quickstart-nodejs
  - https://habr.com/ru/post/551344/
---

Жизненный цикл Node.js-приложения от разработки до продакшена включает несколько ключевых этапов. Рассмотрим этот процесс с использованием PAAS-платформы (Platform as a Service).

### 1. Инициализация и локальная разработка

**Создание проекта**:

```bash
mkdir my-nodejs-app
cd my-nodejs-app
npm init -y
```

**Установка зависимостей**:

```bash
npm install express dotenv mongoose
npm install --save-dev nodemon jest supertest
```

**Создание структуры приложения**:

```
my-nodejs-app/
  ├── node_modules/
  ├── src/
  │   ├── config/
  │   ├── controllers/
  │   ├── models/
  │   ├── routes/
  │   ├── middleware/
  │   └── app.js
  ├── tests/
  ├── .env
  ├── .gitignore
  ├── package.json
  └── README.md
```

**Настройка скриптов в package.json**:

```json
"scripts": {
  "start": "node src/app.js",
  "dev": "nodemon src/app.js",
  "test": "jest --detectOpenHandles",
  "lint": "eslint ."
}
```

### 2. Управление версиями и совместная работа

**Инициализация Git-репозитория**:

```bash
git init
git add .
git commit -m "Initial commit"
```

**Создание и использование веток для фичей**:

```bash
git checkout -b feature/user-authentication
# разработка функционала
git add .
git commit -m "Add user authentication"
```

**Создание Pull Request** для код-ревью через GitHub/GitLab/Bitbucket

### 3. Тестирование

**Модульное тестирование** с использованием Jest:

```javascript
// tests/user.test.js
const User = require("../src/models/user")

test("should validate user email", () => {
  const user = new User({ email: "invalid" })
  expect(user.validateSync().errors.email).toBeDefined()
})
```

**Интеграционное тестирование** API с Supertest:

```javascript
const request = require("supertest")
const app = require("../src/app")

describe("User API", () => {
  it("should create a new user", async () => {
    const res = await request(app).post("/api/users").send({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    })
    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty("id")
  })
})
```

### 4. Непрерывная интеграция (CI)

**Настройка GitHub Actions** (.github/workflows/ci.yml):

```yaml
name: Node.js CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Use Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18.x"
      - run: npm ci
      - run: npm run lint
      - run: npm test
```

### 5. Подготовка к деплою

**Создание файла .env для разных окружений**:

```
# .env.development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/myapp
LOG_LEVEL=debug

# .env.production
PORT=8080
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/myapp
LOG_LEVEL=info
```

**Настройка Procfile для Heroku**:

```
web: node src/app.js
```

**Конфигурация для Docker** (Dockerfile):

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 8080
CMD ["npm", "start"]
```

### 6. Развертывание (Deployment) на PAAS

**Создание приложения на Heroku**:

```bash
heroku create my-nodejs-app
```

**Настройка переменных окружения**:

```bash
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/myapp
```

**Деплой приложения**:

```bash
git push heroku main
```

### 7. Мониторинг и масштабирование

**Настройка логирования**:

```javascript
const winston = require("winston")

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "error.log", level: "error" }),
  ],
})
```

**Интеграция со сторонними сервисами мониторинга**:

```javascript
// Например, для New Relic
require("newrelic")
```

**Масштабирование в Heroku**:

```bash
heroku ps:scale web=3
```

### 8. Управление релизами

**Создание тегов для версий**:

```bash
git tag -a v1.0.0 -m "First stable release"
git push --tags
```

**Откат на предыдущую версию при необходимости**:

```bash
heroku rollback
```

### 9. Обновления и поддержка

**Управление обновлениями зависимостей**:

```bash
npm outdated
npm update
```

**Автоматическое обновление с Dependabot** (.github/dependabot.yml):

```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
```

### Преимущества использования PAAS

1. **Простота деплоя** - не требуется настройка серверов и инфраструктуры
2. **Автоматическое масштабирование** - платформа может автоматически масштабировать приложение при возрастании нагрузки
3. **Интегрированные инструменты** - логирование, мониторинг, аналитика из коробки
4. **Отсутствие проблем с DevOps** - управление обслуживанием серверов берет на себя платформа
5. **Быстрый запуск** - от кода до работающего приложения за минуты, а не часы или дни

### Примеры популярных PAAS для Node.js

- **Heroku** - один из самых популярных PAAS с бесплатным тарифом для старта
- **Vercel** - оптимизирован для фронтенда, но отлично работает и с Node.js API
- **Google App Engine** - часть экосистемы Google Cloud
- **Azure App Service** - решение от Microsoft
- **AWS Elastic Beanstalk** - упрощенное развертывание на AWS

---

[[003 JSCore|Назад]]
