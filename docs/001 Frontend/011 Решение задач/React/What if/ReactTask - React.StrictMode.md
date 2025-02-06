---
title: React.StrictMode
draft: false
tags:
  - "#React"
  - "#reactTask"
  - "#strict-mode"
  - "#астон"
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
```

___

[[011 Решение задач JS, TS и React|Назад]]