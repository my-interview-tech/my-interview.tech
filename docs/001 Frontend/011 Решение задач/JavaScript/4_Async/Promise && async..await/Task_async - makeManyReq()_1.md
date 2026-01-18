---
uid: "-6_jodVAkaRXiC3-VfGMV"
title: Task_async - makeManyReq()_1
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#promise"
  - "#promiseAllSettled"
  - "#технологияДоверия"
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

\*\*Ответ

```js
// тогда нужно использовать allSettled

function makeManyReq() {
  const urls = ["https://yandex.ru", "https://mail.ru", "https://rambler.ru"];

  function fetchUrl(urls) {
    return Promise.resolve(`Succses ${urls}`);
  }
  const answer = urls.map((el) => fetchUrl(el));

  Promise.allSettled(answer).then(console.log).catch(console.error);
}

makeManyReq();
```

---

[[011 Решение задач JS, TS и React|Назад]]
