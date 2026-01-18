---
uid: mmzLGnl_6BxIzVpOJw0uf
title: Исправление ошибки WslRegisterDistribution в Ubuntu
tags:
  - "#ubuntu"
info: null
draft: false
technology: Настройка окружения
specialty: Frontend
tools: []
order: 0
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

**Ошибка WslRegisterDistribution failed with error: 0x80370114** может возникать при установке Linux дистрибутива в Windows Subsystem for Linux (WSL). Эта ошибка обычно связана с проблемами взаимодействия между Windows и WSL.

Для решения этой проблемы можно попробовать следующие шаги:

1. Выполните следующие команды в PowerShell от имени администратора:

```
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
Перезапустите компьютер.
```

![[Pasted image 20230529094857.png]]

2. Запустите PowerShell от имени администратора и выполните следующую команду:

```
wsl --set-default-version 2
```

![[Pasted image 20230529094908.png]]

3. Установите нужный вам Linux дистрибутив (WSL). Если ошибка все еще возникает, попробуйте установить другой дистрибутив.

![[Pasted image 20230529094926.png]]
