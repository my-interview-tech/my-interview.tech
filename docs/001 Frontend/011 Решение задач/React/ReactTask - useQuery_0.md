---
uid: zbJyH1t24cIcBlYXLOPRU
title: ReactTask - useQuery_0
tags:
  - "#React"
  - "#reactTask"
  - "#Hooks"
  - "#unknownINC"
draft: false
technology: Решение задач
specialty: Frontend
tools: []
order: 0
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

```jsx
//Написать хук useQeury который принимает url и возвращает 3 состояния запроса
const { isLoading, error, data } = useQeury(
  "https://jsonplaceholder.typicode.com/todos/1",
);
```

\*\*Ответ

```jsx
const useQeury = (url) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  async function getResponse() {
    const response = await fetch(url);
    return response.json();
  }

  useEffect(() => {
    getResponse()
      .then((data) => setData(data))
      .catch((e) => setError(e))
      .finally(() => setIsLoading(false));
  }, [url]);

  return { isLoading, data, error };
};
```

---

[[011 Решение задач JS, TS и React|Назад]]
