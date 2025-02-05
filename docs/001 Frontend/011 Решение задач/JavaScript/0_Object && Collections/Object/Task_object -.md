---
title: Task_object -
draft: false
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#object"
---
```js
/**
 
Преобразовать исходную струкруту данных к структуре следующего вида:
const result = [
{ key: "А", totalCount: 700, cities: ["Астана"] },
{ key: "З", totalCount: 500, cities: ["Загреб"] },
{ key: "Л", totalCount: 500, cities: ["Лиссабон", "Лондон"] },
{ key: "М", totalCount: 700, cities: ["Магадан", "Москва"] },
{ key: "Н", totalCount: 800, cities: ["Новосибирск"] },
{ key: "Т", totalCount: 400, cities: ["Тверь"] }
];
где
key - первый символ названия города,
totalCount - сумма значений count для всех городов
cities - массив названий городов.
*
Значения в массиве results должны быть отсортированы по key
Значения в массивах cities должны быть отсортированы
*/

const data = {
    Москва: { count: 100 },
    Лондон: { count: 200 },
    Лиссабон: { count: 300 },
    Тверь: { count: 400 },
    Загреб: { count: 500 },
    Магадан: { count: 600 },
    Астана: { count: 700 },
    Новосибирск: { count: 800 }
};
```

<details>
  <summary>Нажмите, чтобы увидеть код</summary>

```js
const data = {
  Москва: { count: 100 },
  Лондон: { count: 200 },
  Лиссабон: { count: 300 },
  Тверь: { count: 400 },
  Загреб: { count: 500 },
  Магадан: { count: 600 },
  Астана: { count: 700 },
  Новосибирск: { count: 800 }
};

function countryData(data) {
  const result = [];
  const obj = {};
  
  for (let key in data) {
    const char = key[0].toUpperCase();
    if (obj[char]) {
      obj[char].totalCount += data[key].count;
      obj[char].cities.push(key);
    } else {
      obj[char] = {
        key: char,
        totalCount: data[key].count,
        cities: [key]
      };
    }
  }
  
  for (let key in obj) {
    obj[key].cities.sort();
    result.push(obj[key]);
  }
  
  
}
  

console.log(countryData(data))
```

```js
const transformCities = (data) => {
    if (data?.length) {
        return null
    }

    const transformToArray = Object.entries(data)
    const aloneCities = transformToArray.map((el) => {
        return { key: el[0][0], count: el[1].count, city: [el[0]]
    }})
    
    const accArrOfCities = aloneCities.reduce((acc, { key, count, city }) => {
        if (!acc[key]) {
            acc[key] = { key, totalCount: 0, cities: [] };
        }
        acc[key].totalCount += count;
        acc[key].cities.push(...city);

        return acc
    }, [])



    return Object.values(accArrOfCities).sort((a, b) => a.key.localeCompare(b.key))
}

```

</details>

___

[[011 Решение задач JS, TS и React|Назад]]