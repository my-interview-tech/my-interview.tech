---
title: Как установить Node.js на разные операционные системы?
draft: false
tags:
  - NodeJS
  - Windows
  - macOS
  - Linux
  - Docker
info:
---
#### **Windows**

1. **Официальный установщик**
    - Перейти на [официальный сайт](https://nodejs.org/) и скачать LTS-версию.
    - Запустить установщик (`.msi`) и следовать инструкциям.
    - Проверить установку:

```sh КопироватьРедактировать
node -v npm -v
```

2. **Установка через пакетный менеджер Chocolatey**

```sh КопироватьРедактировать
choco install nodejs-lts
```

#### **macOS**

1. **Официальный установщик**
    
    - Скачать `.pkg` с [сайта Node.js](https://nodejs.org/).
    - Установить и проверить версию:

```sh КопироватьРедактировать
node -v npm -v
```

2. **Установка через Homebrew**

```sh КопироватьРедактировать
brew install node
```

#### **Linux (Ubuntu/Debian)**

1. **Через `apt`**

```sh КопироватьРедактировать
sudo apt update sudo apt install -y nodejs npm
```

2. **Через Node Version Manager (nvm)** (рекомендуется)

```sh КопироватьРедактировать
curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash source ~/.bashrc nvm install --lts
```


#### **Linux (CentOS/RHEL/Fedora)**

```sh КопироватьРедактировать
sudo dnf install -y nodejs
```

#### **Docker (Альтернативный способ)**

Если не хотите устанавливать Node.js на систему напрямую, можно использовать контейнер:

```sh
docker run -it node:latest bash
```

**Лучший способ** – использовать **nvm**, чтобы легко переключаться между разными версиями Node.js.