---
title: Как адаптировать UI Kit под разные разрешения экранов и условия использования?
draft: false
tags:
  - UIKit
  - media
  - grid
  - flex
  - designToken
  - RetinaReady
  - BrowserStack
  - LambdaTest
  - a11y
info:
  - https://habr.com/ru/companies/vk/articles/256869/
---
 
#### 1. **Использование адаптивного дизайна**

- **Медиа-запросы (CSS Media Queries)**  
    Позволяют изменять стили компонентов в зависимости от ширины экрана.

```css
@media (max-width: 768px) {   
	.button {     
		font-size: 14px;     
		padding: 8px 12px;   
	} 
}
```

- **Гибкие единицы измерения**  
    Использование `em`, `rem`, `%`, `vh`, `vw` вместо фиксированных `px` позволяет интерфейсу подстраиваться под размеры экрана.
- **CSS Grid и Flexbox**  
    Позволяют создавать адаптивные макеты без необходимости жесткого позиционирования элементов.

```css
.container {   
	display: flex;   
	flex-wrap: wrap;   
	gap: 16px; 
}
``` 

#### 2. **Использование дизайн-токенов**

- Дизайн-токены хранят значения свойств (цвета, отступы, размеры шрифтов) в едином формате, что позволяет легко адаптировать UI Kit.

Пример токенов в JSON:

```json
{   
	"spacing": {     
		"small": "8px",     
		"medium": "16px",     
		"large": "24px"   
	},   
	"breakpoints": {     
		"mobile": "480px",     
		"tablet": "768px",     
		"desktop": "1024px"   
	}
} 
```
#### 3. **Ретинизация (Retina Ready)**

- Использование **SVG** или **@2x, @3x изображений** для устройств с высокой плотностью пикселей.

Пример использования:

```css
.icon {   
	background-image: url('icon@2x.png');   
	background-size: contain; 
}
```

#### 4. **Тестирование на разных устройствах**

- Использование эмуляторов в DevTools (Chrome DevTools, Safari Responsive Design Mode).
- Тестирование в облачных сервисах (BrowserStack, LambdaTest).

#### 5. **Поддержка разных тем и условий**

- **Темная/светлая тема** с использованием `prefers-color-scheme`:

```css
@media (prefers-color-scheme: dark) {   
	body {     
		background-color: #121212;     
		color: #ffffff;   
	} 
}
```

- **Учёт доступности (a11y)**: контрастность, размер шрифта, поддержка клавиатуры и экранных дикторов.


___

[[310 UI Kit|Назад]]
