---
uid: Faa-Smld7xkcQTUTDR6PS
title: Что такое async и await?
tags:
  - "#JavaScript"
  - "#асинхронность"
  - "#promise"
  - "#async"
  - "#await"
  - "#try-catch"
info:
  - "https://habr.com/ru/companies/yandex/articles/718084/"
  - "[[068 async... await|async & await]]"
  - >-
    [[069 Полное понимание синхронного и асинхронного JavaScript с async
    await|Полное понимание синхронного и асинхронного JavaScript с Async Await]]
  - "[[070 Асинхронщина в JS под капотом|Асинхронщина в JS под капотом]]"
  - "https://habr.com/ru/companies/ruvds/articles/759772/"
  - >-
    https://kanby.medium.com/почему-использовать-return-await-плохая-идея-e87b70015f0c#:~:text=Потому%20что%3A,Promise%20закончится%20resolve%20или%20reject%20
draft: false
technology: JSCore
specialty: Frontend
tools: []
order: 212
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

![[Pasted image 20230703132537.png|600]]

##### Основное об `Async/await`

*`async`* - это ключевое слово, которое ставится перед функцией и указывает, что функция является асинхронной. Функция, помеченная как `async`, _всегда возвращает промис._ Если функция возвращает значение, то оно будет обернуто в промис. Если функция выбрасывает ошибку, то промис будет отклонен с этой ошибкой.

```javascript
async function getData() {
  const response = await fetch("https://example.com/data");
  const data = await response.json();
  return data;
}
```

*`await`* - это ключевое слово, которое используется внутри функции, помеченной как `async`, для ожидания завершения асинхронной операции. Когда операция завершается, `await` *возвращает результат выполнения операции.* Если операция завершается с ошибкой, `await` выбрасывает исключение.

```javascript
async function getData() {
  const response = await fetch("https://example.com/data");
  const data = await response.json();
  return data;
}
```

В данном примере, `await` используется для ожидания выполнения асинхронной операции получения данных с сервера. Когда операция завершается, `await` возвращает результат выполнения операции.

Использование `async` и `await` позволяет писать код, который выглядит как синхронный, но при этом выполняется асинхронно. Это делает код более понятным и удобным для чтения и отладки. Кроме того, `async` и `await` упрощают обработку ошибок в асинхронном коде, так как ошибки могут быть обработаны с помощью конструкции `try-catch`.

##### `Async/await` под капотом

`Async/await` является синтаксическим сахаром взаимодействия промиса с генераторами.

```JS
function* main() {
  console.log('Entry');

  const result = yield wait();
  console.log(result);

  const result2 = yield wait();
  console.log(result2);

  // ...

  console.log('Exit');
  return 'Return';
}

run(main).then(result => {
  console.log(result);
});

function run(fn, ...args) {
  const it = fn(...args);

  return new Promise((resolve, reject) => {
    function step(resolvedValue) {
      const result = it.next(resolvedValue);

      // Условие выхода
      if (result.done) {
        resolve(result.value);
        return;
      }

      result.value.then(resolvedValue => {
        step(resolvedValue);
      });
    }
```

![[Pasted image 20231008133326.png|600]]

##### Почему использовать `return await` плохая идея?

Правило `no-return-await` в **ESLint** запрещает использование `return await` в асинхронной функции. Потому что:
возвращаемое значение асинхронной функции всегда оборачивается в _Promise.resolve_ , то `return await` на самом деле ничего не делает, кроме как добавляет дополнительное время, прежде чем Promise закончится resolve или reject .

##### Верхнеуровневый `await` и асинхронные модули

Верхнеуровневый await (top level await) позволяет использовать этот оператор за пределами асинхронных функций:

```js
const connection = await dbConnector();
const jQuery = await import("http://cdn.com/jquery");
```

_Но его можно использовать только либо внутри ES6-модулей, либо в DevTools. Такое ограничение связано с тем, что `await` — это синтаксический сахар, который работает через модули. _

Например, модуль с верхнеуровневым `await` для разработчика выглядит так:

```js
// module.mjs
const value = await Promise.resolve("^_^");

export { value };

// main.mjs
import { value } from "./module.mjs";

console.log(value); // ^_^
```

Ни внутри модуля, ни внутри основной программы нет асинхронных функций, но при этом они необходимы для работы await. Как же тогда работает этот код?

Дело в том, что движок сам возьмёт на себя задачу обернуть `await` в асинхронную функцию, поэтому где-то «под капотом», без синтаксического сахара, верхнеуровневый `await` будет выглядеть примерно так:

```js
// module.mjs
export let value;
export const promise = (async () => {
  value = await Promise.resolve("^_^");
})();

export { value, promise };

// main.mjs
import { value, promise } from "./module.mjs";
(async () => {
  await promise;
  console.log(value); // ^_^
})();
```

Никакой магии. Просто синтаксический сахар.

---

[[003 JSCore|Назад]]
