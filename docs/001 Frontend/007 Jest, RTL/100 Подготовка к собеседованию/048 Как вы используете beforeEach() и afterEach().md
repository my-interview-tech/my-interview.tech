---
uid: TKdZS6bhesbMLtocpRLvk
title: Как вы используете beforeEach() и afterEach() ?
tags:
  - testing
  - Jest
  - beforeEach
  - afterEach
draft: false
technology: "Jest, RTL"
specialty: Frontend
tools: []
order: 48
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

`beforeEach` и `afterEach` используются для выполнения определенных блоков кода перед и после каждого теста внутри блока `describe`. Они полезны для настройки и очистки тестов.

Пример использования `beforeEach` и `afterEach`:

```javascript
describe("City database tests", () => {
  beforeEach(() => {
    initializeCityDatabase(); // Выполняется перед каждым тестом
  });

  afterEach(() => {
    clearCityDatabase(); // Выполняется после каждого теста
  });

  it("city database has Vienna", () => {
    expect(isCity("Vienna")).toBeTruthy();
  });

  it("city database has San Juan", () => {
    expect(isCity("San Juan")).toBeTruthy();
  });
});
```

В этом примере:

- `initializeCityDatabase()` выполняется перед каждым тестом, чтобы гарантировать, что база данных городов инициализирована.
- `clearCityDatabase()` выполняется после каждого теста, чтобы очистить базу данных и подготовить её к следующему тесту.

---

[[007 Jest, RTL|Назад]]
