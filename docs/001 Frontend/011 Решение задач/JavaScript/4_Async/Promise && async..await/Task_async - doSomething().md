---
title: doSomething()
draft: false
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#async"
  - "#unknownINC"
---
```js
/*
Вывести в консоль среднее время, за которое выполняются p1-p4 Обратите внимание, что doSomenthing() выполняется(предоставит время) в 50% случаев, а в остальных будет reject
*/

const doSomething = ms => {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            if(Math.random()<=0.5){
                reject("error")
            }
            else{
                resolve(ms)
            }
        }, ms)
    })
}

const getDelay = ()=> {
    let rand = 1000 + Math.random() * (2000);
    return Math.floor(rand);
}

const p1 = doSomething(getDelay());
const p2 = doSomething(getDelay());
const p3 = doSomething(getDelay());
const p4 = doSomething(getDelay());

```

___

[[011 Решение задач JS, TS и React|Назад]]