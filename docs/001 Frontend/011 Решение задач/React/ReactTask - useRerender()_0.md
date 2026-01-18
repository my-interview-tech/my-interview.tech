---
uid: hL3ldMOjyXbFLK7LCDlUc
title: ReactTask - useRerender()_0
tags:
  - "#React"
  - "#reactTask"
  - "#Hooks"
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
// Нужно написать кастомный хук, который логирует, из-за чего произошёл ререндер

const ParentComponent = () => {
  const [random, setRandom] = useState(0); // Передаем в дочерний компонент в виде Пропса
  const [text, setText] = useState(""); // Передаем в дочерний компонент в виде Пропса

  const createRandom = () => setRandom(Math.floor(Math.random() * 100));
  const onTextChange = (e) => setText(e.target.value);

  const [count, setCount] = useState(0);
  const incrementCount = () => setCount((prev) => prev + 1); // эта функция передается в виде пропса в дочерний компонент
  return (
    <>
      <div>Count: {count}</div>
      <input type="text" onChange={onTextChange} />
      <button onClick={createRandom}>Generate Random</button>
      <hr />
      <div>
        <ChildComponent
          random={random}
          text={text}
          incrementCount={incrementCount}
        />
      </div>
    </>
  );
};

const ChildComponent = (props) => {
  return (
    <>
      <div>Random number: {props.random}</div>
      <div>Text: {props.text}</div>
      {/* Увеличиваем Count в родительском компоненте */}
      <button onClick={props.incrementCount}>
        Increment Count From Child Component
      </button>
    </>
  );
};

//ответ  ниже!!!
//ответ  ниже!!!
//ответ  ниже!!!
```

\*\*Ответ

```jsx
function useWhatCasuedRender(name, props) {
  const prevPropsRef = useRef({});
  useEffect(() => {
    const chnanges = [];
    const prevProps = prevPropsRef.current;
    const keySet = new Set([...Object.keys(prevProps), ...Object.keys(props)]);
    keySet.forEach((key) => {
      if (prevProps[key] !== props[key]) {
        chnanges.push({
          key,
          from: prevProps[key],
          to: props[key],
        });
      }
    });

    if (chnanges.length) {
      console.group();
      console.log(`Произошел ререндер компонета ${name} из-за:`);
      chnanges.forEach((c) => {
        const { key, from, to } = c;
        if (from instanceof Function) {
          console.log(`Ссылка на функцию ${key} изменилась`);
        } else {
          console.log(`Пропс ${key} изменился с ${from} на ${to}`);
        }
      });
      console.groupEnd();
    }
    prevPropsRef.current = props;
  });
}
```

---

[[011 Решение задач JS, TS и React|Назад]]
