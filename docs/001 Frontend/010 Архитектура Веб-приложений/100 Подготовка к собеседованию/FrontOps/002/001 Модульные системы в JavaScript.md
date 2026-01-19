---
title: "Модульные системы в JavaScript: от IIFE до ESM"
draft: true
tags:
  - JavaScript
  - инкапсуляция
  - замыкание
  - IIFE
  - var
info:
---
### Модульные системы в JavaScript: от IIFE до ESM

Модульность — это основа современной разработки JavaScript приложений. За годы эволюции языка появилось множество подходов к организации кода в модули. Рассмотрим путь от простых паттернов до современных стандартов.
#### Основные свойства модулей

Любая модульная система должна обеспечивать четыре ключевых свойства:

1. **Изолированность (Инкапсуляция)**. Модуль должен иметь собственную область видимости, не загрязняя глобальное пространство имен.
2. **Интерфейсность.** Модуль предоставляет четко определенный API для взаимодействия с другими модулями.
3. **Переиспользуемость**. Модуль можно использовать в разных частях приложения без дублирования кода.
4. **Зависимости**. Модуль может явно объявлять свои зависимости от других модулей.

##### IIFE - Immediately Invoked Function Expression

###### Проблема

В эпоху ES5 основной проблемой было отсутствие блочной области видимости. Переменные `var` поднимались на уровень функции, что приводило к конфликтам имен.

```javascript
var name = 'Global';

function createModule() {
    var name = 'Module'; // Перебивает глобальную переменную
    return name;
}

console.log(name); // 'Global' - но может быть неожиданно изменено
```

###### Решение через IIFE

```javascript
// Классический IIFE паттерн
(function() {
    var privateVar = 'Приватная переменная';
    var publicAPI = {
        getName: function() {
            return privateVar;
        },
        setName: function(newName) {
            privateVar = newName;
        }
    };
    
    // Экспорт в глобальную область
    window.MyModule = publicAPI;
})();

// Использование
MyModule.setName('Новое имя');
console.log(MyModule.getName()); // 'Новое имя'
```

###### Замыкания в IIFE

```javascript
var counter = (function() {
    var count = 0;
    
    return {
        increment: function() {
            count++;
            return count;
        },
        decrement: function() {
            count--;
            return count;
        },
        getCount: function() {
            return count;
        }
    };
})();

console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getCount()); // 2
```

___
