---
title: Зачем использовать библиотеку inquirer вместо readline
draft: false
tags:
  - "#NodeJS"
  - "#inquirer"
  - "#readline"
  - "#CLI"
  - "#интерактивный-интерфейс"
  - "#пользовательский-ввод"
info:
  - "[Официальная документация inquirer](https://github.com/SBoudrias/Inquirer.js)"
  - "[Документация Node.js по readline](https://nodejs.org/api/readline.html)"
  - "[Статья о создании CLI с inquirer](https://codeutility.org/how-to-create-interactive-command-line-prompts-with-inquirer-js-stack-overflow/)"
---

# Зачем использовать библиотеку inquirer вместо readline

Модуль **readline** и библиотека **inquirer** - это инструменты для создания интерактивных командных интерфейсов в Node.js. Хотя оба решения позволяют обрабатывать пользовательский ввод, они существенно отличаются по функциональности, удобству использования и возможностям.

## Основные преимущества inquirer

### 1. Разнообразие типов пользовательского ввода

**inquirer** предлагает множество готовых типов запросов, каждый со своими возможностями:

- **input** — обычный текстовый ввод
- **password** — скрытый ввод для паролей
- **confirm** — подтверждение (да/нет)
- **list** — выбор одного элемента из списка
- **checkbox** — выбор нескольких элементов из списка
- **rawlist** — нумерованный список
- **expand** — развернутые опции
- **editor** — многострочный ввод текста

В то время как **readline** предоставляет только базовый текстовый ввод, который требует ручной обработки для имитации перечисленных типов.

#### Пример создания разных типов ввода с inquirer:

```javascript
const inquirer = require("inquirer")

inquirer
  .prompt([
    {
      type: "input",
      name: "name",
      message: "Как вас зовут?",
    },
    {
      type: "list",
      name: "favoriteColor",
      message: "Какой ваш любимый цвет?",
      choices: ["Красный", "Синий", "Зелёный", "Желтый"],
    },
    {
      type: "checkbox",
      name: "hobbies",
      message: "Выберите ваши увлечения:",
      choices: ["Программирование", "Чтение", "Спорт", "Музыка", "Путешествия"],
    },
    {
      type: "confirm",
      name: "confirmation",
      message: "Подтвердить ваш выбор?",
      default: true,
    },
  ])
  .then((answers) => {
    console.log("Полученные ответы:", answers)
  })
```

### 2. Обработка пользовательского ввода и валидация

**inquirer** предоставляет удобный механизм валидации вводимых данных с моментальной обратной связью прямо в интерфейсе.

```javascript
inquirer
  .prompt([
    {
      type: "input",
      name: "email",
      message: "Введите ваш email:",
      validate: function (input) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (emailRegex.test(input)) {
          return true
        }
        return "Пожалуйста, введите корректный email адрес"
      },
    },
    {
      type: "password",
      name: "password",
      message: "Введите пароль:",
      validate: (input) => {
        if (input.length < 8) {
          return "Пароль должен содержать не менее 8 символов"
        }
        return true
      },
    },
  ])
  .then((answers) => {
    console.log("Регистрация успешна!")
  })
```

С **readline** пришлось бы писать собственную логику валидации:

```javascript
const readline = require("readline")

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

rl.question("Введите ваш email: ", (email) => {
  if (!validateEmail(email)) {
    console.log("Некорректный email. Попробуйте снова.")
    rl.close()
    return
  }

  rl.question("Введите пароль: ", (password) => {
    // Ручная проверка длины пароля
    if (password.length < 8) {
      console.log("Пароль должен содержать не менее 8 символов")
      rl.close()
      return
    }

    console.log("Регистрация успешна!")
    rl.close()
  })
})
```

### 3. Динамические вопросы и зависимости

**inquirer** позволяет выстраивать последовательности вопросов, которые зависят от предыдущих ответов, через атрибут `when`:

```javascript
inquirer
  .prompt([
    {
      type: "list",
      name: "paymentMethod",
      message: "Выберите способ оплаты:",
      choices: ["Кредитная карта", "PayPal", "Банковский перевод"],
    },
    {
      type: "input",
      name: "cardNumber",
      message: "Введите номер карты:",
      when: (answers) => answers.paymentMethod === "Кредитная карта",
      validate: (input) => /^\d{16}$/.test(input) || "Номер карты должен содержать 16 цифр",
    },
    {
      type: "input",
      name: "paypalEmail",
      message: "Введите email PayPal:",
      when: (answers) => answers.paymentMethod === "PayPal",
      validate: (input) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input) || "Введите корректный email",
    },
    {
      type: "input",
      name: "bankDetails",
      message: "Введите реквизиты банка:",
      when: (answers) => answers.paymentMethod === "Банковский перевод",
    },
  ])
  .then((answers) => {
    console.log("Платежная информация:", answers)
  })
```

С **readline** необходимо организовывать вложенные вызовы функций и поддерживать сложную логику для достижения того же результата.

### 4. Улучшенный пользовательский интерфейс

**inquirer** предоставляет богатый визуальный интерфейс:

- **Интерактивные списки** с возможностью навигации стрелками
- **Подсветка выбранных элементов**
- **Чекбоксы** для множественного выбора
- **Автодополнение** для текстовых полей
- **Прогресс-бары** и другие элементы визуального оформления

```javascript
// Пример с автодополнением
inquirer
  .prompt([
    {
      type: "autocomplete",
      name: "fruit",
      message: "Выберите фрукт:",
      source: (answers, input = "") => {
        const fruits = ["Яблоко", "Апельсин", "Банан", "Киви", "Ананас", "Абрикос"]
        return Promise.resolve(
          fruits.filter((fruit) => fruit.toLowerCase().includes(input.toLowerCase())),
        )
      },
    },
  ])
  .then((answers) => {
    console.log("Выбранный фрукт:", answers.fruit)
  })
```

### 5. Расширяемость и экосистема плагинов

**inquirer** имеет развитую экосистему плагинов, расширяющих его возможности:

- **inquirer-autocomplete-prompt** — добавляет автодополнение
- **inquirer-file-tree-selection-prompt** — позволяет выбирать файлы из дерева
- **inquirer-datepicker-prompt** — добавляет выбор даты
- **inquirer-fuzzy-path** — нечёткий поиск по файловой системе

## Практические примеры использования

### Создание мастера настройки приложения

```javascript
const inquirer = require("inquirer")
const fs = require("fs")

async function setupWizard() {
  const config = {}

  // Шаг 1: Базовые настройки
  const basicConfig = await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "Название проекта:",
      default: "my-app",
    },
    {
      type: "list",
      name: "environment",
      message: "Выберите окружение:",
      choices: ["development", "staging", "production"],
    },
  ])

  Object.assign(config, basicConfig)

  // Шаг 2: Настройка базы данных
  const dbConfig = await inquirer.prompt([
    {
      type: "confirm",
      name: "useDatabase",
      message: "Использовать базу данных?",
      default: true,
    },
    {
      type: "list",
      name: "databaseType",
      message: "Выберите тип базы данных:",
      choices: ["MongoDB", "PostgreSQL", "MySQL"],
      when: (answers) => answers.useDatabase,
    },
    {
      type: "input",
      name: "connectionString",
      message: (answers) => `Введите строку подключения для ${answers.databaseType}:`,
      when: (answers) => answers.useDatabase,
      default: (answers) => {
        if (answers.databaseType === "MongoDB") return "mongodb://localhost:27017/myapp"
        if (answers.databaseType === "PostgreSQL")
          return "postgresql://user:password@localhost:5432/mydb"
        if (answers.databaseType === "MySQL") return "mysql://user:password@localhost:3306/mydb"
        return ""
      },
    },
  ])

  if (dbConfig.useDatabase) {
    config.database = {
      type: dbConfig.databaseType,
      connectionString: dbConfig.connectionString,
    }
  }

  // Сохранение конфигурации
  fs.writeFileSync("config.json", JSON.stringify(config, null, 2), "utf8")

  console.log("Конфигурация успешно сохранена в config.json")
}

setupWizard()
```

### Интерактивное управление задачами

```javascript
const inquirer = require("inquirer")

// База данных задач (в реальном приложении может быть БД)
let tasks = [
  { id: 1, title: "Изучить Node.js", completed: true },
  { id: 2, title: "Создать CLI приложение", completed: false },
  { id: 3, title: "Написать документацию", completed: false },
]

async function taskManager() {
  while (true) {
    const { action } = await inquirer.prompt({
      type: "list",
      name: "action",
      message: "Что вы хотите сделать?",
      choices: [
        "Просмотреть задачи",
        "Добавить задачу",
        "Отметить задачу выполненной",
        "Удалить задачу",
        "Выход",
      ],
    })

    if (action === "Выход") break

    switch (action) {
      case "Просмотреть задачи":
        tasks.forEach((task) => {
          console.log(`[${task.completed ? "X" : " "}] ${task.id}: ${task.title}`)
        })
        break

      case "Добавить задачу":
        const { title } = await inquirer.prompt({
          type: "input",
          name: "title",
          message: "Введите название задачи:",
          validate: (input) => input.trim() !== "" || "Название не может быть пустым",
        })

        tasks.push({
          id: tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1,
          title,
          completed: false,
        })

        console.log("Задача добавлена!")
        break

      case "Отметить задачу выполненной":
        if (tasks.length === 0) {
          console.log("Нет доступных задач")
          break
        }

        const { taskId } = await inquirer.prompt({
          type: "list",
          name: "taskId",
          message: "Выберите задачу для отметки:",
          choices: tasks
            .filter((task) => !task.completed)
            .map((task) => ({ name: task.title, value: task.id })),
        })

        tasks = tasks.map((task) => (task.id === taskId ? { ...task, completed: true } : task))

        console.log("Задача отмечена как выполненная!")
        break

      case "Удалить задачу":
        if (tasks.length === 0) {
          console.log("Нет доступных задач")
          break
        }

        const { deleteTaskId } = await inquirer.prompt({
          type: "list",
          name: "deleteTaskId",
          message: "Выберите задачу для удаления:",
          choices: tasks.map((task) => ({
            name: `${task.title} ${task.completed ? "(выполнена)" : ""}`,
            value: task.id,
          })),
        })

        tasks = tasks.filter((task) => task.id !== deleteTaskId)

        console.log("Задача удалена!")
        break
    }

    // Пауза перед возвратом в меню
    await inquirer.prompt({
      type: "input",
      name: "continue",
      message: "Нажмите Enter для продолжения...",
    })
  }
}

taskManager()
```

## Заключение

Библиотека **inquirer** предоставляет существенные преимущества перед стандартным модулем **readline**:

- **Богатый набор типов ввода** делает взаимодействие более удобным и интуитивным
- **Встроенная валидация** упрощает разработку и улучшает пользовательский опыт
- **Динамические вопросы** позволяют создавать сложные интерактивные сценарии
- **Современный визуальный интерфейс** повышает удобство использования
- **Расширяемость** через плагины для специализированных задач

Использование **readline** целесообразно для простых сценариев, где требуется минимальное взаимодействие с пользователем и нет необходимости в дополнительных зависимостях. Однако для создания полноценных интерактивных CLI-приложений **inquirer** является более мощным и удобным инструментом.

---

[[002 Node.js|Назад]]
