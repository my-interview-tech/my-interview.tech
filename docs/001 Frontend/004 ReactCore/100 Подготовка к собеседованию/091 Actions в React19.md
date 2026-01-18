---
uid: j5oGl--PVWbV22zPUehHN
title: Actions в React19
tags:
  - React
  - Hooks
  - React19
  - actions
  - useActionState
  - useTransition
  - useOptimistic
  - useFormStatus
info:
  - "https://dev.to/vinishanto/actions-react-19-50ad"
draft: false
technology: ReactCore
specialty: Frontend
tools: []
order: 91
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

В React-приложениях распространенный сценарий — выполнение мутации данных и последующее обновление состояния в ответ. Например, когда пользователь отправляет форму для изменения своего имени, вы делаете API-запрос, а затем обрабатываете ответ. Раньше вам нужно было вручную обрабатывать ожидающие состояния, ошибки, оптимистичные обновления и последовательные запросы.

Например, вы могли бы обрабатывать ожидающее и ошибочное состояние с помощью `useState`:

```javascript
// До Actions
function UpdateName({}) {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async () => {
    setIsPending(true);
    const error = await updateName(name);
    setIsPending(false);
    if (error) {
      setError(error);
      return;
    }
    redirect("/path");
  };

  return (
    <div>
      <input value={name} onChange={(event) => setName(event.target.value)} />
      <button onClick={handleSubmit} disabled={isPending}>
        Обновить
      </button>
      {error && <p>{error}</p>}
    </div>
  );
}
```

В React 19 мы добавляем поддержку использования асинхронных функций в переходах для автоматической обработки ожидающих состояний, ошибок, форм и оптимистичных обновлений.

Например, вы можете использовать `useTransition` для обработки ожидающего состояния:

```javascript
// Использование ожидающего состояния из Actions
function UpdateName({}) {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    startTransition(async () => {
      const error = await updateName(name);
      if (error) {
        setError(error);
        return;
      }
      redirect("/path");
    });
  };

  return (
    <div>
      <input value={name} onChange={(event) => setName(event.target.value)} />
      <button onClick={handleSubmit} disabled={isPending}>
        Обновить
      </button>
      {error && <p>{error}</p>}
    </div>
  );
}
```

Асинхронный переход немедленно установит ожидающее состояние в `true`, сделает асинхронный запрос(ы) и переключит `isPending` на `false` после завершения всех переходов. Это позволяет вам сохранить текущий UI отзывчивым и интерактивным, пока данные изменяются.

**Примечание:**  
По соглашению, функции, использующие асинхронные переходы, называются "Actions".

Actions автоматически управляют отправкой данных для вас:

- **Ожидающее состояние:** Actions предоставляют ожидающее состояние, которое начинается в начале запроса и автоматически сбрасывается, когда завершается последнее обновление состояния.
- **Оптимистичные обновления:** Actions поддерживают новый хук `useOptimistic`, чтобы вы могли показывать пользователям мгновенную обратную связь во время отправки запросов.
- **Обработка ошибок:** Actions предоставляют обработку ошибок, чтобы вы могли отображать Error Boundaries, когда запрос завершается неудачно, и автоматически возвращать оптимистичные обновления к их исходному значению.
- **Формы:** Элементы `<form>` теперь поддерживают передачу функций в свойства `action` и `formAction`. Передача функций в свойство `action` по умолчанию использует Actions и автоматически сбрасывает форму после отправки.

На основе Actions React 19 вводит `useOptimistic` для управления оптимистичными обновлениями и новый хук `React.useActionState` для обработки общих случаев для Actions.

В `react-dom` мы добавляем `<form> Actions` для автоматического управления формами и `useFormStatus` для поддержки общих случаев для Actions в формах.

В React 19 приведенный выше пример можно упростить до:

```javascript
// Использование <form> Actions и useActionState
function ChangeName({ name, setName }) {
  const [error, submitAction, isPending] = useActionState(
    async (previousState, formData) => {
      const error = await updateName(formData.get("name"));
      if (error) {
        return error;
      }
      redirect("/path");
      return null;
    },
    null,
  );

  return (
    <form action={submitAction}>
      <input type="text" name="name" />
      <button type="submit" disabled={isPending}>
        Обновить
      </button>
      {error && <p>{error}</p>}
    </form>
  );
}
```

---

[[004 ReactCore|Назад]]
