---
title: В чем разница между fs.watchFile() и fs.watch()
draft: true
tags: NodeJS
info:
---
Разница между `fs.watchFile()` и `fs.watch()` в способе отслеживания изменений файлов:

1. **`fs.watchFile(path, options, listener)`**
    
    - Использует периодический опрос (`polling`), проверяя файл через заданный интервал (`interval`).
    - Надежнее в средах, где системные события файловой системы не всегда корректно обрабатываются.
    - Генерирует событие `"change"` при изменении метаданных файла (размер, время модификации).
    
    js
    
    КопироватьРедактировать
    
    `const fs = require('fs'); fs.watchFile('file.txt', { interval: 1000 }, (curr, prev) => {   console.log('Файл изменен', curr.mtime); });`
    
2. **`fs.watch(path, options, listener)`**
    
    - Использует системные механизмы (`inotify` в Linux, `FSEvents` в macOS, `ReadDirectoryChangesW` в Windows).
    - Быстрее реагирует на изменения, но может пропускать события в некоторых средах.
    - Генерирует события `"rename"` и `"change"`, но не гарантирует получение всех изменений.
    
    js
    
    КопироватьРедактировать
    
    ``fs.watch('file.txt', (eventType, filename) => {   console.log(`Событие: ${eventType}, Файл: ${filename}`); });``
    

**Выбор:**

- `fs.watchFile()` – если важна надежность и требуется детектировать изменения метаданных.
- `fs.watch()` – если важна скорость и требуется реагировать на изменения в реальном времени.