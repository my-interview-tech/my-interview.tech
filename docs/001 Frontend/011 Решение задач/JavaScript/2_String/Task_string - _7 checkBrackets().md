---
title: checkBrackets()
draft: false
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#RegExp"
  - "#string"
  - "#recursion"
  - "#БэллИнтегратор"
  - "#сбербанк"
  - "#Яндекс"
  - "#itOne"
---
```js
let s1 = "()";
let s2 = "()[]{}";
let s3 = "(]";
let s4 = "{[]}";
let s5 = "([)]";
let s6 = "{[[]{}]}()()";

function checkBrackets(str) {
 // Ваш код здесь
}

console.log(checkBrackets(s1)); // true
console.log(checkBrackets(s2)); // true
console.log(checkBrackets(s3)); // false
console.log(checkBrackets(s4)); // true
console.log(checkBrackets(s5)); // false
console.log(checkBrackets(s6)); // true
```

___

[[011 Решение задач JS, TS и React|Назад]]