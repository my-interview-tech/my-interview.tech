---
uid: wGVeGwcYaknMY07XH_G2X
title: Метод createSlice()
tags:
  - React
  - redux-toolkit
  - createSlice
info:
  - "https://habr.com/ru/companies/inobitec/articles/481288/"
draft: false
technology: State Managers
specialty: Frontend
tools: []
order: 0
access: free
created_at: "2026-01-18T15:03:38.095Z"
updated_at: "2026-01-18T15:03:38.095Z"
---

`createSlice()` автоматически генерирует типы и создателей операции на основе переданного названия редуктора:

```jsx
const postsSlice = createSlice({
  name: "posts",
  initialState: [],
  reducers: {
    createPost(state, action) {},
    updatePost(state, action) {},
    deletePost(state, action) {},
  },
});

console.log(postsSlice);
/*
{
  name: 'posts',
  actions : {
      createPost,
      updatePost,
      deletePost,
  },
  reducer
}
*/

const { createPost } = postsSlice.actions;

console.log(createPost({ id: 123, title: "Привет, народ!" }));
// { type : 'posts/createPost', payload : { id : 123, title : 'Привет, народ!' } }
```

`createSlice()` анализирует функции, определенные в поле `reducers`, создает редуктор для каждого случая и генерирует создателя, использующего название редуктора в качестве типа операции. Таким образом, редуктор `createPost` становится типом операции `posts/createPost`, а создатель `createPost()` возвращает операцию с этим типом.

Обычно, мы определяем часть и экспортируем создателей и редукторы:

```jsx
const postsSlice = createSlice({
  name: "posts",
  initialState: [],
  reducers: {
    createPost(state, action) {},
    updatePost(state, action) {},
    deletePost(state, action) {},
  },
});

// Извлекаем объект с создателями и редуктор
const { actions, reducer } = postsSlice;
// Извлекаем и экспортируем каждого создателя по названию
export const { createPost, updatePost, deletePost } = actions;
// Экпортируем редуктор по умолчанию или по названию
export default reducer;
```

---

[[004 State Managers|Назад]]
