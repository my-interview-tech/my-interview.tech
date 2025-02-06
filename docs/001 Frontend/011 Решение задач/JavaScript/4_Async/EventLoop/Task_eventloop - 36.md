---
title: Task_eventloop - 36
draft: false
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#itOne"
---
```js
console.log(1)

const p = new Promise((resolve, reject) => {
    console.log(2)
    resolve(3)
})

console.log(4)

setTimeout(() => console.log(5), 0)

console.log(6)

for (let i = 0; i < 10; i++) {
    p.then(res => {
        console.log({i, res})
        return {i, res}
    })
}

console.log(7)
```

___

[[011 Решение задач JS, TS и React|Назад]]