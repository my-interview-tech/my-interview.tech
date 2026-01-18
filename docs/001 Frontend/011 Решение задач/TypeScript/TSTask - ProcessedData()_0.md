---
uid: yeDHeDAedriWOHKeooME7
title: TSTask - ProcessedData()_0
tags:
  - "#TypeScript"
  - "#tsTask"
  - "#мойОфис"
draft: false
technology: Решение задач
specialty: Frontend
tools: []
order: 0
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
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

---

[[011 Решение задач JS, TS и React|Назад]]
