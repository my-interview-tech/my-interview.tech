---
uid: d-dXacM7shP3omiA-GB1Q
title: Что такое Secure (безопасные) и HttpOnly cookies?
tags:
  - "#HTML"
  - "#HTTPS"
  - "#HTTP"
  - "#SSL"
  - "#secure"
  - "#Cookie"
  - "#browser"
info:
  - "https://developer.mozilla.org/ru/docs/Web/HTTP/%D0%9A%D1%83%D0%BA%D0%B8"
draft: false
technology: HTML
specialty: Frontend
tools: []
order: 77
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

![[Pasted image 20230703193146.png|600]]

Secure и HttpOnly - это два разных флага, которые могут быть установлены для cookies, чтобы обеспечить большую безопасность веб-приложений.

_Secure cookie_ - это cookie, который _должен быть отправлен только через защищенное HTTPS-соединение, что значительно уменьшает риски перехвата данных._ Это означает, что если куки помечены как Secure, они не будут отправляться через незащищенное соединение HTTP, даже если запрос был инициирован с HTTP-страницы.

_HttpOnly cookie_ - это _cookie, который недоступен для JavaScript веб-страницы, что защищает от кражи куки через уязвимости веб-страницы, такие как XSS-атаки._ Если установлен флаг HttpOnly, куки не могут быть доступны для JavaScript, что означает, что злоумышленники не смогут получить доступ к данным куки через вредоносный JavaScript-код.

Важно отметить, что использование Secure и HttpOnly cookie - это только один из многих шагов, которые можно предпринять для обеспечения безопасности веб-приложений. Другие методы включают защиту от CSRF-атак, использование SSL-сертификатов и т.д.

`Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT; Secure; HttpOnly`

---

[[001 HTML|Назад]]
