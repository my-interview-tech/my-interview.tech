---
title: Какие особенности работы с CSS-свойствами и методологиями (BEM, SMACSS, OOCSS) применяются?
draft: false
tags:
  - UIKit
  - CSS
  - React
  - CSS-modules
  - инкапсуляция
info:
---
CSS-свойства можно разделить на два вида: сквозные и локальные.

Значения **сквозных свойств** применяются к тем же свойствам дочерних элементов, как значение по умолчанию (наследуются). 
Например: `font-size`, `font-weight`.

**Локальные свойства** используются по месту и никем не наследуются. Например: `margin`, `padding`.

По умолчанию все кастомные свойства сквозные. Поэтому, чтобы избежать ненужных переопределений, весь набор свойств нужно инициализировать в корневом блоке.

```js
function Switcher({className}) {	
	...	
	
	return (		
		<label className={['switcher', className].join(' ')}>			
			<input type="checkbox" className="switcher__input" ...>			
			<div className="switcher__marker" />		
		<label>	
	)
}
```

```css
.switcher {	/* Инициализация кастомных свойств */	
	--background-color: #eee;	
	--background-color-active: #ae4;	
	--marker-background-color: white;	
	--marker-background-color-active: white;	
	
	/* =============================== */	
	
	font-size: 16px;}
	
.switcher__marker {	
	background-color: var(--background-color);	
	border-radius: 0.625em;	
	height: 1.125em;	
	position: relative;	
	width: 2em;
}

.switcher__marker::before {	
	background-color: var(--marker-background-color);	
	border-radius: 50%;	
	content: '';	
	height: calc(1.125em - 0.25em);	
	left: 0.125em;	
	position: absolute;	
	top: 0.125em;	
	width: calc(1.125em - 0.25em);
}

:checked + .switcher__marker {	
	background-color: var(--background-color-active);
}
	
:checked + .switcher__marker::before {	
	background-color: var(--marker-background-color-active);
}
```

Предположим, что к стилям, указанным выше, доступа нет, и все, что знает разработчик, — это описанные в документации кастомные свойства. При импорте этого компонента в проект стилизация компонента будет происходить следующим образом:

```jsx
<Switcher /> Исходный компонент<Switcher className="switcher_with_new_style"> 

// Компонент с новыми стилями
```

```css
.switcher_with_new_style {	
	--background-color: silver;	
	--background-color-active: blue;	
	--marker-background-color-active: yellow;
}
```

Вот и все! Все, что не описано кастомными свойствами, будет приватным. Не нужно использовать сложные селекторы, которые, в том числе, раскрывают реализацию компонента. Также данный подход просто идеально сочетается с CSS Modules и CSS in JS.

Если в компоненте понадобится использование сквозных свойств, то в таком случае указывать кастомные свойства в основном блоке не нужно – достаточно сразу применить его к нужному CSS-свойству.

```css
.switcher {	/* Инициализация кастомных свойств */	

/* Убрали свойство --background-color */	
	--background-color-active: #ae4;	
	--marker-background-color: white;	
	--marker-background-color-active: white;	
	
	/* =============================== */	
	
	font-size: 16px;
}

.switcher__marker {	
	background-color: var(--background-color); /* Но здесь его оставили */	
	border-radius: 0.625em;	
	height: 1.125em;	
	position: relative;	
	width: 2em;
}
```

Теперь неважно, в каком из родительских компонентов мы укажем значение для свойства background-color, оно применяется ко всем компонентам switcher внутри этих блоков. Значение по умолчанию можно задать, передав второй аргумент в функцию var.

```css
.switcher__marker {	
	background-color: var(--background-color, #eee);	
	...
}
```

Но остается еще одна проблема, связанная с именами классов. Даже при использовании БЭМ есть вероятность, что разработчик присвоит имя класса, которое используется для элемента блока, другому элементу. В таком случае применение CSS-модулей должно обеспечить полную инкапсуляцию компонента.

**CSS-Modules для обеспечения полной инкапсуляции**

Как использовать модули, особо объяснять не нужно. Для этого есть документация. Но один момент хочется прояснить. Это связано с глобальной стилизацией компонента.

Подключая компонент к интерфейсу, разработчик должен иметь возможность стилизовать абсолютно все компоненты в одном глобальном файле стилей. В противном случае придется в обязательном порядке к каждому компоненту добавлять дополнительный класс либо что-то придумывать с темой оформления. Соглашусь, подобный подход – дело вкуса, но такая необходимость возникала, поэтому проще задать какие-то параметры в глобальном файле стилей для всех компонентов сразу.

В таком случае организация файла стилей компонента следующая:

```css
:global(.component_class_name) {	
	...
}

.element_class_name {	
	...
}
```

```jsx
import styles from './Component.module.css';

function Component({className}) {	
	return (		
		<div className={['component_class_name', className].join(' ')}>			
			<div className={styles.element_class_name} />		
		</div>	
	)
}
```

`:global` — сделает селектор глобальным и не будет применять трансформацию имени класса. Если в файле стиля компонента есть только глобальный селектор, то стили импортируются как обычно:

```css
import './Component.module.css';
```

**Именование свойств**

С именованием пока не все так гладко, есть ряд рекомендаций, однако в конечном итоге все зависит от разработчика. Как правило, имена вырабатываются по мере использования UI Kit’а, на основе отзывов разработчиков и ревью.

___

[[310 UI Kit|Назад]]
