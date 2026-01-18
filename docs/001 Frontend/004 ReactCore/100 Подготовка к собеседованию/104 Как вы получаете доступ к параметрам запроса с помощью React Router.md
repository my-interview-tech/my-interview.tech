---
uid: Jrn0OaEtIFX8orQpGo3rU
title: Как вы получаете доступ к параметрам запроса с помощью React Router?
tags:
  - "#React"
  - "#React-router"
  - useLocation
  - URLSearchParams
info: null
draft: false
technology: ReactCore
specialty: Frontend
tools: []
order: 104
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

В `React Router` параметры запроса (query parameters) могут быть получены с помощью хука `useLocation()`. Хук `useLocation()` возвращает объект, который содержит информацию о текущем URL, включая параметры запроса.

Например, если текущий URL имеет следующий формат: `http://example.com/my-page?param1=value1&param2=value2`, то параметры запроса могут быть получены следующим образом:

```jsx
import { useLocation } from "react-router-dom";

const MyComponent = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const param1 = params.get("param1");
  const param2 = params.get("param2");

  return (
    <div>
      <p>Param1: {param1}</p>
      <p>Param2: {param2}</p>
    </div>
  );
};

export default MyComponent;
```

В этом примере мы используем хук `useLocation()` для получения объекта `location`, который содержит информацию о текущем URL. Затем мы используем класс `URLSearchParams` для получения параметров запроса из строки запроса, которая содержится в свойстве `search` объекта `location`. Метод `get()` класса `URLSearchParams` позволяет получить значение параметра по его имени.

Также, в React Router есть другие способы для получения параметров запроса, такие как использование функции `withRouter()` для передачи параметров как свойства компонента или использование хука `useParams()`, который позволяет получить параметры из динамических сегментов пути (path parameters).

---

[[004 ReactCore|Назад]]
