---
title: Как работает fs.createReadStream() и fs.createWriteStream() и зачем их использовать
draft: true
tags: NodeJS
info:
---
### `fs.createReadStream()` и `fs.createWriteStream()`

Эти методы создают потоки для чтения и записи файлов, позволяя обрабатывать данные частями, без загрузки всего файла в память. Это особенно полезно для работы с большими файлами.

#### **`fs.createReadStream(path, options)`**

Создает поток для чтения файла. Чтение происходит чанками (по частям), что снижает нагрузку на оперативную память.

js

КопироватьРедактировать

`const fs = require('fs'); const readStream = fs.createReadStream('input.txt', { encoding: 'utf-8', highWaterMark: 16 });  readStream.on('data', (chunk) => {   console.log('Чанк данных:', chunk); });  readStream.on('end', () => {   console.log('Чтение завершено'); });`

- `encoding` – кодировка (например, `"utf-8"`).
- `highWaterMark` – размер буфера в байтах (по умолчанию 64 КБ).
- События:
    - `"data"` – при получении нового чанка данных.
    - `"end"` – когда файл полностью прочитан.
    - `"error"` – при ошибке.

---

#### **`fs.createWriteStream(path, options)`**

Создает поток для записи в файл. Данные записываются последовательно, что позволяет работать с большими объемами данных без загрузки всего содержимого в память.

js

КопироватьРедактировать

`const writeStream = fs.createWriteStream('output.txt', { encoding: 'utf-8' });  writeStream.write('Первая строка\n'); writeStream.write('Вторая строка\n'); writeStream.end('Запись завершена');  writeStream.on('finish', () => {   console.log('Файл записан'); });`

- `encoding` – кодировка записи.
- Методы:
    - `.write(data)` – записывает данные в поток.
    - `.end([data])` – завершает поток, записав при необходимости последние данные.
- События:
    - `"finish"` – когда все данные записаны.
    - `"error"` – при ошибке.

---

### **Зачем использовать потоки?**

1. **Экономия памяти** – файл не загружается полностью в память.
    
2. **Повышение производительности** – обработка данных по частям позволяет работать с файлами быстрее.
    
3. **Обработка больших файлов** – подходит для работы с гигабайтными и терабайтными файлами.
    
4. **Pipe (каналы данных)** – можно передавать данные напрямую между потоками, например, копирование файла:
    
    js
    
    КопироватьРедактировать
    
    `const readStream = fs.createReadStream('input.txt'); const writeStream = fs.createWriteStream('output.txt');  readStream.pipe(writeStream);`
    
    `pipe()` автоматически читает данные из `readStream` и записывает их в `writeStream`.