---
uid: mhMfugKfrc_08Vau2I2O5
title: Why did OpenAI move from Next.js to Remix
tags:
  - React
  - Remix
  - NextJS
info:
  - "https://www.youtube.com/watch?v=hHWgGfZpk00"
draft: false
technology: Remix.run
specialty: Frontend
tools: []
order: 0
access: free
created_at: "2025-02-03T01:48:15+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

### Почему OpenAI перешла с Next.js на Remix?

Недавно OpenAI объявила о переходе с Next.js на Remix. Это вызвано рядом факторов, таких как улучшенная работа с клиентским рендерингом, гибкость маршрутизации и более эффективное управление данными. В этом тексте мы разберем ключевые особенности Remix, его отличия от Next.js и приведем примеры кода.

#### Рендеринг и предварительная загрузка

Remix позволяет эффективно управлять предварительной загрузкой ресурсов. Он использует HTML и метатеги для загрузки изображений и JavaScript, а не полагается только на динамическую подгрузку данных на клиенте. Это делает приложения более отзывчивыми и ускоряет загрузку страниц.

Пример использования метатегов в Remix:

```tsx
import { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { name: "description", content: "Пример страницы на Remix" },
    { property: "og:title", content: "Заголовок страницы" },
  ];
};
```

#### Маршрутизация и загрузчики

Remix использует файловую систему для определения маршрутов, аналогично Next.js, но предлагает встроенный механизм загрузчиков (`loaders`), которые выполняются на сервере перед рендерингом страницы. Это позволяет собирать все необходимые данные заранее и уменьшает нагрузку на клиент.

Пример загрузчика в Remix:

```tsx
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = async () => {
  const data = await fetch("https://jsonplaceholder.typicode.com/posts/1").then(
    (res) => res.json(),
  );
  return json(data);
};

export default function Post() {
  const post = useLoaderData<typeof loader>();
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
}
```

#### Переключение страниц и API

В Remix переключение страниц происходит на стороне клиента, но загрузка данных по API выполняется через сервер. Это достигается за счет использования загрузчиков и действий (`actions`), которые управляют данными между клиентом и сервером.

Пример использования API в Remix:

```tsx
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  return json({ success: true, data });
};
```

#### Использование Remix и Next.js

Хотя Next.js также поддерживает рендеринг на стороне клиента, Remix предоставляет более удобные механизмы для управления состоянием и предварительной загрузки данных. Это делает его особенно полезным для приложений, требующих высокой отзывчивости.

#### Будущее Next.js и Remix

Next.js использует Webpack, который может создавать сложности при стриминге контента. В то же время Remix предоставляет более гибкий подход для создания SPA-приложений, что и стало одной из причин его выбора OpenAI. Однако Next.js остается мощным инструментом, особенно при использовании с Vercel.

Remix – это перспективный фреймворк, который позволяет создавать эффективные клиентские приложения с продуманной маршрутизацией и оптимизированной загрузкой данных. **OpenAI выбрала его из-за удобства работы с рендерингом и API, а также более гибкого управления потоками данных по сравнению с Next.js.**

---

[[006 Remix.run|Назад]]
