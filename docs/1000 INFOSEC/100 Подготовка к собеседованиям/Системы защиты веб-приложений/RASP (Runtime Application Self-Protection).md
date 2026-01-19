---
title: RASP (Runtime Application Self-Protection)
draft: true
tags:
  - infosec
  - RASP
info:
---

**RASP** – это технология безопасности, встраиваемая непосредственно в приложение, которая анализирует поведение приложения во время выполнения и блокирует вредоносную активность.

**Преимущества RASP:**

- Работает непосредственно в контексте приложения
- Обладает полной видимостью кода и данных
- Может блокировать атаки в режиме реального времени
- Эффективен против zero-day уязвимостей

**Пример интеграции RASP в Node.js приложение:**

```javascript
// Пример с использованием библиотеки NodeJsScan
const rasp = require("nodejs-rasp")

// Активация защиты от XSS, SQL-инъекций и других атак
rasp.configure({
  xss: true,
  sqlInjection: true,
  commandInjection: true,
  pathTraversal: true,
})

// Запуск приложения с защитой RASP
const app = express()
rasp.protect(app)
```

___

