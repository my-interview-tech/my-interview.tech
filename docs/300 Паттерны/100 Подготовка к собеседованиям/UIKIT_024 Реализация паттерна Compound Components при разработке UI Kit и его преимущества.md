---
title: Реализация паттерна Compound Components при разработке UI Kit и его преимущества
draft: false
tags:
  - UIKit
  - CompoundComponent
info:
---
**Паттерн Compound Components** позволяет создавать гибкие и переиспользуемые компоненты, обеспечивая удобный API для их взаимодействия. Вместо передачи множества пропсов в родительский компонент, дочерние компоненты напрямую взаимодействуют через контекст.

**Пример реализации Tabs в UI Kit с использованием Compound Components**

```jsx

import React, { createContext, useContext, useState } from "react";  

const TabsContext = createContext();  

export function Tabs({ children, defaultValue }) {   
	const [activeTab, setActiveTab] = useState(defaultValue);    
	
	return (    
		 <TabsContext.Provider value={{ activeTab, setActiveTab }}>       
			 <div className="tabs">{children}</div>     
		</TabsContext.Provider>   
	); 
}  


export function TabList({ children }) {   
	return <div className="tab-list">{children}</div>; 
}  

export function Tab({ value, children }) {   
	const { activeTab, setActiveTab } = useContext(TabsContext);    
	
	return (     
		<button       
			className={`tab-button ${activeTab === value ? "active" : ""}`} 
			onClick={() => setActiveTab(value)}     
		>   
			{children}     
		</button>   
	); 
}  

export function TabPanel({ value, children }) {   
	const { activeTab } = useContext(TabsContext);    
	
	return activeTab === value ? <div className="tab-panel">{children}</div> : null; 
}
	
```

```jsx
<Tabs defaultValue="tab1">   
	<TabList>     
		<Tab value="tab1">Вкладка 1</Tab>    
		<Tab value="tab2">Вкладка 2</Tab>   
	</TabList>    
	<TabPanel value="tab1">Контент для вкладки 1</TabPanel>   
	<TabPanel value="tab2">Контент для вкладки 2</TabPanel> 
</Tabs>`
```
---

**Преимущества использования Compound Components в UI Kit**

1. **Гибкость и переиспользуемость**
    - Позволяет легко компоновать вложенные элементы без жесткого API.
        
2. **Явное и понятное API**
    - Вместо передачи множества пропсов, компоненты группируются логически, что делает код читаемым.
        
3. **Слабая связанность компонентов**
    - Дочерние элементы взаимодействуют через контекст, а не через пропсы родителя.
        
4. **Облегчение поддержки и масштабирования**
    - Можно добавлять новые подкомпоненты без изменения основной логики.
        
5. **Повышенная декларативность**
    - Разработчик работает с UI на уровне JSX, что делает код интуитивно понятным.

___

[[310 UI Kit|Назад]]