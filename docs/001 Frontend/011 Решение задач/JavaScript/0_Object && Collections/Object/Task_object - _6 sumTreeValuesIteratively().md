---
title: sumTreeValuesIteratively()
draft: false
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#object"
  - "#while"
  - "#unknownINC"
---
```JS
// Написать функцию, которая суммирует все значения дерева. 12 + 24 +
// 24 + 15 + 13 + 23 = 111 Делать рекурсией запрещено законом +
// вложенность может быть любая

// while, pop, push

const tree = {
    val: 12,
    left: {
        val: 24,
        left: {
            val: 24,
        },
        right: {
            val: 15,
        },
    },
    right: {
        val: 13,
        left: {
            val: 23,
        },
    },
};

function sumTreeValuesIteratively(tree) {
	// Ваш код здесь
}

console.log(sumTreeValuesIteratively(tree));
```

___

[[011 Решение задач JS, TS и React|Назад]]