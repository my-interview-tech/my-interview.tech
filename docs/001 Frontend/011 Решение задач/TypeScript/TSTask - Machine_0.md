---
uid: sI7CctZ6az-uYrywfwbmd
title: TSTask - Machine_0
tags:
  - "#TypeScript"
  - "#tsTask"
  - "#астон"
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
// 1
/*
Создать ущность Machine с несколькими полями (масса, мощность(power), цвет(), топливо(fuel))
Топливо должно быть типом состоящим из 3 вариантов(дизель(diesel), бензин(petrol), газ(gas))
*/
enum FuelType {
  Diesel = "diesel",
  Petrol = "petrol",
  Gas = "gas",
}

interface Machine {
  weight: number;
  power: number;
  color: string;
  fuel: FuelType;
}

// 2
/*
Создать сущность Car наследник сущность Machine и добавить новые поля (марка, скорость, кондиционер(isAirConditioner))
*/

interface Car extends Machine {
  brand: string;
  speed: number;
  isAirConditioner: boolean;
}

type ElectroBusListType = Map<
  string,
  Omit<ElectroBus, "capacity" | "specialNumber" | "color">
>;

// 3
/*
Создать сущность Bus наследник сущности Car и удалить из типа поля марка и кондиционер, также добавить новое поле вместимость (capacity)
*/

interface Bus extends Car {
  capacity: number;
}

// 4
/*
Создать тип ElectroBus наследник сущности Bus иным способом от предыдущего наследования + добавить поле specialNumber
*/

interface ElectroBus extends Bus {
  specialNumber: string;
}

// 5
/*
Создать тип ElecroBusListType - представляющую собой мапу(ключ: значение), где ключ - произвольная строка, а значение - сущность * ElectroBus из которой удалены capacity , specialNumber, color
*/

type ElectroBusListType = Map<
  string,
  Omit<ElectroBus, "capacity" | "specialNumber" | "color">
>;

или;

interface ElectroBusListType {
  [key: string]: Omit<ElectroBus, "capacity" | "specialNumber" | "color">;
}
```

---

[[011 Решение задач JS, TS и React|Назад]]
