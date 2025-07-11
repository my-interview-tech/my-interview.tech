---
title: Как рекурсивно удалить директорию в Node.js Какие альтернативные пакеты можно использовать
draft: false
tags:
  - "#NodeJS"
  - "#fs"
  - "#файловая-система"
  - "#rimraf"
  - "#del"
  - "#рекурсия"
info:
  - "[Документация Node.js по fs.rm()](https://nodejs.org/api/fs.html#fsrmsyncpath-options)"
  - "[Документация пакета rimraf](https://www.npmjs.com/package/rimraf)"
  - "[Документация пакета del](https://www.npmjs.com/package/del)"
---

В Node.js можно удалить папку вместе с её содержимым **встроенными методами** или с помощью **внешних библиотек**.

## 1. Использование fs.rm() (современный способ)

С версии **Node.js 14.14** появился метод `fs.rm()`, который заменяет устаревший `fs.rmdir()`.

```javascript
const fs = require("fs")

fs.rm("./myFolder", { recursive: true, force: true }, (err) => {
  if (err) {
    console.error("Ошибка:", err)
  } else {
    console.log("Папка удалена")
  }
})
```

### Разбор опций:

- `{ recursive: true }` — рекурсивно удаляет папку и всё содержимое.
- `{ force: true }` — удаляет даже если папки нет (избегает ошибки ENOENT).

**Это самый быстрый способ, если ваша версия Node.js поддерживает `fs.rm()`!**

## 2. Использование fs.rmSync() (синхронный способ)

Если удаление должно выполняться **синхронно** (например, в CLI-скриптах):

```javascript
const fs = require("fs")

try {
  fs.rmSync("./myFolder", { recursive: true, force: true })
  console.log("Папка удалена")
} catch (err) {
  console.error("Ошибка:", err)
}
```

## 3. Рекурсивное удаление вручную (fs.readdir() + fs.unlink())

Если `fs.rm()` недоступен (например, на старых версиях Node.js), можно удалить файлы **поочередно**:

```javascript
const fs = require("fs")
const path = require("path")

function deleteFolderRecursive(folderPath) {
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach((file) => {
      const curPath = path.join(folderPath, file)
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath) // Удаляем подпапки рекурсивно
      } else {
        fs.unlinkSync(curPath) // Удаляем файлы
      }
    })
    fs.rmdirSync(folderPath) // Удаляем пустую папку
  }
}

// Использование:
deleteFolderRecursive("./myFolder")
console.log("Папка удалена")
```

**Когда использовать?**  
Если нужно **больше контроля** (например, логировать каждый удалённый файл).

## Альтернативные пакеты

Если хочется более **универсальное** решение, можно использовать внешние библиотеки:

### 1. rimraf (кроссплатформенное удаление)

Библиотека [`rimraf`](https://www.npmjs.com/package/rimraf) повторяет `rm -rf` на всех ОС.

**Установка:**

```bash
npm install rimraf
```

**Использование (асинхронно):**

```javascript
const rimraf = require("rimraf")

rimraf("./myFolder", (err) => {
  if (err) {
    console.error("Ошибка:", err)
  } else {
    console.log("Папка удалена")
  }
})
```

**Синхронное удаление:**

```javascript
rimraf.sync("./myFolder")
```

**Преимущества `rimraf`:**

- Работает даже на **Windows** (где `fs.rm()` иногда даёт сбои).
- Используется в npm (`npm ci` вызывает `rimraf` для очистки `node_modules`).

### 2. del (для асинхронного удаления с Promise)

Библиотека [`del`](https://www.npmjs.com/package/del) удобна в `async/await`.

**Установка:**

```bash
npm install del
```

**Использование:**

```javascript
const del = require("del")

;(async () => {
  await del(["myFolder"])
  console.log("Папка удалена")
})()
```

**Преимущества `del`:**

- Поддержка **глобов** (`del(['logs/*.log'])`).
- Возвращает `Promise`, удобен в `async/await`.

## Сравнение подходов

| Способ                       | Поддержка рекурсии | Подходит для                       | Асинхронный? | Устарел? |
| ---------------------------- | ------------------ | ---------------------------------- | ------------ | -------- |
| `fs.rm()`                    | ✅ Да              | Современный Node.js                | ✅ Да        | ❌ Нет   |
| `fs.rmSync()`                | ✅ Да              | Синхронные CLI-скрипты             | ❌ Нет       | ❌ Нет   |
| `fs.readdir() + fs.unlink()` | ✅ Да              | Полный контроль                    | ❌ Нет       | ❌ Нет   |
| `rimraf`                     | ✅ Да              | Кроссплатформенные проекты         | ✅ Да        | ❌ Нет   |
| `del`                        | ✅ Да              | Асинхронные `Promise`-based задачи | ✅ Да        | ❌ Нет   |

**Рекомендуемый способ:** `fs.rm('./folder', { recursive: true })`  
**Для кроссплатформенности:** `rimraf('./folder')`

---

[[002 Node.js|Назад]]
