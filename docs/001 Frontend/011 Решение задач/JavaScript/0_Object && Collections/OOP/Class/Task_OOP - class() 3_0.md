---
uid: a3-cyxaCNs5UUrHidg_o3
title: Task_OOP - class() 3_0
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#class"
  - "#СИБУР"
draft: false
technology: Решение задач
specialty: Frontend
tools: []
order: 0
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

```JS
class A {
    constructor() {
        this.name = "foo";
        this.getName();
    }

    getName() {
        console.log("foo " + this.name);
    }
}

class B extends A {
    constructor() {
        super();
        this.name = "bar";
        this.getName();
    }

    getName() {
        console.log("bar " + this.name);
    }
}

 new B()
```

### Ответ

```js
bar bar
foo bar
```

---

[[011 Решение задач JS, TS и React|Назад]]
