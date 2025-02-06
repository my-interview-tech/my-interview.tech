---
title: CodeReview
draft: false
tags:
  - "#React"
  - "#reactTask"
  - "#unknownINC"
---
```jsx
// ПОЧЕМУ ЭТОТ КОД НЕ ПРОШЕЛ КОД РЕВЬЮ?

const heavyFunc = (props)=>{
    return Math.floor(Math.random() * props.count)
  };

  const LazyInit = (props)=>{
      const [count, setCount] = useState(heavyFunc(props)); 
      return (
          <>  
              {count}
              <button onClick={()=>setCount((prevProps)=>--prevProps)}>
                Decrement
              </button>
          </>
      )
  }
```


___

[[011 Решение задач JS, TS и React|Назад]]