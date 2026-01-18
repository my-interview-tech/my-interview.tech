---
uid: MD3Q0VvuMXQ_QuNTv_JEk
title: Как динамически добавить элемент на HTML-страницу?
tags:
  - "#DOM"
  - "#createElement"
  - "#add"
  - "#createTextNode"
  - "#appendChild"
  - "#getElementById"
  - "#browser"
info: null
draft: false
technology: JSCore
specialty: Frontend
tools: []
order: 18
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

![[Pasted image 20230701215800.png|600]]

Для того чтобы динамически добавить элемент на HTML-страницу в JavaScript, можно использовать функцию `createElement()`, чтобы создать новый элемент, а затем добавить его на страницу с помощью метода `appendChild()` или `insertBefore()`.

Вот пример использования функции `createElement()` для создания нового элемента `div`, и метода `appendChild()` для добавления его в конец родительского элемента:

```javascript
const parentElement = document.getElementById("parent");
const newDiv = document.createElement("div");
newDiv.innerHTML = "Новый элемент";
parentElement.appendChild(newDiv);
```

В этом примере мы используем метод `getElementById()` для получения родительского элемента по его идентификатору, затем используем функцию `createElement()` для создания нового элемента `div`, и устанавливаем его содержимое с помощью свойства `innerHTML`. Наконец, мы используем метод `appendChild()` родительского элемента, чтобы добавить новый элемент в конец списка его дочерних элементов.

Если вы хотите добавить новый элемент перед определенным элементом, можно использовать метод `insertBefore()` вместо `appendChild()`. Вот пример:

```javascript
const parentElement = document.getElementById("parent");
const existingElement = document.getElementById("existing");
const newDiv = document.createElement("div");
newDiv.innerHTML = "Новый элемент";
parentElement.insertBefore(newDiv, existingElement);
```

В этом примере мы используем метод `getElementById()` для получения родительского элемента и существующего элемента, перед которым мы хотим добавить новый элемент. Затем мы используем функцию `createElement()` для создания нового элемента `div`, устанавливаем его содержимое, и используем метод `insertBefore()` родительского элемента, чтобы добавить новый элемент перед существующим элементом.

---

[[003 JSCore|Назад]]
