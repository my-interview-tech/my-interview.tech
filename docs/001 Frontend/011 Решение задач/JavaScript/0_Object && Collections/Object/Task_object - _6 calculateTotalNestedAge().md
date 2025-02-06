---
title: calculateTotalNestedAge()
draft: false
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#object"
  - "#recursion"
---
```js
function calculateTotalNestedAge(user) {
	// Ваш код здесь
}

const user1 = {
    name: "Петр",
    age: 49,
    children: [
        {
            name: "Ника",
            age: 25,
            children: [
                {
                    name: "Андрей",
                    age: 3,
                },
                {
                    name: "Олег",
                    age: 1,
                },
            ],
        },
        {
            name: "Александр",
            age: 22,
        },
    ],
};

console.log(calculateTotalNestedAge(user1)); // 100
```

___

[[011 Решение задач JS, TS и React|Назад]]