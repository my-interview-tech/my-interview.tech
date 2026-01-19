---
title: В чем разница между path.join() и path.resolve()
draft: false
tags:
  - "#NodeJS"
  - "#path"
  - "#файловая-система"
  - "#пути"
  - "#JavaScript"
info:
  - "[Документация Node.js по path.join()](https://nodejs.org/api/path.html#pathjoinpaths)"
  - "[Документация Node.js по path.resolve()](https://nodejs.org/api/path.html#pathresolvepaths)"
---

# Разница между path.join() и path.resolve()

`path.join()` и `path.resolve()` — это два метода из модуля `path` в Node.js, которые служат для работы с путями к файлам и директориям. Несмотря на схожее назначение, они имеют принципиальные отличия в поведении.

## path.join([...paths])

**path.join()** объединяет несколько частей пути в один, используя разделитель, специфичный для операционной системы.

### Особенности:

- Сохраняет относительность путей (результат может быть относительным путем)
- Просто соединяет части пути, нормализуя результат
- Устраняет лишние слэши и обрабатывает `..` и `.`
- Не преобразует относительные пути в абсолютные

### Примеры:

```javascript
const path = require("path")

// Базовый пример
const joinedPath = path.join("folder", "subfolder", "file.txt")
console.log(joinedPath)
// Вывод: 'folder/subfolder/file.txt'

// С абсолютным путем
const absoluteJoinedPath = path.join("/folder", "subfolder", "file.txt")
console.log(absoluteJoinedPath)
// Вывод: '/folder/subfolder/file.txt'

// С навигационными элементами
console.log(path.join("folder", "..", "another", "file.txt"))
// Вывод: 'another/file.txt'
```

## path.resolve([...paths])

**path.resolve()** создает абсолютный путь, разрешая относительные пути относительно текущей рабочей директории.

### Особенности:

- Всегда возвращает абсолютный путь (если не произошло ошибки)
- Работает похоже на последовательность команд `cd` в терминале
- Обрабатывает пути справа налево до нахождения абсолютного пути
- Если абсолютный путь не найден, использует текущую рабочую директорию

### Примеры:

```javascript
const path = require("path")

// С относительными путями
const resolvedPath = path.resolve("folder", "subfolder", "file.txt")
console.log(resolvedPath)
// Вывод: '/Users/username/current/working/dir/folder/subfolder/file.txt'

// С абсолютным путем (игнорирует предыдущие)
const absoluteResolvedPath = path.resolve("/base", "folder", "/absolute", "file.txt")
console.log(absoluteResolvedPath)
// Вывод: '/absolute/file.txt'

// С навигационными элементами
console.log(path.resolve("folder", "..", "file.txt"))
// Вывод: '/Users/username/current/working/dir/file.txt'
```

## Ключевые различия

| **Характеристика**     | **path.join()**                         | **path.resolve()**                                |
| ---------------------- | --------------------------------------- | ------------------------------------------------- |
| **Результат**          | Может быть относительным или абсолютным | Всегда абсолютный путь                            |
| **Порядок обработки**  | Просто соединяет пути                   | Обрабатывает справа налево, как `cd` в терминале  |
| **Абсолютные пути**    | Сохраняет и объединяет с остальными     | Последний абсолютный путь "отменяет" предыдущие   |
| **Рабочая директория** | Не использует                           | Использует как базовую, если нет абсолютного пути |

## Когда использовать

- **path.join()** — когда нужно просто объединить части путей и сохранить относительность
- **path.resolve()** — когда нужно получить абсолютный путь к файлу/директории

## Пример различий

```javascript
const path = require("path")

// Предположим, текущая директория: /Users/username
console.log(path.join("/folder", "subfolder", "../file.txt"))
// Вывод: '/folder/file.txt'

console.log(path.resolve("/folder", "subfolder", "../file.txt"))
// Вывод: '/folder/file.txt'

console.log(path.join("folder", "subfolder", "../file.txt"))
// Вывод: 'folder/file.txt'

console.log(path.resolve("folder", "subfolder", "../file.txt"))
// Вывод: '/Users/username/folder/file.txt'
```

---

[[002 Node.js|Назад]]
