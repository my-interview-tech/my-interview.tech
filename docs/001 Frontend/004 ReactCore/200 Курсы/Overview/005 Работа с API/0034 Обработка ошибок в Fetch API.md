---
uid: BuWasxRi7uWrUC4QMowIt
title: Обработка ошибок в Fetch API
tags:
  - "#React"
  - "#fetch"
  - "#error"
draft: false
technology: ReactCore
specialty: Frontend
tools: []
order: 34
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

**1 тип ошибок:** попробовали вызвать сервер , но он недоступен , ->> catch

fetch отклоняет reject promise , только если произошла ошибка сети (сервер недоступен)

Чтобы проверить код результата , можно использовать result.status
result.ok содержит true , если result.status содержит один из OK-статусов ( 200 -299 )

---
