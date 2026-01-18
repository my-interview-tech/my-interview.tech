---
uid: Ej8GyjcHOZhUCVRVu9Ns7
title: ReactTask - React.StrictMode_0
tags:
  - "#React"
  - "#reactTask"
  - "#strict-mode"
  - "#астон"
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
	// В каком порядке выведутся в console.log с использованием
	// и без использования Strict Mode

	const c1 = ({ children }) => {
		console.log('1')
		React.useEffect(() => {
			console.log('2')
		}, [])
		return <>
			{children}
		</>
	}

	const c2 = {} => {
		console.log('3')
		React.useEffect(() => {
			console.log('4')
		}, [])
		return <div> YOWZ </div>
	}

	export default function App() {
		return (
			<c1>
				<c2/>
			</c1>
		)
	}

// без 1 3 4 2
// с 11 33 42 42
```

---

[[011 Решение задач JS, TS и React|Назад]]
