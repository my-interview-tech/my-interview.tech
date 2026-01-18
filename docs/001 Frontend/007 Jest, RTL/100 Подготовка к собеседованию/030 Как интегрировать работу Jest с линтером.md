---
uid: zLnrYwISE2AfKHFftBNM2
title: Как интегрировать работу Jest с линтером?
tags:
  - testing
  - Jest
  - ESLint
draft: false
technology: "Jest, RTL"
specialty: Frontend
tools: []
order: 30
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

Интеграция Jest с линтером (например, ESLint) позволяет обеспечить соответствие ваших тестов и кода общим стандартам качества и стилю. Это особенно полезно для поддержания чистоты и последовательности кода в больших проектах. Вот как можно интегрировать Jest с ESLint.

1.  \*Установка необходимых пакетов

Сначала установите ESLint и плагин для Jest:

```bash
npm install --save-dev eslint eslint-plugin-jest
```

2. \*Настройка ESLint

Создайте или обновите файл конфигурации ESLint (`.eslintrc.js` или `.eslintrc.json`). Добавьте плагин Jest и настройте правила для тестов.

Пример конфигурации в `.eslintrc.js`:

```javascript
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true, // Добавляем поддержку Jest
  },
  extends: [
    "eslint:recommended",
    "plugin:jest/recommended", // Добавляем рекомендуемые правила для Jest
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["jest"], // Добавляем плагин Jest
  rules: {
    // Дополнительные правила для Jest
    "jest/no-disabled-tests": "warn",
    "jest/no-focused-tests": "error",
    "jest/no-identical-title": "error",
    "jest/prefer-to-have-length": "warn",
    "jest/valid-expect": "error",
  },
};
```

3. \*Настройка скриптов в `package.json`

Добавьте скрипты для запуска ESLint и Jest в вашем `package.json`:

```json
{
  "scripts": {
    "test": "jest",
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
    "lint:fix": "eslint . --ext .js,.jsx,.ts,.tsx --fix"
  }
}
```

4. \*Запуск линтера и тестов

Теперь вы можете запускать ESLint и Jest отдельно или вместе:

- Запуск только ESLint:

```bash
    npm run lint
```

- Запуск только Jest:

```bash
   npm test
```

- Запуск ESLint с автоматическим исправлением ошибок:

```bash
    npm run lint:fix
```

---

[[007 Jest, RTL|Назад]]
