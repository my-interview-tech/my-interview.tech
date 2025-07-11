# Frontend Developer Roadmap

## Схема развития Frontend разработчика по уровням

```mermaid
graph LR
    A[ROADMAP] --> B[Контекст выполнения, this]
    A --> C[Области видимости, замыкания]
    A --> D[Прототипы, классы]
    A --> E[DOM]
    A --> F[Асинхронность]
    A --> G[React]
    A --> H[Redux]
    A --> I[TypeScript]
    A --> J[Node.js]
    A --> K[HTML & CSS]
    A --> L[Сеть]
    A --> M[Производительность]
    A --> N[Безопасность]
    A --> O[Тестирование]
    A --> P[Git]
    A --> Q[Docker]
    A --> R[Webpack]

    B --> B1[Junior<br/>- Что такое контекст<br/>- call, apply, bind<br/>- Стрелочные функции]
    B1 --> B2[Middle<br/>- Игнорирование контекста<br/>- Потеря контекста<br/>- Связывание с new]

    C --> C1[Junior<br/>- Функциональная область<br/>- let/const vs var<br/>- Hoisting]
    C1 --> C2[Middle<br/>- Замыкания<br/>- Сборщик мусора<br/>- Лексическое окружение]
    C2 --> C3[Senior<br/>- Работа V8<br/>- Каррирование]

    D --> D1[Junior<br/>- Наследование через прототипы<br/>- Функция-конструктор]
    D1 --> D2[Middle<br/>- Прототипное наследование<br/>- Классы и ООП<br/>- Цепочка прототипов]
    D2 --> D3[Senior<br/>- Шаблон делегирования]

    E --> E1[Junior<br/>- Методы поиска DOM<br/>- Браузерные события<br/>- Живые коллекции]
    E1 --> E2[Middle<br/>- Этапы отрисовки<br/>- Всплытие событий<br/>- Делегирование]
    E2 --> E3[Senior<br/>- MutationObserver<br/>- Способы рендеринга]
    E3 --> E4[Lead<br/>- WebComponents<br/>- ShadowDOM]

    F --> F1[Junior<br/>- callback, Promises<br/>- async/await]
    F1 --> F2[Middle<br/>- Event loop<br/>- Микротаски<br/>- Комбинирование Promises]
    F2 --> F3[Senior<br/>- Генераторы<br/>- Бесконечные циклы]

    G --> G1[Junior<br/>- Virtual DOM<br/>- Жизненный цикл<br/>- Props & State]
    G1 --> G2[Middle<br/>- HOC, Хуки<br/>- Context API<br/>- SSR]
    G2 --> G3[Senior<br/>- Render-props<br/>- Compound components]
    G3 --> G4[Lead<br/>- Reconciliation<br/>- Fiber архитектура]

    H --> H1[Junior<br/>- Однонаправленный поток<br/>- redux-thunk<br/>- Action creators]
    H1 --> H2[Middle<br/>- redux-saga<br/>- reselect<br/>- redux-ducks]
    H2 --> H3[Senior<br/>- Immutable<br/>- Нормализация данных]

    I --> I1[Junior<br/>- Базовые типы<br/>- Интерфейсы<br/>- Enum]
    I1 --> I2[Middle<br/>- Generics<br/>- Conditional types<br/>- Advanced types]
    I2 --> I3[Senior<br/>- Декораторы<br/>- Миксины<br/>- Перегрузка функций]

    J --> J1[Middle<br/>- process, fs<br/>- express/hapi<br/>- Базовые операции]
    J1 --> J2[Senior<br/>- MongoDB<br/>- SQL vs NoSQL<br/>- Авторизация]
    J2 --> J3[Lead<br/>- Кеширование<br/>- worker_threads<br/>- Многопоточность]

    K --> K1[Junior<br/>- Блочная модель<br/>- Базовые теги<br/>- БЭМ]
    K1 --> K2[Middle<br/>- Flexbox<br/>- Псевдоклассы<br/>- Адаптивность]
    K2 --> K3[Senior<br/>- Grid<br/>- Доступность<br/>- Микроразметка]

    L --> L1[Junior<br/>- HTTP протокол<br/>- XMLHttpRequest<br/>- fetch]
    L1 --> L2[Middle<br/>- REST API<br/>- API first]
    L2 --> L3[Senior<br/>- TCP/IP<br/>- Теория сетей]

    M --> M1[Junior<br/>- Метрики производительности<br/>- async, defer<br/>- Lighthouse]
    M1 --> M2[Middle<br/>- Уменьшение бандла<br/>- CDN<br/>- Мемоизация]
    M2 --> M3[Senior<br/>- lazy-loading<br/>- Критический путь<br/>- Серверные метрики]

    N --> N1[Junior<br/>- Уязвимые функции<br/>- npm audit<br/>- Базовая безопасность]
    N1 --> N2[Middle<br/>- CSP, CORS<br/>- XSS защита<br/>- SQL-injections]
    N2 --> N3[Senior<br/>- CSRF<br/>- Безопасность cookie]

    O --> O1[Junior<br/>- Unit тесты<br/>- Jest для функций<br/>- Назначение тестов]
    O1 --> O2[Middle<br/>- TDD принцип<br/>- Моки и стабы<br/>- Cypress e2e]
    O2 --> O3[Senior<br/>- BDD принцип<br/>- Coverage инструменты]

    P --> P1[Junior<br/>- Базовые команды<br/>- pull, push, commit<br/>- Решение конфликтов]
    P1 --> P2[Middle<br/>- git-flow<br/>- Интерактивный rebase<br/>- Сложные команды]
    P2 --> P3[Senior<br/>- git-lfs<br/>- hooks<br/>- worktree]

    Q --> Q1[Junior<br/>- Что такое Docker<br/>- Запуск контейнеров<br/>- Просмотр логов]
    Q1 --> Q2[Middle<br/>- Dockerfile<br/>- docker-compose<br/>- multi-stage build]
    Q2 --> Q3[Senior<br/>- Слои образов<br/>- Облачные платформы]

    R --> R1[Junior<br/>- Конфигурация<br/>- Лоадеры и плагины<br/>- package.json]
    R1 --> R2[Middle<br/>- HMR<br/>- Tree shaking<br/>- bundle-analyzer]
    R2 --> R3[Senior<br/>- Оптимизация сборки<br/>- Кастомные плагины]

    classDef junior fill:#e1f5fe,stroke:#0277bd,stroke-width:2px
    classDef middle fill:#fff3e0,stroke:#ef6c00,stroke-width:2px
    classDef senior fill:#e8f5e8,stroke:#2e7d32,stroke-width:2px
    classDef lead fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px

    class B1,C1,D1,E1,F1,G1,H1,I1,K1,L1,M1,N1,O1,P1,Q1,R1 junior
    class B2,C2,D2,E2,F2,G2,H2,I2,J1,K2,L2,M2,N2,O2,P2,Q2,R2 middle
    class C3,D3,E3,F3,G3,H3,I3,J2,K3,L3,M3,N3,O3,P3,Q3,R3 senior
    class E4,G4,J3 lead
```

## Детальное описание уровней

### Junior

- **Контекст выполнения**: понимание this, методы call/apply/bind
- **Области видимости**: var vs let/const, hoisting, функциональные области
- **Прототипы**: базовое наследование, функции-конструкторы
- **DOM**: поиск элементов, события, изменение содержимого
- **Асинхронность**: callback, Promise, async/await

### Middle

- **Контекст выполнения**: потеря контекста, игнорирование контекста
- **Области видимости**: замыкания, сборщик мусора, лексическое окружение
- **Прототипы**: цепочка прототипов, классы ES6, ООП принципы
- **DOM**: этапы отрисовки, всплытие событий, делегирование
- **Асинхронность**: Event loop, микротаски, комбинирование Promise

### Senior

- **Контекст выполнения**: продвинутые случаи использования
- **Области видимости**: работа V8, каррирование, оптимизации
- **Прототипы**: шаблон делегирования, продвинутые техники
- **DOM**: MutationObserver, способы рендеринга (SSR/CSR/SSG)
- **Асинхронность**: генераторы, итераторы, продвинутые паттерны

### Lead

- **DOM**: WebComponents, ShadowDOM, Custom Elements
- **React**: Reconciliation, архитектура Fiber
- **Node.js**: кеширование, worker_threads, масштабирование
