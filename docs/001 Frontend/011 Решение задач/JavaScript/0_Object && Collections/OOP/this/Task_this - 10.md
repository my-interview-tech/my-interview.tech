---
title: Task_this - 10
draft: false
tags:
  - JavaScript
  - "#this"
  - "#taskJS"
---
```js
const myObj = {
    a: 10,
    method1() {
        const printThis = () => console.log(this);
        printThis();
    },
    method2: () => {
        const printThis = () => console.log(this);
        printThis();
    },
};

myObj.method1() // 
myObj.method2() // 

const res = myObj.method1.call({ a: 1 }) // 
myObj.method2.call({a:1}) //
```

**Ответ**

```js
const myObj = {
  a: 10,
  method1() {
      const printThis = () => console.log(this);
      printThis();
  },
  method2: () => {
      const printThis = () => console.log(this);
      printThis();
  },
};

myObj.method1() //  myObj{}
myObj.method2() //  undefined

const res = myObj.method1.call({ a: 1 }) // {a : 1}
myObj.method2.call({a:1}) // undefined
```

___

[[011 Решение задач JS, TS и React|Назад]]