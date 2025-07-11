---
title: Как установить Node.js на разные операционные системы?
draft: false
tags:
  - "#NodeJS"
  - "#Windows"
  - "#macOS"
  - "#Linux"
  - "#Docker"
info:
---

Node.js можно установить на разные операционные системы несколькими способами. Ниже представлены различные методы установки для популярных платформ.

### Windows

#### 1. Через официальный установщик

1. Перейдите на [официальный сайт Node.js](https://nodejs.org/) и скачайте LTS-версию (рекомендуется для большинства пользователей).
2. Запустите установщик (`.msi` файл) и следуйте инструкциям мастера установки.
3. После установки проверьте версию:

```bash
node -v
npm -v
```

#### 2. Через пакетный менеджер Chocolatey

```bash
choco install nodejs-lts
```

#### 3. Через Windows Subsystem for Linux (WSL)

Если у вас установлен WSL, вы можете установить Node.js так же, как на Linux:

```bash
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt install -y nodejs
```

### macOS

#### 1. Через официальный установщик

1. Скачайте `.pkg` файл с [сайта Node.js](https://nodejs.org/).
2. Запустите установщик и следуйте инструкциям.
3. Проверьте версию:

```bash
node -v
npm -v
```

#### 2. Через Homebrew

```bash
brew install node
```

#### 3. Через NVM (Node Version Manager)

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
source ~/.zshrc  # или source ~/.bashrc
nvm install --lts
```

### Linux (Ubuntu/Debian)

#### 1. Через apt (стандартные репозитории)

```bash
sudo apt update
sudo apt install -y nodejs npm
```

#### 2. Через NodeSource (рекомендуется для получения последних версий)

```bash
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt install -y nodejs
```

#### 3. Через nvm (рекомендуется для разработчиков)

```bash
curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
source ~/.bashrc
nvm install --lts
```

### Docker (альтернативный способ)

Если не хотите устанавливать Node.js напрямую на систему, можно использовать Docker-контейнер:

```bash
# Запуск интерактивной оболочки с Node.js
docker run -it node:16 bash

# Запуск Node.js приложения из текущего каталога
docker run -it --rm -v $(pwd):/app -w /app node:16 node app.js
```

### Проверка успешной установки

После установки убедитесь, что Node.js и npm доступны:

```bash
node -v  # Проверка версии Node.js
npm -v   # Проверка версии npm
node -e "console.log('Hello, Node.js!')"  # Запуск кода
```

---

[[002 Node.js|Назад]]
