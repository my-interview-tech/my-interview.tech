---
uid: MfsGsjp8nlOdUTfUR36nx
title: Что такое JSX в TypeScript? Какие режимы JSX поддерживает TypeScript?
tags:
  - "#TypeScript"
  - "#JSX"
  - "#React"
  - "#Preverse"
info: []
draft: false
technology: TypeScript
specialty: Frontend
tools: []
order: 45
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

`JSX` - это расширение языка JavaScript, которое позволяет использовать синтаксис XML для создания и манипулирования элементами пользовательского интерфейса. JSX используется в React для описания компонентов пользовательского интерфейса.

В TypeScript, _JSX поддерживается с помощью дополнительных опций компилятора, которые позволяют использовать JSX-синтаксис в файлах TypeScript. Для этого необходимо установить опцию `jsx` в значение `react` или `preserve`._

1.  *Режим React* - это режим, в котором TypeScript транслирует JSX в вызовы функций React.createElement(). Этот режим поддерживается по умолчанию в TypeScript при использовании React.

```tsx
// Пример использования JSX в режиме react

import React from "react";

type Props = {
  message: string;
};

const MyComponent = (props: Props) => {
  return <div>{props.message}</div>;
};
```

2.  *Режим preserve* - это режим, в котором TypeScript сохраняет JSX-синтаксис в выходном коде без трансформации. В этом режиме, JSX-элементы остаются как есть и могут быть обработаны другими инструментами.

```tsx
// Пример использования JSX в режиме preserve

type Props = {
  message: string;
};

const MyComponent = (props: Props) => {
  return <div>{props.message}</div>;
};
```

В обоих режимах можно использовать дженерики (`<>`), атрибуты (`className`, `style`, `onClick` и т.д.), шаблонные строки и другие возможности JSX.

_Для использования JSX в TypeScript также необходимо установить соответствующую библиотеку типов, например, `@types/react` для использования JSX в React._

---

[[005 TypeScript|Назад]]
