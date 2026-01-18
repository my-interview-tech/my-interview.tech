---
uid: emfqV4k3FJW621o5CiRfo
title: Какие элементы ООП поддерживаются в TypeScript?
tags:
  - "#TypeScript"
  - "#ООП"
  - "#class"
  - "#interface"
  - "#abstract-class"
  - "#Inheritance"
  - "#access-modifiers"
  - "#polymorphism"
  - "#generic"
info: null
draft: false
technology: TypeScript
specialty: Frontend
tools: []
order: 36
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

TypeScript полностью поддерживает объектно-ориентированное программирование и включает в себя множество элементов ООП. Некоторые из основных элементов ООП, поддерживаемых в TypeScript, включают в себя:

1.  _Классы_ - классы в TypeScript используются для создания объектов, которые могут содержать свойства (переменные) и методы (функции). Классы в TypeScript могут быть абстрактными, наследуемыми, иметь интерфейсы и т.д.

```tsx
class Animal {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  eat(food: string) {
    console.log(`${this.name} is eating ${food}.`);
  }
}

class Dog extends Animal {
  breed: string;

  constructor(name: string, breed: string) {
    super(name);
    this.breed = breed;
  }

  bark() {
    console.log("Woof! Woof!");
  }
}

const dog = new Dog("Buddy", "Golden Retriever");
dog.eat("meat"); // Output: 'Buddy is eating meat.'
dog.bark(); // Output: 'Woof! Woof!'
```

В этом примере `Animal` - это базовый класс, который содержит свойство `name` и метод `eat()`. Класс `Dog` наследует класс `Animal` и добавляет свойство `breed` и метод `bark()`.

2.  Интерфейсы - интерфейсы в TypeScript используются для определения формата объектов, которые могут содержать свойства (переменные), методы (функции) и индексаторы. Интерфейсы не имеют реализации и используются для проверки совместимости типов.

```tsx
interface Person {
  name: string;
  age: number;
  sayHello(): void;
}

class Student implements Person {
  name: string;
  age: number;
  studentId: string;

  constructor(name: string, age: number, studentId: string) {
    this.name = name;
    this.age = age;
    this.studentId = studentId;
  }

  sayHello() {
    console.log(
      `Hello, my name is ${this.name} and I am ${this.age} years old.`,
    );
  }
}

const student: Person = new Student("John", 20, "123456");
student.sayHello(); // Output: 'Hello, my name is John and I am 20 years old.'
```

В этом примере `Person` - это интерфейс, который определяет свойства `name`, `age` и метод `sayHello()`. Класс `Student` реализует интерфейс `Person` и содержит свойства `name`, `age` и `studentId`, а также реализацию метода `sayHello()`.

3.  Абстрактные классы - абстрактные классы в TypeScript используются для определения общей структуры и поведения для нескольких классов. Абстрактные классы не могут быть созданы напрямую, они могут только быть унаследованы другими классами.

```tsx
abstract class Animal {
  abstract makeSound(): void;

  move(distanceInMeters: number = 0) {
    console.log(`Animal moved ${distanceInMeters}m.`);
  }
}

class Dog extends Animal {
  makeSound() {
    console.log("Woof! Woof!");
  }
}

const dog = new Dog();
dog.makeSound(); // Output: 'Woof! Woof!'
dog.move(10); // Output: 'Animal moved 10m.'
```

В этом примере `Animal` - это абстрактный класс, который содержит абстрактный метод `makeSound()` и обычный метод `move()`. Класс `Dog` наследует `Animal` и реализует метод `makeSound()`.

4.  Наследование - наследование в TypeScript используется для создания новых классов на основе существующих. Наследование позволяет создавать более специфичные классы, которые наследуют свойства и методы от более общих классов.

```tsx
class Animal {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  eat(food: string) {
    console.log(`${this.name} is eating ${food}.`);
  }
}

class Dog extends Animal {
  breed: string;

  constructor(name: string, breed: string) {
    super(name);
    this.breed = breed;
  }

  bark() {
    console.log("Woof! Woof!");
  }
}

const dog = new Dog("Buddy", "Golden Retriever");
dog.eat("meat"); // Output: 'Buddy is eating meat.'
dog.bark(); // Output: 'Woof! Woof!'
```

5.  Модификаторы доступа - модификаторы доступа в TypeScript используются для ограничения доступа к свойствам и методам классов. TypeScript поддерживает три типа модификаторов доступа: `public`, `private` и `protected`. Модификатор `public` означает, что свойство или метод доступен из любого места в коде. Модификатор `private` означает, что свойство или метод доступен только внутри класса. Модификатор `protected` означает, что свойство или метод доступен внутри класса и его наследников.

```tsx
class Animal {
  public name: string;
  private age: number;
  protected breed: string;

  constructor(name: string, age: number, breed: string) {
    this.name = name;
    this.age = age;
    this.breed = breed;
  }

  public eat(food: string) {
    console.log(`${this.name} is eating ${food}.`);
  }

  private sleep() {
    console.log(`${this.name} is sleeping.`);
  }

  protected walk(distanceInMeters: number) {
    console.log(`${this.name} walked ${distanceInMeters}m.`);
  }
}

class Dog extends Animal {
  constructor(name: string, age: number, breed: string) {
    super(name, age, breed);
  }

  public play(fetch: boolean) {
    console.log(`${this.name} is playing${fetch ? " fetch" : ""}.`);
    this.walk(10);
  }
}

const dog = new Dog("Buddy", 2, "Golden Retriever");
dog.eat("meat"); // Output: 'Buddy is eating meat.'
dog.play(true); // Output: 'Buddy is playing fetch.' 'Buddy walked 10m.'
```

6.  Полиморфизм - полиморфизм в TypeScript используется для создания объектов, которые могут иметь различное поведение в зависимости от контекста. TypeScript поддерживает два типа полиморфизма: переопределение методов и обобщенные типы.

```tsx
class Animal {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  makeSound() {
    console.log("Animal is making a sound.");
  }
}

class Cat extends Animal {
  makeSound() {
    console.log("Meow!");
  }
}

class Cow extends Animal {
  makeSound() {
    console.log("Moo!");
  }
}

const animals: Animal[] = [new Cat("Fluffy"), new Cow("Betsy")];
animals.forEach((animal) => animal.makeSound()); // Output: 'Meow!' 'Moo!'
```

В этом примере `Animal` - это базовый класс, который содержит метод `makeSound()`. Классы `Cat` и `Cow` наследуют `Animal` и переопределяют метод `makeSound()`. Массив `animals` содержит объекты `Cat` и `Cow`, которые могут быть использованы в цикле для вызова метода `makeSound()`.

7.  Обобщенные типы - обобщенные типы в TypeScript используются для создания функций и классов, которые могут работать с различными типами данных. Обобщенные типы позволяют создавать более гибкий и переиспользуемый код.

```tsx
function ...reverse<T>(items: T[]): T[] {
return items.reverse();
}

const numbers = [1, 2, 3, 4, 5];
const reversedNumbers = reverse(numbers);
console.log(reversedNumbers); // Output: [5, 4, 3, 2, 1]

const strings = ['one', 'two', 'three', 'four', 'five'];
const reversedStrings = reverse(strings);
console.log(reversedStrings); // Output: ['five', 'four', 'three', 'two', 'one']
```

В этом примере функция `reverse()` принимает массив любого типа данных `T` и возвращает массив того же типа данных `T`. Функция может быть использована для переворачивания массивов чисел и строк. Обобщенные типы в TypeScript позволяют создавать более универсальный код, который может работать с различными типами данных.

---

[[005 TypeScript|Назад]]
