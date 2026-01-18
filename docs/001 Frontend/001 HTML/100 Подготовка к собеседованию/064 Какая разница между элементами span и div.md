---
uid: cfPitnTK9Z2v5-PZ_ymLs
title: Какая разница между элементами span и div?
tags:
  - "#HTML"
  - "#span"
  - "#div"
info: null
draft: false
technology: HTML
specialty: Frontend
tools: []
order: 64
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

- `<span>` — это строчный (inline) элемент.
- `<div>` — это блочный (block) элемент.

Элементы `<div>` нужно использовать для оформления разделов документа.
А элементы `<span>` — в роли контейнеров для небольших объёмов текста, для изображений и других подобных элементов страниц.

Надо отметить, что нельзя помещать блочные элементы в строчные.

Вот пример, в котором показано, кроме прочего, неправильное размещение блочного элемента внутри строчного (это — фрагмент `<div>I'm illegal</div>`, размещённый внутри элемента `<span>`):

```html
<div>
  Hi
  <span>
    I'm the start of the span element
    <div>I'm illegal</div>
    I'm the end of the span
  </span>
  Bye I'm the end of the div
</div>
```

---

[[001 HTML|Назад]]
