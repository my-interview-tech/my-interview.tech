---
uid: NK9f9YFR3jm8mKHs0Of30
title: Task_object - flutter()_1
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#object"
  - "#unknownINC"
draft: false
technology: Решение задач
specialty: Frontend
tools: []
order: 0
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

```js
//ЕСТЬ СТРУКТУРА ДАННЫХ

const structure = [
  "a.js",
  "b.js",
  {
    src: [
      "some.js",
      "other.js",
      {
        components: [
          "someComponent.js",
          {
            input: ["input.js"],
          },
        ],
      },
    ],
  },
];

/*
ФУНКЦИЯ ДОЛЖНА ВЕРНУТЬ 

[
  'a.js',
  'b.js',
  'src/some.js',
  'src/other.js',
  'src/components/someComponent.js'
]
*/

// РЕШЕНИЕ

const flutter = (arr, divider = "") => {
  // Ваш код здесь
};
```

\*\*Ответ

#### Моё решение

```js
const flutter = (structure, divider = "", stack = []) => {
  for (let file of structure) {
    if (typeof file === "string") {
      stack.push(divider + file);
    } else if (typeof file === "object") {
      const key = Object.keys(file)[0];
      const value = file[key];
      stack = flutter(value, `${divider}${key}/`, stack);
    }
  }
  return stack;
};

console.log(flutter(structure, ""));
```

#### Предоставленное решение

```js
const flutter = (arr, divider = "") => {
  let res = [];

  arr.forEach((element) => {
    if (typeof element === "string") {
      res.push(divider + element);
    } else {
      let keyArr = Object.keys(element).join("");
      divider += keyArr + "/";

      res.push(...flutter(element[keyArr], divider));
    }
  });

  return res;
};
```

---

[[011 Решение задач JS, TS и React|Назад]]
