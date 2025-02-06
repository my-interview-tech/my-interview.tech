---
title: Task_OOP - class() 3
draft: false
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#class"
  - "#СИБУР"
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

___

[[011 Решение задач JS, TS и React|Назад]]