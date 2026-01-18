---
uid: MNh2H5OJCAy4iQ1oTgefu
title: Что делает метод cleanup в RTL?
tags:
  - testing
  - Jest
  - react-testing-library
  - render
  - cleanup
draft: false
technology: "Jest, RTL"
specialty: Frontend
tools: []
order: 64
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

**`cleanup`** — это метод, предоставляемый React Testing Library, который используется для очистки после каждого теста. Он отключает все компоненты, которые были отрендерены с помощью `render`, и очищает все слушатели событий и таймеры, чтобы избежать утечек памяти и конфликтов между тестами.

Основные функции `cleanup`:

1. **Очистка после каждого теста**: Автоматически вызывается после каждого теста, если вы используете `@testing-library/react`.
2. **Предотвращение утечек памяти**: Удаляет все компоненты и очищает все слушатели событий и таймеры, чтобы избежать утечек памяти.
3. **Избежание конфликтов между тестами**: Гарантирует, что каждый тест начинается с чистого состояния, чтобы избежать конфликтов между тестами.

Пример использования `cleanup`:

```javascript
import React from "react";

function MyComponent() {
  return <div>Hello, World!</div>;
}

export default MyComponent;
```

Пример теста:

```javascript
import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import MyComponent from "./MyComponent";

afterEach(cleanup);

test("renders MyComponent", () => {
  render(<MyComponent />);
  const element = screen.getByText(/Hello, World!/i);
  expect(element).toBeInTheDocument();
});
```

Пояснение:

1. **Импорт `cleanup`**: Импортируйте `cleanup` из `@testing-library/react`.
2. **Использование `afterEach`**: Используйте `afterEach` для вызова `cleanup` после каждого теста.
3. **Рендеринг компонента**: Используйте `render` для рендеринга компонента `MyComponent`.
4. **Поиск элемента**: Используйте `screen.getByText` для поиска элемента по тексту.
5. **Проверка наличия элемента**: Используйте `expect` и методы Jest для проверки, что элемент присутствует в документе.

Автоматическая очистка:

Если вы используете `@testing-library/react`, `cleanup` автоматически вызывается после каждого теста, поэтому вам не нужно явно вызывать его в большинстве случаев. Однако, если вы хотите убедиться, что очистка происходит, вы можете использовать `afterEach(cleanup)`.

```javascript
import React from "react";
import { render, screen } from "@testing-library/react";
import MyComponent from "./MyComponent";

test("renders MyComponent", () => {
  render(<MyComponent />);
  const element = screen.getByText(/Hello, World!/i);
  expect(element).toBeInTheDocument();
});
```

---

[[007 Jest, RTL|Назад]]
