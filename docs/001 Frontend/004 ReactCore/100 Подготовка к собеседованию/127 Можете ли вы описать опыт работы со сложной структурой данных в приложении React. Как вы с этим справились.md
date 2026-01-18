---
uid: APyz4lauugEeEwQ2FRafT
title: >-
  Можете ли вы описать опыт работы со сложной структурой данных в приложении
  React? Как вы с этим справились?
tags:
  - "#React"
  - "#HOC"
  - "#Lodash"
  - "#Debounce"
  - "#Throttle"
info:
  - "https://learn.javascript.ru/task/throttle"
draft: false
technology: ReactCore
specialty: Frontend
tools: []
order: 127
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

\*\*`Lodash`

Для работы со сложными структурами данных вам может потребоваться использовать такие методы, как сопоставление вложенных данных (маппинг, mapping), использование рекурсивных компонентов для визуализации данных с несколькими уровнями вложенности и оптимизация производительности с помощью таких методов, как `React.memo`. Также может быть полезно использовать библиотеки, такие как `lodash`, для управления и преобразования сложных структур данных. Например, функция `debounce` из библиотеки `lodash`, полезна для сокращения количества API запросов.

Очевидно, что в React существует множество способов обработки сложных структур данных. Вот несколько сценариев, в которых вам, возможно, придется более осторожно подходить к обработке и представлению данных.

- Вложенные структуры данных, такие как дерево или граф.
- Большие наборы данных, которые необходимо отображать и обрабатывать в виде таблицы или списка.
- Структуры данных со многими уровнями вложенности, например, объект JSON с несколькими уровнями вложенных объектов и массивов.
- Структуры данных, которые постоянно меняются, например, данные в режиме реального времени из прямой трансляции или подключения через веб-сокет.

[Lo-Dash](http://lodash.com/) — это полноценная замена[\*](https://github.com/bestiejs/lodash/wiki/Drop-in-Disclaimer) для [Underscore.js](http://underscorejs.org/). Lo-dash имеет более высокую производительность, избавлен от некоторых [багов](https://github.com/bestiejs/lodash#resolved-underscorejs-issues) underscore и даёт некоторые новые возможности.

![](https://habrastorage.org/r/w1560/storage2/48f/3eb/821/48f3eb8216f7ecfe03af1b5418d2f3b3.png)

- Поддержка [AMD-загрузчиков](http://habrahabr.ru/post/152833/) ([RequireJS](http://requirejs.org/), [curl.js](https://github.com/cujojs/curl), etc.)
- [`_.clone`](http://lodash.com/docs#clone) поддерживает *“глубокое”* клонирование
- [`_.forEach`](http://lodash.com/docs#forEach) поддерживает текучий интерфейс и остановку итерирования
- [`_.forIn`](http://lodash.com/docs#forIn) для итерирования по собственным и унаследованным свойствам объектов
- [`_.forOwn`](http://lodash.com/docs#forOwn) для итерирования только по собственным свойствам объекта
- [`_.isPlainObject`](http://lodash.com/docs#isPlainObject) проверяет, было ли значение создано с помощью конструктора `Object`
- [`_.lateBind`](http://lodash.com/docs#lateBind) для позднего связывания
- [`_.merge`](http://lodash.com/docs#merge) — *“глубокий”* аналог [`_.extend`](http://lodash.com/docs#extend)
- [`_.partial`](http://lodash.com/docs#partial) для карринга без связывания `this`
- [`_.pick`](http://lodash.com/docs#pick) и [`_.omit`](http://lodash.com/docs#omit) принимают аргументы `callback` и `thisArg`
- [`_.template`](http://lodash.com/docs#template) использует [sourceURLs](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl) для более простой отладки
- [`_.contains`](http://lodash.com/docs#contains), [`_.size`](http://lodash.com/docs#size), [`_.toArray`](http://lodash.com/docs#toArray), [и т.д.…](http://lodash.com/docs "_.countBy, _.every, _.filter, _.find, _.forEach, _.groupBy, _.invoke, _.map, _.pluck, _.reduce, _.reduceRight, _.reject, _.shuffle, _.some, _.sortBy, _.where") принимают и строки тоже

Поддержка индивидуальных сборок позволяет легко создавать облегчённые версии `Lo-Dash`, содержащие только необходимые вам методы. Также `Lo-Dash` поддерживает за вас зависимости методов и псевдонимы.

- Сборка, содержащая всё необходимое для работы [Backbone](http://backbonejs.org/), может быть создана с модификатором `backbone`.

```
  lodash backbone
```

- [Content Security Policy](http://en.wikipedia.org/wiki/Content_Security_Policy) сборка.
  ```
  lodash csp
  ```
- Сборка для старых браузеров без [поддержки ES5](http://es5.github.com/).
  ```
  lodash legacy
  ```
- Сборки для мобильных платформ, без баг-фиксов для IE < 9 и компиляции методов.
  ```
  lodash mobile
  ```
- Strict-сборки, с использованием [strict mode](http://es5.github.com/#C) для `_.bindAll`, `_.defaults`, and `_.extend`.
  ```
  lodash strict
  ```
- Underscore-сборка, для тех, кто уже используется Underscore в своих проектах.

  ```
  lodash underscore
  ```

- [Lo-Dash на Github](https://github.com/bestiejs/lodash/)
- [Установка Lo-Dash](http://lodash.com/#installation)
- [Документация API](http://lodash.com/docs)
- [Бенчмарки](http://lodash.com/benchmarks) + [еще бенчмарки на jsPerf.com](http://jsperf.com/search?q=lodash) *(в моём случае дают ускорение в 1.75 раз)*
- [Юнит-тесты](http://lodash.com/tests "Lo-Dash unit tests")

Подробнее: [Lo-Dash](https://habr.com/ru/companies/alawar/articles/157673/) , [Ссылка на методы Lodash](https://habr.com/ru/articles/217515/), [Хватит импортировать JavaScript-пакеты целиком](https://habr.com/ru/companies/ruvds/articles/502424/)

\*\*`Debounce`

Результатом декоратора `debounce(f, ms)` должна быть обёртка, которая передаёт вызов `f` не более одного раза в `ms` миллисекунд. Другими словами, когда мы вызываем `debounce`, это гарантирует, что все остальные вызовы будут игнорироваться в течение `ms`.

```js
let f = debounce(alert, 1000);

f(1); // выполняется немедленно
f(2); // проигнорирован

setTimeout(() => f(3), 100); // проигнорирован (прошло только 100 мс)
setTimeout(() => f(4), 1100); // выполняется
setTimeout(() => f(5), 1500); // проигнорирован (прошло только 400 мс от последнего вызова)
```

Пример написания кастомного хука `debounce` на React:

```jsx
import { useState, useEffect } from "react";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timerId);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Пример использования
const MyComponent = () => {
  const [inputValue, setInputValue] = useState("");
  const debouncedInputValue = useDebounce(inputValue, 500);

  useEffect(() => {
    // Выполнять действия при изменении задержанного значения
    console.log("Debounced value:", debouncedInputValue);
  }, [debouncedInputValue]);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={handleChange} />
    </div>
  );
};
```

_На практике `debounce` полезен для функций, которые получают/обновляют данные, и мы знаем, что повторный вызов в течение короткого промежутка времени не даст ничего нового. Так что лучше не тратить на него ресурсы._

Подробнее: [debounce](https://learn.javascript.ru/task/debounce)

\*\*`Throttle`

Декоратор `throttle(f, ms)`, возвращает обёртку, передавая вызов в `f` не более одного раза в `ms` миллисекунд. Те вызовы, которые попадают в период «торможения», игнорируются.

```js
function f(a) {
  console.log(a);
}

// f1000 передаёт вызовы f максимум раз в 1000 мс
let f1000 = throttle(f, 1000);

f1000(1); // показывает 1
f1000(2); // (ограничение, 1000 мс ещё нет)
f1000(3); // (ограничение, 1000 мс ещё нет)

// когда 1000 мс истекли ...
// ...выводим 3, промежуточное значение 2 было проигнорировано
```

Отличие от `debounce` – если проигнорированный вызов является последним во время «задержки», то он выполняется в конце.

Пример написания кастомного хука `throttle` на React:

```jsx
import { useState, useEffect } from "react";

const useThrottle = (value, delay) => {
  const [throttledValue, setThrottledValue] = useState(value);
  const [lastExecTime, setLastExecTime] = useState(Date.now());

  useEffect(() => {
    const timerId = setTimeout(() => {
      const now = Date.now();
      const timeSinceLastExec = now - lastExecTime;

      if (timeSinceLastExec >= delay) {
        setThrottledValue(value);
        setLastExecTime(now);
      }
    }, delay);

    return () => {
      clearTimeout(timerId);
    };
  }, [value, delay, lastExecTime]);

  return throttledValue;
};

// Пример использования
const MyComponent = () => {
  const [inputValue, setInputValue] = useState("");
  const throttledInputValue = useThrottle(inputValue, 500);

  useEffect(() => {
    // Выполнять действия при изменении ограниченного значения
    console.log("Throttled value:", throttledInputValue);
  }, [throttledInputValue]);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={handleChange} />
    </div>
  );
};
```

_Обычно используется для ограничения частоты выполнения определенных действий или обработки событий в React-компонентах._ Вот несколько распространенных примеров использования `useThrottle`:

1. Обработка событий ввода
2. Оптимизация обновлений компонента
3. Отправка запросов к API

---

[[004 ReactCore|Назад]]
