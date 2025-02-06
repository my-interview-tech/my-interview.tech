---
title: createIncrement()
draft: false
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#замыкание"
  - "#БКС"
---
```js
//! что будет в консоли и как исправить вывод значения с правильным value

const createIncrement = (from) => {
    let value = from;

    const increment = () => {
        value += 1;
        console.log(value); //
    };

    const message = `current - ${value}`;

    const log = () => {
        console.log(message); //
    };

    return [increment, log];
};

const [increment, log] = createIncrement(0);

increment();
increment();

log()

```

___

[[011 Решение задач JS, TS и React|Назад]]