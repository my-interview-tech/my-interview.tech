---
uid: N0se2p_CcboRjKM5-1vPC
title: ReactTask - eventloop 1_-1 !!!
tags:
  - "#React"
  - "#reactTask"
  - "#EventLoop"
  - "#datagileINC"
draft: false
technology: Решение задач
specialty: Frontend
tools: []
order: 0
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
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

---

[[011 Решение задач JS, TS и React|Назад]]
