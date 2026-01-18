---
uid: BbRi1IgpYswxr3JssX_47
title: Что такое CSS-modules и `styled-components`?
tags:
  - "#React"
  - "#CSS-modules"
  - "#styled-components"
  - "#CSS-in-JS"
info:
  - "[[0046 Стилизация и CSS|Стилизация и CSS]]"
  - "https://habr.com/ru/articles/591381/"
  - "[[0013 Как подключить CSS|Как подключить CSS?]]"
  - "https://github.com/callstack/linaria"
  - "[[069 CSS-modules и styled-components|CSS-modules и styled-components]]"
draft: false
technology: ReactCore
specialty: Frontend
tools: []
order: 115
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

### **`CSS-modules`**

_CSS модули_ - это подход к стилизации компонентов в React, который позволяет изолировать стили каждого компонента и предотвратить конфликты имен классов между компонентами. Это достигается путем создания уникальных имен классов для каждого компонента.

Чтобы использовать CSS модули в React, необходимо выполнить несколько шагов:

1.  Установите пакет _css-loader_, который позволяет использовать CSS модули в webpack.

```
npm install --save-dev css-loader
```

2.  _Создайте файл стилей для компонента и добавьте в него CSS-правила_, которые вы хотите применить к компоненту.

3.  _Импортируйте файл стилей в компонент и присвойте классам уникальные имена_ с помощью синтаксиса `import styles from './styles.module.css'`.

```jsx
import React from "react";
import styles from "./styles.module.css";

const MyComponent = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Hello, world!</h1>
    </div>
  );
};

export default MyComponent;
```

4.  _Теперь вы можете использовать классы из файла стилей в JSX-элементах и webpack автоматически присвоит им уникальные имена классов._

CSS модули - это удобный и безопасный способ стилизации компонентов в React. Они позволяют избежать конфликтов имен классов и упрощают поддержку кода.

Кроме того, любой компонент может иметь настоящую зависимость, например:

```javascript
import buttons from "./buttons.css";
import padding from "./padding.css";

element.innerHTML = `<div class="${buttons.red} ${padding.large}">`;

// Этот подход предназначен для решения проблемы глобальной _области видимости_ в CSS.

// Ключевое отличие присвоения CSS-стилей в React проекте от обычной HTML-верстки в том, что вместо class используется className .
```

### **`styled-components`**

[Styled Components](https://styled-components.com/) **—** одно из популярных решений написания кода методом **CSS in JS**. Гибкое, простое и, главное, идеально вписывается в архитектуру React приложения.

> _CSS in JS — описание стилей в JavaScript файлах._

```jsx
import React from "react";
import styled from "styled-components";

// Создание стилизованного компонента с помощью Styled-components
const Wrapper = styled.div`
  background-color: #f2f2f2;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #333;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const MyComponent = () => {
  return (
    <Wrapper>
      <Title>Hello, Styled-components!</Title>
      <Button>Click me</Button>
    </Wrapper>
  );
};

export default MyComponent;
```

Преимущества:

1. **Никаких больше className.** Возможность передавать классы никуда не пропадает, но их использование опционально и бессмысленно, теперь мы можем прописывать все стили внутри стилизованных компонент, и классы будут генерироваться автоматически.
2. **Простая динамическая стилизация.** Не нужно больше писать тернарные операторы и жонглировать className внутри компоненты, теперь все эти проблемы решаются благодаря прокидыванию пропсов внутрь стилизованных компонент.
3. **Теперь это JS.** Так как теперь стили пишутся в экосистеме JavaScript, это упрощает навигацию по проекту и даёт различные возможности написания кода.
4. [StylisJS](https://github.com/thysultan/stylis.js) **под капотом.** Данный препроцессор поддерживает:  
   4.1. Ссылки на родителя &, который часто используют в SCSS.  
   4.2. Минификация — уменьшение размера исходного кода.  
   4.3. Tree Shaking — удаление мёртвого кода.  
   4.4. Вендорные префиксы — приставка к свойству CSS, обеспечивающая поддержку браузерами, в которых определённая функция ещё не внедрена на постоянной основе.

**Предпочитаю CSS-modules, но имел опыт работы со styled-components**

---

[[004 ReactCore|Назад]]
