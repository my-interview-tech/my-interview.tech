---
title: Как добавить пакет в dependencies без ручного редактирования package.json
draft: false
tags:
  - "#NodeJS"
  - "#npm"
  - "#yarn"
  - "#pnpm"
  - "#package_management"
  - "#dependencies"
info:
  - https://docs.npmjs.com/cli/v8/commands/npm-install
  - https://yarnpkg.com/cli/add
  - https://pnpm.io/cli/add
---

Для добавления пакета в секцию `dependencies` файла `package.json` без его ручного редактирования можно использовать флаги в командах пакетных менеджеров. Рассмотрим различные способы для популярных менеджеров пакетов.

## 1. Использование npm

### Добавление в dependencies (production)

По умолчанию команда `npm install` добавляет пакет в раздел `dependencies`:

```bash
npm install express
```

Эта команда:

1. Загрузит пакет express из репозитория npm
2. Добавит запись `"express": "^4.17.1"` в раздел `dependencies` файла package.json
3. Обновит файл package-lock.json
4. Установит пакет в директорию node_modules

Для явного указания, что пакет является production-зависимостью:

```bash
npm install express --save
```

Флаг `--save` был обязательным в старых версиях npm (до 5.0.0), сейчас он применяется по умолчанию.

### Добавление в devDependencies

Для добавления пакета как зависимости для разработки (не для production) используйте флаг `--save-dev` или его сокращённую версию `-D`:

```bash
npm install eslint --save-dev
# или
npm install eslint -D
```

### Добавление конкретной версии пакета

```bash
npm install express@4.16.0
```

### Добавление пакета глобально (не в package.json)

```bash
npm install -g nodemon
```

Глобальная установка НЕ изменяет package.json вашего проекта.

## 2. Использование Yarn

### Добавление в dependencies

```bash
yarn add express
```

### Добавление в devDependencies

```bash
yarn add eslint --dev
# или
yarn add eslint -D
```

### Добавление конкретной версии пакета

```bash
yarn add express@4.16.0
```

### Добавление пакета глобально

```bash
yarn global add nodemon
```

## 3. Использование pnpm

### Добавление в dependencies

```bash
pnpm add express
```

### Добавление в devDependencies

```bash
pnpm add eslint --save-dev
# или
pnpm add eslint -D
```

### Добавление конкретной версии пакета

```bash
pnpm add express@4.16.0
```

### Добавление пакета глобально

```bash
pnpm add -g nodemon
```

## Дополнительные флаги и опции

### npm / yarn / pnpm: Добавление зависимостей с точной версией

Для добавления зависимости с точной версией (без префикса `^` или `~`):

**npm:**

```bash
npm install express --save-exact
# или
npm install express -E
```

**yarn:**

```bash
yarn add express --exact
# или
yarn add express -E
```

**pnpm:**

```bash
pnpm add express --save-exact
# или
pnpm add express -E
```

Это добавит в package.json запись вида `"express": "4.17.1"` (без символа `^`), что гарантирует использование именно этой версии.

### npm / yarn / pnpm: Добавление в optionalDependencies

**npm:**

```bash
npm install some-package --save-optional
# или
npm install some-package -O
```

**yarn:**

```bash
yarn add some-package --optional
# или
yarn add some-package -O
```

**pnpm:**

```bash
pnpm add some-package --save-optional
# или
pnpm add some-package -O
```

### npm / yarn / pnpm: Добавление пакета с указанием тега

Можно устанавливать пакет не только по версии, но и по тегу:

```bash
npm install express@latest  # последняя стабильная версия
npm install express@next    # следующая версия (бета/RC)
npm install express@canary  # экспериментальная версия
```

## Проверка обновлений и обновление пакетов

Чтобы проверить наличие обновлений для установленных пакетов:

**npm:**

```bash
npm outdated
```

**yarn:**

```bash
yarn outdated
```

**pnpm:**

```bash
pnpm outdated
```

Для обновления пакетов до последней разрешенной версии согласно package.json:

**npm:**

```bash
npm update
```

**yarn:**

```bash
yarn upgrade
```

**pnpm:**

```bash
pnpm update
```

## Резюме

- Для добавления пакета в dependencies: `npm install <package>` / `yarn add <package>` / `pnpm add <package>`
- Для добавления пакета в devDependencies: `npm install <package> -D` / `yarn add <package> -D` / `pnpm add <package> -D`
- Для добавления пакета с точной версией: `npm install <package> -E` / `yarn add <package> -E` / `pnpm add <package> -E`

Всегда проверяйте изменения в package.json после установки пакетов, чтобы убедиться, что они добавлены в нужный раздел с подходящими версиями.

---

[[002 Node.js|Назад]]
