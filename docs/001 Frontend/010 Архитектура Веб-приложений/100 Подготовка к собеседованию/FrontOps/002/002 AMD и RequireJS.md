---
title: AMD и RequireJS
draft: true
tags:
  - AMD
  - RequireJS
info:
---
### AMD - Asynchronous Module Definition

##### Зачем нужен AMD?

AMD решает проблему асинхронной загрузки модулей в браузере. Основная реализация — RequireJS.

##### Синтаксис AMD

```javascript
// Определение модуля
define('math', ['jquery'], function($) {
    return {
        add: function(a, b) {
            return a + b;
        },
        multiply: function(a, b) {
            return a * b;
        }
    };
});

// Использование модуля
require(['math', 'jquery'], function(math, $) {
    var result = math.add(5, 3);
    $('#result').text(result);
});
```

##### Конфигурация RequireJS

```javascript
require.config({
    paths: {
        'jquery': 'https://code.jquery.com/jquery-3.6.0.min',
        'lodash': 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min'
    }
});
```

___
