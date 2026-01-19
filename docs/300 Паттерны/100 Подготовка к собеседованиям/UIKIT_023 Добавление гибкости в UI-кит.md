---
title: Какие подходы используются для добавления гибкости и кастомизации в UI Kit?
draft: false
tags:
  - WhiteLabelLibrary
  - Bootstrap
  - UIKit
  - CompoundComponent
info:
  - https://developer.mozilla.org/en-US/docs/Web/CSS/@layer
---
Для написания более гибких и функциональных библиотек нужно обратить внимание на использование следующих стилистических и не только подходов.

**Первый** и, возможно, самый очевидный — это использование переменных в стилях, как глобальных, так и локальных. В этом подходе ваши компоненты будут опираться на внешнюю среду, что позволяет достаточно гибко управлять их внешним видом с минимальными изменениями. Например, если вы делаете White Label Library, то стоит обратить внимание на данный вариант. Из минусов стоит отметить необходимость поддержания документации об используемых переменных в актуальном состоянии.

**Второй,** не менее интересный, подход — это использование именованных слоев для стилизации. В таком случае изменить стиль компонентов тоже достаточно просто, так как можно через новый слой добавить новые стили, и приоритет будет отдан именно им. А если разработчик не укажет имя нового слоя, то все стили будут размещены в слое по умолчанию, который также имеет более высокий приоритет для применения. Если вы по какой-то причине не знакомы с таким подходом, [рекомендую посмотреть документацию @layer](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer).

**Третий** подход — использование паттернов вашего фреймворка. Например, Compound Components — для отображения табов, аккордеонов, таблиц и т. п. Не лучший, конечно же, пример из [React Bootstrap](https://react-bootstrap.netlify.app/docs/components/carousel#example), но для понимания гибкости подойдет:

```jsx
import Carousel from 'react-bootstrap/Carousel';

function UncontrolledExample() { 
	return (   
		<Carousel>     
			<Carousel.Item>       
				<Carousel.Caption>         
					<h3>Second slide label</h3>         
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>    
				</Carousel.Caption>     
			</Carousel.Item>     
			<Carousel.Item>       
				<Carousel.Caption>        
					 <h3>Third slide label</h3>         
					 <p> 
						Praesent commodo cursus magna, vel scelerisque nisl consectetur.   
					</p>       
				</Carousel.Caption>     
			</Carousel.Item>   
		</Carousel> 
	);
}

export default UncontrolledExample;
```

___

[[310 UI Kit|Назад]]
