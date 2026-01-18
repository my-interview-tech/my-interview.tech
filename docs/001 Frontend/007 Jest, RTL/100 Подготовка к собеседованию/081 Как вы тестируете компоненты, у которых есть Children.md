---
uid: tFa76Are7Aw--2N5d4lHw
title: "Как вы тестируете компоненты, у которых есть Children?"
tags:
  - testing
  - Jest
  - react-testing-library
  - findBy
  - getBy
  - queryBy
draft: false
technology: "Jest, RTL"
specialty: Frontend
tools: []
order: 81
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

Тестирование компонентов, которые содержат дочерние элементы (children), может быть выполнено с использованием библиотеки **React Testing Library**. Эта библиотека предоставляет мощные инструменты для тестирования компонентов, включая дочерние элементы.

Основные методы для тестирования дочерних элементов:

1. **`findBy*`**: Методы для поиска элементов по различным критериям (например, `findByTestId`, `findByText`, `findByRole`).
2. **`getBy*`**: Методы для поиска элементов, которые должны присутствовать в DOM.
3. **`queryBy*`**: Методы для поиска элементов, которые могут отсутствовать в DOM.

Предположим, у вас есть компонент `Wrapper`, который принимает дочерние элементы и отображает их внутри себя.

Компонент `Wrapper.js`:

```javascript
import React from "react";

const Wrapper = ({ children }) => {
  return <div data-testid="wrapper">{children}</div>;
};

export default Wrapper;
```

Компонент `App.js`:

```javascript
import React from "react";
import Wrapper from "./Wrapper";

const App = () => {
  return (
    <Wrapper>
      <div data-testid="child">Child Component</div>
    </Wrapper>
  );
};

export default App;
```

Тестовый файл `App.test.js`:

```javascript
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Wrapper with child component", () => {
  render(<App />);

  // Проверка наличия Wrapper
  const wrapperElement = screen.getByTestId("wrapper");
  expect(wrapperElement).toBeInTheDocument();

  // Проверка наличия дочернего компонента
  const childElement = screen.getByTestId("child");
  expect(childElement).toBeInTheDocument();
  expect(childElement).toHaveTextContent("Child Component");
});
```

Тестирование компонентов с динамическими дочерними элементами:

Если у вас есть компонент, который динамически создает дочерние элементы, вы можете использовать методы `findBy*` для асинхронного поиска элементов.

Компонент `DynamicWrapper.js`:

```javascript
import React, { useState, useEffect } from "react";

const DynamicWrapper = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
  }, []);

  return <div data-testid="dynamic-wrapper">{isLoaded && children}</div>;
};

export default DynamicWrapper;
```

Тестовый файл `DynamicWrapper.test.js`:

```javascript
import { render, screen, waitFor } from "@testing-library/react";
import DynamicWrapper from "./DynamicWrapper";

test("renders DynamicWrapper with child component after loading", async () => {
  render(
    <DynamicWrapper>
      <div data-testid="dynamic-child">Dynamic Child Component</div>
    </DynamicWrapper>,
  );

  // Проверка наличия DynamicWrapper
  const wrapperElement = screen.getByTestId("dynamic-wrapper");
  expect(wrapperElement).toBeInTheDocument();

  // Проверка наличия дочернего компонента после загрузки
  await waitFor(() => {
    const childElement = screen.getByTestId("dynamic-child");
    expect(childElement).toBeInTheDocument();
    expect(childElement).toHaveTextContent("Dynamic Child Component");
  });
});
```

---

[[007 Jest, RTL|Назад]]
