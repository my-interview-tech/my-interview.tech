---
title: Universal Module Definition (UMD)
draft: true
tags:
  - UMD
info:
---
### UMD - Universal Module Definition

##### Проблема совместимости

В прошлом существовало разделение:
- Node.js использовал CommonJS
- Браузеры использовали AMD

UMD решает эту проблему, предоставляя универсальное решение.

##### Паттерн UMD

```javascript
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['dependency'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // CommonJS
        module.exports = factory(require('dependency'));
    } else {
        // Browser globals
        root.MyModule = factory(root.Dependency);
    }
}(typeof self !== 'undefined' ? self : this, function (dependency) {
    // Код модуля
    return {
        doSomething: function() {
            return dependency.helper();
        }
    };
}));
```

##### Свойства UMD

- **Универсальность**: работает в CommonJS, AMD и браузере
- **Совместимость**: один код для всех окружений
- **Overhead**: дополнительный код для определения окружения

___
