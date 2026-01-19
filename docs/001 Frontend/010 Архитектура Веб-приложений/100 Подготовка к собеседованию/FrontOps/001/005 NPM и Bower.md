---
title: "Пакетные менеджеры: NPM и Bower"
draft: true
tags:
  - npm
  - bower
info:
---
## Пакетные менеджеры: NPM и Bower

### NPM Revolution

NPM (Node Package Manager) кардинально изменил способ управления зависимостями:

```json
{
  "name": "my-awesome-app",
  "version": "1.0.0",
  "description": "Описание моего приложения",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "build": "webpack --mode production",
    "test": "jest",
    "lint": "eslint src/"
  },
  "dependencies": {
    "express": "^4.18.2",
    "lodash": "^4.17.21",
    "moment": "^2.29.4"
  },
  "devDependencies": {
    "webpack": "^5.75.0",
    "jest": "^29.3.1",
    "eslint": "^8.30.0",
    "nodemon": "^2.0.20"
  },
  "peerDependencies": {
    "react": ">=16.0.0"
  }
}
```

NPM Scripts позволяли автоматизировать рутинные задачи:

```json
{
  "scripts": {
    "prebuild": "npm run clean",
    "build": "webpack --mode production",
    "postbuild": "npm run analyze",
    "clean": "rimraf dist/",
    "analyze": "webpack-bundle-analyzer dist/bundle.js",
    "dev": "concurrently \"npm run watch:css\" \"npm run watch:js\"",
    "watch:css": "sass --watch src/scss:dist/css",
    "watch:js": "webpack --mode development --watch"
  }
}
```

### Bower: Фронтенд-специфичный менеджер

Bower был создан специально для фронтенд-зависимостей:

```json
{
  "name": "my-frontend-app",
  "dependencies": {
    "jquery": "~3.6.0",
    "bootstrap": "~5.2.0",
    "fontawesome": "~6.2.0"
  },
  "resolutions": {
    "jquery": "3.6.0"
  }
}
```

Bower устанавливал пакеты в плоскую структуру, что решало проблемы с дублированием зависимостей, но в итоге NPM evolved и поглотил эту функциональность.

___

