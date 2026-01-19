---
title: В чем разница между fs.stat(), fs.lstat() и fs.fstat()
draft: true
tags:
  - "#NodeJS"
  - "#fs"
  - "#файловая_система"
  - "#интервью"
info:
  - https://habr.com/ru/articles/312880/
  - https://habr.com/ru/articles/313538/
---

`fs.stat()`, `fs.lstat()` и `fs.fstat()` — методы Node.js для получения информации о файлах и каталогах через объект `fs.Stats`. Главное отличие — как они работают с символическими ссылками и что принимают на вход.

**`fs.stat(path, cb)`**  
Следует по символической ссылке и возвращает инфу о целевом файле.

Пример:
```js
const fs = require('fs')
fs.stat('example.txt', (err, stats) => {
  if (err) throw err
  console.log(stats)
})
```

**`fs.lstat(path, cb)`**  
Не следует по символической ссылке, возвращает инфу о самой ссылке.

Пример:
```js
const fs = require('fs')
fs.lstat('example_symlink', (err, stats) => {
  if (err) throw err
  console.log(stats)
})
```

**`fs.fstat(fd, cb)`**  
Работает с файловым дескриптором (fd), а не с путём. Используется, если файл уже открыт.

Пример:
```js
const fs = require('fs')
fs.open('example.txt', 'r', (err, fd) => {
  if (err) throw err
  fs.fstat(fd, (err, stats) => {
    if (err) throw err
    console.log(stats)
    fs.close(fd, () => {})
  })
})
```

**Таблица различий:**

| Метод         | Вход         | Символические ссылки         |
|---------------|--------------|-----------------------------|
| `fs.stat()`   | путь         | Следует по ссылке           |
| `fs.lstat()`  | путь         | Не следует по ссылке        |
| `fs.fstat()`  | дескриптор   | Не применимо, только файл   |

**Когда что использовать:**
- `fs.stat()` — если нужна инфа о файле, на который указывает путь (следует по ссылкам)
- `fs.lstat()` — если нужна инфа о самой ссылке
- `fs.fstat()` — если файл уже открыт и есть дескриптор

---

[[002 Backend/002 Node.js/100 Подготовка к собеседованию/В чем разница между fs.stat() fs.lstat() и fs.fstat().md|Назад]]
