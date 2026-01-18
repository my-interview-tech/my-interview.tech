---
uid: 5zr4HT4lkNVeJLVrrfd0W
title: "Возможно ли запустить один или несколько тестовых файлов с помощью Jest?\_Если да, то каким образом?"
tags:
  - testing
  - Jest
draft: false
technology: "Jest, RTL"
specialty: Frontend
tools: []
order: 38
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

Да, Jest позволяет запускать один или несколько тестовых файлов, используя различные параметры командной строки. Вот несколько способов, как это можно сделать:

1. **Запуск одного тестового файла**:

Чтобы запустить один тестовый файл, укажите путь к этому файлу в команде Jest:

```bash
jest path/to/your-test-file.js
```

```bash
jest src/components/MyComponent.test.js
```

2. **Запуск нескольких тестовых файлов**:

Чтобы запустить несколько тестовых файлов, укажите пути к этим файлам через пробел:

```bash
jest path/to/your-test-file1.js path/to/your-test-file2.js
```

Пример:

```bash
jest src/components/MyComponent.test.js src/utils/myUtility.test.js
```

3. **Запуск тестов по шаблону**:

Вы можете запустить тесты, соответствующие определенному шаблону, используя флаг `--testPathPattern`:

```bash
jest --testPathPattern=pattern
```

Пример:

```bash
jest --testPathPattern=src/components
```

Это запустит все тестовые файлы в папке `src/components`.

4. **Запуск тестов по имени**:

Чтобы запустить тесты, соответствующие определенному имени, используйте флаг `--testNamePattern`:

```bash
jest --testNamePattern=pattern
```

```bash
jest --testNamePattern=testA
```

Это запустит все тесты, имена которых содержат `testA`.

5. **Запуск тестов по регулярному выражению**:

Вы можете использовать регулярные выражения для запуска тестов, соответствующих определенному шаблону:

```bash
jest --testNamePattern=/pattern/
```

```bash
jest --testNamePattern=/testA|testB/
```

Это запустит все тесты, имена которых содержат `testA` или `testB`.

6. **Запуск тестов в режиме наблюдения**:

Вы можете комбинировать флаги для запуска тестов в режиме наблюдения и фильтрации по имени или шаблону:

```bash
jest --watch --testNamePattern=testA
```

```bash
jest --watch --testNamePattern=/testA|testB/
```

Это запустит тесты в режиме наблюдения и будет автоматически перезапускать тесты, соответствующие шаблону `testA` или `testB`, при изменении файлов.

---

[[007 Jest, RTL|Назад]]
