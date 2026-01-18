---
uid: FHQrvPVBuKVZzegyirla0
title: Разница между `innerHTML` и `outerHTML`
tags:
  - "#DOM"
  - "#innerHTML"
  - "#outerHTML"
  - "#browser"
info: null
draft: false
technology: JSCore
specialty: Frontend
tools: []
order: 24
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

![[Pasted image 20230701221949.png|600]]

`innerHTML` и `outerHTML` - это свойства элемента в JavaScript, которые используются для доступа к HTML-содержимому элемента.

`innerHTML` - это свойство, которое содержит HTML-содержимое элемента, включая все его дочерние элементы. При использовании свойства `innerHTML`, можно получить или изменить HTML-содержимое элемента.

Пример использования `innerHTML`:

```javascript
<div id="example">
  <p>Hello, world!</p>
</div>
```

```javascript
const example = document.querySelector("#example");
console.log(example.innerHTML); // выводит: <p>Hello, world!</p>
example.innerHTML = "<p>Goodbye, world!</p>";
```

В этом примере мы используем метод `querySelector()` для получения элемента с id `example`. Затем мы используем свойство `innerHTML` для получения HTML-содержимого элемента и для изменения его на новое значение `<p>Goodbye, world!</p>`.

`outerHTML` - это свойство, которое содержит HTML-код элемента со всем его содержимым. При использовании свойства `outerHTML`, можно получить или изменить HTML-код элемента целиком включая его тег.

Пример использования `outerHTML`:

```javascript
<div id="example">
  <p>Hello, world!</p>
</div>
```

```javascript
const example = document.querySelector("#example");
console.log(example.outerHTML);
// выводит: <div id="example"><p>Hello, world!</p></div>
example.outerHTML = '<div id="new-example"><p>Goodbye, world!</p></div>';
```

В этом примере мы используем метод `querySelector()` для получения элемента с id `example`. Затем мы используем свойство `outerHTML` для получения HTML-кода элемента и для изменения его на новое значение `<div id="new-example"><p>Goodbye, world!</p></div>`.

В целом, `innerHTML` используется для доступа к HTML-содержимому элемента без самого элемента, а `outerHTML` используется для доступа к HTML-коду элемента со всем его содержимым включая его тег. Оба свойства могут быть полезны при работе с HTML-содержимым элементов в JavaScript. Однако, изменение `outerHTML` может привести к удалению и пересозданию элемента, что может повлиять на его состояние и связанные с ним события.

---

[[003 JSCore|Назад]]
