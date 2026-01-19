---
title: Какие подходы используются для внедрения CI/CD и автоматизированного тестирования (юнит-тесты, snapshot-тесты, e2e-тестирование) компонентов?
draft: false
tags:
  - CI/CD
  - Jest
  - react-testing-library
  - snapshot-test
  - cypress
  - Playwright
  - gitlabCLI
  - githubActions
  - istanbul
  - codecov
  - SonalCloud
  - Chromatic
info:
---

#### 1. Настройка CI/CD для UI-библиотек

1. Линтинг и проверка кода:

```yaml
# .github/workflows/ci.yml (GitHub Actions)

jobs:
	lint:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v4
          - uses: actions/setup-node@v4
            with:
              node-version: 20.x
          - run: npm ci
          - run: npm run lint # ESLint/TSLint
          - run: npm run type-check # TypeScript
    
Инструменты: ESLint, Prettier, TypeScript ([пример конфигурации](https://github.com/typescript-eslint/typescript-eslint)).
```

2. **Автоматическая публикация пакетов**:

```yaml
# .gitlab-ci.yml (GitLab CI)
publish:
    rules:
	    - if: $CI_COMMIT_TAG
	script:
        - npm config set @your-scope:registry https://gitlab.com/api/v4/projects/${CI_PROJECT_ID}/packages/npm/
        - echo //gitlab.com/api/v4/projects/${CI_PROJECT_ID}/packages/npm/:_authToken=${CI_JOB_TOKEN}" > .npmrc
        - npm publish --access public
```

- Публикация при создании тега (семантическое версионирование).

3. **Проверка Pull Request**:
    - Запуск юнит-тестов, проверка покрытия кода.
    - Интеграция с Danger.js для анализа изменений ([пример](https://danger.systems/js/)).

---

#### **2. Автоматизированное тестирование компонентов**

**a. Юнит-тестирование (Jest + React Testing Library)**

- **Цель**: Проверка логики компонента и его поведения.

**Пример теста**:

```tsx
// Button.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";
    
test("кнопка вызывает onClick при клике", () => {
	const handleClick = jest.fn();
	render(<Button onClick={handleClick}>Click</Button>);
	fireEvent.click(screen.getByRole("button"));
	
	expect(handleClick).toHaveBeenCalledTimes(1);
});
```

**b. Snapshot-тестирование**

- **Принцип**: Сравнение текущего HTML-снимка компонента с эталонным.
    
**Пример**:

```tsx
test("рендеринг кнопки соответствует снапшоту", () => {
	const { container } = render(<Button>Submit</Button>);
      
    expect(container).toMatchSnapshot();
}); 
```

- **Обновление снапшотов**: `npm test -- -u`.
- **Ограничения**: Не заменяет юнит-тесты, только фиксирует визуальные изменения.

**c. E2E-тестирование (Cypress/Playwright)**

- **Сценарии**: Проверка взаимодействия компонентов в реальном окружении.
    
**Пример для Cypress**:

```ts
describe("Button Component", () => {
    it("должен отображать текст и реагировать на клик", () => {
        cy.mount(<Button onClick={() => console.log("Clicked")}>OK</Button>);
        cy.contains("OK").click();
        cy.window().its("console.log").should("be.calledWith", "Clicked");
	});
});
    
```

- **Инструменты**:
    - Cypress Component Testing ([гайд](https://docs.cypress.io/guides/component-testing/react/overview)).
    - Playwright для кросс-браузерного тестирования ([пример](https://playwright.dev/docs/test-components)).

---

#### **3. Интеграция тестов в CI/CD**

**a. Параллельный запуск тестов**

- **GitHub Actions**:

```yaml

    jobs:
      test:
        strategy:
          matrix:
            os: [ubuntu-latest, windows-latest]
            node-version: [18.x, 20.x]
        runs-on: ${{ matrix.os }}
        steps:
          - uses: actions/checkout@v4
          - uses: actions/setup-node@v4
            with:
              node-version: ${{ matrix.node-version }}
          - run: npm ci
          - run: npm test -- --ci --coverage
```

**b. Отчеты о покрытии кода**

- **Использование Istanbul/C8**:
  
```json
    // package.json
    "scripts": {
      "test:coverage": "jest --coverage"
    }
```
    
- **Интеграция с Codecov/SonarCloud**:

```yaml    
    # GitHub Actions
    - name: Upload coverage
      uses: codecov/codecov-action@v3
      with:
        token: ${{ secrets.CODECOV_TOKEN }}
```

**c. Визуальное тестирование (Chromatic)**

- **Для Storybook-компонентов**:

```yaml
    # .github/workflows/chromatic.yml
    - name: Publish Storybook
      uses: chromaui/action@v1
      with:
        projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
```

- **Обнаружение визуальных регрессий**: [Chromatic Docs](https://www.chromatic.com/docs/).

---

#### **4. Оптимизация процессов**

- **Кэширование зависимостей**:
    
```yaml
    # GitHub Actions
    - name: Cache node_modules
      uses: actions/cache@v3
      with:
        path: node_modules
        key: ${{ runner.os }}-modules-${{ hashFiles('**/package-lock.json') }}
```

- **Изолированное тестирование**:
    - Запуск тестов в Docker-контейнере для устранения "эффекта соседа".

___

[[310 UI Kit|Назад]]
