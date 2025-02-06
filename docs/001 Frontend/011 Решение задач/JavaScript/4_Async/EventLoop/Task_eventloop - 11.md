---
title: Task_eventloop - 11
draft: false
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#EventLoop"
  - "#unknownINC"
---
```js
const asyncMethod = (el) => {
  return new Promise((resolve) => setTimeout(() => resolve((el*2)),0));
}

const someMethod = (data) => {
  const results = [];
  
  data.forEach(async (el) => {
    let r = await asyncMethod(el);
    console.log(r, el)
    results.push(r);
  })
  return results;
}

const start = () => {
  const results = someMethod([1, 2, 4]);
  if(results instanceof Promise) {
    results.then(res => console.log(res))
  } else {
    console.log(results);
  }
}

start();
```

___

[[011 Решение задач JS, TS и React|Назад]]