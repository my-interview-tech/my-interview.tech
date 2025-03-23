---
title: Какие модули предоставляет Node.js для работы с файловой системой
draft: true
tags:
  - NodeJS
  - fs
  - require
  - readFileSync
  - writeFile
  - writeFileSync
  - appendFile
  - appendFileSync
  - unlink
  - unlinkSync
  - mkdir
  - rmdir
  - readdir
  - access
  - accessSync
  - chmod
  - chmodSync
  - rename
  - renameSync
  - createReadStream
  - createWriteStream
  - stat
  - statSync
info:
---

Node.js предоставляет встроенный модуль **`fs`** (File System) для работы с файловой системой. Этот модуль позволяет выполнять различные операции с файлами и директориями, такие как чтение, запись, удаление, изменение прав доступа и многое другое. Модуль `fs` поддерживает как **синхронные**, так и **асинхронные** методы, что делает его гибким инструментом для работы с файлами.

---

### **Основные методы модуля `fs`**

#### 1. **Чтение файлов**

- **Асинхронное чтение**:

```javascript
const fs = require('fs');
	fs.readFile('file.txt', 'utf8', (err, data) => {
      if (err) throw err;
      console.log(data);
});
```

- **Синхронное чтение**:

```javascript
    const data = fs.readFileSync('file.txt', 'utf8');

    console.log(data);
```

#### 2. **Запись в файл**

- **Асинхронная запись**:

```javascript
    fs.writeFile('file.txt', 'Hello, World!', (err) => {
      if (err) throw err;
      console.log('File written successfully');
    });
```

- **Синхронная запись**:

```javascript
    fs.writeFileSync('file.txt', 'Hello, World!');
``` 

#### 3. **Добавление данных в файл**

- **Асинхронное добавление**:

```javascript
    fs.appendFile('file.txt', '\nNew data', (err) => {
      if (err) throw err;
      console.log('Data appended');
    });
```

- **Синхронное добавление**:

```javascript
    fs.appendFileSync('file.txt', '\nNew data');
```

#### 4. **Удаление файла**

- **Асинхронное удаление**:

```javascript
    fs.unlink('file.txt', (err) => {
      if (err) throw err;
      console.log('File deleted');
    });
```

- **Синхронное удаление**:

```javascript
    fs.unlinkSync('file.txt');
```

#### 5. **Работа с директориями**

- **Создание директории**:

```javascript
    fs.mkdir('newDir', (err) => {
      if (err) throw err;
      console.log('Directory created');
    });
```

- **Удаление директории**:

```javascript
    fs.rmdir('newDir', (err) => {
      if (err) throw err;
      console.log('Directory deleted');
    });
```

- **Чтение содержимого директории**:


```javascript
    fs.readdir('./', (err, files) => {
      if (err) throw err;
      console.log('Files:', files);
    });
```

#### 6. **Проверка существования файла или директории**

- **Асинхронная проверка**:

```javascript
    fs.access('file.txt', fs.constants.F_OK, (err) => {
      if (err) {
        console.log('File does not exist');
      } else {
        console.log('File exists');
      }
    });
```

- **Синхронная проверка**:

``` javascript
    try {
      fs.accessSync('file.txt', fs.constants.F_OK);
      console.log('File exists');
    } catch (err) {
      console.log('File does not exist');
    }
```
#### 7. **Изменение прав доступа**

- **Асинхронное изменение**:

```javascript
    fs.chmod('file.txt', 0o755, (err) => {
      if (err) throw err;
      console.log('Permissions changed');
    });
```

- **Синхронное изменение**:

```javascript
    fs.chmodSync('file.txt', 0o755);
```

#### 8. **Переименование файла или директории**

- **Асинхронное переименование**:

```javascript
    fs.rename('oldName.txt', 'newName.txt', (err) => {
      if (err) throw err;
      console.log('File renamed');
    });
```

- **Синхронное переименование**:

``` javascript
    fs.renameSync('oldName.txt', 'newName.txt');
```

#### 9. **Работа с потоками (Streams)**

- **Чтение файла потоком**:

```javascript
    const readStream = fs.createReadStream('file.txt');
    readStream.on('data', (chunk) => {
      console.log(chunk.toString());
    });
```

- **Запись в файл потоком**:

``` javascript
    const writeStream = fs.createWriteStream('file.txt');
    writeStream.write('Hello, World!');
    writeStream.end();
```

#### 10. **Получение информации о файле**

- **Асинхронное получение информации**:

```javascript
    fs.stat('file.txt', (err, stats) => {
      if (err) throw err;
      console.log('File size:', stats.size);
      console.log('Is file?', stats.isFile());
    });
```

- **Синхронное получение информации**:

``` javascript
    const stats = fs.statSync('file.txt');
    console.log('File size:', stats.size);
```

---

### **Дополнительные модули для работы с файловой системой**

1. **`fs/promises`**:
    
    - Начиная с Node.js v10, доступен модуль `fs/promises`, который предоставляет асинхронные методы, возвращающие промисы.
        
    - Пример:

```javascript
        const fs = require('fs/promises');
        async function readFile() {
          const data = await fs.readFile('file.txt', 'utf8');
          console.log(data);
        }
        readFile();
```

2. **`path`**:
    - Модуль `path` помогает работать с путями к файлам и директориям.
        
    - Пример:

```javascript
        const path = require('path');
        const filePath = path.join(__dirname, 'file.txt');
        console.log(filePath);
```

3. **`stream`**:
    - Модуль `stream` позволяет работать с потоками данных, что полезно для обработки больших файлов.
        
