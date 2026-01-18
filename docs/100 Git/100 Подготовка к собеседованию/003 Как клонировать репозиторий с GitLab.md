---
uid: MfdLBoIzo8jvl7q44-Zc9
title: Как клонировать репозиторий с GitLab?
tags:
  - "#git"
  - "#SSH"
  - "#SSH-key"
  - "#git-clone"
  - "#CORS"
info:
  - "https://www.youtube.com/watch?v=Vmt0V6a3ppE"
  - "[[Как настроить CORS]]"
draft: false
technology: Подготовка к собеседованию
tools: []
order: 3
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

1. Для клонирования репозитория зайдём в наш проект #gitlab
   ![[Pasted image 20230522162151.png]]
   Нажимаем Clone with #SSH

```bash
(git@gitlab.com:levotarayan98/phobos.git)
```

2. Используем предустановленный #git-bash , используем консольную команду:

```bash
(git clone)
```

Консольная команда сработала с ошибкой, потому что у нас не установлен SSH-key в профиле #gitlab , установим этот ключ.

3. Используем консольную команду в #git-bash :

```bash
ssh-keygen
```

У нас инициализировался открытый и закрытый ssh-key.

Для работы нам необходимо загрузить открытый сгенерированный ключ в профиль #gitlab

```bash
/c/Users/Вадим/.ssh/id_rsa.pub
```

Это путь к нашему публичному ключу

4. Используем следующую консольную команду в #git-bash :

```bash
$ cat /c/Users/Вадим/.ssh/id_rsa.pub
```

Наш публичный ключ инициализировался в консоли git'а

5.  Вставим инициализированный public #SSH-key в профиль #gitlab :

![[Pasted image 20230522162858.png]]

6. После сохранения ключа в профиле, вернемся в наш #git-bash и осуществим клонирование требуемого репозитория, вводим в консоль:

```bash
$git clone git@gitlab.com:levotarayan98/phobos.git
```

7. Репозиторий успешно скопирован!

---

[[100 Git|Назад]]
