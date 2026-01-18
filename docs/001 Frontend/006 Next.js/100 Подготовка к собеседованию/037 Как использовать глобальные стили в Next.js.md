---
uid: F4l1mS_m_ynxMQe2PxgdL
title: Как использовать глобальные стили в Next.js?
tags:
  - NextJS
  - _app
  - CSS
info:
  - >-
    https://nextjs.org/learn-pages-router/basics/assets-metadata-css/global-styles
draft: false
technology: Next.js
specialty: Frontend
tools: []
order: 37
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

В Next.js вы можете использовать глобальные стили, чтобы применить общие стили ко всему вашему приложению. Вот как это сделать:

1. **Создайте файл глобальных стилей**:  
   Создайте файл, например, `styles/globals.css`, и добавьте в него ваши глобальные стили.

```css
/* styles/globals.css */
body {
  font-family: "Arial", sans-serif;
  margin: 0;
  padding: 0;
}

a {
  color: #0070f3;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
```

2. **Импортируйте глобальные стили в `_app.js`**:  
   Next.js использует файл `_app.js` для инициализации страниц. Вы можете импортировать глобальные стили в этот файл.

   Создайте файл `_app.js` в папке `pages`, если он еще не существует, и добавьте следующий код:

```jsx
// pages/_app.js
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
```

3. **Используйте глобальные стили**:  
   Теперь ваши глобальные стили будут применяться ко всем страницам вашего приложения.
   Например, если у вас есть страница `pages/index.js`, она автоматически получит глобальные стили:

```jsx
// pages/index.js
export default function Home() {
  return (
    <div>
      <h1>Welcome to Next.js</h1>
      <a href="https://nextjs.org">Learn Next.js</a>
    </div>
  );
}
```

Теперь, когда вы запустите ваше приложение с помощью команды `npm run dev` или `yarn dev`, глобальные стили из `styles/globals.css` будут применены ко всем страницам.

Дополнительные советы:

- **Использование CSS-модулей**: Если вы хотите использовать CSS-модули для локальных стилей, вы можете создать файлы с расширением `.module.css` и импортировать их в ваши компоненты.

```jsx
// components/Button.js
import styles from "./Button.module.css";

export default function Button() {
  return <button className={styles.button}>Click me</button>;
}
```

```css
/* components/Button.module.css */
.button {
  background-color: #0070f3;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}
```

- **Использование Sass/SCSS**: Если вы предпочитаете использовать Sass/SCSS, вы можете установить необходимые зависимости и использовать файлы с расширением `.scss` или `.sass`.

```bash
   npm install sass
```

Затем вы можете создать файл `styles/globals.scss` и импортировать его в `_app.js`.

Эти шаги помогут вам настроить и использовать глобальные стили в вашем приложении Next.js.

---

[[006 Next.js|Назад]]
