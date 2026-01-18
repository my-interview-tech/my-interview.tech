---
uid: UAk4lawBFmz45iovNkaYP
title: Что такое классы в TypeScript?
tags:
  - "#TypeScript"
  - "#ООП"
  - "#class"
  - "#readonly"
  - "#super"
  - "#static"
  - "#private"
info:
  - >-
    https://stackoverflow.com/questions/37265275/how-to-implement-class-constants-in-typescript
  - >-
    https://stackoverflow.com/questions/12702548/constructor-overload-in-typescript
draft: false
technology: TypeScript
specialty: Frontend
tools: []
order: 38
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

Классы представляют собой общие поведения и атрибуты группы связанных объектов.

Например, нашим классом может быть `Student`, у каждого из которых есть метод `attendClass`. С другой стороны, `John` является отдельным экземпляром типа `Student` и может иметь дополнительные уникальные поведения, такие как `attendExtracurricular`.

Вы объявляете классы с помощью ключевого слова `class`:

```jsx
class Student {
	studCode: number;
	studName: string;
	constructor(code: number, name: string) {
		this.studName = name;
		this.studCode = code;
	}
}
```

В TypeScript, при объявлении свойств классов, нельзя использовать ключевое слово `const`. При попытке использования этого ключевого слова выводится следующее сообщение об ошибке: `A class member cannot have the ‘const’ keyword`. В TypeScript 2.0 имеется модификатор `readonly`, позволяющий создавать свойства класса, предназначенные только для чтения:

```jsx
class MyClass {
    readonly myReadonlyProperty = 1;

    myMethod() {
        console.log(this.myReadonlyProperty);
    }
}

new MyClass().myReadonlyProperty = 5; // ошибка, так как свойство предназначено только для чтения
```

Вы можете использовать функцию `super()` для вызова конструктора базового класса.

```typescript
class Animal {
  name: string;
  constructor(theName: string) {
    this.name = theName;
  }
  move(distanceInMeters: number = 0) {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}

class Snake extends Animal {
  constructor(name: string) {
    super(name);
  }
  move(distanceInMeters = 5) {
    console.log("Slithering...");
    super.move(distanceInMeters);
  }
}
```

TypeScript позволяет объявлять множество вариантов методов, но реализация может быть лишь одна, и эта реализация должна иметь сигнатуру, совместимую со всеми вариантами перегруженных методов. Для перегрузки конструктора класса можно воспользоваться несколькими подходами:

- Можно воспользоваться необязательным параметром:

  ```tsx
  class Box {
    public x: number;
    public y: number;
    public height: number;
    public width: number;

    constructor();
    constructor(obj: IBox);
    constructor(obj?: any) {
      this.x = (obj && obj.x) || 0;
      this.y = (obj && obj.y) || 0;
      this.height = (obj && obj.height) || 0;
      this.width = (obj && obj.width) || 0;
    }
  }
  ```

- Можно воспользоваться параметрами по умолчанию:

  ```tsx
  class Box {
    public x: number;
    public y: number;
    public height: number;
    public width: number;

    constructor(obj: IBox = { x: 0, y: 0, height: 0, width: 0 }) {
      this.x = obj.x;
      this.y = obj.y;
      this.height = obj.height;
      this.width = obj.width;
    }
  }
  ```

- Можно использовать дополнительные перегрузки в виде методов статической фабрики:

  ```tsx
  class Person {
    static fromData(data: PersonData) {
      let { first, last, birthday, gender = "M" } = data;
      return new this(`${last}, ${first}`, calculateAge(birthday), gender);
    }

    constructor(
      public fullName: string,
      public age: number,
      public gender: "M" | "F",
    ) {}
  }

  interface PersonData {
    first: string;
    last: string;
    birthday: string;
    gender?: "M" | "F";
  }

  let personA = new Person("Doe, John", 31, "M");
  let personB = Person.fromData({
    first: "John",
    last: "Doe",
    birthday: "10-09-1986",
  });
  ```

- Можно использовать тип-объединение:
  ```tsx
  class foo {
    private _name: any;
    constructor(name: string | number) {
      this._name = name;
    }
  }
  var f1 = new foo("bar");
  var f2 = new foo(1);
  ```

---

[[005 TypeScript|Назад]]
