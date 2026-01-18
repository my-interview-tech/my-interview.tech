---
uid: YrfZ8EuxIIway5UzBGlba
title: Какую функцию выполняет API use() в React19 ?
tags:
  - React
  - Hooks
  - use
  - React19
info:
  - "https://react.dev/reference/react/use"
draft: false
technology: ReactCore
specialty: Frontend
tools: []
order: 95
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

В React 19 мы представляем новую API для чтения ресурсов в процессе рендеринга: `use`.

Например, вы можете прочитать промис с помощью `use`, и React приостановит рендеринг до тех пор, пока промис не будет разрешен:

```javascript
import { use } from "react";

function Comments({ commentsPromise }) {
  // `use` приостановит рендеринг до тех пор, пока промис не будет разрешен.
  const comments = use(commentsPromise);
  return comments.map((comment) => <p key={comment.id}>{comment}</p>);
}

function Page({ commentsPromise }) {
  // Когда `use` приостановит рендеринг в Comments,
  // будет показан этот Suspense boundary.
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Comments commentsPromise={commentsPromise} />
    </Suspense>
  );
}
```

**Примечание:**

`use` не поддерживает промисы, созданные в процессе рендеринга.  
Если вы попытаетесь передать промис, созданный в процессе рендеринга, в `use`, React выдаст предупреждение:

```Console
A component was suspended by an uncached promise. Creating promises inside a Client Component or hook is not yet supported, except via a Suspense-compatible library or framework.
```

Чтобы исправить это, вам нужно передать промис из библиотеки или фреймворка, поддерживающего Suspense и кэширование для промисов. В будущем мы планируем добавить функции, чтобы упростить кэширование промисов в процессе рендеринга.

Вы также можете читать контекст с помощью `use`, что позволяет вам условно читать контекст, например, после раннего возврата:

```javascript
import { use } from "react";
import ThemeContext from "./ThemeContext";

function Heading({ children }) {
  if (children == null) {
    return null;
  }

  // Это не сработает с useContext
  // из-за раннего возврата.
  const theme = use(ThemeContext);
  return <h1 style={{ color: theme.color }}>{children}</h1>;
}
```

API `use` может быть вызван только в процессе рендеринга, подобно хукам. В отличие от хуков, `use` может быть вызван условно. В будущем мы планируем поддерживать больше способов потребления ресурсов в процессе рендеринга с помощью `use`.

---

[[004 ReactCore|Назад]]
