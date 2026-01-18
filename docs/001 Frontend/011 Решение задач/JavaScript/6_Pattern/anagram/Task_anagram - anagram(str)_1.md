---
uid: BELqTUXsnDZOTaryLx5S9
title: Task_anagram - anagram(str)_1
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#anagram"
  - "#промсвязьбанк"
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
// Принять массив строк, вернуть массив массивов анаграмм:
// ["тьма", "мать", "адрес", "среда", "поток"] → [["тьма", "мать"], ["адрес", "среда"]]

function anagram(str) {
  // Ваш код здесь
}
```

\*\*Ответ

```js
function anagram(str) {
  let ang = {};

  for (let word of str) {
    const sorted = word.split("").sort().join("");
    if (ang[sorted]) {
      ang[sorted].push(word);
    } else {
      ang[sorted] = [word];
    }
  }
  return Object.values(ang).filter((el) => el.length > 1);
}
```

---

[[011 Решение задач JS, TS и React|Назад]]
