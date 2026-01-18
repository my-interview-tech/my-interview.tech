---
uid: GHAbjjPbRNOKkeIhP2g9E
title: Как Next.js обрабатывает навигацию на стороне клиента?
tags:
  - NextJS
  - Link
  - next/router
info:
  - >-
    https://nextjs.org/learn-pages-router/basics/navigate-between-pages/client-side
draft: false
technology: Next.js
specialty: Frontend
tools: []
order: 15
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

Next.js использует подход навигации на стороне клиента, который использует HTML5 History API. Это позволяет осуществлять плавные переходы между страницами на стороне клиента без перезагрузки всей страницы. Фреймворк предоставляет встроенный компонент `Link`, который облегчает навигацию на стороне клиента, и поддерживает как традиционные теги `<a>`, так и программную навигацию через модуль `next/router`.

Вот обзор того, как Next.js обрабатывает навигацию на стороне клиента:

**_Компонент Link:_**

- Компонент `Link` является ключевой частью навигации на стороне клиента в Next.js. Он используется для создания ссылок между страницами в вашем приложении.
- Используя компонент `Link`, когда пользователи кликают на ссылку, Next.js перехватывает событие навигации и загружает необходимые ресурсы для новой страницы без запуска полной перезагрузки страницы.

```JSX
import Link from 'next/link';

const MyComponent = () => (
	<Link href="/another-page">
		<a>Перейти на другую страницу</a>
	</Link>
);
```

**_Программная навигация:_**

- В дополнение к использованию компонента `Link`, Next.js предоставляет хук `useRouter` и объект `router` для программной навигации. Это полезно, когда вы хотите перейти на основе взаимодействия пользователя или в ответ на определенные события.

```JSX
import { useRouter } from 'next/router';

const MyComponent = () => {
	const router = useRouter();
	const handleClick = () => {
		router.push('/another-page');
	};

	return (
		<button onClick={handleClick}> Перейти на другую страницу </button>
	);
};`
```

---

[[006 Next.js|Назад]]
