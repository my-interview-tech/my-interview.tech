---
title: Какие API предоставляет браузер но отсутствуют в Node.js
draft: false
tags:
  - "#NodeJS"
  - "#API"
  - "#window"
  - "#document"
  - "#localStorage"
  - "#requestAnimationFrame"
  - "#fetch"
  - "#XMLHttpRequest"
  - "#webSocket"
  - "#canvas"
  - "#webAudioAPI"
  - "#MediaDevices"
info: []
---

Браузер предоставляет множество API для работы с интерфейсом, мультимедиа и сенсорами, которые **отсутствуют в Node.js**, так как он предназначен для серверных задач.

**1. API для работы с DOM и UI**

- `window` – глобальный объект браузера.
- `document` – управление HTML-документом (DOM).
- `localStorage`, `sessionStorage` – хранение данных в браузере.
- `requestAnimationFrame()` – управление анимациями.

**2. API для сетевых запросов (без CORS-ограничений)**

- `fetch()` – удобный способ делать HTTP-запросы.
- `XMLHttpRequest` – старый метод для AJAX-запросов.
- `WebSocket` (есть и в Node.js, но с дополнительными модулями).

**3. API для мультимедиа**

- `Canvas API` – работа с графикой (`<canvas>`).
- `Web Audio API` – обработка звука.
- `MediaDevices` (`navigator.mediaDevices.getUserMedia()`) – доступ к камере и микрофону.

**4. API для работы с сенсорами**

- `Geolocation API` – определение местоположения.
- `Gyroscope`, `Accelerometer`, `Magnetometer` – работа с движением устройства.
- `Battery API` – уровень заряда батареи.

**5. API для взаимодействия с устройствами**

- `Clipboard API` – копирование/вставка данных.
- `Drag and Drop API` – перетаскивание элементов.
- `Fullscreen API` – управление полноэкранным режимом.
- `SpeechRecognition API` – распознавание речи.

Node.js **не имеет доступа** к этим API, так как он работает в серверной среде. Однако некоторые возможности можно реализовать с помощью сторонних библиотек (`node-fetch`, `ws`, `canvas`, `geoip-lite`).

---

[[002 Node.js|Назад]]
