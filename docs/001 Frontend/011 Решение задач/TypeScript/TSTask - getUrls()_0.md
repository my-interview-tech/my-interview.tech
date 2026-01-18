---
uid: UTNWkFpzpm8oncNr9-WqR
title: TSTask - getUrls()_0
tags:
  - "#TypeScript"
  - "#tsTask"
  - "#promise"
  - "#SignalINC"
draft: false
technology: Решение задач
specialty: Frontend
tools: []
order: 0
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

```TS
/**
Необходимо реализовать функцию, которая опросит урлы и вернет массив ответов
['url1_answer', 'url2_answer', ...] так, чтобы в любой момент времени выполнялось не более limit запросов (как только любой из них завершился, сразу же отправляется следующий)
*/

interface ResponseDataType {
  delay: number;
  data: string;
}
const asyncFetch = (url: string) =>
  new Promise<ResponseDataType>((resolve) => {
    const delay = Math.random() * 1000;
    setTimeout(() => {
      resolve({ delay, data: "result" + url });
    }, delay);
  });

const urlsToFetch = Array(30)
  .fill((i: number) => `/${i}/aadt`)
  .map((fn, index) => fn(index));
```

\*\*Ответ

```ts
/** Решение задачи                */
const paralellUploading = (
  urls: string[],
  parallelLimit: number,
): Promise<ResponseDataType[]> => {
  throw new Error("notImplemented");
};

const responsArr = paralellUploading(urlsToFetch, 3);
console.log(responsArr);
```

---

[[011 Решение задач JS, TS и React|Назад]]
