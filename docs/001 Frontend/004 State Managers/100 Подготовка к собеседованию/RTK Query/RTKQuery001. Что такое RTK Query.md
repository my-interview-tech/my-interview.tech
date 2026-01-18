---
uid: 6SKxNOfCzgNloUne1fH0y
title: Что такое RTK Query?
tags:
  - React
  - RTK-Query
  - redux-toolkit
info:
  - "https://redux-toolkit.js.org/tutorials/rtk-query"
  - "https://habr.com/ru/companies/alfa/articles/705640/"
  - "https://habr.com/ru/companies/domrf/articles/736336/"
draft: false
technology: State Managers
specialty: Frontend
tools: []
order: 0
access: free
created_at: "2026-01-18T15:03:38.095Z"
updated_at: "2026-01-18T15:03:38.095Z"
---

\*\*Введение

**RTK Query** — это мощный инструмент для получения и кэширования данных. _Он предназначен для упрощения распространенных случаев загрузки данных в веб-приложении, избавляя от необходимости вручную писать логику загрузки и кэширования данных._

`RTK Query` — это дополнительный аддон, включенный в пакет `Redux Toolkit`, и его функциональность построена поверх других API в Redux Toolkit.

\*\*Особенности `RTK Query`

- Под капотом RTK Query использует `createSlice` и `createAsyncThunk`, которые предоставляет API Redux Toolkit.
- В RTQ Query взаимодействие с API задается с помощью endpoint, которые определены в момент инициализации API (метод `createApi`, о котором пойдет речь ниже);
- RTK Query автоматически создает хуки, исходя из заданных эндпоинтов. Данные хуки могут быть использованы непосредственно в React компонентах для загрузки/отображения/изменения данных. Механизм взаимодействия с API инкапсулирован.
- RTK Query поддерживает кэширование из коробки.
- Позволяет решить проблему дедубликации запросов, например, если два компонента на одной странице совершают один и тот же запрос к API, выполнен будет лишь один запрос.

\*\*Недостатки `RTK Query`

- В реальном проекте может быть несколько файлов с различными блоками API, и в этом случае возникает вопрос, как связать всё вместе.
- Проблема решается тем, что все действия по загрузке, мутированию обновлению кэша, инвалидации в RTQ Query могут быть вызваны с использованием dispatch из любого места приложения.
- Система тегов непроста и не так прозрачна, как у альтернатив.

\*\*`RTK Query` на практике

Начнем с создания с так называемого `“API Slice”`, в котором определим базовый URL сервера и эндпоинты, с которым нужно будет взаимодействовать.

Определим три главных параметра:

1. `reducerPath`. Уникальный ключ, который будет добавлен в store
2. `baseQuery`. Параметр baseQuery отвечает за непосредственное взаимодействие с API. В состав RTK Query входит инструмент под названием `fetchBaseQuery`, представляющий собой легковесную обертку над fetch, подходящий для большинства операций по работе с API.
3. `endPoints`. Это набор взаимодействий с API. Существует два вида endpoint: query и mutation

```jsx
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const starWarsApi = createApi({
  reducerPath: "starWars",
  baseQuery: fetchBaseQuery({ baseUrl: "https://swapi.dev/api" }),
  endpoints: (builder) => ({
    // Define endpoints here
  }),
});
```

Как было указано выше, существует два вида endpoint: `query` и `mutation`. Зададим два query endpoint’а:

```jsx
endpoints: (builder) => ({
  getFilms: builder.query({
    query: () => `/films?format=json`,
  }),
  getFilmById: builder.query({
    query: (filmId) => `/films/${filmId}?format=json`,
  }),
});
```

В коде выше были добавлены два endpoint:

1. _getFilms_. Получение списка всех фильмов;
2. getFilmById. Получение одного фильма по его ID. В данном случае filmId представляет собой query параметр; при необходимости набор параметров можно расширить.

_Самое интересное начинается здесь._
Для каждого endpoint, объявленного выше, `RTK Query` автоматически генерирует хуки, которые могут быть использован в React компонентах для загрузки/изменения данных. Рассмотрим это на следующем примере:

![](https://habrastorage.org/r/w1560/getpro/habr/upload_files/ff2/d32/48b/ff2d3248b5b2bd04764a6c71e3085f43.png)

Как видно на изображении, *starWarsApi* после инициализации содержит в себе сгенерированные хуки. В зависимости от типов endpoint, название хуков будет содержать в себе либо *query*, либо *mutation*.

Финальная версия Star Wars API Slice выглядит следующим образом:

```jsx
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const starWarsApi = createApi({
  reducerPath: "starWars",
  baseQuery: fetchBaseQuery({ baseUrl: "https://swapi.dev/api" }),
  endpoints: (builder) => ({
    getFilms: builder.query({
      query: () => `/films?format=json`,
    }),
    getFilmById: builder.query({
      query: (filmId) => `/films/${filmId}?format=json`,
    }),
  }),
});
export const { useGetFilmsQuery, useGetFilmByIdQuery } = starWarsApi;
```

Метод createApi генерирует `reducer`, который должен быть добавлен в `store`. Также для обеспечения возможностей `RTK Query` (кэширование, инвалидация, polling и др.) необходимо добавить `middleware` как на примере ниже:

```jsx
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { starWarsApi } from "./services/starWarsApi";
export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [starWarsApi.reducerPath]: starWarsApi.reducer,
  }, // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(starWarsApi.middleware),
});
// optional, but required for refetchOnFocus/refetchOnReconnect behaviors

// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization

setupListeners(store.dispatch);
```

Настройка на этом завершена. Далее рассмотрим использование сгенерированных хуков в React компонентах.

```jsx
import { useGetFilmsQuery } from "../reduxStore/services/starWarsApi";
const FilmsList = () => {
  const { data, isLoading, error } = useGetFilmsQuery();
  return (
    <div>
              <h3>Star Wars Movies</h3>       {" "}
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <div>
                     {" "}
          {data.results.map((movie) => (
            <section item key={movie.episode_id} xs={4}>
                              <h2>{movie.title}</h2>               {" "}
              <p>{movie.opening_crawl}</p>             {" "}
            </section>
          ))}
                   {" "}
        </div>
      ) : null}
           {" "}
    </div>
  );
};
export default FilmsList;
```

Рассмотрим описанный код выше:

- Сначала мы просто импортировали хук *useGetFilmsQuery*
- При вызове хука useGetFilmsQuery будет автоматически производиться вызов к API для получения всех фильмов. Хук в свою очередь возвращает не только вышеуказанные значения, но и также ряд других полезных, таких как isFetching,  isError и другие.

![](https://habrastorage.org/r/w1560/getpro/habr/upload_files/682/e4c/1cc/682e4c1cc3c01fc1fbe1421ec8a96405.png)

1. Теперь не приходится создавать `action creators` для каждого запроса
2. Нет нужды создавать множество `reducers`
3. Обработка состояний запросов (isFetching, isError и др.) теперь производится автоматически
4. В React компонентах не нужно вызывать метод `dispatch` или использовать `селекторы` для взаимодействия со `store`

В результате количество написанного кода становится меньше, а его восприятие заметно улучшилось.

---

[[004 State Managers|Назад]]
