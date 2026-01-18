---
uid: STmxR1qvpNAz9VLIdNoMM
title: CSS-modules и styled-components
tags:
  - "#CSS"
  - "#React"
  - "#CSS-modules"
  - "#style"
info: []
draft: false
technology: CSS
specialty: Frontend
tools: []
order: 69
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

### css-modules

_CSS-модули_ - это технология, которая позволяет импортировать стили для конкретного компонента, создавая уникальное пространство имен для классов CSS. Это позволяет избежать конфликтов имен классов между разными компонентами, а также облегчает поддержку и переиспользование кода.

Для использования CSS-модулей необходимо настроить Webpack или другой сборщик модулей.

Плюсы CSS-модулей:

- Уникальное пространство имен для классов CSS, что облегчает поддержку и переиспользование кода.
- Использование привычного синтаксиса CSS без необходимости изучения новых инструментов.

Минусы CSS-модулей:

- Необходимость настройки сборщика модулей.
- Необходимость явно импортировать стили для каждого компонента.

Пример использования CSS-модулей:

```jsx
import React from "react";
import styles from "./MyComponent.module.css";

const MyComponent = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Hello world</h1>
      <p className={styles.description}>This is my component</p>
    </div>
  );
};

export default MyComponent;
```

В этом примере мы импортируем стили из файла `MyComponent.module.css`, который содержит уникальные имена классов для каждого элемента. Это обеспечивает изоляцию стилей компонента от других компонентов и позволяет избежать конфликтов имен классов.

### Styled Components

_Styled Components_ - это библиотека для создания React-компонентов с помощью CSS встроенных в JavaScript. Вместо того, чтобы импортировать отдельные файлы CSS, каждый компонент определяет свои стили с помощью шаблонных строк внутри JavaScript-кода. Это позволяет создавать компоненты, которые легко переносить и переиспользовать в других проектах, а также облегчает создание динамических и адаптивных стилей.

Плюсы Styled Components:

- Легко создавать динамические и адаптивные стили.
- Возможность переносить и переиспользовать компоненты в других проектах.

Минусы Styled Components:

- Необходимость изучения нового синтаксиса для определения стилей.
- Увеличение размера JavaScript-кода за счет включения стилей внутрь компонентов.

Пример использования Styled Components:

```jsx
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 16px;
`;

const MyComponent = () => {
  return (
    <Container>
      <Title>Hello world</Title>
      <Description>This is my component</Description>
    </Container>
  );
};

export default MyComponent;
```

В этом примере мы определяем стили для каждого элемента компонента с помощью шаблонных строк внутри JavaScript-кода. Это позволяет легко создавать динамические и адаптивные стили, а также переносить и переиспользовать компоненты в других проектах.

---

В целом, выбор между CSS-модулями и Styled Components зависит от индивидуальных предпочтений и требований проекта. Если вам нужно использовать привычный синтаксис CSS и избежать конфликтов имен классов, то CSS-модули могут быть хорошим выбором. Если же вы хотите создавать компоненты с адаптивными и динамическими стилями, то Styled Components могут быть более удобным вариантом.

---

[[002 CSS|Назад]]
