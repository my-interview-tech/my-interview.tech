---
title: Как получить директорию имя файла и расширение из пути (path.dirname() path.basename() path.extname())
draft: true
tags: NodeJS
info:
---
Для того чтобы извлечь директорию, имя файла и расширение из пути, можно использовать следующие методы модуля `path`:

1. **`path.dirname(path)`** — возвращает директорию пути (всё до последнего слэша).
    
2. **`path.basename(path)`** — возвращает имя файла с расширением из пути.
    
3. **`path.extname(path)`** — возвращает расширение файла из пути (включая точку).
    

Пример использования:

js

КопироватьРедактировать

`const path = require('path');  const filePath = '/folder/subfolder/file.txt';  // Получаем директорию const dirName = path.dirname(filePath); console.log(dirName); // '/folder/subfolder'  // Получаем имя файла const baseName = path.basename(filePath); console.log(baseName); // 'file.txt'  // Получаем расширение файла const extName = path.extname(filePath); console.log(extName); // '.txt'`

### Описание:

- **`path.dirname()`**: Вернёт путь к каталогу, в котором находится файл. В примере `'/folder/subfolder/file.txt'` результат будет `'/folder/subfolder'`.
- **`path.basename()`**: Вернёт только имя файла вместе с его расширением. В примере результат будет `'file.txt'`.
- **`path.extname()`**: Вернёт расширение файла, включая точку. В примере результат будет `'.txt'`.

Эти методы удобны для работы с путями и извлечения из них различных компонентов.