---
uid: 86tHiMk5zfwoWvYPScPVN
title: Как создать host Application?
tags: []
info: []
draft: false
technology: Архитектура Веб-приложений
specialty: Frontend
tools: []
order: 0
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

У нас есть host-приложение , которое будет включать в себя 3-remote (`addtocart, cart, server`) репозитория.

![[Pasted image 20231003225257.png|600]]

Для того, чтобы отображать данные в host-приложении с remote-приложения, необходимо экспортировать данные следующим образом в файле `webpack.config.js` и перезапустить веб-пакет, чтобы изменения вступили в силу.

![[Pasted image 20231003225602.png|600]]

Далее переходим в host приложение и указываем remoteEntry.js в remotes файла `webpack.config.js`

![[Pasted image 20231003225912.png|600]]

Имена `remote` должны совпадать в имени host и remote файла `webpack.config.js`.

Далее я могу импортировать выбранный компонент в свой хост приложение.
