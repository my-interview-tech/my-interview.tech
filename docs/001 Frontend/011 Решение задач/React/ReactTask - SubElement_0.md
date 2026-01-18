---
uid: 7Z1iy72R1AJKbt9oclzqq
title: ReactTask - SubElement_0
tags:
  - "#React"
  - "#reactTask"
  - "#itOne"
draft: false
technology: Решение задач
specialty: Frontend
tools: []
order: 0
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

```jsx
const ParentElement = () => {
  const [count, setCount] = useState(0);
  const increment = () => setCount((prevProps) => ++prevProps);
  return (
    <>
      Parent: {count} <br />
      <SubElement clicker={increment} count={count} />
    </>
  );
};

const SubElement = ({ clicker, count }) => {
  return (
    <>
      Sub: {count}
      <button onClick={clicker}>Increment</button>
    </>
  );
};
```

\*\*Ответ

```jsx
// юзать React.memo + его второй параметр (аналог shouldComponentUpdate ) (ответ ниже)

const SubElement = React.memo(
  ({ clicker, count }) => {
    return (
      <>
        Sub: {count}
        <button onClick={clicker}>Increment</button>
      </>
    );
  },
  (prevProps, newProps) => newProps.count % 2 !== 0,
);
```

---

[[011 Решение задач JS, TS и React|Назад]]
