---
uid: Jqw_je6VvBxRTvJ4UVABu
title: >-
  Что такое функция инкрементной статической регенерации в Next.js и как вы
  использовали ее в своих проектах?
tags:
  - NextJS
  - ISR
  - getStaticPaths
info:
  - >-
    https://nextjs.org/docs/pages/building-your-application/data-fetching/incremental-static-regeneration
  - "https://dev.to/sonaykara/nextjs-15-incremental-static-regeneration-isr-2jkm"
  - "https://habr.com/ru/companies/ruvds/articles/556740/"
draft: false
technology: Next.js
specialty: Frontend
tools: []
order: 43
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

Инкрементная статическая регенерация (Incremental Static Regeneration, ISR) в Next.js позволяет обновлять статический контент после его первоначальной сборки, не требуя полной пересборки приложения. Это особенно полезно для сайтов с большим количеством статических страниц, которые изменяются нечасто.

В моих проектах я использовал ISR для улучшения производительности и пользовательского опыта. Например, на сайте электронной коммерции детали продуктов в основном статичны, но цены могут колебаться. Используя ISR, я настроил страницы продуктов как статические во время сборки, а затем периодически пересоздавал их для обновления информации о ценах. Этот подход снижает нагрузку на сервер и гарантирует, что пользователи видят актуальные данные.

Пример использования ISR в Next.js:

```JSX
function Product({ product }) {
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.price}</p>
    </div>
  );
}

export async function getStaticPaths() {
  // Получаем список всех продуктов
  const res = await fetch('https://api.example.com/products');
  const products = await res.json();

  // Создаем пути для каждого продукта
  const paths = products.map((product) => ({
    params: { id: product.id.toString() },
  }));

  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  // Получаем данные для конкретного продукта
  const res = await fetch(`https://api.example.com/products/${params.id}`);
  const product = await res.json();

  return {
    props: { product },
    revalidate: 60, // Пересоздаем страницу каждые 60 секунд
  };
}

export default Product;
```

В этом примере `getStaticPaths` генерирует пути для каждого продукта, а `getStaticProps` получает данные для конкретного продукта и настраивает пересоздание страницы каждые 60 секунд с помощью параметра `revalidate`. Это позволяет обновлять информацию о продуктах без полной пересборки приложения.

---

[[006 Next.js|Назад]]
