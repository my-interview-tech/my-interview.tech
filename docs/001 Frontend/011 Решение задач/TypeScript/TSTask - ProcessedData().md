---
title: TSTask - ProcessedData()
draft: false
tags:
  - "#TypeScript"
  - "#tsTask"
  - "#мойОфис"
---
```ts
interface IRoom { 
	id: number; 
	name: string; 
	type: string; 
} 

interface IMessage { 
	roomId: IRoom['id']; 
	id: number; 
	text: string; 
	ts: Date 
}

// Эндпоинт '/rooms' возвращает IRoom[] 
// Эндпоинт '/messages' возвращает IMessage[] 
/* 
Необходимо запросить сообщения и комнаты и сгруппировать сообщения по дням 
*/

type ProcessedMessage = Omit<IMessage, 'roomId'> & { 
	roomName: IRoom['name']; 
}; 

type ProcessedData = Record<string,ProcessedMessage> 
// при этом строковый ключ - ISO представление даты начала дня ('2022-06-23T00:00:00') 
// Пример результата: 
{ '2023-03-23T00:00:00': // ISO представления даты начала дня 
	[
		{ 
			"roomName": "Room name", // название комнаты из rooms 
		   "id": 1, 
		   "text": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit", 
		   "ts": Thu Mar 23 2023 12:15:15 GMT+0200 (Восточная Европа, стандартное время) 
		} 
	], 
... 
}

```

___

[[011 Решение задач JS, TS и React|Назад]]