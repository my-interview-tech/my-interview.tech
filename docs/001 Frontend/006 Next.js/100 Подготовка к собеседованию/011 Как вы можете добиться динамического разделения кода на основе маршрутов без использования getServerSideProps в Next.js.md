---
uid: DL-W0vrvGmdYIz5EaO-Qa
title: >-
  Как вы можете добиться динамического разделения кода на основе маршрутов без
  использования `getServerSideProps` в Next.js?
tags:
  - NextJS
  - getServerSideProps
  - next/dynamic
  - CSR
  - router
info:
  - >-
    https://stackoverflow.com/questions/61222726/dynamic-routing-with-getserversideprops-in-nextjs
draft: false
technology: Next.js
specialty: Frontend
tools: []
order: 11
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

Для достижения динамического разделения кода на основе маршрутов в Next.js без использования `getServerSideProps`, можно воспользоваться двумя эффективными методами:

1. Динамические импорты с использованием `next/dynamic`:

- Используйте `next/dynamic` для оборачивания компонентов, которые вы хотите загружать лениво (lazy load) на основе параметров маршрута или других условий.
- Когда оборачиваемый компонент требуется для рендеринга, Next.js автоматически загружает его код и зависимости в отдельный чанк (chunk), уменьшая время начальной загрузки.

Пример:

```jsx
import dynamic from "next/dynamic";

const BlogPost = dynamic(() => import("../components/BlogPost"), {
  loading: () => <p>Loading post...</p>,
});

function BlogPage({ postId }) {
  // ...fetch post data...
  return <BlogPost post={postData} />;
}

export default BlogPage;
```

2. Рендеринг на стороне клиента (CSR) с использованием объекта `router`:

- Используйте объект `router` из Next.js в компоненте, отрендеренном на стороне клиента, для обработки навигации и динамической загрузки маршрутов.
- Когда пользователь переходит на маршрут, который еще не был загружен, JavaScript-код для этого маршрута загружается и выполняется на стороне клиента.

Пример:

```jsx
import { useRouter } from "next/router";

function BlogPage() {
  const router = useRouter();
  const { postId } = router.query;

  // ...fetch post data based on postId...

  return <div>...</div>;
}

export default BlogPage;
```

Эти методы позволяют динамически загружать код компонентов на основе маршрутов, улучшая производительность и уменьшая начальный размер бандла (bundle).

---

[[006 Next.js|Назад]]
