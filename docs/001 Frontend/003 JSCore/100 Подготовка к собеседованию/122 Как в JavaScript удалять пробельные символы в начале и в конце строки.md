---
uid: OuVHOo5gFmJUetIgEYlX0
title: Как в JavaScript удалять пробельные символы в начале и в конце строки?
tags:
  - "#JavaScript"
  - "#string"
  - "#trim"
  - "#trimStart"
  - "#trimEnd"
info: null
technology: JSCore
specialty: Frontend
tools: []
order: 122
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
draft?: false
---

![[Pasted image 20230702203316.png|600]]

Для удаления пробельных символов в начале и в конце строки в JavaScript можно использовать методы `.trim()`, `.trimStart()` и `.trimEnd()`.

Метод `.trim()` удаляет пробельные символы в начале и в конце строки. Этот метод не изменяет исходную строку, а возвращает новую строку без пробельных символов в начале и в конце.

Синтаксис метода `.trim()`:

```javascript
string.trim();
```

- `string` - строка, из которой нужно удалить пробельные символы.

Пример использования метода `.trim()`:

```javascript
const str = "   hello world    ";

const trimmedStr = str.trim();

console.log(trimmedStr); // Вывод: "hello world"
```

В этом примере, мы используем метод `.trim()` для удаления пробельных символов в начале и в конце строки `str`. Результатом вызова метода `.trim()` является новая строка `trimmedStr`, содержащая исходную строку без пробельных символов в начале и в конце.

Методы `.trimStart()` и `.trimEnd()` удаляют пробельные символы в начале и в конце строки соответственно. Эти методы также не изменяют исходную строку, а возвращают новую строку без пробельных символов в начале или в конце.

Синтаксис метода `.trimStart()`:

```javascript
string.trimStart();
```

- `string` - строка, из которой нужно удалить пробельные символы в начале.

Синтаксис метода `.trimEnd()`:

```javascript
string.trimEnd();
```

- `string` - строка, из которой нужно удалить пробельные символы в конце.

Пример использования методов `.trimStart()` и `.trimEnd()`:

```javascript
const str = "   hello world    ";

const trimmedStartStr = str.trimStart();
const trimmedEndStr = str.trimEnd();

console.log(trimmedStartStr); // Вывод: "hello world    "
console.log(trimmedEndStr); // Вывод: "   hello world"
```

В этом примере, мы используем метод `.trimStart()` для удаления пробельных символов в начале строки `str`, и метод `.trimEnd()` для удаления пробельных символов в конце строки `str`. Результатом вызовов методов `.trimStart()` и `.trimEnd()` являются новые строки `trimmedStartStr` и `trimmedEndStr`, содержащие исходную строку без пробельных символов в начале и в конце соответственно.

Таким образом, для удаления пробельных символов в начале и в конце строки в JavaScript можно использовать методы `.trim()`, `.trimStart()` и `.trimEnd()`.

---

[[003 JSCore|Назад]]
