---
uid: 8QUbTUDrtW6xPEOx__iE4
title: Task_object - sumTree()__1
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#object"
  - "#while"
  - "#unknownINC"
draft: false
technology: Решение задач
specialty: Frontend
tools: []
order: 0
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

```JS
// Написать функцию, которая суммирует все значения дерева. 12 + 24 +
// 24 + 15 + 13 + 23 = 111 Делать рекурсией запрещено законом +
// вложенность может быть любая

// while, pop, push

const tree = {
    val: 12,
    left: {
        val: 24,
        left: {
            val: 24,
        },
        right: {
            val: 15,
        },
    },
    right: {
        val: 13,
        left: {
            val: 23,
        },
    },
};

function sumTree(tree) {

}

console.log(sumTree(tree));
```

\*\*Ответ

```js
const funcFunc = (obj) => {
  let sum = 0;
  const stack = [obj];

  while (stack.length > 0) {
    const currentNode = stack.pop();
    sum += currentNode.val;

    if (currentNode.left) {
      stack.push(currentNode.left);
    }

    if (currentNode.right) {
      stack.push(currentNode.right);
    }
  }

  return sum;
};
```

---

[[011 Решение задач JS, TS и React|Назад]]
