---
uid: h5fGk0Cka7T7w4q7jTO5I
title: Task_whatif - 17_0
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#itOne"
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
// №$@ня какая-то, он просто просил порассуждать на тему, почему не ререндерится ArticlesPage в рауте при переходе, но
// из кода показал только это:
// App.tsx
<Routes>
  <Route path="company" element={<CompanyPage />} />
  <Route path="pages/:article" element={<ArticlesPage />} />
</Routes>;

// ArticlesPage.tsx
export default () => {
  useEffect(() => {
    doFetch({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }, [doFetch, location.key]);
  return (
    <ArticleContext.Provider value={{ article, setArticle }}>
      .....
    </ArticleContext.Provider>
  );
};
```

\*\*Ответ

```js

```

---

[[011 Решение задач JS, TS и React|Назад]]
