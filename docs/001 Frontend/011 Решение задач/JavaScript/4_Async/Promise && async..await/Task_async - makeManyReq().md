---
title: makeManyReq()
draft: false
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#promise"
  - "#promiseAllSettled"
  - "#технологияДоверия"
---
```js
// Дан список ссылок и функция запроса
// Необходимо реальзовать процедуру запроса всех сылок из списка
// если одна ссылка выполнится с ошибкой то вернется ошибка,


function makeManyReq() {
    const urls = ["https://yandex.ru", "https://mail.ru", "https://rambler.ru"];

    function fetchUrl(url) {
        return Promise.resolve(`Succses ${url}`);
    }

    // Ваш код здесь

}
```


___

[[011 Решение задач JS, TS и React|Назад]]