---
uid: xp_aQ-jhb0aC_al1qXS3P
title: Какова цель функции `getStaticPaths()` в Next.js?
tags:
  - NextJS
  - getStaticPaths
  - getStaticProps
  - SSG
info:
  - "https://nextjs.org/docs/pages/api-reference/functions/get-static-paths"
draft: false
technology: Next.js
specialty: Frontend
tools: []
order: 13
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

Функция `getStaticPaths` в Next.js используется для предварительного рендеринга страниц со статической генерацией (SSG) для динамических маршрутов. Она позволяет вам определить, какие пути должны быть предварительно отрендерены во время сборки.

Основные цели и функции `getStaticPaths`:

1. **Определение путей для предварительного рендеринга**: `getStaticPaths` возвращает массив путей, которые Next.js будет использовать для генерации статических HTML-файлов во время сборки.
2. **Поддержка динамических маршрутов**: Если у вас есть динамический маршрут (например, `pages/[id].js`), `getStaticPaths` позволяет вам указать, какие значения параметра `id` должны быть предварительно отрендерены.
3. **Обработка отсутствующих путей**: Вы можете указать, как Next.js должен обрабатывать запросы к путям, которые не были предварительно отрендерены (например, с помощью опции `fallback`).

Пример использования `getStaticPaths`:

```JSX
// pages/[id].js

export async function getStaticPaths() {
  // Пример: получение списка ID из базы данных или API
  const res = await fetch('https://api.example.com/items');
  const items = await res.json();

  // Создание путей на основе полученных данных
  const paths = items.map(item => ({
    params: { id: item.id.toString() }
  }));

  // Возвращение путей и опции fallback
  return {
    paths,
    fallback: false // или 'blocking' или true
  };
}

export async function getStaticProps({ params }) {
  // Получение данных для конкретного ID
  const res = await fetch(`https://api.example.com/items/${params.id}`);
  const item = await res.json();

  // Возвращение данных в качестве пропсов
  return {
    props: {
      item
    }
  };
}

export default function Item({ item }) {
  return (
    <div>
      <h1>{item.title}</h1>
      <p>{item.description}</p>
    </div>
  );
}
```

В этом примере:

- `getStaticPaths` генерирует список путей на основе данных, полученных из API.
- `getStaticProps` используется для получения данных для каждого конкретного ID.
- `fallback: false` указывает, что если путь не был предварительно отрендерен, Next.js должен вернуть 404 ошибку. Если установить `fallback: true` или `fallback: 'blocking'`, Next.js будет обрабатывать такие запросы динамически.

---

[[006 Next.js|Назад]]
