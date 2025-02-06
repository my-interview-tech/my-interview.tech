---
title: Task_eventloop - 22
draft: false
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#EventLoop"
  - "#unknownINC"
---
```jsx
const func1 = async () => {
  console.log(1);

  setTimeout(() => console.log(2), 0);

  Promise.resolve().then(() => console.log(3));

  const func2 = async () => {
    setTimeout(() => console.log(4), 1);
    console.log(5);
    Promise.resolve().then(() => setTimeout(() => console.log(6), 0));

    const importValue = new Promise((res) => {
      console.log(7);
      Promise.resolve().then(() => console.log(8));

      setTimeout(() => {
        res();
      }, 5);
    });

    await importValue;

    console.log(9);
  };

  Promise.resolve().then(() => console.log(10));

  await func2();

  console.log(11);
};

func1();

console.log(12);
```

___

[[011 Решение задач JS, TS и React|Назад]]