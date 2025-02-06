---
title: Counter_1
draft: false
tags:
  - "#React"
  - "#reactTask"
  - "#СравниРУ"
  - "#useState"
  - "#useEffect"
---
```jsx
import { StrictMode, useState, useEffect } from "react"; 
import { createRoot } from "react-dom/client"; 
 
import App from "./App"; 
 
const counter = () => { 
  let count = 0; 
 
  return () => { 
    count += 1; 
 
    return count; 
  }; 
}; 
 
/** Задача: 
 * Выводить значение счетчика 
 * 1 раз в секунду */ 
const incrementor = counter(); 
const count = incrementor(); 

export const TestComponent = () => { 
  const [state, setState] = useState(count); 
 
  useEffect(() => { 
    setTimeout(() => { 
      setState(incrementor()); 
    }, 1000); 
  }, [state]); 
 
  return <div>{state}</div>; 
}; 
 
const rootElement = document.getElementById("root"); 
const root = createRoot(rootElement); 
 
root.render( 
  <StrictMode> 
    <App /> 
    <TestComponent /> 
  </StrictMode> 
);
```

[](https://codesandbox.io/s/reacttask-counter-1-1-cwvxmr)

___

[[011 Решение задач JS, TS и React|Назад]]