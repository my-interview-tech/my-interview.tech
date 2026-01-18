---
uid: JE2zOtMYX36ZK2Yyepta5
title: useCallback() и useMemo()
tags:
  - "#React"
  - "#Hooks"
  - "#useCallback"
  - "#useMemo"
draft: false
technology: ReactCore
specialty: Frontend
tools: []
order: 42
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

- `useCallback()` - сохраняет функцию между вызовами, если данные в массиве зависимостей не изменились.
  // f - функция из первого аргумента
  `const f = useCallback(() => loadData(id), [id]);`

- `useMemo()` - работает также, но для значений.
  // v - результат функции из первого аргумента
  `const v = useMemo(() => getValue(id) , [id]);`

---
