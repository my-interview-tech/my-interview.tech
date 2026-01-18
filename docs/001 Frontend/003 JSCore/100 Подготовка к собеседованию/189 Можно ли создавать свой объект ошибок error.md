---
uid: 71PZMrggAzvn0PR8SB5jv
title: Можно ли создавать свой объект ошибок error?
tags:
  - "#JavaScript"
  - "#try-catch"
  - "#error"
info:
  - >-
    [[0061 Пользовательские ошибки, расширение Error|Пользовательские ошибки,
    расширение Error]]
draft: false
technology: JSCore
specialty: Frontend
tools: []
order: 189
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

JavaScript позволяет вызывать `throw` с любыми аргументами, то есть технически наши классы ошибок не нуждаются в наследовании от `Error`. Но если использовать наследование, то появляется возможность идентификации объектов ошибок посредством `obj instanceof Error`. Так что лучше применять наследование.

По мере роста приложения, наши собственные ошибки образуют иерархию, например, `HttpTimeoutError` может наследовать от `HttpError` и так далее.

сс `Error` встроенный, вот его примерный код, просто чтобы мы понимали, что расширяем:

```javascript
// "Псевдокод" встроенного класса Error, определённого самим JavaScript

class Error {
	constructor(message) {
		this.message = message;
		this.name = "Error"; // (разные имена для разных встроенных классов ошибок)
		this.stack = <стек вызовов>; // нестандартное свойство, но обычно поддерживается   } }`
```

Теперь давайте унаследуем от него `ValidationError` и попробуем новый класс в действии:

```javascript
_class ValidationError extends Error {_
	constructor(message) {
		super(message); // (1)
		this.name = "ValidationError"; // (2)   } }

function test() {
	throw new ValidationError("Упс!"); }

try {   test();
} catch(err) {
	alert(err.message); // Упс!
	alert(err.name); // ValidationError
	alert(err.stack); // список вложенных вызовов с номерами строк для каждого }`
```

Обратите внимание: в строке `(1)` вызываем родительский конструктор. JavaScript требует от нас вызова `super` в дочернем конструкторе, так что это обязательно. Родительский конструктор устанавливает свойство `message`.

Родительский конструктор также устанавливает свойство `name` для `"Error"`, поэтому в строке `(2)` мы сбрасываем его на правильное значение.

Попробуем использовать его в `readUser(json)`:

```javascript
class ValidationError extends Error {
	constructor(message) {
		super(message);
		this.name = "ValidationError";   } }  // Использование function
readUser(json) {
	let user = JSON.parse(json);
	if (!user.age) {
		throw new ValidationError("Нет поля: age");   }
	if (!user.name) {
		throw new ValidationError("Нет поля: name");   }
	return user; }  // Рабочий пример с try..catch

try {
	let user = readUser('{ "age": 25 }');
} catch (err) {
	if (err instanceof ValidationError) {     _
		alert("Некорректные данные: " + err.message); // Некорректные данные: Нет поля: name_
	} else if (err instanceof SyntaxError) { // (*)
		alert("JSON Ошибка Синтаксиса: " + err.message);
	} else {
		throw err; // неизвестная ошибка, пробросить исключение (**)   } }`
```

Блок `try..catch` в коде выше обрабатывает и нашу `ValidationError`, и встроенную `SyntaxError` из `JSON.parse`

Итого:

- Мы можем наследовать свои классы ошибок от `Error` и других встроенных классов ошибок, но нужно позаботиться о свойстве `name` и не забыть вызвать `super`.
- Мы можем использовать `instanceof` для проверки типа ошибок. Это также работает с наследованием. Но иногда у нас объект ошибки, возникшей в сторонней библиотеке, и нет простого способа получить класс. Тогда для проверки типа ошибки можно использовать свойство `name`.
- Обёртывание исключений является распространённой техникой: функция ловит низкоуровневые исключения и создаёт одно «высокоуровневое» исключение вместо разных низкоуровневых. Иногда низкоуровневые исключения становятся свойствами этого объекта, как `err.cause` в примерах выше, но это не обязательно.

---

[[003 JSCore|Назад]]
