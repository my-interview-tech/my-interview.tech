---
uid: tnx44MFJqNqIGRtybTg--
title: >-
  Как вы можете реализовать пользовательские границы ошибок в проекте Next.js,
  чтобы корректно обрабатывать ошибки и предотвращать сбой всего приложения?
tags:
  - NextJS
  - ErrorBoundaries
  - getDerivedStateFromError
info:
  - >-
    https://nextjs.org/docs/pages/building-your-application/configuring/error-handling
draft: false
technology: Next.js
specialty: Frontend
tools: []
order: 40
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

Для реализации пользовательских границ ошибок в проекте Next.js, чтобы корректно обрабатывать ошибки и предотвращать сбой всего приложения, можно воспользоваться следующими шагами:

1. Создание пользовательского компонента границы ошибок

Создайте классовый компонент, который расширяет `React.Component`. Реализуйте метод жизненного цикла `static getDerivedStateFromError(error)`, чтобы захватывать ошибки и обновлять состояние компонента. В методе `render()` отобразите резервный UI при возникновении ошибок, чтобы предотвратить сбой всего приложения.

```jsx
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // При желании можно залогировать ошибку или отправить её в сервис отчетов об ошибках
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
```

2. Оборачивание компонентов с помощью границы ошибок

Используйте компонент `<ErrorBoundary>` в качестве обёртки вокруг любых компонентов или разделов вашего приложения, которые вы хотите защитить.

```jsx
<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>
```

Важные моменты:

- **Обработка ошибок**: Границы ошибок перехватывают как JavaScript-ошибки (например, синтаксические ошибки, ошибки времени выполнения), так и ошибки React (например, ошибки, возникающие во время рендеринга).
- **Распространение ошибок**: Необработанные ошибки внутри самой границы ошибок распространяются вверх до ближайшей родительской границы ошибок, создавая иерархию для обработки ошибок.

Использование границ ошибок позволяет изолировать ошибки и предотвратить сбой всего приложения, обеспечивая более стабильный и устойчивый пользовательский опыт.

---

[[006 Next.js|Назад]]
