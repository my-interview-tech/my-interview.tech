---
uid: T5J_NrFX_TOuOY6pjN-SH
title: Task_string - checkWord()_1
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#string"
  - "#сбербанк"
draft: false
technology: Решение задач
specialty: Frontend
tools: []
order: 0
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

```js
/* 
Напишите функцию, которая будет возвращать количество букв и цифр, не зависимо от регистра,
которые встречаются во входной строке более одного раза.
Можно предположить, что входная строка содержит только буквы алфавита (как прописные, 
так и строчные) и числовые цифры.
Например:
"abcde" => 0 // все буквы уникальны
"aabbcde" => 2 // a и b задублированы
"aabBcde" => 2 // от регистра не зависит
"indivisibiity" => 1 // количество повторений не важно, как и то, что повторы идут подряд
*/

function checkWord() {
  // Ваш код здесь
}
```

\*\*Ответ

```js
function checkWord(str) {
  if (typeof str !== "string") {
    return undefined;
  }

  const newObj = str
    .toLowerCase()
    .split("")
    .reduce((acc, el) => {
      acc[el] = (acc[el] || 0) + 1;
      return acc;
    }, {});

  let counter = 0;

  for (let char in newObj) {
    if (newObj[char] === 1) {
      counter;
    } else if (newObj[char] > 1) {
      counter += 1;
    }
  }

  return counter;
}

console.log(checkWord("abcde")); // 0, все буквы уникальны
console.log(checkWord("aabbcde")); // 2, a и b задублированы
console.log(checkWord("aabBcde")); // 2, от регистра не зависит
console.log(checkWord("indivisibiity")); // 1, количество повторений не важно, как и то, что повторы идут подряд
```

---

[[011 Решение задач JS, TS и React|Назад]]
