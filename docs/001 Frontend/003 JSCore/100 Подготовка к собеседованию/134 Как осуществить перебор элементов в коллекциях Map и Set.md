---
uid: QkhoVwu4JH75xZ7bIxaCF
title: Как осуществить перебор элементов в коллекциях `Map` и `Set`?
tags:
  - "#JavaScript"
  - "#map"
  - "#set"
  - "#for-of"
  - "#forEach"
info: null
draft: false
technology: JSCore
specialty: Frontend
tools: []
order: 134
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

![[Pasted image 20230702204851.png|600]]

Для перебора элементов в коллекциях `Map` и `Set` можно использовать метод `forEach()` или цикл `for...of`.

##### Перебор элементов в `Map` с помощью метода `forEach()`

Метод `forEach()` принимает функцию обратного вызова, которая вызывается для каждого элемента `Map`. Функция принимает три аргумента: значение элемента, ключ элемента и ссылку на сам `Map` объект.

```javascript
const map = new Map();

map.set("key1", "value1");
map.set("key2", "value2");
map.set(3, "value3");

map.forEach((value, key) => {
  console.log(`${key}: ${value}`);
});
```

В этом примере для каждого элемента `Map` вызывается функция обратного вызова, которая выводит ключ и значение элемента.

##### Перебор элементов в `Map` с помощью цикла `for...of`

Цикл `for...of` может использоваться для перебора элементов коллекции `Map` с помощью метода `entries()`. Метод `entries()` возвращает итератор, который генерирует пары [ключ, значение] для каждого элемента `Map`.

```javascript
const map = new Map();

map.set("key1", "value1");
map.set("key2", "value2");
map.set(3, "value3");

for (let [key, value] of map.entries()) {
  console.log(`${key}: ${value}`);
}
```

В этом примере цикл `for...of` используется для перебора элементов `Map`, и каждый элемент представлен в виде массива `[key, value]`.

##### Перебор элементов в `Set` с помощью метода `forEach()`

Метод `forEach()` также может использоваться для перебора элементов коллекции `Set`. Функция обратного вызова, передаваемая в метод `forEach()`, принимает только один аргумент - значение элемента `Set`.

```javascript
const set = new Set();

set.add("value1");
set.add("value2");
set.add(3);

set.forEach((value) => {
  console.log(value);
});
```

В этом примере для каждого элемента `Set` вызывается функция обратного вызова, которая выводит значение элемента.

##### Перебор элементов в `Set` с помощью цикла `for...of`

Цикл `for...of` также может использоваться для перебора элементов коллекции `Set`. Метод `values()` возвращает итератор, который генерирует значения элементов `Set`.

```javascript
const set = new Set();

set.add("value1");
set.add("value2");
set.add(3);

for (let value of set.values()) {
  console.log(value);
}
```

В этом примере цикл `for...of` используется для перебора элементов `Set`, и каждый элемент представлен в виде значения.

---

[[003 JSCore|Назад]]
