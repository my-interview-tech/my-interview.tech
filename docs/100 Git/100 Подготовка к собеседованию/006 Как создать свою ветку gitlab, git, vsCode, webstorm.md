---
uid: GzmRfJsLumjDEP3SLRjK3
title: "Как создать свою ветку gitlab, git, vsCode, webstorm?"
tags:
  - "#gitlab"
  - "#git"
  - IDE
  - "#VSCode"
  - "#webstorm"
info: []
draft: false
technology: Подготовка к собеседованию
specialty: "Frontend,Backend"
tools: []
order: 6
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

## Gitlab

##### Вариант 1

На сайте GitLab в окне управления репозиторием нажать на кнопку + справа от названия ветки, а потом выбрать пункт `New branch` в выпадающем меню.

![[Pasted image 20230529003720.png]]

Затем прописываем имя ветки в поле `Branch name` и нажимаем кнопку `Create branch`.

![[Pasted image 20230529003727.png]]

##### Вариант 2

В репозитории выбираем вкладку `Branches`

![[Pasted image 20230529003735.png]]

В правом углу находится кнопка `New branch` -- нажимаем.

![[Pasted image 20230529003743.png]]

Откроется страница с формой создания ветки. Необходимо ввести имя ветки в поле `Branch name` и нажать кнопку `Create branch`.

![[Pasted image 20230529003749.png]]

## Git bash

##### Вариант 1. Создаем ветку и сразу переключаемся

`git checkout -b new-branch-name`

##### Вариант 2. Последовательно выполняем команды

`git branch new-branch-name`
`git checkout new-branch-name`

Создаем первой командой, переключаемся второй.

## IDE

##### Пример на VS Code

В левом нижнем углу находим название текущей ветки -- кликаем
![[Pasted image 20230529003810.png]]

Сверху появляется выпадающее меню. Кликаем по +Create new branch

![[Pasted image 20230529003817.png]]

Пишем название новой ветки и нажимаем enter.

![[Pasted image 20230529003822.png]]

Ветка уже создана и мы находимся в ней. Можно проверить в нижнем левом углу экрана.

##### Пример с WebStorm

Ветка создается точно также, но ветвь ищем в правом нижнем углу.
![[Pasted image 20230529003833.png]]

Выбираем + New Branch --> в форме New branch name пишем имя новой ветки и оставляем галочку на Checkout branch (чтобы сразу переключиться на нее) --> нажимаем Create.

---

[[100 Git|Назад]]
