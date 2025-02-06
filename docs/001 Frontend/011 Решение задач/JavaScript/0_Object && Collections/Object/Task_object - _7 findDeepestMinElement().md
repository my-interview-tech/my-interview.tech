---
title: findDeepestMinElement()
draft: false
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#array"
  - "#СИБУР"
---
```js
// Написать функцию которая вернет наименьшее значение самого вложенного массива. 
/* 
Например из arr2 должно вернуться 100, так как самый вложенный массив содержит один элемент 100
const arr = [
    1,
    [
        [
            20, 
            1
        ],
        2
    ],
    [
        [
            -2
        ],
        [
            [
                100
            ]
        ]
    ]
]
*/

const arr2 = [1, [[20, 1], 2], [[-2], [[100]]]];

function findDeepestMinElement() {
	// Ваш код здесь
}


console.log(findDeepestMinElement(arr2)); // [deepestLevelNumber, deepestMinElement]
```


<details>
  <summary>Решение под спойлером</summary>

```js
const arr = [1, [[20, 1], 2], [[-2], [[100]]]];

function findDeepestMinElement(arr) {
    let counter = 1;
    let newArr
    
    for(let level of arr) {
        newArr = level
        if(typeof level !== 'number') {
            counter++
            console.log('Тест:', newArr, 'Вложенность:', counter)
            findDeepestMinElement(newArr)
        } 
    }

    return [counter, newArr]
}


console.log(findDeepestMinElement(arr)); // [deepestLevelNumber, deepestMinElement]
```
</details>

___

[[011 Решение задач JS, TS и React|Назад]]