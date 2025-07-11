---
title: Как получить директорию имя файла и расширение из пути (path.dirname() path.basename() path.extname())
draft: false
tags:
  - "#NodeJS"
  - "#path"
  - "#файловая-система"
  - "#пути"
  - "#dirname"
  - "#basename"
  - "#extname"
info:
  - "[Документация Node.js по модулю path](https://nodejs.org/api/path.html)"
  - "[Работа с путями в Node.js](https://nodejs.org/api/path.html#path_path_dirname_path)"
  - "[Работа с файловыми путями в Node.js](https://nodejs.dev/learn/nodejs-file-paths)"
---

Для того чтобы извлечь директорию, имя файла и расширение из пути, можно использовать следующие методы модуля `path`:

1. **`path.dirname(path)`** — возвращает директорию пути (всё до последнего слэша).
2. **`path.basename(path)`** — возвращает имя файла с расширением из пути.
3. **`path.extname(path)`** — возвращает расширение файла из пути (включая точку).

Пример использования:

```javascript
const path = require("path")

const filePath = "/folder/subfolder/file.txt"

// Получаем директорию
const dirName = path.dirname(filePath)
console.log(dirName) // '/folder/subfolder'

// Получаем имя файла
const baseName = path.basename(filePath)
console.log(baseName) // 'file.txt'

// Получаем расширение файла
const extName = path.extname(filePath)
console.log(extName) // '.txt'
```

### Описание:

- **`path.dirname()`**: Вернёт путь к каталогу, в котором находится файл. В примере `'/folder/subfolder/file.txt'` результат будет `'/folder/subfolder'`.
- **`path.basename()`**: Вернёт только имя файла вместе с его расширением. В примере результат будет `'file.txt'`.
- **`path.extname()`**: Вернёт расширение файла, включая точку. В примере результат будет `'.txt'`.

Эти методы удобны для работы с путями и извлечения из них различных компонентов.

---

[[002 Node.js|Назад]]
