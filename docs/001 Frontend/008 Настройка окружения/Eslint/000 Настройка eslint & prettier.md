---
uid: f-y4x5cOpChCaoYgZq2JL
title: Настройка eslint & prettier
tags:
  - "#ESLint"
  - "#Prettier"
info: []
draft: false
technology: Настройка окружения
specialty: Frontend
tools: []
order: 0
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

Потратила пару дней, но все же справилась с линтерами.
Никакие статьи не читала, но конфликтов между установленными пакетами удалось избежать, вот как это у меня получилось:

1. Зашла в документацию по #eslint-config-airbnb. Одной командой сразу установила сам airbnb и все пакеты, необходимые для его работы с нужными версиями: npx install-peerdeps --dev eslint-config-airbnb. Благодаря этому поставилась большая часть требуемых в задаче пакетов, в том числе тот же eslint.
2. Загуглила документации установившихся пакетов, в них нашла настройки, которые необходимо внести в конфиг #eslint.
3. Поставила #prettier, #eslint-config-prettier, eslint-plugin-prettier. Так же изучила их документации, внесла в конфиги eslint и prettier требуемые для их совместной корректной работы настройки.
4. Поставила @babel/core и @babel/eslint-parser. Как вы уже поняли, снова изучала документации. Настройки для babel вписала прямо в конфиг eslint.
5. Ну и осталось самое простое - поставить и настроить husky и lint-staged. Опять же мне помогли их документации. Для тех, кому лень гуглить, вот ссылки на основные документации:

[eslint-config-airbnb:](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb) npx install-peerdeps --dev eslint-config-airbnb
includes:
[eslint:](https://eslint.org/docs/latest/user-guide/getting-started)
[eslint-plugin-import:](https://github.com/import-js/eslint-plugin-import)
[eslint-plugin-react:](https://github.com/jsx-eslint/eslint-plugin-react)
[eslint-plugin-react-hooks:](https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks)
[eslint-plugin-jsx-a11y:](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y)

[prettier:](https://prettier.io/docs/en/install.html) npm install --save-dev --save-exact prettier
[eslint-config-prettier:](https://github.com/prettier/eslint-config-prettier) npm install --save-dev eslint-config-prettier
[eslint-plugin-prettier:](https://github.com/prettier/eslint-plugin-prettier) npm install --save-dev eslint-plugin-prettier

[@babel-eslint-parser:](https://github.com/babel/babel/tree/main/eslint/babel-eslint-parser) npm install eslint @babel/core @babel/eslint-parser --save-dev

[husky:](https://typicode.github.io/husky/#/?id=automatic-recommended) npm install husky --save-dev
[lint-staged:](https://github.com/okonet/lint-staged#Configuration)npm install --save-dev lint-staged
