---
title: Как удалить все обработчики для события open из EventEmitter
draft: true
tags: NodeJS
info:
---
Чтобы удалить все обработчики для конкретного события (например, `open`) из объекта `EventEmitter`, можно использовать метод **`removeAllListeners(event)`**.

### Пример:

javascript

КопироватьРедактировать

`const EventEmitter = require('events'); const emitter = new EventEmitter();  // Добавляем несколько обработчиков для события 'open' emitter.on('open', () => {   console.log('Обработчик 1 для события open'); }); emitter.on('open', () => {   console.log('Обработчик 2 для события open'); }); emitter.once('open', () => {   console.log('Обработчик 3 для события open (один раз)'); });  // Удаляем все обработчики для события 'open' emitter.removeAllListeners('open');  // Генерируем событие 'open', обработчики не сработают emitter.emit('open');  // Ничего не происходит`

### Пояснение:

- `removeAllListeners('open')` удаляет все обработчики, связанные с событием `open`.
- После вызова `removeAllListeners` обработчики, подписанные на событие `open`, больше не будут вызываться при эмиссии этого события.

Этот метод полезен, когда необходимо очистить все слушатели для определённого события или для всех событий в объекте `EventEmitter`.