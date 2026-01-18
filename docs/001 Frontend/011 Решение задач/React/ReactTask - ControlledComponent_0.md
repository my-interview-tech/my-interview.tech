---
uid: rQmQDB2H_VvzfBcQ53ine
title: ReactTask - ControlledComponent_0
tags:
  - "#React"
  - "#reactTask"
  - "#unknownINC"
  - "#controlled"
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
// Вывести значения первого и второго инпута учитываю что один конролируемый а второй нет

function F() {
  const fn = () => {
    console.log("first input value : ");
    console.log("second input value : ");
  };
  return (
    <form onClick={fn}>
      <input placeholder="controlled field"></input>
      <input placeholder="uncontrolled field"></input>
      <button>Отправить</button>
    </form>
  );
}
```

---

[[011 Решение задач JS, TS и React|Назад]]
