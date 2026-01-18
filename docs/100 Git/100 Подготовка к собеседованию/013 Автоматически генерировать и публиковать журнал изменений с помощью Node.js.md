---
uid: 3WMEnZgzvzisgbpASIFDr
title: Автоматически генерировать и публиковать журнал изменений с помощью Node.js
tags:
  - "#changeLog"
  - "#git"
  - "#NodeJS"
  - "#standart-version"
draft: false
technology: Подготовка к собеседованию
tools: []
order: 13
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

### Введение

Журнал изменений ( #ChangeLog ) - это подробная запись любых изменений, которые вы внесли в свой проект за определенный промежуток времени.

Журнал изменений служит не только отправной точкой для исправления ошибок, но и ценным образовательным ресурсом при знакомстве новых разработчиков с вашим проектом.

Мы создадим conventional commit - сообщение о фиксации, используя определенный формат фиксации, называемый #ConventionalCommit и инструмент под названием #Commitizen.

Затем мы будем использовать библиотеку под названием #standart-version , чтобы автоматически сгенерировать журнал изменений и новую версию выпуска, которая следует за semantic versioning.

Наконец, мы сделаем наш журнал изменений общедоступным для всей команды разработчиков, чтобы все следовали одним и тем же соглашениям в проекте.
Давайте начнем!

### #ConventionalCommit

Спецификация обычных коммитов улучшает сообщения о коммитах, предоставляя правила для создания конкретной истории коммитов. Обычные коммиты упрощают создание журнала изменений за счет создания выпуска, использующего семантическое управление версиями.

Согласно соглашению, сообщение о фиксации должно быть структурировано следующим образом:

```http
<type>[optional scope]: <description>
[optional body]
[optional footer(s)]
```

Давайте рассмотрим детали структуры:

`<type>` - это тип фиксации, который влияет на номер версии выпуска.
При семантическом управлении версиями исправление типа fix влияет на исправление, а тип feat на НЕЗНАЧИТЕЛЬНОЕ. Существуют и другие типы, однако они не влияют на номер версии выпуска.

`<scope>` - это необязательное существительное, описывающее часть кодовой базы, которая изменяется или обновляется при фиксации. Например, в feat(страницы) pages - это область действия. В семантическом версионировании коррелирует с MAJOR. При использовании после области видимости указывает на наличие критических изменений в фиксации.

`<description>` - это краткое письменное объяснение изменений, внесенных в код. Например, если бы мы написали описание для feat(страницы), оно могло бы выглядеть следующим образом:

- `feat(pages): ` добавьте страницу контактов в боковом меню.
- `body` - это необязательное поле, которое вы можете использовать для более подробного описания фиксации. текст должен начинаться через одну строку после описания.
- `footer` также является необязательным полем. Например, один `footer` является `BREAKING CHANGE`, которое коррелировало бы с `MAJOR` в семантическом управлении версиями.

### Пример commit

Давайте рассмотрим несколько примеров различных сообщений о фиксации:

Закоммить сообщение, указав только тип и описание:

```bash
feat: add the charging option for cars
```

Сообщение о фиксации с указанием типа, области действия и описания:

```bash
fix(homepage): change title width of title
```

Коммит с BREAKING CHANGE:

```bash
refactor(api): remove the get api from reservations
BREAKING CHANGE: refactor to use the trip api instead of reservations api
```

### Создаём наш проект и добавляем инструменты управления версиями

#### Инициализация проекта

Давайте создадим наш проект с добавления необходимых инструментов для автоматизации нашего журнала изменений и версий.

Сначала войдем в командную строку, куда мы добавим следующие блоки кода.

Давайте создадим проект на основе npm и сделаем его репозиторием git.
Если вы хотите автоматизировать существующий репозиторий, вы можете пропустить этот шаг:

```bash
# create project directory
mkdir changelog

# cd into project
cd changelog

# initialize npm project
npm init -y

# initialize git
git init
```

Приведенный выше блок кода создаст репозиторий git и пакет npm с версией 1.0.0.

#### Добавим библиотеку `standard-version`

Теперь давайте приступим к созданию релизов для нашего проекта! Вам нужно будет установить пакет npm стандартной версии в свой проект следующим образом:

```bash
npm install --save-dev standard-version
```

Вам также нужно будет добавить его в сценарии npm:

```bash
"scripts": {
"release": "standard-version"
}
```

#### Создание версии

Создайте фиктивный файл с именем new-feature и зафиксируйте его следующим образом:

```bash
touch new-feature
git add new-feature
git commit
```

Добавьте следующее сообщение о фиксации git:

```bash
	feat(new-feature): add a new-feature to our project
```

Наконец, давайте создадим релиз в нашем проекте, запустив наш недавно добавленный скрипт:

```bash
npm run release
```

Выполнение приведенной выше команды приведет к появлению на экране следующего сообщения:

```bash
> changelog@1.0.0 release /home/imsingh/Develop/inder/changelog
> standard-version
bumping version in package.json from 1.0.0 to 1.1.0
bumping version in package-lock.json from 1.0.0 to 1.1.0
created CHANGELOG.md
outputting changes to CHANGELOG.md
committing package-lock.json and package.json and CHANGELOG.md
tagging release v1.1.0
Run `git push --follow-tags origin master && npm publish` to publish
```

Приведенное выше сообщение выполняет следующее:

Увеличивает номер версии SemVer с 1.0.0 до 1.1.0
Мы добавили одну функцию, поэтому MINOR был обновлен с 0 до 1
Создает CHANGELOG.md файл, добавляя в него требуемое содержимое, фиксирует вышеуказанные изменения, создавая тег версии 1.1.0
Распечатайте сообщение для push-тегов и опубликуйте наш пакет в npm, если это необходимо CHANGELOG.md

Теперь, если вы откроете CHANGELOG.md , вы увидите следующий блок кода, который включает в себя изменения, внесенные выше:

```bash
# Changelog
All notable changes to this project will be documented in this file. See \[standard-version\](https://github.com/conventional-changelog/standard-version) for commit guidelines.
## 1.1.0 (2021-07-12)
### Features
* **new-feature:**
add a new-feature to our project 11c0322
```

Вы также увидите сообщение о фиксации standard-release created, в котором использовалась команда git log -1 для создания выпуска:

```bash
commit #COMMIT_HASH (HEAD -> master, tag: v1.1.0)
Author: #AUTHOR_NAME <#AUTHOR_EMAIL>
Date: #COMMIT_DATE
chore(release): 1.1.0
```

Тип сообщения о фиксации - chore, область применения - release, а описание - 1.1.0.

Теперь у вас есть все необходимое для автоматизации регистрации изменений и выпуска релиза!Однако ручное написание фиксации является утомительным и подверженным ошибкам процессом. Давайте воспользуемся некоторыми инструментами, чтобы упростить этот процесс!

#### Добавление объекта #Commitizen

Вместо того чтобы самостоятельно писать обычные коммиты, вы можете использовать Commitizen для их автоматической генерации. Commitizen задает вам вопросы в командной строке и генерирует коммиты на основе ваших ответов.

Установите пакет Commitizen следующим образом:

```bash
npm install --save-dev commitizen
```

Теперь инициализируйте Commitizen для использования обычного адаптера журнала изменений:

```bash
npx commitizen init cz-conventional-changelog --save-dev --save-exact
```

Адаптер - это конфигурация, которая указывает Commitizen отображать различные виды коммитов в приглашении. В настоящее время доступно множество адаптеров, но при желании вы можете создать свой собственный адаптер.

Теперь, чтобы использовать Commitizen, мы добавим сценарий npm:

```bash
...
"scripts": {
"commit": "cz"
}
...
```

На этом этапе вам следует создать файл .gitignore и игнорировать каталог node_modules.
Добавьте package.json и package-lock.json в промежуточную область git с помощью git add. Мы сделаем фиксацию, выполнив приведенный ниже блок кода:

```bash
npm run commit
```

Приведенный выше блок кода также предложит вам ответить на следующие инструкции.

`type` показывает список типов, из которых вы можете выбрать. Приведенный ниже список взят из адаптера, который мы установили ранее:

```bash
? Select the type of change that you're committing:
feat: A new feature
fix: A bug fix
docs: Documentation only changes
❯ style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-col
ons, etc)
refactor: A code change that neither fixes a bug nor adds a feature
perf: A code change that improves performance
(Move up and down to reveal more choices)
```

`scope` в приведенном ниже блоке кода относится к области действия обычной фиксации:

```bash
? What is the scope of this change (e.g. component or file name): (press enter to skip)
```

Для краткого описания напишите краткое объяснение обычной фиксации:

```bash
? Write a short, imperative tense description of the change (max 82 chars):
```

В более подробном описании опишите основную часть обычной фиксации:

```bash
? Provide a longer description of the change: (press enter to skip)
```

Два вопроса в приведенном ниже блоке кода генерируют фиксацию с BREAKING CHANGES:

```bash
? Are there any breaking changes?
? Describe the breaking changes:
```

В разделе, посвященном проблемам, связанным с фиксацией, вы можете ссылаться на проблемы из GitHub, JIRA или других подобных инструментов:

```bash
? Does this change affect any open issues?
? Add issue references (e.g. "fix #123", "re #123".):
```

Как только вы ответите на эти запросы в соответствии со своими потребностями, у вас будет фиксация, подобная показанной ниже:

```bash
Author: #AUTHOR_NAME <#AUTHOR_EMAIL>
Date: Mon Jul 12 21:10:17 2021 +0200
feat(some-scope): a short description
a long description
BREAKING CHANGE: it breaks
123
```

#### Добавление обязательств по обеспечению соблюдения правил

Чтобы гарантировать, что все разработчики в нашем проекте следуют одним и тем же соглашениям, мы будем использовать #git-hooks с #Husky и #commitlint

#### Установка необходимых инструментов

Сначала давайте установим commitlint и Husky, запустив приведенный ниже блок кода:

```bash
# Install commitlint cli and conventional config
npm install --save-dev @commitlint/config-conventional @commitlint/cli

# Install Husky
npm install husky --save-dev
```

#### Настройка commitlint

Чтобы настроить commitlint, нам нужно будет создать конфигурационный файл с именем
commitlint.config.js и добавьте следующий код:

```bash
module.exports = {extends: ['@commitlint/config-conventional']}
```

Чтобы связать сообщения до того, как они будут зафиксированы, нам нужно использовать
перехватчик commit-msg от Husky, выполнив следующие команды:

```bash
# Activate hooks
npx husky install

# Add hook
npx husky add .husky/commit-msg
npx --no-install commitlint --edit "$1"
```

Вы можете добавить husky install в качестве сценария подготовки npm, однако этот шаг необязателен. установка husky гарантирует, что каждый разработчик, использующий это репозиторий, установит Husky Hooks перед использованием проекта:

```bash
...
"scripts": {
...
"prepare": "husky install"
}
```

Мы по-прежнему будем использовать git commit, чтобы заставить наши коммиты следовать соглашению, описанному ранее. Если в сообщении git есть ошибка, commit lint вызовет следующие ошибки:

```bash
git commit -m "This is a commit"
⧗ input: This is a commit

subject may not be empty [subject-empty]
type may not be empty [type-empty]

found 2 problems, 0 warnings
ⓘ Get help: \[https://github.com/conventional-changelog/commitlint/#what-is-commitlint\](https://github.com/conventional-changelog/commitlint/#what-is-commitlint)
husky - commit-msg hook exited with code 1 (error)
```

## Окончательный действия для управления версиями

Чтобы управлять своими версиями, вы можете следовать порядку, перечисленному ниже:

1. Создайте свои функции и зафиксируйте их. Если сообщения о фиксации не соответствуют соглашению, commitlint вызовет ошибки
2. Выполните npm run commit в командной строке, чтобы выполнить фиксацию с помощью Commitizen
3. Запустите npm run release для создания журнала изменений и выпуска на основе семантического управления версиями Чтобы создать выпуск с использованием CI/CD, ознакомьтесь с семантическим выпуском.

## Резюме

В этой статье вы узнали, как создать автоматический журнал изменений и релиз на основе semantic versioning, используя git-хуки и Node.js .

Мы создали наше сообщение о фиксации, используя стандартную спецификацию фиксации, затем выпустили его с помощью commitizen и standard-release. Затем мы использовали commit lint и Husky для автоматической записи нашего коммита.

---

[[100 Git|Назад]]
