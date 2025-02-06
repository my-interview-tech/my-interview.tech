---
title: useRef()_2
draft: false
tags:
  - React
  - reactTask
---

```jsx
import React, { useState, useRef } from 'react';

export default function App() {
	const [counter, setCounter] = useState(0);
	// const [displayedCounter, setDisplayedCounter] = useState(0);
	const displayedCounterRef = useRef(0);

	const handleIncrement = () => {
		setCounter(prevCounter => prevCounter + 1);
	};

	const handleDisplayCounter = () => {
		displayedCounterRef.current = counter;
	};

	// const handleDisplayCounter = () => {
	// setDisplayedCounter(counter);
	// };

	return (
		<div className="App">
		<h1>Counter: {counter}</h1>
		<button onClick={handleIncrement}>Increment</button>
		<button onClick={handleDisplayCounter}>Display Counter</button>
		<h2>Displayed Counter: {displayedCounterRef.current}</h2>
		</div>
	);
}
```

___

[[011 Решение задач JS, TS и React|Назад]]