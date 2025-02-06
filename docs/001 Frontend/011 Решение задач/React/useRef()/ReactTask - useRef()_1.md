---
title: useRef()_1
draft: false
tags:
  - "#React"
  - "#useRef"
  - "#useState"
  - "#reactTask"
  - "#астралСофт"
---
```jsx
const Child = ({ value }) => {
	return <p> {value} </p>
};

const Main = () => {
	const value = useRef(null);
	const handeChangeValue = () => {
		value.current = Math.random()
	};
	return (
		<section>
			<Child value={value.current}/>
			<button type='button' onClick={handeChangeValue}>
				Btn
			</button>
		</section>
	)
}

// Увидим ли мы актуальное value ?
```

___

[[011 Решение задач JS, TS и React|Назад]]