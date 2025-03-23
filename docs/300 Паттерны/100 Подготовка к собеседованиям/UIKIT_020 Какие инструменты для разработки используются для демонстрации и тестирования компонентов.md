---
title: Какие инструменты для разработки (например, Storybook) используются для демонстрации и тестирования компонентов?
draft: false
tags:
  - UIKit
  - Storybook
  - Styleguidist
  - Docz
  - Chromatic
info:
  - https://storybook.js.org/
  - https://core-ds.github.io/
---
В современном процессе разработки UI Kit широко используются специализированные инструменты для демонстрации, тестирования и документирования компонентов. Среди них наиболее популярными являются:

- **Storybook**  
    Storybook предоставляет изолированное окружение для разработки и визуального тестирования компонентов. Это позволяет разработчикам и дизайнерам видеть изменения в реальном времени, документировать поведение и внешний вид компонентов, а также интегрировать автоматизированное тестирование.  
- **Styleguidist и Docz**  
    Эти инструменты ориентированы на генерацию интерактивной документации для React-компонентов, позволяя создавать понятные и доступные гайды по использованию UI Kit.
- **Chromatic**  
    Расширение для Storybook, которое обеспечивает визуальное тестирование (visual regression testing) и позволяет отслеживать изменения в компонентах между релизами.

**Пример использования Storybook**

Ниже приведён пример простого файла истории для компонента кнопки, написанного на React. Этот пример демонстрирует, как с помощью Storybook можно создать интерактивное представление компонента.

```javascript
// Button.stories.js  

import React from 'react'; 
import { action } from '@storybook/addon-actions'; 
import Button from './Button';  

export default {   
	title: 'Components/Button',   
	component: Button, 
};  

const Template = (args) => <Button {...args} />;  

export const Primary = Template.bind({}); 

Primary.args = {   
	label: 'Primary Button',   
	onClick: action('clicked'), 
};  

export const Secondary = Template.bind({}); 

Secondary.args = {   
	label: 'Secondary Button',   
	onClick: action('clicked'), 
};
```

В данном примере:

- **Экспортируется объект по умолчанию**, в котором задаются название группы компонентов (`title`) и сам компонент (`component`).
- **Template-функция** позволяет создавать копии компонента с разными аргументами.
- **Primary** и **Secondary** – два варианта отображения кнопки с разными аргументами (`args`), что позволяет визуально тестировать и демонстрировать изменения в поведении компонента.

___

[[310 UI Kit|Назад]]
