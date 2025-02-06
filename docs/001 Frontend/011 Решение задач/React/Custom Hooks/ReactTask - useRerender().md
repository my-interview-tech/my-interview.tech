---
title: useRerender()
draft: false
tags:
  - "#React"
  - "#reactTask"
  - "#Hooks"
  - "#itOne"
---
```jsx
// Нужно написать кастомный хук, который логирует, из-за чего произошёл ререндер

const ParentComponent = ()=>{
    const [random, setRandom] = useState(0); // Передаем в дочерний компонент в виде Пропса
    const [text, setText] = useState("");    // Передаем в дочерний компонент в виде Пропса
    
    const createRandom = ()=> setRandom(Math.floor(Math.random()*100))
    const onTextChange = (e)=> setText(e.target.value)
    
    const [count, setCount] = useState(0);
    const incrementCount = ()=>setCount((prev)=>prev+1);  // эта функция передается в виде пропса в дочерний компонент
    return(
        <>
            <div>
                Count: {count}
            </div>
            <input type="text" onChange={onTextChange} />
            <button onClick={createRandom}>Generate Random</button>
            <hr />
            <div>
                <ChildComponent random={random} text={text} incrementCount={incrementCount}/>
            </div>
            
        </>
    )
}

const ChildComponent = (props) =>{
    return(
        <> 
            <div>Random number: {props.random}</div>
            <div>Text: {props.text}</div>
            {/* Увеличиваем Count в родительском компоненте */}
            <button onClick={props.incrementCount}>Increment Count From Child Component</button>  
        </>
    )
}

//ответ  ниже!!!
//ответ  ниже!!!
//ответ  ниже!!!

```

___

[[011 Решение задач JS, TS и React|Назад]]