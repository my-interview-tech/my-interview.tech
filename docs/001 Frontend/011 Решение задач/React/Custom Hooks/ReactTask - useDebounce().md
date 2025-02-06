---
title: useDebounce()
draft: false
tags:
  - "#React"
  - "#reactTask"
  - "#usedebounce"
  - "#Debounce"
  - "#itOne"
---

```jsx
// Написать кастомный хук `useDebounce()`

import React, { useState, useEffect } from "react";

const useDebounce = (value, delay) => {
	// Ваш код здесь
};

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const debouncedInputValue = useDebounce(inputValue, 500);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="App">
      <input type="text" value={inputValue} onChange={handleChange} />
      <p>Debounced Value: {debouncedInputValue}</p>
    </div>
  );
}
```

___

[[011 Решение задач JS, TS и React|Назад]]