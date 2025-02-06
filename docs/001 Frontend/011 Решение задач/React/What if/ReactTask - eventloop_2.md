---
title: eventloop_2
draft: false
tags:
  - "#React"
  - "#reactTask"
  - "#EventLoop"
  - "#datagileINC"
---
```jsx
import {useState, useEffect} from 'react'

export default function App() {
	const [counter, setCounter] = useState(0)

	console.log('render', counter);

	useEffect(() => {
		console.log('effect', counter)
		return () => {
			console.log('cleanup', counter)
		}
	}, [counter])

	useEffect(() => {
		setCounter((prev) => prev + 1)
	}, [])

	return null
}
```

___

[[011 Решение задач JS, TS и React|Назад]]