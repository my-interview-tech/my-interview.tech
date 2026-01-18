---
uid: SB__aRRctvmGngCuO3L5n
title: Расскажите о `IntersectionObserver`?
tags:
  - "#DOM"
  - "#IntersectionObserver"
  - "#API"
  - "#browser"
info: []
draft: false
technology: JSCore
specialty: Frontend
tools: []
order: 32
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

![[Pasted image 20230702113811.png|600]]

`IntersectionObserver` - это API, встроенное в браузер, которое позволяет отслеживать, когда элементы на веб-странице появляются или исчезают в области видимости пользователя. Он позволяет эффективно определять, какие элементы на странице находятся в пределах видимости, и реагировать на это.

`IntersectionObserver` работает следующим образом: вы создаете экземпляр `IntersectionObserver` и указываете функцию обратного вызова, которая будет вызываться, когда элемент на странице появляется или исчезает из области видимости пользователя. Затем вы указываете, какой элемент нужно наблюдать, используя метод `.observe()`. Когда элемент появляется или исчезает из области видимости, вызывается функция обратного вызова, которую вы указали.

Пример использования `IntersectionObserver` в JavaScript:

```javascript
<div class="box"></div>

<script>
const options = {
  root: null, // по умолчанию viewport
  rootMargin: '0px',
  threshold: 0.5 // Пороговое значение, при котором вызывается функция обратного вызова
};

function callback(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log('Элемент находится в области видимости!');
    } else {
      console.log('Элемент не находится в области видимости!');
    }
  });
}

const observer = new IntersectionObserver(callback, options);
const boxEl = document.querySelector('.box');
observer.observe(boxEl);
</script>
```

Здесь мы создаем div-элемент с классом `box`, который мы хотим отслеживать с помощью `IntersectionObserver`. Затем мы создаем объект `options`, в котором указываем настройки `IntersectionObserver`, такие как корневой элемент, rootMargin и пороговое значение. Затем мы создаем функцию обратного вызова `callback`, которая будет вызываться, когда элемент `box` появляется или исчезает из области видимости. В этой функции мы проверяем свойство `isIntersecting` объекта `entry`, чтобы определить, находится ли элемент в области видимости или нет.

Затем мы создаем экземпляр `IntersectionObserver` с помощью конструктора и передаем ему функцию обратного вызова и объект `options`. Мы получаем ссылку на элемент `box` с помощью метода `document.querySelector()` и вызываем метод `.observe()` на `IntersectionObserver`, чтобы начать отслеживать элемент `box`.

Таким образом, `IntersectionObserver` позволяет эффективно отслеживать, когда элементы на веб-странице появляются или исчезают в области видимости пользователя, что может быть полезно для оптимизации производительности и реактивности веб-приложений.

---

[[003 JSCore|Назад]]
