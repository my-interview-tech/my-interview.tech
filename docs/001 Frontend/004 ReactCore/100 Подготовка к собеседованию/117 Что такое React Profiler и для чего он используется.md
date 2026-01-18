---
uid: oe7U1IczG-ncxyQj6gtI8
title: Что такое React Profiler и для чего он используется?
tags:
  - "#React"
  - "#Profiler"
  - "#onRender"
info:
  - "https://habr.com/ru/companies/ruvds/articles/497988/"
  - >-
    https://ru.legacy.reactjs.org/blog/2018/09/10/introducing-the-react-profiler.html
  - "https://deadsimplechat.com/blog/react-profiler/"
  - "https://my-js.org/blog/react-18/"
draft: false
technology: ReactCore
specialty: Frontend
tools: []
order: 117
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

Первым делом переходим во вкладку `network` и смотрим на время получения ответа с сервера, если отклик большой, то передаём таску на бэк, если нет, то анализируем проблему в `Profiler` и `Performance`.

[API React Profiler](https://reactjs.org/docs/profiler.html) предназначен для оценки скорости работы рендеринга и помогает выявлять узкие места производительности приложений.

```jsx
import React, { Fragment, unstable_Profiler as Profiler } from "react";
```

Компонент `Profiler` принимает коллбэк `onRender` в виде свойства. Он вызывается каждый раз, когда компонент в профилируемом дереве фиксирует обновление.

```jsx
const Movies = ({ movies, addToQueue }) => (
  <Fragment>
    <Profiler id="Movies" onRender={callback}>
```

Коллбэк `onRender` принимает параметры, которые описывают то, что рендерится, и время, необходимое на рендеринг. Сюда входит следующее:

- `id`: Свойство `id` из дерева компонента `Profiler`, для которого было зафиксировано изменение.
- `phase`: или `mount` (если дерево было смонтировано), или `update` (если дерево было повторно отрендерено).
- `actualDuration`: время, затраченное на рендеринг зафиксированного обновления.
- `baseDuration`: предполагаемое время рендеринга всего поддерева без кеширования.
- `startTime`: время, когда React начал рендерить это обновление.
- `commitTime`: время, когда когда React зафиксировал это обновление.
- `interactions`: множество «взаимодействий» для данного обновления.

```jsx
const callback = (id, phase, actualTime, baseTime, startTime, commitTime) => {
  console.log(`${id}'s ${phase} phase:`);
  console.log(`Actual time: ${actualTime}`);
  console.log(`Base time: ${baseTime}`);
  console.log(`Start time: ${startTime}`);
  console.log(`Commit time: ${commitTime}`);
};
```

Загрузим страницу и перейдём в консоль инструментов разработчика Chrome. Там мы должны увидеть следующее.

![](https://habrastorage.org/r/w1560/getpro/habr/post_images/cc8/baf/9c9/cc8baf9c9500419f587874bae69acf96.jpg)

Мы, кроме того, можем открыть инструменты разработчика React, перейти на закладку `Profiler` и визуализировать сведения о времени рендеринга компонентов. Ниже показана визуализация этого времени в виде flame-графика.

![](https://habrastorage.org/r/w1560/getpro/habr/post_images/c56/138/d61/c56138d6154866df33b45014966aa2cb.jpg)

Мне, кроме того, нравится использовать тут режим просмотра `Ranked`, где приводится упорядоченное представление данных. В результате компоненты, на рендеринг которых уходит больше всего времени, оказываются в верхней части списка.

![](https://habrastorage.org/r/w1560/getpro/habr/post_images/224/324/1b6/2243241b6de115dbbd7c0a94270d3868.jpg)

Кроме того, для проведения измерений в разных частях приложения можно воспользоваться несколькими компонентами `Profiler`:

```jsx
import React, { Fragment, unstable_Profiler as Profiler } from "react";

render(
  <App>
        
    <Profiler id="Header" onRender={callback}>
            
      <Header {...props} />
          
    </Profiler>
        
    <Profiler id="Movies" onRender={callback}>
            
      <Movies {...props} />
          
    </Profiler>
      
  </App>,
);
```

А как проанализировать взаимодействия пользователей с компонентами?

---

[[004 ReactCore|Назад]]
