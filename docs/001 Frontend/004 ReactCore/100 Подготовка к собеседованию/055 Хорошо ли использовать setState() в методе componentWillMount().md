---
uid: w2ImXE1LlYqh4SQpvFgUi
title: Хорошо ли использовать setState() в методе componentWillMount()?
tags:
  - "#React"
  - "#setState"
  - "#compomemtWillMount"
  - "#componentDidMount"
info: []
draft: false
technology: ReactCore
specialty: Frontend
tools: []
order: 55
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

Да, безопасно использовать метод `setState()` внутри метода `componentWillMount()`. Однако, в то же время, рекомендуется избегать асинхронной инициализации в методе жизненного цикла `componentWillMount()`. _Метод `componentWillMount()` вызывается непосредственно перед монтированием компонента. Он вызывается до метода `render()`, поэтому установка состояния в этом методе не приведет к повторному рендерингу._ Следует избегать введения любых побочных эффектов или подписок в этом методе. Необходимо убедиться, что асинхронные вызовы для инициализации компонента происходят в методе `componentDidMount()` вместо `componentWillMount()`.

```js
componentDidMount() {
  axios.get(`api/todos`)
    .then((result) => {
      this.setState({
        messages: [...result.data]
      })
    })
}
```

---

[[004 ReactCore|Назад]]
