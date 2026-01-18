---
uid: yvLuTy-Fau7R2E4L5TMIg
title: Можно ли использовать React без рендеринга HTML?
tags:
  - "#React"
  - "#render"
info: null
draft: false
technology: ReactCore
specialty: Frontend
tools: []
order: 20
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

Это возможно. Ниже приведены возможные варианты:

```js
render() {
  return false
}
```

```js
render() {
  return true
}
```

```js
render() {
  return null
}
```

React version >=16.0.0:

```js
render() {
  return []
}
```

```js
render() {
  return ""
}
```

React version >=16.2.0:

```js
render() {
  return <React.Fragment></React.Fragment>
}
```

```js
render() {
  return <></>
}
```

React version >=18.0.0:

```js
render() {
  return undefined
}
```

---

[[004 ReactCore|Назад]]
