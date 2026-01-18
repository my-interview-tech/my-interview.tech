---
uid: XrmjlyKSQ6CehWA8vWxZT
title: Разница между HTMLCollection и NodeList?
tags:
  - "#DOM"
  - "#HTMLCollection"
  - "#NodeList"
  - "#browser"
info: []
draft: false
technology: JSCore
specialty: Frontend
tools: []
order: 3
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

![[Pasted image 20230701215529.png|600]]

HTMLCollection и NodeList - это два объекта, которые представляют коллекции элементов на веб-странице в JavaScript. Однако, есть некоторые различия между ними.

_HTMLCollection_ - это объект, который представляет коллекцию элементов на веб-странице, которые имеют определенное имя тега (например, все элементы с тегом "div"). Этот объект автоматически обновляется при добавлении или удалении элементов из DOM-структуры. HTMLCollection также имеет некоторые методы, такие как `item()`, `namedItem()` и `length`, которые могут использоваться для доступа к элементам коллекции.

_NodeList_ - это объект, который представляет коллекцию узлов на веб-странице, которые могут быть элементами, текстовыми узлами, комментариями или другими типами узлов. Этот объект не автоматически обновляется при добавлении или удалении элементов из DOM-структуры. NodeList также имеет некоторые методы, такие как `item()`, `forEach()` и `length`, которые могут использоваться для доступа к элементам коллекции.

_Основное отличие_ между HTMLCollection и NodeList заключается в том, что _HTMLCollection имеет дополнительные методы и свойства для доступа к элементам коллекции, а также автоматически обновляется при добавлении или удалении элементов из DOM-структуры_, в то время как _NodeList не имеет дополнительных методов и свойств, и не обновляется автоматически._

Вот примеры использования HTMLCollection и NodeList:

```javascript
// Получение всех элементов с тегом "div" в HTMLCollection
const divs = document.getElementsByTagName("div");
console.log(divs.length); // выводит количество элементов в коллекции
console.log(divs.item(0)); // выводит первый элемент в коллекции

// Получение всех элементов с тегом "div" в NodeList
const divNodes = document.querySelectorAll("div");
console.log(divNodes.length); // выводит количество элементов в коллекции
divNodes.forEach(function (element) {
  console.log(element); // выводит каждый элемент в коллекции
});
```

В этом примере мы используем метод `getElementsByTagName()` для получения всех элементов с тегом "div" в HTMLCollection, и метод `querySelectorAll()` для получения всех элементов с тегом "div" в NodeList. Затем мы используем методы и свойства HTMLCollection и NodeList для доступа к элементам коллекции.

---

[[003 JSCore|Назад]]
