---
title: getFlattenedFilePaths()
draft: false
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#object"
  - "#unknownINC"
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

const getFlattenedFilePaths = (arr, divider = "") => {
	// Ваш код здесь
};
```

___

[[011 Решение задач JS, TS и React|Назад]]