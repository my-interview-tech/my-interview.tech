---
uid: r9C2WosNnEI2UO_xwXp6A
title: propTypes
tags:
  - "#React"
  - "#propTypes"
  - "#props"
draft: false
technology: ReactCore
specialty: Frontend
tools: []
order: 27
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

Позволяет проверить значение свойств ( #props ) , которые получает компонент

```jsx
const Comp = ({name}) => (<p>{name}</p>);
	Comp.propTypes = {
		name: (props, propName, compName) => {...}
}
```

Проверка срабатывает после #defaultProps
функция-валидатор возвращает #null или объект #error

---
