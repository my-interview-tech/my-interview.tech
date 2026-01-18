---
uid: nn33cu73iXnjP60x9Zwcd
title: Что такое хук useActionState() ?
tags:
  - React
  - Hooks
  - useActionState
  - React19
info:
  - "https://react.dev/reference/react/useActionState"
  - "https://dev.to/random_ti/useactionstate-a-new-hook-in-react-5blm"
draft: false
technology: ReactCore
specialty: Frontend
tools: []
order: 92
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

Чтобы упростить общие случаи для Actions, был добавлен новый хук под названием `useActionState`:

```javascript
const [error, submitAction, isPending] = useActionState(
  async (previousState, newName) => {
    const error = await updateName(newName);
    if (error) {
      // Вы можете вернуть любой результат действия.
      // Здесь мы возвращаем только ошибку.
      return error;
    }

    // обработка успеха
    return null;
  },
  null,
);
```

`useActionState` принимает функцию (“Action”) и возвращает обернутое Action для вызова. Это работает, потому что Actions компонуются. Когда вызывается обернутое Action, `useActionState` вернет последний результат Action как данные и ожидающее состояние Action как `pending`.

**Примечание:**

`React.useActionState` ранее назывался `ReactDOM.useFormState` в Canary-релизах, но мы переименовали его и объявили `useFormState` устаревшим.

См. #28491 для получения дополнительной информации.

**React DOM: Actions**

Actions также интегрированы с новыми функциями `<form>` в React 19 для `react-dom`. Мы добавили поддержку передачи функций в свойства `action` и `formAction` элементов `<form>`, `<input>` и `<button>` для автоматической отправки форм с помощью Actions:

```javascript
<form action={actionFunction}>
```

Когда `<form> Action` завершается успешно, React автоматически сбрасывает форму для неуправляемых компонентов. Если вам нужно сбросить `<form>` вручную, вы можете вызвать новый API `requestFormReset` React DOM.

Для получения дополнительной информации см. документацию по `react-dom` для `<form>`, `<input>` и `<button>`.

---

[[004 ReactCore|Назад]]
