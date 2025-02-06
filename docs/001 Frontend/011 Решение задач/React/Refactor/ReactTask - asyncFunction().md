---
title: asyncFunction()
draft: false
tags:
  - "#React"
  - "#reactTask"
  - "#unknownINC"
---
```jsx
// ЧТО НЕ ТАК С КОДОМ !?

const asyncFunction = ()=>{
    return new Promise((resolve)=>{
      setTimeout(()=>{
        resolve(Math.random()*10)
      }, 1000);
    })
  };
  
  const AsyncUpdate = ()=>{
    const [count, setCount] = useState(0);
    const [asyncCount, setAsyncCount] = useState(0);
  
    useEffect( async ( )=>{
       
        
      const res = await asyncFunction();
      setAsyncCount(res)
    }, [count])
  
    return(
      <div>
        sync count: {count}
        async count: {asyncCount}
        <br/>
        <button onClick={()=>setCount((prevProps)=>++prevProps)}>
              increment
        </button>
      </div>
    )
  }
```

___

[[011 Решение задач JS, TS и React|Назад]]