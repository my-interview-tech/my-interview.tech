---
uid: y45Qf5XCP15vE8gM7xJoL
title: Держи свой код чистым с помощью ESLint
tags:
  - "#JavaScript"
  - "#React"
  - "#ESLint"
  - "#линтер"
info:
  - "https://frontend-stuff.com/blog/eslint/"
draft: false
technology: ReactCore
specialty: Frontend
tools: []
order: 31
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

## Что такое ESLint

#ESLint - это #линтер для языка программирования JavaScript, написанный на Node.js.

Он чрезвычайно полезен, потому что JavaScript, будучи интерпретируемым языком, не имеет этапа компиляции и многие ошибки могут быть обнаружены только во время выполнения.

ESLint поможет тебе:

- найти существующие ошибки в коде;
- избежать глупых ошибок;
- избежать бесконечные циклы в условиях цикла for;
- убедится, что все методы `getter` возвращают что-то;
- не разрешить выражения console.log (и аналогичные);
- проверить наличие дубликатов `cases` в `switch`;
- проверить недоступный код;
- проверить правильность #JSDoc;

и многое другое! Полный список доступен по [ссылке](https://eslint.org/docs/rules/).

Растущая популярность #Prettier, как средства форматирования кода, сделала часть стилей ESLint устаревшей, но данный линтер всё еще очень полезен для выявления ошибок в коде.

ESLint очень гибок и настраиваемый, и ты можешь выбрать, какие правила использовать, или какой стиль применять. Многие из доступных правил отключены, но их можно включить в файле конфигурации `.eslintrc`, который может быть глобальным или локальным для твоего проекта.

## Установка ESLint глобально

Используя #npm:

```bash
npm install -g eslint

# создает конфигурацционный файл `.eslintrc`
eslint --init

# запускает ESLint проверку указанного файла
eslint yourfile.js
```

## Установка ESLint локально

```bash
npm install eslint --save-dev

# создает конфигурацционный файл `.eslintrc`
./node_modules/.bin/eslint --init

# запускает ESLint проверку указанного файла
./node_modules/.bin/eslint yourfile.js
```

## Установка стилей Airbnb

Одной из самых популярных настроек для линтера является использование [Airbnb JavaScript Style](https://github.com/airbnb/javascript)
Используй команду:

```bash
yarn add --dev eslint-config-airbnb
```

или

```bash
npm install --save-dev eslint-config-airbnb
```

что бы установить пакет конфигурации Airbnb и добавь в свой `.eslintrc` файл который находится в корне твоего проекта:

```bash
// .eslintrc
{
  "extends": "airbnb"
}
```

## Установка стилей для React

Подключить линтер для React можно легко с помощью плагина React:

```bash
yarn add --dev eslint-plugin-react
```

или

```bash
npm install --save-dev eslint-plugin-react
```

и добавив в свой файл `.eslintrc`:

```bash
// .eslintrc
{
  "extends": "airbnb",
  "plugins": ["react"],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    }
  }
}
```

## Используй конкретные версии EcmaScript

ECMAScript меняет свою версию каждый год.

По умолчанию установлена 5-я версия, что означает стандарт до 2015 года.

Что бы включить ES6 (или выше), пропиши это в `.eslintrc`

```bash
// .eslintrc
{
  "parserOptions": {
    "ecmaVersion": 6
  }
}
```

## Больше правил

Подробное руководство по правилам можно найти на официальном сайте [https://eslint.org/docs/user-guide/configuring](https://eslint.org/docs/user-guide/configuring).

## Отключение правил где это необходимо

Иногда тебе может понадобится отключить правила в конкретном месте, это можно сделать так:

```bash
/* eslint-disable */
alert("test");
/* eslint-enable */
```

или

```bash
alert("test"); // eslint-disable-line
```

также можно отключить одно или несколько конкретных правил для нескольких строк:

```bash
/* eslint-disable no-alert, no-console */
alert("test");
console.log("test");
/* eslint-enable no-alert, no-console */
```

или для одной строки:

```bash
alert("test"); // eslint-disable-line no-alert, quotes, semi
```

---
