---
title: eventloop_1
draft: false
tags:
  - "#React"
  - "#reactTask"
  - "#EventLoop"
  - "#datagileINC"
---
```JSX
import React from 'react'

const Inner = () => {
	console.log('render inner');

	return null
}

const App = () => {
	const [counter, setCounter] = React.useState(0);

	console.log('render-1', counter)

	React.useEffect(() => {
		setCounter(1);
		console.log('effect-1', counter)
	}, [counter])

	React.useEffect(() => {
		console.log('effect-2', counter)
		setCounter(2);
	}, [counter])

	console.log('render-2', counter)

	return <Inner />
}

export default App
```

___

[[011 Решение задач JS, TS и React|Назад]]