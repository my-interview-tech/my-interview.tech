---
title: Как реализована поддержка темизации и использование Design Tokens?
draft: false
tags:
  - UIKit
  - designToken
  - Figma
  - styleDictionary
  - Chromatic
info:
---
#### **1. Определение Design Tokens**

**Design Tokens** — абстракция дизайн-параметров (цвета, шрифты, отступы) в формате, независимом от платформы.  

Пример структуры токенов:

```json
// tokens.json
{
  "color": {
    "primary": { "value": "#007bff" },
    "text": { "value": "#333333" }
  },
  "font": {
    "body": { "value": "16px Arial" }
  }
}
```

#### **2. Инструменты для управления токенами**

**a. Style Dictionary**

- Генерация платформо-специфичных стилей из токенов.

Конфигурация:

```js
// style-dictionary.config.js
module.exports = {
	source: ["tokens/**/*.json"],
    platforms: {
	    css: {
          transformGroup: "css",
          buildPath: "dist/css/",
          files: [{
            destination: "variables.css",
            format: "css/variables"
          }]
	    }
    }
};
```

**b. Figma Tokens**

- Синхронизация токенов между Figma и кодом через плагин.

Пример: [Figma Tokens Plugin](https://www.figma.com/community/plugin/843461159747178978/Figma-Tokens).

---

#### **3. Интеграция токенов в CSS**

**a. Генерация CSS-переменных**

- **Результат работы Style Dictionary**:

```css
/* variables.css */
:root {
    --color-primary: #007bff;
    --color-text: #333333;
    --font-body: 16px Arial;
}
```

**b. Использование в компонентах**:

```css
/* Button.css */
.button {
  background: var(--color-primary);
  font: var(--font-body);
  color: var(--color-text);
}
```

---

#### **4. Темизация компонентов**

**a. Динамическое переключение тем**

- **Через CSS-классы**:

```css
/* dark-theme.css */

[data-theme="dark"] {
    --color-primary: #2ecc71;
    --color-text: #ffffff;
}
```
    
```jsx
const [theme, setTheme] = useState("light");
document.documentElement.setAttribute("data-theme", theme);
```

**b. Контекст темы (React)**:

```tsx
// ThemeContext.tsx
import { createContext, useContext } from "react";

type Theme = "light" | "dark";
const ThemeContext = createContext<Theme>("light");

export const ThemeProvider = ({ children }) => {
  const [theme] = useState<Theme>("light");
  return (
    <ThemeContext.Provider value={theme}>
      <div data-theme={theme}>{children}</div>
    </ThemeContext.Provider>
  );
};

const Button = () => {
  const theme = useContext(ThemeContext);
  return <button className={`button-${theme}`}>Click</button>;
};
```

#### **5. Поддержка TypeScript**

**a. Генерация типов из токенов**:

```bash
# Использование типажей
npx token-transformer tokens.json tokens-transformed.json
npx json-to-ts tokens-transformed.json > src/types/tokens.d.ts
```

```ts
// tokens.d.ts
interface DesignTokens {
  color: { primary: string; text: string };
  font: { body: string };
}
```

---

#### **6. Документирование токенов**

**a. Интеграция со Storybook**:

- **Addon-designs**: Отображение Figma-макетов.
- **DocsPage**: Автогенерация документации.

```jsx
    // Button.stories.tsx
    export default {
      title: "Components/Button",
      parameters: {
        design: {
          type: "figma",
          url: "https://www.figma.com/file/.../Button",
        },
      },
    };
```

---

#### **7. Тестирование темизации**

**a. Визуальные тесты (Chromatic)**:

```tsx
// В стори-файле
export const LightTheme = { parameters: { theme: "light" } };
export const DarkTheme = { parameters: { theme: "dark" } };
```

**Команда для проверки**:
```bash
npx chromatic --themes light,dark
```

**b. Юнит-тесты**:

```tsx
test("цвет кнопки соответствует теме", () => {
  const { container } = render(
    <ThemeProvider theme="dark">
      <Button />
    </ThemeProvider>
  );
  
  expect(container.firstChild).toHaveStyle("background: #2ecc71");
});
```

---
### Критические замечания

1. **Производительность**:
    - Динамическая смена CSS-переменных может вызывать рефлоу.
    - Решение: Избегать частых обновлений `:root`.
      
2. **Совместимость**:
    - Для IE11 требуется полифил ([css-vars-ponyfill](https://github.com/jhildenbiddle/css-vars-ponyfill)).
    

___

[[310 UI Kit|Назад]]
