---
uid: ikgV4FNnczrmuGds6-wJT
title: TSTask - getValue()_0
tags:
  - "#TypeScript"
  - "#generic"
  - "#keyof"
  - "#tsTask"
  - "#астралСофт"
draft: false
technology: Решение задач
specialty: Frontend
tools: []
order: 0
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

```TypeScript
const getValue = <T extends Record<string, unknown>>(obj: T, key: string): unknown => {
	obj(key)
}

getValue({name: 'Vasya'}, 'unknown');
```

---

[[011 Решение задач JS, TS и React|Назад]]
