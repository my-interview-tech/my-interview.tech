---
uid: QFeflLi-96RKmkOw_6d7v
title: Зачем нужны eslint и prettier?
tags:
  - "#React"
  - "#ESLint"
  - "#Prettier"
  - Husky
  - lint-staged
info:
  - "https://habr.com/ru/companies/domclick/articles/743384/"
  - "https://habr.com/ru/companies/ruvds/articles/428173/"
  - "[[000 Настройка eslint & prettier|Настройка eslint & prettier]]"
  - "[[002 Руководство Eslint + Prettier|Руководство Eslint + Prettier]]"
draft: false
technology: ReactCore
specialty: Frontend
tools: []
order: 40
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

ESLint необходим для подсветки ошибок и работы с описанными правилами. 
Prettier служит для чтения правил и форматирования кода .

- eslint – главный модуль линтера.
- eslint-config-airbnb  – готовая конфигурация для использования стайлгайда Airbnb.
- eslint-config-prettier  – позволяет ESLint и Prettier работать вместе.
- eslint-plugin-import – предназначен для поддержки синтаксиса импорта/экспорта и управления путями к файлам. Подробнее можно прочитать в [документации плагина](https://github.com/benmosher/eslint-plugin-import).
- eslint-plugin-jsx-a11y
- eslint-plugin-react – добавляет специфические настройки линтинга для проектов React.
- eslint-plugin-react-hooks
- husky _дает возможность зацепиться за хуки git. Это значит, что вы можете выполнять некоторые действия перед тем, как изменения будут закоммичены и отправлены в удаленный репозиторий_ .
- lint-staged  *позволяет запускать тесты/форматеры на измененных файлах в pre-commit-хуке*

1.  `lint` - проверяет все файлы на ошибки
2.  `lint:fix` - проверяет и исправляет те ошибки, которые может
3.  `format` - форматирует все файлы с помощью prettier

---

[[004 ReactCore|Назад]]
