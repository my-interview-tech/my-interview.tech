---
uid: SOmatxaG8wZcuz5ub0lKz
title: Task_object - getUsersData()_0
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#async"
  - "#тензор"
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
// права пользователя получили с бэка
const rights = { reportStats: true, validate: true, canEdit: true, view: true };

async function getUserData(userId) {
  const user = await fetch(`/api/users/${userId}`);

  let data;

  switch (true) {
    case user.role == "admin":
      data = {
        name: user.name,
        role: user.role,
        password: user.password,
        permissions: [],
      };

      Object.keys(rights).forEach((permission) => {
        if (rights[permission]) {
          if (permission === "reportStats") {
            data.permissions.push("report-stats");
          } else if (permission === "canEdit") {
            data.permissions.push("can-edit");
          } else {
            data.permissions.push(permission);
          }
        }
      });

      break;

    case user.role == "regular":
      data = {
        name: user.name,
        role: user.role,
      };
  }

  return data;
}
```

---

[[011 Решение задач JS, TS и React|Назад]]
