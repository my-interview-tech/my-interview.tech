---
uid: y0oSL1yEt4ub-7Th_8fJY
title: Что такое React Query
tags:
  - "#React"
  - "#reactQuery"
  - "#useQuery"
info:
  - "https://habr.com/ru/articles/557620/"
  - "https://reactdev.ru/libs/react-query/"
  - "https://habr.com/ru/articles/758360/"
draft: false
technology: State Managers
specialty: Frontend
tools: []
order: 0
access: free
created_at: "2026-01-18T15:03:38.095Z"
updated_at: "2026-01-18T15:03:38.095Z"
---

**React Query** - библиотека для получения, кэширования, синхронизации и обновления "серверного" состояния в React-приложениях.

```bash
yarn add react-query
# или
npm i react-query
```

Ключевыми концепциями `React Query` являются:

- Запросы (queries)
- Мутации (mutations)
- Инвалидация (аннулирование, признание недействительным) запроса (query invalidation), его кэша

Библиотека `react-query` позволяет работать запросами к серверу, предоставляет доступ данным, позволяет задавать порядок запросов.. Однако для того чтобы с этим работать надо разделить весь стэйт который есть в redux на 2 части. Первая — это как раз данные, полученные с сервера. Вторая — это все остальное.

Подключается  примерно так:

```jsx
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
 
import { CitiesProvider } from './store/cities/cities-provider';
 
const queryClient = new QueryClient();
 
ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <CitiesProvider>
        <App />
```

Простой пример использования:

```jsx
const queryCities = useQuery("cities", fetchCitiesFunc);
const cities = queryCities.data || [];
```

Первый параметр `'cities'` это ключ строка, которая должна быть уникальной для каждого запроса. Второй - это функция, которая возвращает Promise, который резолвит данные или отдает ошибку. Также можно передать третьим параметром объект с настройками.

_`useQuery()` возвращает объект `UseQueryResult()`, который содержит данные о состоянии запроса, ошибку или данные_

```jsx
const { isLoading, isIdle, isError, data, error } = useQuery(..
```

Для выполнения последовательных запросов мне показалось удобным написать отдельный хук

```jsx
export function useCurrentWeather(): WeatherCache {
  const { currentCity } = useContext(СitiesContext);
 
 // запрашиваем список городов
  const queryCities = useQuery('cities', fetchCitiesFunc, {
     refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 1000,
  });
  const citiesRu = queryCities.data || [];
 
// ищем идентификатор текущего города.. 
 const city = citiesRu.find((city) => {
    if (city === undefined) return false;
    const { id: elId } = city;
    if (currentCity === elId) return true;
    return false;
  });
 
  const { id: weatherId } = city ?? {};
 
 // запрашиваем текущую погоду
  const queryWeatherCity = useQuery(
    ['weatherCity', weatherId],
    () => fetchWeatherCityApi(weatherId as number),
    {
      enabled: !!weatherId,
      staleTime: 5 * 60 * 1000,
    },
  );
 
  const { coord } = queryWeatherCity.data ?? {};
 
 // запрашиваем прогноз по координатам из предыд. запроса
  const queryForecastCity = useQuery(
    ['forecastCity', coord],
    () => fetchForecastCityApi(coord as Coord),
    {
      enabled: !!coord,
      staleTime: 5 * 60 * 1000,
    },
  );
 
  return {
    city,
    queryWeatherCity,
    queryForecastCity,
  };
}
```

У `react-query` есть возможность вывести окошко инструментов разработчика. Оно немного похоже на окно Redux, но появляется в виде фиксированного окошка поверх приложения(можно закрыть и останется только кнопка)

![Окно инструментов разработчика](https://habrastorage.org/r/w1560/getpro/habr/upload_files/382/d0a/9d3/382d0a9d362867d2f527b1187488b829.png "Окно инструментов разработчика")

- `useQueries` позволяет динамически формировать массив запросов. Это нужно т.к. мы не можем опционально вызывать хуки `useQuery`.

```jsx
const userQueries = useQueries(
  users.map(user => {
    return {
      queryKey: ['user', user.id],
      queryFn: () => fetchUserById(user.id),
    }
  })
```

---

[[004 State Managers|Назад]]
