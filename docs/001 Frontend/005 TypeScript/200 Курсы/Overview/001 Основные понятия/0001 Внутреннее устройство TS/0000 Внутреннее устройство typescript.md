---
uid: Lw9LgnmZ-sW2nQ8kiQRId
title: Внутреннее устройство typescript
tags:
  - "#TypeScript"
draft: true
technology: TypeScript
specialty: Frontend
tools: []
order: 0
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

---

1.1 [[0001 Статическая типизация|Статическая типизация]]
1.2 [[0002 Выгода и удобство typescript|Выгода и удобство typescript]]
1.3 [[0003 Задача typescript|Задача typescript]]
1.4 [[0004 Компилятор typescipt|Компилятор typescipt]]
1.5 [[0005 Установка компилятора typescript|Установка компилятора typescript]]
1.6 [[0006 Базовая работа с типами typescript|Базовая работа с типами typescript]]
1.7 [[0007 Явная и неявная типизация, указание типов|Явная и неявная типизация, указание типов]]
1.8 [[0008 Транспиляция и полифиллинг|Транспиляция и полифиллинг]]
1.9 [[0009 Настройка строгости|Настройка строгости]]

```bash
1. npm install -g typescript
	а. tsc index.ts
	б. node index.js
2. npm install -g ts-node
3. ts-node index.ts

npm i rimraf
npm i copyfiles --save dev
npm i npm-watch
```

---

## Инициализация TS в проекте

TypeScript - это некое расширение, дополнение к языку JS , которое добавляет в язык статическую типизацию.

Для того, чтобы установить TypeScript в проект, необходимо:

```
npm install -g typescript
```

Компилируем наш ts-файл в js-файл для отображения запроса

```
tsc index.ts
```

Образовался файл index.js . Введем

```
node index.js
```

Данные отобразились.
Для того, чтобы не повторять данную операцию для оторбражения данных воспользуем следующим глобальным расширением для ts:

```
npm install -g ts-node
```

Для отображения данных и компиляции воспользуемся следующим кодом:

```
ts-node index.ts
```

Таким образом, мы в 1 действие преобразовали файл.
