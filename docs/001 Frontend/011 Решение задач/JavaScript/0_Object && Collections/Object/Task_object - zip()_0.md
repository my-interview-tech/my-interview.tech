---
uid: Tf8H9G-g9L5Iodav16SOu
title: Task_object - zip()_0
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#object"
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
const objects = [
    { foo: 5, bar: 6 },
    { foo: 13, baz: -1 }
];

function zip() {
	... ваш код здесь
}

console.log(zip(...objects)) ..


function zip () {
    if(arguments.length === 0) return
    else {
        let zipObj = {}
        let arrOfObj = Array.from(arguments)

        arrOfObj.forEach((obj) => {
            for(let key in obj) {
                if(!(zipObj[key])) {
                    zipObj[key] = obj[key]
                }
            }
        })

        return zipObj
    }
}
```

\*\*Ответ

```js

```

---

[[011 Решение задач JS, TS и React|Назад]]
