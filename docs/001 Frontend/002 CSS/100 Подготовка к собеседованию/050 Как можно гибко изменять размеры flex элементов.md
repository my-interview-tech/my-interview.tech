---
uid: E86KZLPn8gZnk86QwURaY
title: Как можно гибко изменять размеры flex элементов?
tags:
  - "#CSS"
  - "#flex"
info:
  - "https://developer.mozilla.org/ru/docs/Learn/CSS/CSS_layout/Flexbox"
draft: false
technology: CSS
specialty: Frontend
tools: []
order: 50
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

```css
article {
  flex: 1 200px;
}

article:nth-of-type(3) {
  flex: 2 200px;
}
```

Это просто означает, что каждому flex элементу сначала будет дано 200px от свободного места. Потом оставшееся место будет поделено в соответствии с частями пропорций.

---

[[002 CSS|Назад]]
