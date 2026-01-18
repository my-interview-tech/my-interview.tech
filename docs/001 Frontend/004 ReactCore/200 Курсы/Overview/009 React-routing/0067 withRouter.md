---
uid: JQlvIeBA2GzjzaHya1XNz
title: withRouter
tags:
  - "#React"
  - "#withRouter"
  - "#React-router"
draft: false
technology: ReactCore
specialty: Frontend
tools: []
order: 67
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

withRouter - это компонент высшего порядка , он передаёт компоненту объект react router :

```jsx
const MyComponent = ({ match, location, history }) => {
  return <Button onclick={() => history.push(`/new/path`)}> Click ME </Button>;
};

export default withRouter(MyComponent);
```

---
