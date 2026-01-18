---
uid: l-AC_UxaTlKt6EQ1IbjGg
title: Какое свойство flexbox отвечает за направление flex items?
tags:
  - "#CSS"
  - "#flex"
  - "#flex-direction"
info:
  - "https://developer.mozilla.org/ru/docs/Learn/CSS/CSS_layout/Flexbox"
draft: false
technology: CSS
specialty: Frontend
tools: []
order: 47
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

В Flexbox есть свойство под названием _flex-direction_, которое определяет направление главной оси (в каком направлении располагаются flexbox дети) — по умолчанию ему присваивается значение row, т.е. располагать дочерние элементы в ряд слева направо (для большинства языков) или справа налево (для арабских языков).

- row | row-reverse | column | column-reverse

- **row** The flex container's main-axis is defined to be the same as the text direction. The main-start and main-end points are the same as the content direction.
- **row-reverse** Behaves the same as row but the main-start and main-end points are permuted.
- **column** The flex container's main-axis is the same as the block-axis. The main-start and main-end points are the same as the before and after points of the writing-mode.
- **column-reverse** Behaves the same as column but the main-start and main-end are permuted.

---

[[002 CSS|Назад]]
