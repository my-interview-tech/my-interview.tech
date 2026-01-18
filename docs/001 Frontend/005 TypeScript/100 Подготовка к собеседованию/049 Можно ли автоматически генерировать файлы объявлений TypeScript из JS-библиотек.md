---
uid: LQ81INxH01fJg4i-LymVm
title: >-
  Можно ли автоматически генерировать файлы объявлений TypeScript из
  JS-библиотек?
tags:
  - "#TypeScript"
  - dts-gen
  - dtsmake
info:
  - >-
    https://stackoverflow.com/questions/18301898/generating-typescript-declaration-files-from-javascript
draft: false
technology: TypeScript
specialty: Frontend
tools: []
order: 49
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

JavaScript не всегда содержит достаточно информации, которая позволяет TypeScript автоматически выводить типы. Поэтому практически невозможно автоматически создавать объявления типов, основанные на JavaScript. Однако можно попытаться это сделать, воспользовавшись следующими инструментами:

- [Microsoft/dts-gen](https://github.com/Microsoft/dts-gen) — официальное средство, используемое Microsoft как отправная точка при создании объявлений типов.
- [dtsmake](https://github.com/ConquestArrow/dtsmake) — многообещающий инструмент для автоматического создания объявлений типов на основе JS-файлов, находящийся в процессе разработки. Он зависит от системы анализа кода [Tern](http://ternjs.net/), которую используют некоторые редакторы для реализации механизма автозавершения при вводе JS-кода.

Документация советует использовать namespace, а не module, чтобы избежать когнитивных коллизий с ES Modules.

---

[[005 TypeScript|Назад]]
