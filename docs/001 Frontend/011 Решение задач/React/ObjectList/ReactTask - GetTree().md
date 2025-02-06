---
title: GetTree()
draft: false
tags:
  - "#React"
  - "#reactTask"
  - "#детскийМир"
---
```jsx
import React, { useEffect, useState } from "react";
import { getTree } from "./getTree";
import "./styles.css";

/**
 * Сервер возвращает дерево элементов
 * в виде массива с элементами { id, parentId, name }
 * Например:
 * [
  {id: 3, parentId: 1, name: "Banana"},
  {id: 5, parentId: 1, name: "Apple"},
  {id: 6, parentId: 5, name: "Red apple"},
  {id: 1, parentId: null, name: "Fruit"},
  { id: 2, parentId: null, name: "Vegetable"}
]
 *
 * Задача:
 * Вывести в браузере дерево из метода getTree в развернутом виде
 * Пример:
 * Fruit
 *   Banana
 *   Apple
 *     Red apple
 * Vegetable
 */

export default function App() {

  return null;

}
```

___

[[011 Решение задач JS, TS и React|Назад]]