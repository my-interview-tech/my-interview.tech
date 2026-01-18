---
uid: CxIuTjTDBeeLUDlI3RJvN
title: mapDispatchToProps()
tags:
  - "#React"
  - "#Redux"
  - "#mapDispatchToProps"
draft: false
technology: ReactCore
specialty: Frontend
tools: []
order: 58
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

```jsx
mapDispatchToProps - второй аргумент для функции #connect :

const mapDispatchToProps = (dispatch) => {
	return {
		inc: () => dispatch({ type: 'INC' } )
		};
};
```

Созданные функции будут переданы в компонент .
Таким способом компонент может обновить состояние в #store .

---
