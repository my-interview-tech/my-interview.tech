---
uid: NeuTkiDFkXv91TOel2uvU
title: Что такое Catch-All Routes в Next.js и как они работают?
tags:
  - NextJS
  - Catch-All-Routes
  - getStaticPaths
  - SSR
  - SSG
info:
  - >-
    https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes
  - "https://www.geeksforgeeks.org/how-to-catch-all-routes-in-next-js/"
draft: false
technology: Next.js
specialty: Frontend
tools: []
order: 17
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

**Catch-All Routes** в **Next.js** позволяют динамически сопоставлять URL с гибкими параметрами пути, расширяя возможности системы маршрутизации вашего приложения.

Основные особенности

- **Динамические параметры**: Доступ к сегментам пути с использованием символа `...` (rest параметр).
- **Порядок сопоставления**: Порядок определения определяет приоритет маршрутов.
- **Поведение при отсутствии совпадения**: Возможность настроить поведение при отсутствии совпадения.

**Конфигурация**

Файл маршрутизации Next.js (`pages/foo/[...bar].js`):

- **Корневой Catch-All**: Загружается для любого несопоставленного пути или маршрута `/foo` без дальнейших подпутей.

```jsx
export default function CatchAll() {
  // Логика для Корневого Catch-All
}
```

- **Вложенный Catch-All**: Активируется при доступе к корневому пути вместе с подкаталогами.

```jsx
export default function NestedCatchAll() {
  // Логика для Вложенного Catch-All
}
```

- **Fallback Страницы**: Идеально подходят для обработки ошибок или ожидания динамических данных.

```js
export async function getServerSideProps() {
  // Логика получения данных
  return { props: { data } };
}

export default function Fallback({ data }) {
  return <div>{data}</div>;
}
```

**Режимы Fallback**

Укажите поведение при отсутствии совпадения в методе `getStaticPaths`

- **True**: Генерирует пути во время сборки и обрабатывает отсутствующие маршруты как fallback (только SSG).
- **False**: Точно определяет пути страниц во время сборки (без fallback).
- **‘blocking’**: Обрабатывает fallback через сервер во время выполнения (SSR или SSG).

---

[[006 Next.js|Назад]]
