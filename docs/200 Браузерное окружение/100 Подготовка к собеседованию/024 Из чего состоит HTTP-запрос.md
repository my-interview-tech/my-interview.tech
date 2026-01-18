---
uid: h-KI-laim_Eiuvfs1WlZM
title: Из чего состоит `HTTP`-запрос?
tags:
  - HTTP
  - HTTP-запрос
  - browser
info:
  - "[[0089 HTTP простым языком|HTTP]]"
  - "[[0090 Обзор протокола HTTP|Обзор протокола HTTP]]"
draft: false
technology: Подготовка к собеседованию
specialty: "Frontend,Backend"
tools: []
order: 24
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

![[Pasted image 20230703190730.png|600]]

_HTTP-запрос_ состоит из трех основных частей: строки запроса (`request line`), заголовков запроса (`request headers`) и тела запроса (`request body`), который может отсутствовать в некоторых типах запросов.

1. _Строка запроса_ (`request line`) - это первая строка в HTTP-запросе, которая содержит три элемента: метод запроса (`HTTP-метод`), URI (`Uniform Resource Identifier`) и версию протокола HTTP. Например:

```http
    GET /index.html HTTP/1.1
```

2. _Заголовки запроса_ (request headers) - это набор строк, которые передаются после строки запроса и содержат метаданные о запросе, такие как тип и длина содержимого, тип и версия браузера, язык пользователя и т.д. Заголовки разделяются символом перевода строки (CRLF). Например:

```http
Host: www.example.com
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
```

3. _Тело запроса_ (`request body`) - это необязательная часть запроса, которая содержит данные, передаваемые на сервер. Тело запроса может использоваться в запросах типа POST, PUT, DELETE и т.д. Например:

```http
    POST /form.php HTTP/1.1
    Host: example.com
    Content-Type: application/x-www-form-urlencoded
    Content-Length: 25

    name=John&age=30&email=test@example.com
```

Запрос может содержать как только строку запроса и заголовки, так и все три части вместе.

---

[[200 Браузерное окружение|Назад]]
