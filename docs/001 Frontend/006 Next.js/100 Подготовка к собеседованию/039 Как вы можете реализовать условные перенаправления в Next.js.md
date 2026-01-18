---
uid: MUzNvZgbtQUUyMuqf_7Eo
title: >-
  Как вы можете реализовать условные перенаправления в Next.js на основе
  определенных критериев, таких как статус аутентификации пользователя или его
  роль?
tags:
  - NextJS
  - Authentication
  - getServerSideProps
  - getStaticProps
  - useEffect
  - router
info:
  - "https://cheatcode.co/blog/how-to-handle-authenticated-routes-with-next-js"
draft: false
technology: Next.js
specialty: Frontend
tools: []
order: 39
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

Вот несколько методов для реализации условных перенаправлений в Next.js на основе таких критериев, как статус аутентификации пользователя или его роль:

**_1. Перенаправления в_** `getServerSideProps` **_или_** `getStaticProps`

- Проверьте условия внутри этих функций и инициируйте перенаправления с помощью **`res.writeHead()`** и \*\*`res.end()`:

```JavaScript
export async function getServerSideProps(context) {
	const isAuthenticated = await checkAuth(context.req);

	if ( !isAuthenticated && context.resolvedUrl !== '/login' ){
		context.res .writeHead(302, { Location: '/login' });
		context.res.end();

		return { props: {} };
	}

	// ...получение данных для аутентифицированных пользователей...
}`
```

**_2. Перенаправления на стороне клиента с_** `useEffect` **_и_** `router.push`:

- Выполните перенаправления на стороне клиента после рендеринга компонента:

```JavaScript

 import { useEffect } from 'react';
 import { useRouter } from 'next/router';
 
 function MyPage() {
	 const router = useRouter();
	 useEffect( () => {
		 const isAuthenticated = checkAuth();
		 if (!isAuthenticated) {
			 router.push('/login');
		}
	}, []);

// ...содержимое страницы...
}
```

---

[[006 Next.js|Назад]]
