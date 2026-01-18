---
uid: 4kvboLawgoJA5b7Wb3rvK
title: Что такое XMLHttpRequest ?
tags:
  - "#JavaScript"
  - "#AJAX"
  - "#XMLHttpRequest"
  - "#HTTP"
  - "#HTTP-запрос"
  - "#GET"
  - "#POST"
  - "#PUT"
  - "#DELETE"
info:
  - "https://learn.javascript.ru/xmlhttprequest"
draft: false
technology: JSCore
specialty: Frontend
tools: []
order: 218
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

_XMLHttpRequest (`XHR`)_ - это объект в JavaScript, который позволяет отправлять HTTP-запросы к серверу и получать ответы на эти запросы без перезагрузки страницы. XMLHttpRequest является ключевой частью технологии AJAX и используется для создания динамических веб-приложений.

XMLHttpRequest был впервые реализован в Internet Explorer 5 и быстро стал стандартом для обмена данными между клиентом и сервером. Сейчас XMLHttpRequest поддерживается практически всеми современными браузерами.

С помощью _XMLHttpRequest можно отправлять различные типы запросов, такие как GET, POST, PUT, DELETE и другие, и получать ответы в различных форматах, таких как XML, HTML, JSON и другие. Кроме того, XMLHttpRequest позволяет отправлять запросы асинхронно, что позволяет обновлять содержимое веб-страницы без перезагрузки всей страницы._

Пример использования `XMLHttpRequest` в JavaScript для отправки GET-запроса на сервер и обработки ответа в формате JSON:

```javascript
const xhr = new XMLHttpRequest();
xhr.open("GET", "http://example.com/data.json");
xhr.onload = function () {
  if (xhr.status === 200) {
    const response = JSON.parse(xhr.responseText);
    console.log(response);
  } else {
    console.log("Ошибка получения данных");
  }
};
xhr.send();
```

В этом примере создается новый объект XMLHttpRequest, который отправляет GET-запрос на сервер для получения данных в формате JSON. После получения ответа от сервера, он обрабатывается в функции onload. Если статус ответа равен 200, то данные извлекаются из ответа и выводятся в консоль браузера. Если статус ответа не равен 200, то выводится сообщение об ошибке.

---

[[003 JSCore|Назад]]
