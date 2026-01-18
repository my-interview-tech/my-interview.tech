---
uid: XhFsPPq5mVTiraHARH5yw
title: "Promise.all, Promise.allSettled, Promise.any, Promise.race"
tags:
  - "#JavaScript"
  - "#асинхронность"
  - "#promise"
  - "#promiseAll"
  - "#promiseAllSettled"
  - "#promiseAny"
  - "#promiseRace"
info: []
draft: false
technology: JSCore
specialty: Frontend
tools: []
order: 211
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

##### Разница между `Promise.all()`, `Promise.any()` и `Promise.race()`?

![Разница между `Promise.all()`, `Promise.any()` и `Promise.race()`?](https://youtu.be/XtQPrt8G0n8?t=782)

![[Pasted image 20230725192024.png|600]]

##### Расскажите про статический метод `.allSettled()`?

![Расскажите про статический метод `.allSettled()`?](https://youtu.be/trriSYNrHw4?t=896)

![[Pasted image 20230725192147.png|600]]

##### `Promise.all()`

*`Promise.all()`* принимает массив промисов и возвращает новый промис, который будет выполнен, когда все промисы в массиве _будут выполнены успешно, или отклонен, когда хотя бы один промис из массива будет отклонен._ Результат выполнения `Promise.all()` - это массив результатов выполнения всех переданных промисов в том порядке, в котором они были переданы. _Для пустого массива сразу вернётся пустой результат._

```javascript
Promise.all([promise1, promise2, promise3])
  .then(function (results) {
    console.log(results);
  })
  .catch(function (error) {
    console.error(error);
  });
```

##### `Promise.allSettled()`

*`Promise.allSettled()`* принимает массив промисов и возвращает новый промис, который _будет выполнен, когда все промисы в массиве будут завершены, независимо от того, были ли они выполнены успешно или отклонены._ Результат выполнения `Promise.allSettled()` - это массив объектов, представляющих результаты выполнения всех переданных промисов. _Для пустого массива сразу вернётся пустой результат._

```javascript
Promise.allSettled([promise1, promise2, promise3])
  .then(function (results) {
    console.log(results);
  })
  .catch(function (error) {
    console.error(error);
  });
```

##### `Promise.any()`

*`Promise.any()`* принимает массив промисов и возвращает новый промис, который будет выполнен, когда хотя бы один промис в массиве будет выполнен успешно. Результат выполнения `Promise.any()` - это _результат выполнения первого успешно выполненного промиса._ Для пустого массива вернётся ошибка.

```javascript
Promise.any([promise1, promise2, promise3])
  .then(function (result) {
    console.log(result);
  })
  .catch(function (error) {
    console.error(error);
  });
```

##### `Promise.race()`

*`Promise.race()`* принимает массив промисов и возвращает новый промис, который _будет выполнен, когда первый промис в массиве будет выполнен, независимо от того, был ли он выполнен успешно или отклонен._ Результат выполнения `Promise.race()` - это результат выполнения первого завершенного промиса. _Если передать в Promise.race пустой массив, то обращение зависнет в состоянии выполнения и не будет установлено ни на выполнение, ни на отказ._

```javascript
Promise.race([promise1, promise2, promise3])
  .then(function (result) {
    console.log(result);
  })
  .catch(function (error) {
    console.error(error);
  });
```

---

[[003 JSCore|Назад]]
