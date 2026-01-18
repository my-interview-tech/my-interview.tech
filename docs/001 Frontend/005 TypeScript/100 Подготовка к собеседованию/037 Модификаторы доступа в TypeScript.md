---
uid: kBkmUr1yjZOhJHStrk2dE
title: Модификаторы доступа в TypeScript
tags:
  - "#TypeScript"
  - "#public"
  - "#private"
  - "#protected"
info: []
draft: false
technology: TypeScript
specialty: Frontend
tools: []
order: 37
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

Модификаторы доступа в TypeScript используются для ограничения доступа к свойствам и методам классов. TypeScript поддерживает три типа модификаторов доступа: `public`, `private` и `protected`.

1.  `public` - модификатор `public` означает, что свойство или метод доступен из любого места в коде, включая внутри класса, из других классов и извне класса.

```jsx
class Person {
  public name: string;
  public age: number;

  public constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  public sayHello() {
    console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
  }
}

const person = new Person('John', 30);
console.log(person.name); // Output: 'John'
person.sayHello(); // Output: 'Hello, my name is John and I am 30 years old.'
```

В этом примере свойства `name` и `age` и метод `sayHello()` имеют модификатор доступа `public`, что позволяет им быть доступными из любого места в коде.

2.  `private` - модификатор `private` означает, что свойство или метод доступен только внутри класса, где оно было объявлено. Свойства и методы с модификатором `private` недоступны извне класса.

```jsx
class Person {
  private name: string;
  private age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  public sayHello() {
    console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
  }
}

const person = new Person('John', 30);
console.log(person.name); // Error: 'Property 'name' is private and only accessible within class 'Person'.'
person.sayHello(); // Output: 'Hello, my name is John and I am 30 years old.'
```

В этом примере свойства `name` и `age` имеют модификатор доступа `private`, что означает, что они не могут быть доступны извне класса. Метод `sayHello()` имеет модификатор доступа `public`, что позволяет его вызывать извне класса.

3.  `protected` - модификатор`protected` означает, что свойство или метод доступен внутри класса и его наследников. Свойства и методы с модификатором `protected` недоступны извне класса и его наследников.

```jsx
class Person {
  protected name: string;
  protected age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  public sayHello() {
    console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
  }
}

class Student extends Person {
  private studentId: string;

  constructor(name: string, age: number, studentId: string) {
    super(name, age);
    this.studentId = studentId;
  }

  public study() {
    console.log(`${this.name} is studying.`);
  }
}

const student = new Student('John', 20, '123456');
console.log(student.name); // Error: 'Property 'name' is protected and only accessible within class 'Person' and its subclasses.'
student.sayHello(); // Output: 'Hello, my name is John and I am 20 years old.'
student.study(); // Output: 'John is studying.'
```

В этом примере свойства `name` и `age` имеют модификатор доступа `protected`, что означает, что они могут быть доступны внутри класса и его наследников. В классе `Student` мы можем получить доступ к свойствам `name` и `age`, так как `Student` наследует от класса `Person`. Свойство `studentId` имеет модификатор доступа `private`, что означает, что оно доступно только внутри класса `Student`. Метод `sayHello()` также доступен в классе `Student`, так как `Student` наследует его от класса `Person`. Метод `study()` является методом только класса `Student` и не доступен в классе `Person`.

---

[[005 TypeScript|Назад]]
