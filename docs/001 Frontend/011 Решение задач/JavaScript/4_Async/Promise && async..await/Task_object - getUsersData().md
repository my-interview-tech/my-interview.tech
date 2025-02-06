---
title: getUsersData()
draft: false
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#async"
  - "#тензор"
---
```js
// права пользователя получили с бэка
const rights = { reportStats: true, validate: true, canEdit: true, view: true};

async function getUserData(userId) {
   const user = await fetch(`/api/users/${userId}`);

   let data;

   switch (true) {
      case user.role == 'admin':
         data = {
            name: user.name,
            role: user.role,
            password: user.password,
            permissions: [],
         };

         Object.keys(rights).forEach(permission => {
            if (rights[permission]) {
               if (permission === 'reportStats') {
                  data.permissions.push('report-stats');
               } else if (permission === 'canEdit') {
                 data.permissions.push('can-edit');
               } else {
                  data.permissions.push(permission);
               }
            }
         });

      break;

      case user.role == 'regular':
         data = {
            name: user.name,
            role: user.role,
         };
   }

   return data;
}
```

___

[[011 Решение задач JS, TS и React|Назад]]