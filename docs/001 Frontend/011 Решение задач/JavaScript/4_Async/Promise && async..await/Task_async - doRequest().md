---
title: doRequest()
draft: false
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#promise"
  - "#itOne"
---
```js
// реализовать функцию, которая делать сетевой запрос, если запрос завершается ошибкой - повторяет попытку через секунду.
// И так три раза. 
// После трех неудачных попыток - завершается ошибкой. Или возвращает успешный результат.

function runWithRetry(url, times = 3) {
  return new Promise((resolve, reject) => {
    const doRequest = (attempt) => {
      fetch(url)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Network response was not ok');
          }
        })
        .then((data) => {
          // Действия при успешном выполнении запроса
          resolve(data);
        })
        .catch((error) => {
          // Действия при возникновении ошибки
          if (attempt < times) {
            setTimeout(() => doRequest(attempt + 1), 1000);
          } else {
            reject(error);
          }
        });
    };

    doRequest(1);
    
  });
}

runWithRetry('https://api.openweathermap.org/data/2.5/weather?q=moscow', 3)
  .then((response) => {
    console.log(response);
  })
  .catch((err) => {
    console.log('Error:', err.message);
  });
```

___

[[011 Решение задач JS, TS и React|Назад]]