---
uid: LtS6ozMwV9RyAp-Lk9Fdv
title: "Создание, вставка и удаление элементов в JavaScript"
tags:
  - JavaScript
draft: false
technology: JSCore
specialty: Frontend
tools: []
order: 6
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

_На этом уроке мы научимся создавать узлы-элементы (`createElement`) и текстовые узлы (`createTextNode`). А также рассмотрим методы, предназначенные для добавления узлов к дереву (`appendChild`, `insertBefore`) и для удаления узлов из дерева (`removeChild`)._

## Создания элементов и текстовых узлов

Создание элемента в JavaScript выполняется с помощью метода `createElement`:

// $elem – переменная, в которую сохраним созданный элемент
`const $elem = document.createElement('tag');`

Вместо `tag` необходимо указать тег того элемента, который нужно создать.

Например, создадим элемент p:
`const $elem = document.createElement('p');`

Создание текстового узла в JavaScript осуществляется посредством метода `createTextNode`:

`const text = document.createTextNode('text');`

В аргументе `createTextNode` необходимо поместить текст, который должен иметь этот текстовый узел.

Например, создадим текстовый узел с текстом «Я новый текстовый узел»:
`const text = document.createTextNode('Я новый текстовый узел');`

## Вставка элементов и текстовых узлов

Чтобы созданный элемент (или текстовый узел) появился в нужном месте страницы его необходимо туда вставить.

Выполнить в JavaScript это можно посредством различных методов.
Одни из самых старых – `appendChild` и `insertBefore`.

### appendChild

`appendChild` предназначен для вставки узла в конец элемента (т.е. после последнего его дочернего узла) для которого этот метод вызывается:

// $elem – элемент, во внутрь которого после последнего его дочернего узла необходимо вставить узел $node
$elem.appendChild($node);

В качестве результата этот метод возвращает добавленный на страницу узел.
Пример, в котором добавим новый `<li>` в конец `<ol>`:

```html
<ol id="colors">
  <li>Красный</li>
  <li>Оранжевый</li>
  <li>Жёлтый</li>
  <li>Зелёный</li>
  <li>Голубой</li>
  <li>Синий</li>
</ol>

<script>
  const $newLi = document.createElement("li");
  $newLi.textContent = "Фиолетовый";
  const $colors = document.querySelector("#colors");
  $colors.appendChild($newLi);
</script>
```

### insertBefore

`insertBefore` предназначен для вставки узла `node` перед `nextSibling` в `$elem`:

`$elem.insertBefore(node, nextSibling);`

Если в качестве `nextSibling` передать `null`, то данный метод вставит `node` после последнего дочернего узла `$elem`. Т.е. выполнит действия аналогично `appendChild`.

В качестве результата метод `insertBefore` ``возвращает вставленный узел.

Например, вставим новый элемент `<li>` перед третьим:

```html
<ol id="colors">
  <li>Красный</li>
  <li>Оранжевый</li>
  <li>Зелёный</li>
  <li>Голубой</li>
  <li>Синий</li>
  <li>Фиолетовый</li>
</ol>

<script>
  const $newLi = document.createElement("li");
  $newLi.textContent = "Жёлтый";
  const $colors = document.querySelector("#colors");
  $colors.insertBefore($newLi, $colors.children[2]);
</script>
```

### Современные`` методы вставки и замены

В JavaScript имеются следующие современные методы для вставки элементов и строк:

- `node.append` – для добавления узлов или строк в конец `node`;
- `node.prepend` – для вставки узлов или строк в начало `node`;
- `node.before` – для вставки узлов или строк до `node`;
- `node.after` – для вставки узлов или строк после `node`.

Пример использования методов:

```html
<div id="message">
  <p>message...</p>
</div>

<script>
  const $message = document.querySelector("#message");

  // вставим строку «before» перед $message
  $message.before("before");

  // вставим строку «after» перед $message
  $message.after("after");

  const $p1 = document.createElement("p");
  $p1.textContent = "prepend";
  // вставим элемент $p1 в начало $message
  $message.prepend($p1);

  const $p2 = document.createElement("p");
  $p2.textContent = "append";

  // вставим элемент $p2 в конец $message
  $message.append($p2);
</script>
```

В результате:

```html
before
<div id="message">
  <p>prepend</p>
  <p>message...</p>
  <p>append</p>
</div>
after
```

### InsertAdjacent

В JavaScript имеется набор методов insertAdjacent, которые позволяют вставить один или несколько узлов в указанную позицию `position` относительно `$elem`

Всего существует 3 таких метода:

- `$elem.insertAdjacentElement(position, element)` – для вставки элемента (`element`);
- `$elem.insertAdjacentHTML(position, htmlString)` – для вставки строки (`htmlString`) как HTML;
- $elem.insertAdjacentText(position, string) – для вставки строки (`string`);

Значение `position`, может быть, одним из следующих:

- `'beforebegin'` – непосредственно перед `$elem`;
- `'afterbegin'` – перед первым дочерним узлом `$elem`;
- `'beforeend'` – после последнего дочернего узла `$elem`;
- `'afterend'` – сразу после `$elem`;

Пример использования `insertAdjacentHTML`:

```html
<ul id="list">
  <li>CSS</li>
</ul>

<script>
  const $list = document.querySelector("#list");

  $list.insertAdjacentHTML("beforebegin", "<h2>Веб-технологии</h2>");
  $list.insertAdjacentHTML("afterbegin", "<li>HTML</li>");
  $list.insertAdjacentHTML("beforeend", "<li>JavaScript</li>");
  $list.insertAdjacentHTML("afterend", "<p>Для фронтенд разработчиков</p>");
</script>
```

Результат:

```html
<h2>Веб-технологии</h2>
<!-- beforebegin -->
<ul id="list">
  <!-- целевой элемент -->
  <li>HTML</li>
  <!-- afterbegin -->
  <li>CSS</li>
  <li>JavaScript</li>
  <!-- beforeend -->
</ul>
<p>Для фронтенд разработчиков</p>
<!-- afterend -->
```

## DocumentFragment

`DocumentFragment` – это облегчённая версия `Document`. Он используется в качестве обёртки для временного хранения HTML элементов.

После формирования фрагмента его можно использовать в различных методах (например, `append`, `prepend` и др.). При этом, когда мы его вставляем, то вставляется только его содержимое.

`DocumentFragment` в основном используется, когда необходимо вставить множество элементов на страницу, а также для элемента `<template>`.

Например, переместим все четные `<li>` в новый `<ul>`:

```html
<ul id="source-list">
  <li>One</li>
  <li>Two</li>
  <li>Three</li>
  <li>Four</li>
</ul>
```

<ul id="target-list"></ul>
```html
<script>
  const $evenLi = document.querySelectorAll('#source-list li:nth-child(even)');
  // создадим пустой фрагмент
  let $fragment = new DocumentFragment();
  $evenLi.forEach(($li) => {
    // добавим в фрагмент элемент $li
    $fragment.appendChild($li);
  });
  // вставим фрагмент в #target-list
  document.querySelector('#target-list').appendChild($fragment);
</script>
```

Ещё один пример, в котором добавим в `<ul>` десять `<li>`:

```html
<ul id="list"></ul>

<script>
  const $list = document.querySelector("#list");
  // создадим пустой фрагмент
  let $fragment = new DocumentFragment();
  for (let i = 0; i < 10; i++) {
    const $li = document.createElement("li");
    $li.textContent = "item-" + i;
    // добавим в фрагмент элемент $li
    $fragment.appendChild($li);
  }
  // вставим фрагмент в #target-list
  document.querySelector("#list").append($fragment);
</script>
```

Использование `DocumentFragment` в подобных сценариях может значительно ускорить ваш сайт. Т.к. изменение DOM — это очень затратная операция. А с помощью `DocumentFragment` это можно сделать всего за одну операцию.

`DocumentFragment` не является частью видимой DOM. Изменения, внесенные во фрагмент, не влияют на документ и производительность страницы.

При использовании современных методов для вставки элементов можно не использовать `DocumentFragment`, т.к. в отличие от `appendChild` и `insertBefore` они позволяют вставлять сразу массив элементов.

Например, перепишем первый пример с использованием `append`:

```html
<ul id="source-list">
  <li>One</li>
  <li>Two</li>
  <li>Three</li>
  <li>Four</li>
</ul>

<ul id="target-list"></ul>

<script>
  const $evenLi = document.querySelectorAll("#source-list li:nth-child(even)");
  // создадим пустой массив
  let $list = [];
  $evenLi.forEach(($li) => {
    // добавим в массив $target элемент $li
    $list.appendChild($li);
  });
  // вставим массив элементов в #target-list
  document.querySelector("#target-list").append(...$list);
</script>
```

## Замена и клонирование узлов

Замену одних узлов другими в JavaScript можно выполнить с помощью методов `replaceChild` (когда нужна поддержка «старых» браузеров) и `replaceWith`.

### replaceChild

`replaceChild` предназначен для замены одного дочернего узла `parentNode` другим:

parentNode.replaceChild(newChild, oldChild);

Где:

- `newChild` – элемент, которым необходимо заменить `oldChild`;
- `parentNode` – родительский узел по отношению `oldChild`.

В качестве результата данный метод возвращает узел, который был заменён новым узлом, т.е. `oldChild`.

Например, заменим в `<ul>` второй `<li>` на новый с текстом «Five».

```html
ul id="list">
  <li>One</li>
  <li>Two</li>
  <li>Three</li>
</ul

<script>
  $two = document.querySelector('#list li:nth-child(2)');
  // создадим новый элемент
  $newLi = document.createElement('li');
  $newLi.textContent = 'Five';
  // заменим $two на $newLi $two.parentNode.replaceChild($newLi, $two);
</script>
```

### replaceWith

`node.replaceWith` позволяет node заменить заданными узлами или строками:

`node.replaceWith(...nodes, strings)`

Например, заменим в `<ul>` второй `<li>` другими элементами:

```html
ul id="list">
  <li>One</li>
  <li>Two</li>
  <li>Three</li>
</ul

<script>
  $two = document.querySelector('#list li:nth-child(2)');
  // создадим новые элементы
  $newLi1 = document.createElement('li');
  $newLi1.textContent = 'Five';
  $newLi2 = document.createElement('li');
  $newLi2.textContent = 'Six';
  // заменим $two на $newLi1 и $newLi2
  $two.replaceWith($newLi1, $newLi2);
</script>
```

### cloneNode – клонирование узла

`cloneNode` предназначен для создания копии узла:

`let copy = node.cloneNode(deep);`

Где:

- `node` – узел, который нужно клонировать;
- `copy` – переменная, в которую нужно поместить новый узел, который будет копией `node`;
- `deep` – глубина клонирования (по умолчанию `false`, т.е. выполняется клонирование только самого элемента `node` без детей); если установить `true`, то `node` будет скопирован со всеми его детьми.

Например, скопируем ul> и вставим её в конец body.

```html
ul id="list">
  <li>One</li>
  ...
</ul

<script>
  // выбираем #list
  const $list = document.querySelector('#list');
  // клонируем $list и помещает его в $copy
  const $copy = $list.cloneNode(true);
  // вставляем $copy в конец <body>
  document.body.append($copy);
</script>
```

## Удаление узлов

Удалить узел из DOM можно в JavaScript с помощью методов `removeChild` (считается устаревшим) и `remove`.

### removeChild

Синтаксис `removeChild`:

`parent.removeChild(node)`

Для удаления узла необходимо вызвать метод `removeChild` у родительского элемента и передать ему в качестве аргумента его сам (`node`).

Например, удалим второй `<li>` в `<ol>`:

```html
<ol id="devices">
  <li>Смартфон</li>
  <li>Планшет</li>
  <li>Ноутбук</li>
</ol>
```

```html
<script>
  const $liSecond = document.querySelector("#devices li:nth-child(2)");
  // вызываем у родительского элемента метод removeChild и передаём ему в качестве аргумента узел который нужно удалить
  $liSecond.parentNode.removeChild($liSecond);
</script>
```

В качестве результата метод `removeChild` возвращает удалённый узел.

Например, удалим элемент, а затем вставим его в другое место:

```html
<div id="message-1">
  <p>...</p>
</div>

<div id="message-2"></div>

<script>
  const $p = document.querySelector("#message-1>p");
  // удалим элемент p
  const result = $p.parentElement.removeChild($p);
  // вставим удалённый элемент p в #message-2
  document.querySelector("#message-2").append(result);
</script>
```

### remove

Ещё один способ удалить узел – это использовать метод `remove`.

Синтаксис `remove`:

`node.remove()`

Например, удалим элемент при нажатии на него:
``

```html
<button>Кнопка</button>
<script>
  document.querySelector("button").onclick = function () {
    // удалим элемент
    this.remove();
  };
</script>
```

Когда мы вставляем элементы, они удаляются со старых мест.
