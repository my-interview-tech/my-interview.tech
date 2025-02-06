---
title: SubElement()
draft: false
tags:
  - "#React"
  - "#reactTask"
  - "#itOne"
---
```jsx
const ParentElement = ()=>{
    const [count, setCount] = useState(0)
    const increment = () => setCount((prevProps) => ++prevProps);
    return(
      <>
        Parent: {count}  <br/>
        <SubElement clicker={increment} count={count}/>
    </>)
  }
  
  const SubElement = ({clicker, count})=>{
    return (
      <>
	      Sub: {count}
	      <button onClick={clicker}>Increment</button>
      </>
    )
  }
```

___

[[011 Решение задач JS, TS и React|Назад]]