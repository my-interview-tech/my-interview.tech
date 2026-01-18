---
uid: EKGjZ_ucUdZ50eN8uFy4L
title: Что описывается в тэге `head`?
tags:
  - HTML
  - "#head"
  - "#meta"
  - "#link"
  - "#title"
  - "#script"
  - "#style"
  - "#base"
info: null
draft: false
technology: HTML
specialty: Frontend
tools: []
order: 10
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

Тэг `head` в HTML используется для определения метаданных веб-страницы, таких как заголовок, ссылки на стили и скрипты, мета-теги и другие данные, которые не отображаются на странице напрямую, но используются браузером и другими программами для обработки страницы.

```html
<!doctype html>
<html lang="en">
   
  <head>
       
    <meta charset="UTF-8" />
           
    <!-- Заголовок документа в вкладках браузера -->
       
    <title>Основы HTML</title>
           
    <!-- Добавление фавикона в вкладки браузера -->
       
    <link rel="shortcut icon" href="icon.ico" type="image/x-icon" />

       
    <!-- Альтернативный способ добавления фавикона -->
       
    <link rel="apple-touch-icon" href="apple-touch-icon.png" />
       
    <link
      rel="apple-touch-icon"
      sizes="72x72"
      href="apple-touch-icon-72x72.png"
    />

       
    <!-- SEO-настройки -->
       
    <meta name="description" content="Тестовая веб-страница" />
       
    <meta name="keywords" content="html, my-interview, vakalushko" />
       
    <meta name="author" content="Vadim A. Kalushko" />

       
    <!-- Настройки для мобильных устройств (отключение масштабирования) -->
       
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, user-scalable=no"
    />

       
    <!-- Использование последней версии Internet Explorer -->
       
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />

       
    <!-- Подключение внешнего CSS-файла -->
       
    <link rel="stylesheet" href="styles.css" />

       
    <!-- Локальные стили -->

       
    <style>
            div {
              background-color: red; /* Устанавливаем красный фон для всех div */
            }
         
    </style>

       
    <!-- Подключение локальных шрифтов -->
       
    <link rel="stylesheet" href="styles.css" />

       
    <!-- Подключение шрифта Google -->
       
    <link
      href="https://fonts.googleapis.com/css?family=Roboto&display=swap"
      rel="stylesheet"
    />

     
  </head>
   
  <body></body>
</html>
```

В тэге `head` могут быть определены следующие элементы:

1. `title`: Элемент `title` определяет заголовок страницы, который отображается в заголовке браузера и в результатах поиска.
2. `meta`: Элемент `meta` используется для определения метаданных страницы, таких как описание страницы, ключевые слова, автор, кодировка и другие данные.
3. `link`: Элемент `link` используется для связывания страницы с внешними ресурсами, такими как стили CSS, иконки сайта и другие файлы.
4. `style`: Элемент `style` используется для определения стилей CSS, которые будут применяться к элементам на странице.
5. `script`: Элемент `script` используется для определения JavaScript кода, который будет выполняться на странице.
6. `base`: Элемент `base` используется для определения базового URL для всех относительных ссылок на странице.

Также в тэге `head` могут быть определены другие элементы, такие как `noscript`, `object`, `meta` и другие, в зависимости от нужд разработчика.

Важно отметить, что все элементы в тэге `head` не отображаются на странице напрямую, но они могут существенно повлиять на ее работу, восприятие пользователем и индексацию поисковыми системами.

---

[[001 HTML|Назад]]
