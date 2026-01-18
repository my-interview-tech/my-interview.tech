---
uid: oAI_iCbZTPXN8Sf_78DTE
title: Делаем пагинацию в React приложении
tags:
  - "#React"
  - "#TypeScript"
  - "#pagination"
draft: false
technology: ReactCore
specialty: Frontend
tools: []
order: 0
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

Ссылки из статьи:

- про [stateless components](https://testsuite.io/react-stateless-function-components#:~:text=A%20stateless%20function%20component%20is,return%20JSX%20as%20an%20output.)
- про [условный рендеринг](https://react.dev/learn/conditional-rendering)
- про типизацию [catch блока](https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript)
- про [Github pages для pet проектов](https://habr.com/ru/articles/732546/)
- про [@testing-library/react](https://testing-library.com/docs/react-testing-library/example-intro)
- про [create-react-app](https://create-react-app.dev/)
- про [useEffect](https://react.dev/reference/react/useEffect) и [useState](https://react.dev/reference/react/useState)
- про [React.memo](https://react.dev/reference/react/memo)

---

Пишем на typescript простой, переиспользуемый пагинатор для React приложения. Покрываем его тестам на Jest.

### План действий

Весь план действий будет состоять из 5 последовательных этапов:

0. Инициализируем приложение
1. Пишем компонент контейнер и определяем логику получения данных
2. Пишем сам пагинатор
3. Соединяем все вместе
4. Пишем тесты на наш компонент

Итак, поехали!

### Инициализация приложения

Минимум действий: берём [create-react-app](https://create-react-app.dev/) с шаблоном typescript и разворачиваем приложение.

```BASH
  npx create-react-app my-app --template typescript
```

### Как ходим за данными

Данные будем хранить в компоненте контейнере. Он будет следить за состоянием, вызывать метод api и прокидывать обновлённые данные вниз (в наш будущий компонент).

Подтягивать данные будем традиционно с использованием хука [useEffect](https://react.dev/reference/react/useEffect), а сохранять данные с помощью [useState](https://react.dev/reference/react/useState).

```jsx
import React, { useEffect, useState, useCallback } from 'react';

import api from './api';
import type { RESPONSE_DATA } from './api';

import './App.css';

function App() {
  const [data, setData] = useState<RESPONSE_DATA | null>(null);
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get.data(page);
        setData(response);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Unknown Error: api.get.data'
        );
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  return <div className='App'>...</div>;
}

export default App;
```

Api модуль может быть любым, но если лень придумывать, то ориентировочную реализацию можно посмотреть в другой моей статье: [Github pages для pet проектов](https://habr.com/ru/articles/732546/) в разделе **API модуль**.

А про типизацию **catch** блока в typescript можно почитать [здесь](https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript).

### Пишем компонент

Контейнер у нас уже есть, теперь напишем простой визуальный [Stateless](https://testsuite.io/react-stateless-function-components#:~:text=A%20stateless%20function%20component%20is,return%20JSX%20as%20an%20output.) компонент.

#### Properties

Для начала опредлим, что именно должен делать наш пагинатор.

Наш компонент должен:

- уметь уведомлять родительский компонент о том, что произошло событие пагинации
- уметь отключать кнопки переключения в граничных условиях
- уметь отображать наше текущее положение среди всех доступных страниц

Последний пункт становится актуальным в случае если, api предоставляет информацию о конечном количестве элементов. Однако некоторые api такой возможности не имеют (например, когда содержимое базы данных постоянно изменяется).

Переведём все наши требования на typescript и опишем интерфейс взаимодействия с нашим компонентом:

```jsx
type PaginationProps = {
  onNextPageClick: () => void;
  onPrevPageClick: () => void;
  disable: {
    left: boolean;
    right: boolean;
  };
  nav?: {
    current: number;
    total: number;
  };
};
```

#### Стилизация

Для стилизации будем использовать css modules. Поскольку в основе приложения лежит react-create-app с шаблоном ts, то поддержка css modules у нас уже реализована из коробки. Нам достаточно только импортировать стили в компонент и применять к элементам:

```jsx
  import Styles from './index.module.css';
  ...

  <div className={Styles.paginator}>...</div>
```

#### Вёрстка

Сам же render компонента будет представлять из себя весьма тривиальный набор из двух кнопок и блока навигации. Навигация будет "спрятана" за [условным рендерингом](https://react.dev/learn/conditional-rendering).  
Для оптимизации обернём компонент в [React.memo](https://react.dev/reference/react/memo)

```jsx
import React from 'react';

import Styles from './index.module.css';

type PaginationProps = {
  onNextPageClick: () => void;
  onPrevPageClick: () => void;
  disable: {
    left: boolean;
    right: boolean;
  };
  nav?: {
    current: number;
    total: number;
  };
};

const Pagination = (props: PaginationProps) => {
  const { nav = null, disable, onNextPageClick, onPrevPageClick } = props;

  const handleNextPageClick = () => {
    onNextPageClick();
  };
  const handlePrevPageClick = () => {
    onPrevPageClick();
  };

  return (
    <div className={Styles.paginator}>
      <button
        className={Styles.arrow}
        type="button"
        onClick={handlePrevPageClick}
        disabled={disable.left}
      >
        {'<'}
      </button>
      {nav && (
        <span className={Styles.navigation} >
          {nav.current} / {nav.total}
        </span>
      )}
      <button
        className={Styles.arrow}
        type="button"
        onClick={handleNextPageClick}
        disabled={disable.right}
      >
        {'>'}
      </button>
    </div>
  );
};

export default React.memo(Pagination);
```

### Соединяем контейнер и пагинатор

Пишем обработчики и прокидываем состояние в компонент пагинатора.

```jsx
const ROWS_PER_PAGE = 10;

const getTotalPageCount = (rowCount: number): number =>
  Math.ceil(rowCount / ROWS_PER_PAGE);

const handleNextPageClick = useCallback(() => {
  const current = page;
  const next = current + 1;
  const total = data ? getTotalPageCount(data.count) : current;

  setPage(next <= total ? next : current);
}, [page, data]);

const handlePrevPageClick = useCallback(() => {
  const current = page;
  const prev = current - 1;

  setPage(prev > 0 ? prev : current);
}, [page]);
```

В обработчиках находится логика, которая и будет в конечном счёте определять, какую именно страницу будем рендерить. Это в свою очередь будет уже тригерить запрос данных и изменение состояния пагинатора.

#### Итого

Осталось только подключить наш компонент **Pagination** и наш компонент контейнер:

```jsx
import React, { useEffect, useState, useCallback } from 'react';

import api from './api';
import type { RESPONSE_DATA } from './api';

import Pagination from './components/pagination';

import './App.css';

const ROWS_PER_PAGE = 10;

const getTotalPageCount = (rowCount: number): number =>
  Math.ceil(rowCount / ROWS_PER_PAGE);

function App() {
  const [data, setData] = useState<RESPONSE_DATA | null>(null);
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get.data(page);
        setData(response);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Unknown Error: api.get.data'
        );
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  const handleNextPageClick = useCallback(() => {
    const current = page;
    const next = current + 1;
    const total = data ? getTotalPageCount(data.count) : current;

    setPage(next <= total ? next : current);
  }, [page, data]);

  const handlePrevPageClick = useCallback(() => {
    const current = page;
    const prev = current - 1;

    setPage(prev > 0 ? prev : current);
  }, [page]);

  return (
    <div className='App'>
      {data?.list ? (
        <ul>
          {data.list.map((item, index) => (
            <li key={index}>{`${item.name}`}</li>
          ))}
        </ul>
      ) : (
        'no data'
      )}
      {data && (
        <Pagination
          onNextPageClick={handleNextPageClick}
          onPrevPageClick={handlePrevPageClick}
          disable={{
            left: page === 1,
            right: page === getTotalPageCount(data.count),
          }}
          nav={{ current: page, total: getTotalPageCount(data.count) }}
        />
      )}
    </div>
  );
}

export default App;
```

Мы закончили с логикой. Наш компонент может как изменять состояние контейнера, так и реагировать на изменение этого состояния. Так же мы предусмотрели режим работы без навигации.

Дело осталось за малым - написать парочку тестов и приобрести окончательную уверенность в нашем компоненте при его повторном использовании)

### Покрываем тестами

Компонент у нас достаточно простой, поэтому тестировать будем только 3 аспекта работы нашего компонента:

- вызов **onClick** обработчиков при нажатии на стрелки
- простановку **disable** атрибутов на стрелках пагинатора в граничных состояниях
- коректуню работу **условного рендеринга** навигации

#### Структура теста

В целом каждый тест будет организован по следующему алгоритму:

- рендерим компонент
- ищем нужный нам элемент компонента
- производим действие: клик, вызов функции или что-то ещё
- проводим проверку.

За рендеринг отвечает метод **render**. Метод **screen** поможет нам найти элементы после рендера. В нашем случае будем использовать **screen.getByTestId()**  
А методы **fireEvent** дадут нам возможность имитировать события реального пользователя.

Все эти объекты мы берём из **[@testing-library](https://habr.com/users/testing-library)**:

```jsx
import { render, fireEvent, screen } from "@testing-library/react";
```

Подробнее можно посмотреть на примерах и в документации [@testing-library/react](https://testing-library.com/docs/react-testing-library/example-intro)

PS:  
Всё первоначальные настройки для запуска тестов у нас уже есть из коробки [create-react-app](https://create-react-app.dev/docs/running-tests/)

#### Добавляем тестовые атрибуты

Для того, чтобы мы могли идентифицировать в тесте наши элементы есть хороший способ - поиск по атрибуту.  
На самом деле способов очень много (поиск по роли, тексту и т.д), но для простоты и наглядности будем использовать именно атрибуты.

Итак, добавляем на нужные нам элементы атрибут **data-testid** с уникальным значением.  
Желательно, чтобы значение атрибута было уникально не только в рамках компонента, но и в рамках любого контекста, где он (компонент) будет применятся.

```jsx
const Pagination = (props: PaginationProps) => {
  return (
    <div className={Styles.paginator}>
      <button
        className={Styles.arrow}
        ...
        data-testid="pagination-prev-button"
      >
        {'<'}
      </button>
      {nav && (
        <span className={Styles.navigation} data-testid="pagination-navigation">
          {nav.current} / {nav.total}
        </span>
      )}
      <button
        className={Styles.arrow}
        ...
        data-testid="pagination-next-button"
      >
        {'>'}
      </button>
    </div>
  );
};

export default React.memo(Pagination);
```

#### Тестируем простановку атрибутов disabled

Здесь нам нужно воспользоваться методом **toHaveAttribute**.

```jsx
import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";

import Pagination from "../../src/components/pagination";

describe("React component: Pagination", () => {
  it('Должен проставляться атрибут [disabled] для кнопки "назад", если выбрана первая страница', async () => {
    render(
      <Pagination
        disable={{
          left: true,
          right: false,
        }}
        onPrevPageClick={jest.fn()}
        onNextPageClick={jest.fn()}
      />,
    );

    const prevButton = screen.getByTestId("pagination-prev-button");
    expect(prevButton).toHaveAttribute("disabled");
  });

  it('Должен проставляться атрибут [disabled] для кнопки "вперёд", если выбрана последняя страница', async () => {
    render(
      <Pagination
        disable={{
          left: false,
          right: true,
        }}
        onPrevPageClick={jest.fn()}
        onNextPageClick={jest.fn()}
      />,
    );

    const nextButton = screen.getByTestId("pagination-next-button");
    expect(nextButton).toHaveAttribute("disabled");
  });
});
```

#### Тестируем условный рендеринг навигации

Нам понадобится метод [toThrow](https://jestjs.io/docs/26.x/expect#tothrowerror), а в сам expect мы передадим функцию, а не переменную.

```jsx
describe('React component: Pagination', () => {
  it('Должен проставляться атрибут [disabled] для кнопки "назад", если выбрана первая страница', async () => {...});
  it('Должен проставляться атрибут [disabled] для кнопки "вперёд", если выбрана последняя страница', async () => {...});

  it('Не должна отображаться навигация "<текущая страница>/<все страницы>" если не предоставлен соответствующий пропс "nav"', async () => {
    render(
      <Pagination
        disable={{
          left: false,
          right: false,
        }}
        onPrevPageClick={jest.fn()}
        onNextPageClick={jest.fn()}
      />
    );

    expect(() => screen.getByTestId('pagination-navigation')).toThrow();
  });
});

```

#### Тестируем работу коллбэков

Здесь нам нужно воспользоваться методом **toHaveBeenCalledTimes**.

```jsx
import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';

import Pagination from '../../src/components/pagination';

describe('React component: Pagination', () => {
  it('Должен проставляться атрибут [disabled] для кнопки "назад", если выбрана первая страница', async () => {...});
  it('Должен проставляться атрибут [disabled] для кнопки "вперёд", если выбрана последняя страница', async () => {...});
  it('Не должна отображаться навигация "<текущая страница>/<все страницы>" если не предоставлен соответствующий пропс "nav"', async () => {...});

  it('Должен вызываться обработчик "onPrevPageClick" при клике на кнопку "назад"', async () => {
    const onPrevPageClick = jest.fn();

    render(
      <Pagination
        disable={{
          left: false,
          right: false,
        }}
        onPrevPageClick={onPrevPageClick}
        onNextPageClick={jest.fn()}
      />
    );

    const prevButton = screen.getByTestId('pagination-prev-button');
    fireEvent.click(prevButton);

    expect(onPrevPageClick).toHaveBeenCalledTimes(1);
  });

  it('Должен вызываться обработчик "onNextPageClick" при клике на кнопку "вперёд"', async () => {
    const onNextPageClick = jest.fn();

    render(
      <Pagination
        disable={{
          left: false,
          right: false,
        }}
        onPrevPageClick={jest.fn()}
        onNextPageClick={onNextPageClick}
      />
    );

    const nextButton = screen.getByTestId('pagination-next-button');
    fireEvent.click(nextButton);

    expect(onNextPageClick).toHaveBeenCalledTimes(1);
  });
});

```
