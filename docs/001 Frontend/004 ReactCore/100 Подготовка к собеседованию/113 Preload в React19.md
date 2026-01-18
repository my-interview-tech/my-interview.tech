---
uid: M3uuY0REb19KZ1g7qX1qi
title: Preload в React19
tags:
  - React
  - React19
  - preload
info:
  - "https://react.dev/reference/react-dom#resource-preloading-apis"
draft: false
technology: ReactCore
specialty: Frontend
tools: []
order: 113
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

Во время начальной загрузки документа и при обновлениях на стороне клиента сообщение браузеру о ресурсах, которые, вероятно, потребуется загрузить как можно раньше, может существенно повлиять на производительность страницы.

React 19 включает ряд новых API для загрузки и предварительной загрузки ресурсов браузера, чтобы сделать этот процесс максимально простым и позволить создавать отличные пользовательские интерфейсы, которые не тормозят из-за неэффективной загрузки ресурсов.

```javascript
import { prefetchDNS, preconnect, preload, preinit } from 'react-dom'

function MyComponent() {
  preinit('https://.../path/to/some/script.js', { as: 'script' }) // загружает и выполняет этот скрипт с энергией
  preload('https://.../path/to/font.woff', { as: 'font' }) // предварительно загружает этот шрифт
  preload('https://.../path/to/stylesheet.css', { as: 'style' }) // предварительно загружает эту таблицу стилей
  prefetchDNS('https://...') // когда вы не обязательно запрашиваете что-либо с этого хоста
  preconnect('https://...') // когда вы будете запрашивать что-то, но не уверены, что именно
}

<!-- вышеуказанное приведет к следующему DOM/HTML -->
<html>
  <head>
    <!-- ссылки/скрипты приоритезируются по их полезности для ранней загрузки, а не по порядку вызова -->
    <link rel="prefetch-dns" href="https://...">
    <link rel="preconnect" href="https://...">
    <link rel="preload" as="font" href="https://.../path/to/font.woff">
    <link rel="preload" as="style" href="https://.../path/to/stylesheet.css">
    <script async="" src="https://.../path/to/some/script.js"></script>
  </head>
  <body>
    ...
  </body>
</html>
```

Эти API можно использовать для оптимизации начальной загрузки страницы, перемещая обнаружение дополнительных ресурсов, таких как шрифты, из загрузки таблиц стилей. Они также могут ускорить обновления на стороне клиента, предварительно загружая список ресурсов, используемых при ожидаемой навигации, и затем энергично предварительно загружая эти ресурсы по клику или даже при наведении.

---

[[004 ReactCore|Назад]]
