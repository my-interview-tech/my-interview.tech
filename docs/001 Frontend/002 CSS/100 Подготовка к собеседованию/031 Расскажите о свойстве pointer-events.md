---
uid: Niv_XTMC5NNNtnukWMk07
title: Расскажите о свойстве `pointer-events`
tags:
  - "#CSS"
  - "#pointer-events"
info:
  - "https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events"
draft: false
technology: CSS
specialty: Frontend
tools: []
order: 31
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

![[Pasted image 20230704030635.png|600]]

_Свойство `pointer-events`_ позволяет контролировать, как элементы на странице реагируют на события указателя, такие как клики мыши, наведение курсора и т.д. Это свойство может быть установлено для любого элемента на странице, в том числе для ссылок, изображений, кнопок и других элементов форм.

Свойство `pointer-events` может принимать следующие значения:

```css
/* Keyword values */
pointer-events: auto; // значение по умолчанию. Элемент будет реагировать на события указателя, как обычно.

pointer-events: none; // элемент не будет реагировать на события указателя, и все события будут передаваться на элементы, находящиеся под ним.

pointer-events: visiblePainted; /* SVG only */ элемент будет реагировать на события указателя, только если они происходят на его видимой части, т.е. на той части, которая была нарисована на экране.
pointer-events: visibleFill; /* SVG only */  элемент будет реагировать на события указателя, только если они происходят на его непрозрачной части.
pointer-events: visibleStroke; /* SVG only */
pointer-events: visible; /* SVG only */
pointer-events: painted; /* SVG only */
pointer-events: fill; /* SVG only */
pointer-events: stroke; /* SVG only */ элемент будет реагировать на события указателя, только если они происходят на его границе.
pointer-events: all; /* SVG only */

/* Global values */
pointer-events: inherit;
pointer-events: initial;
pointer-events: revert;
pointer-events: revert-layer;
pointer-events: unset;
```

Свойство `pointer-events` может быть полезным для создания интерактивных элементов на странице, таких как кнопки, которые могут быть недоступны для нажатия в определенных ситуациях, например, когда они находятся в состоянии ожидания или блокировки. Кроме того, оно может быть полезным для создания сложных интерфейсов, где элементы могут перекрываться или находиться внутри других элементов.

---

[[002 CSS|Назад]]
