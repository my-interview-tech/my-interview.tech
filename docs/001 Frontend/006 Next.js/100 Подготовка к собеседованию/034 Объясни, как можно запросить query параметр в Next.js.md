---
uid: n99UBHTNGJtenDRq3Nsss
title: "Объясни, как можно запросить query параметр в Next.js?"
tags:
  - NextJS
  - query
  - useRouter
  - getServerSideProps
  - getStaticProps
  - getStaticPaths
info:
  - >-
    https://www.geeksforgeeks.org/how-to-get-query-parameters-from-url-in-next-js/
  - >-
    https://stackoverflow.com/questions/43862600/how-can-i-get-query-string-parameters-from-the-url-in-next-js
draft: false
technology: Next.js
specialty: Frontend
tools: []
order: 34
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

В Next.js вы можете запросить параметры запроса (query parameters) из URL, используя несколько различных подходов в зависимости от того, где и как вы хотите их получить. Вот несколько методов:

1. Использование `useRouter` в функциональных компонентах

Если вы работаете в функциональном компоненте, вы можете использовать хук `useRouter` из `next/router` для доступа к параметрам запроса.

```javascript
import { useRouter } from "next/router";

const MyComponent = () => {
  const router = useRouter();
  const { param1, param2 } = router.query;

  return (
    <div>
      <p>Param1: {param1}</p>
      <p>Param2: {param2}</p>
    </div>
  );
};

export default MyComponent;
```

2. Использование `getServerSideProps` для серверного рендеринга

Если вам нужно получить параметры запроса на стороне сервера при использовании `getServerSideProps`, вы можете получить их через аргумент `context`.

```javascript
export async function getServerSideProps(context) {
  const { param1, param2 } = context.query;

  return {
    props: {
      param1,
      param2,
    },
  };
}

const MyComponent = ({ param1, param2 }) => {
  return (
    <div>
      <p>Param1: {param1}</p>
      <p>Param2: {param2}</p>
    </div>
  );
};

export default MyComponent;
```

3. Использование `getStaticProps` с `getStaticPaths` для статической генерации

Если вы используете `getStaticProps` в сочетании с `getStaticPaths` для статической генерации страниц, вы можете получить параметры запроса через аргумент `context`.

```javascript
export async function getStaticPaths() {
  return {
    paths: [{ params: { param1: "value1", param2: "value2" } }],
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { param1, param2 } = context.params;

  return {
    props: {
      param1,
      param2,
    },
  };
}

const MyComponent = ({ param1, param2 }) => {
  return (
    <div>
      <p>Param1: {param1}</p>
      <p>Param2: {param2}</p>
    </div>
  );
};

export default MyComponent;
```

4. Использование `router.push` для навигации с параметрами запроса

Вы также можете программно перемещаться по вашему приложению, используя `router.push` с параметрами запроса.

```javascript
import { useRouter } from "next/router";

const MyComponent = () => {
  const router = useRouter();

  const navigateWithQuery = () => {
    router.push({
      pathname: "/another-page",
      query: { param1: "value1", param2: "value2" },
    });
  };

  return (
    <div>
      <button onClick={navigateWithQuery}>Go to Another Page</button>
    </div>
  );
};

export default MyComponent;
```

Эти методы позволяют вам гибко работать с параметрами запроса в различных сценариях использования Next.js.

---

[[006 Next.js|Назад]]
