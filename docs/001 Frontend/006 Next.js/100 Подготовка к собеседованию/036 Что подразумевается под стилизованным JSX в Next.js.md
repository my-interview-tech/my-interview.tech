---
uid: VjAde1XPxcqzYnhB3Nvz2
title: Что подразумевается под стилизованным JSX в Next.js?
tags:
  - NextJS
  - styled-components
  - CSS-in-JS
  - CSS-modules
  - emotion
  - React
info:
  - "https://nextjs.org/blog/styling-next-with-styled-jsx"
draft: false
technology: Next.js
specialty: Frontend
tools: []
order: 36
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

Стилизованный JSX в Next.js относится к использованию библиотеки Styled JSX, которая позволяет вам писать CSS непосредственно внутри ваших компонентов React. Этот подход, известный как `CSS-in-JS`, обеспечивает инкапсуляцию стилей, что означает, что стили, определенные в одном компоненте, не будут влиять на другие компоненты. Это упрощает управление стилями и позволяет легко добавлять, изменять и удалять стили, не затрагивая несвязанные части приложения.

Пример использования Styled JSX в Next.js:

```jsx
function Home() {
  return (
    <div>
      <style jsx>{`
        h1 {
          color: blue;
        }
        p {
          font-size: 18px;
        }
      `}</style>
      <h1>Welcome to Next.js</h1>
      <p>This is a styled paragraph.</p>
    </div>
  );
}

export default Home;
```

В этом примере CSS-код заключен в тег `<style jsx>`, что позволяет Next.js обрабатывать его как локальные стили для компонента `Home`.

Если вы хотите использовать другие библиотеки CSS-in-JS, такие как styled-components или emotion, вам нужно будет установить соответствующие пакеты и настроить Babel для их поддержки. Например, для styled-components вам нужно установить `styled-components` и `babel-plugin-styled-components`, а затем настроить `.babelrc` файл:

```json
{
  "presets": ["next/babel"],
  "plugins": [["styled-components", { "ssr": true }]]
}
```

Для emotion установите `@emotion/react` и `@emotion/styled`, а затем настройте `.babelrc` следующим образом:

```jsx
{
  "presets": ["next/babel"],
  "plugins": ["@emotion/babel-plugin"]
}
```

После этого вы можете импортировать и использовать styled-components или emotion в ваших компонентах:

```jsx
// Пример с styled-components
import styled from "styled-components";

const Title = styled.h1`
  color: blue;
`;

function Home() {
  return (
    <div>
      <Title>Welcome to Next.js</Title>
    </div>
  );
}

export default Home;
```

```jsx
// Пример с emotion
import { css } from "@emotion/react";
import styled from "@emotion/styled";

const Title = styled.h1`
  color: blue;
`;

function Home() {
  return (
    <div>
      <Title>Welcome to Next.js</Title>
    </div>
  );
}

export default Home;
```

Эти примеры демонстрируют, как можно использовать различные библиотеки CSS-in-JS в Next.js для стилизации ваших компонентов.

---

[[006 Next.js|Назад]]
