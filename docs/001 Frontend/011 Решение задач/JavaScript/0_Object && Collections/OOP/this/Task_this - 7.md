---
title: Task_this - 7
draft: false
tags:
  - "#JavaScript"
  - "#this"
  - "#taskJS"
---
```js
// Чему будет равен this в b1 и в b2 и почему ?
    
let a = {
    b1: function () {
        console.log(this);
    },
    b2: () => {
        console.log(this);
    },
};

a.b1();
a.b2();
```

**Ответ**

```js
let a = {
    b1: function () {
        console.log(this);
    },
    b2: () => {
        console.log(this);
    },
};

a.b1(); // a {}
a.b2(); // window{}
```

___

[[011 Решение задач JS, TS и React|Назад]]