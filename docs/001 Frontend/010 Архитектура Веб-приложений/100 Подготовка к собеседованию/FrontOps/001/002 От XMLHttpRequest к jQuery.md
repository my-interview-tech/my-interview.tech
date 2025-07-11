---
title: От XMLHttpRequest к jQuery
draft: true
tags:
  - XMLHttpRequest
  - jQuery
info:
---
## Истоки: От XMLHttpRequest к jQuery

### Эра XMLHttpRequest

В начале 2000-х годов веб-разработчикам приходилось работать с XMLHttpRequest напрямую для выполнения асинхронных запросов:

```js
var xhr = new XMLHttpRequest();

xhr.open('GET', '/api/data', true);
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        var data = JSON.parse(xhr.responseText);
        // Обработка данных
    }
};
xhr.send();
```

Это было громоздко, подвержено ошибкам и требовало много boilerplate-кода для обработки различных состояний и ошибок.

### Революция jQuery

jQuery популяризировал Ajax-запросы, предоставив простой и элегантный API:

```js
$.ajax({
    url: '/api/data',
    type: 'GET',
    success: function(data) {
        // Обработка данных
    },
    error: function(xhr, status, error) {
        // Обработка ошибок
    }
});
```

jQuery не только упростил Ajax-запросы, но и решил проблемы совместимости между браузерами, что было критически важно в эпоху "браузерных войн".

___
