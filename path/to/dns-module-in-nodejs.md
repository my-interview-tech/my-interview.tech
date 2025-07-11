---
title: Модуль DNS в Node.js и разрешение доменных имен
draft: false
tags:
  - "#NodeJS"
  - "#DNS"
  - "#разрешение_имен"
  - "#сетевое_программирование"
  - "#производительность"
info:
---

Модуль `dns` в Node.js предоставляет функции для работы с системой доменных имен (DNS) и выполнения разрешения доменных имен в IP-адреса и наоборот. Этот модуль имеет два различных набора функций: с поддержкой обратной совместимости и более современные, базирующиеся на промисах.

## Введение в модуль DNS

DNS (Domain Name System) - это критически важная часть интернета, которая связывает доменные имена с соответствующими IP-адресами, позволяя приложениям использовать человеко-читаемые имена вместо числовых IP-адресов.

Подключение модуля осуществляется следующим образом:

```javascript
const dns = require("dns")
```

## Основные функции для разрешения имен

### Разрешение доменного имени в IP-адрес

```javascript
const dns = require("dns")

// Разрешение A-записи (IPv4)
dns.lookup("example.com", (err, address, family) => {
  if (err) {
    console.error("Ошибка DNS-запроса:", err)
    return
  }
  console.log(`Адрес: ${address}, Тип IP: IPv${family}`)
})

// Получение всех IP-адресов
dns.lookup("example.com", { all: true }, (err, addresses) => {
  if (err) {
    console.error("Ошибка DNS-запроса:", err)
    return
  }
  console.log("Адреса:", addresses)
  // Результат: [{ address: '93.184.216.34', family: 4 }, ...]
})
```

### Разрешение IP-адреса в доменное имя (обратная DNS-запись)

```javascript
const dns = require("dns")

// Обратный DNS-запрос
dns.reverse("8.8.8.8", (err, hostnames) => {
  if (err) {
    console.error("Ошибка обратного DNS-запроса:", err)
    return
  }
  console.log("Имена хостов:", hostnames)
  // Пример результата: ['dns.google']
})
```

## Запросы к серверам имен

Модуль `dns` также позволяет выполнять специфические DNS-запросы к серверам имен, в отличие от общих функций разрешения имен, которые обычно используют конфигурацию операционной системы.

### Запрос A-записей (IPv4)

```javascript
const dns = require("dns")

dns.resolve4("example.com", (err, addresses) => {
  if (err) {
    console.error("Ошибка запроса A-записей:", err)
    return
  }
  console.log("A-записи (IPv4):", addresses)
  // Пример результата: ['93.184.216.34']
})
```

### Запрос AAAA-записей (IPv6)

```javascript
dns.resolve6("example.com", (err, addresses) => {
  if (err) {
    console.error("Ошибка запроса AAAA-записей:", err)
    return
  }
  console.log("AAAA-записи (IPv6):", addresses)
  // Пример результата: ['2606:2800:220:1:248:1893:25c8:1946']
})
```

### Запрос MX-записей (почтовые серверы)

```javascript
dns.resolveMx("example.com", (err, addresses) => {
  if (err) {
    console.error("Ошибка запроса MX-записей:", err)
    return
  }
  console.log("MX-записи:", addresses)
  // Пример результата: [{ priority: 10, exchange: 'mail.example.com' }]
})
```

### Запрос TXT-записей

```javascript
dns.resolveTxt("example.com", (err, records) => {
  if (err) {
    console.error("Ошибка запроса TXT-записей:", err)
    return
  }
  console.log("TXT-записи:", records)
  // Пример результата: [['v=spf1 -all']]
})
```

### Запрос NS-записей (серверы имен)

```javascript
dns.resolveNs("example.com", (err, addresses) => {
  if (err) {
    console.error("Ошибка запроса NS-записей:", err)
    return
  }
  console.log("NS-записи:", addresses)
  // Пример результата: ['a.iana-servers.net', 'b.iana-servers.net']
})
```

### Запрос SOA-записи (начало авторитета)

```javascript
dns.resolveSoa("example.com", (err, soa) => {
  if (err) {
    console.error("Ошибка запроса SOA-записи:", err)
    return
  }
  console.log("SOA-запись:", soa)
  /* Пример результата:
  {
    nsname: 'ns.icann.org',
    hostmaster: 'noc.dns.icann.org',
    serial: 2021071343,
    refresh: 7200,
    retry: 3600,
    expire: 1209600,
    minttl: 3600
  }
  */
})
```

## Использование промисов (dns.promises)

Начиная с Node.js 10, модуль DNS также предоставляет API, основанный на промисах:

```javascript
const dns = require("dns")
const { Resolver } = dns.promises

// Создание собственного резолвера с кастомными DNS-серверами
const resolver = new Resolver()
resolver.setServers(["8.8.8.8", "8.8.4.4"]) // Google DNS

async function resolveDomain() {
  try {
    // Разрешение A-записей
    const addresses = await resolver.resolve4("example.com")
    console.log("A-записи:", addresses)

    // Разрешение MX-записей
    const mxRecords = await resolver.resolveMx("example.com")
    console.log("MX-записи:", mxRecords)
  } catch (err) {
    console.error("Ошибка разрешения DNS:", err)
  }
}

resolveDomain()
```

## Управление DNS-кешем

Node.js поддерживает кеширование DNS-записей для повышения производительности. По умолчанию модуль `dns` использует кеш операционной системы, но можно манипулировать кешированием и внутри приложения:

```javascript
const dns = require("dns")

// Сброс кеша DNS (только для lookupService, не для других методов)
dns.setServers(dns.getServers())

// Установка временных DNS-серверов (влияет только на методы resolve*, не на lookup)
dns.setServers(["8.8.8.8", "1.1.1.1"])

// Получение текущих DNS-серверов
console.log("Текущие DNS-серверы:", dns.getServers())
```

## Практические применения

### Проверка доступности домена

```javascript
function checkDomainAvailability(domain) {
  return new Promise((resolve) => {
    dns.lookup(domain, (err) => {
      if (err && err.code === "ENOTFOUND") {
        resolve(true) // Домен может быть доступен для регистрации
      } else {
        resolve(false) // Домен уже зарегистрирован
      }
    })
  })
}

// Использование
async function checkDomains() {
  const domains = ["example.com", "this-domain-probably-doesnt-exist-123456.com"]

  for (const domain of domains) {
    const isAvailable = await checkDomainAvailability(domain)
    console.log(`${domain}: ${isAvailable ? "может быть доступен" : "уже зарегистрирован"}`)
  }
}

checkDomains()
```

### Проверка SPF-записей для почтового домена

```javascript
function checkSPFRecord(domain) {
  return new Promise((resolve, reject) => {
    dns.resolveTxt(domain, (err, records) => {
      if (err) {
        reject(err)
        return
      }

      // Ищем SPF-запись в TXT-записях
      const spfRecord = records.flat().find((record) => record.startsWith("v=spf1"))
      resolve(spfRecord || null)
    })
  })
}

// Использование
async function validateEmailDomain(domain) {
  try {
    // Проверка MX-записей
    const mxRecords = await new Promise((resolve, reject) => {
      dns.resolveMx(domain, (err, addresses) => {
        if (err) reject(err)
        else resolve(addresses)
      })
    })

    // Проверка SPF-записи
    const spfRecord = await checkSPFRecord(domain)

    return {
      hasMX: mxRecords.length > 0,
      mxRecords,
      hasSPF: spfRecord !== null,
      spfRecord,
    }
  } catch (err) {
    if (err.code === "ENOTFOUND" || err.code === "ENODATA") {
      return {
        hasMX: false,
        mxRecords: [],
        hasSPF: false,
        spfRecord: null,
      }
    }
    throw err
  }
}

// Проверка почтового домена
validateEmailDomain("gmail.com")
  .then((result) => {
    console.log("Результат проверки почтового домена:", result)

    if (result.hasMX && result.hasSPF) {
      console.log("Домен корректно настроен для почтовых сервисов")
    } else {
      console.log("Домен не настроен или имеет неполную настройку для почты")
    }
  })
  .catch((err) => {
    console.error("Ошибка проверки домена:", err)
  })
```

## Преимущества и ограничения

### Преимущества использования модуля dns

1. **Гибкость** - предоставляет низкоуровневый доступ к DNS-запросам
2. **Разнообразие функций** - поддержка всех основных типов DNS-записей
3. **Асинхронность** - неблокирующий ввод/вывод для быстрой обработки запросов
4. **Промисы** - современный API с поддержкой async/await

### Ограничения

1. **Кеширование** - метод `dns.lookup()` использует кеш операционной системы, что может привести к непредсказуемым результатам при частых изменениях DNS-записей
2. **Таймауты** - DNS-запросы могут занимать длительное время при проблемах с DNS-серверами
3. **Зависимость от внешних серверов** - работа модуля зависит от доступности DNS-серверов

## Сравнение методов dns.lookup() и dns.resolve()

| Метод            | Описание                                                                                           | Использует                |
| ---------------- | -------------------------------------------------------------------------------------------------- | ------------------------- |
| `dns.lookup()`   | Использует системные механизмы разрешения имен. Обычно связан с файлом hosts и настройками системы | Системный кеш и настройки |
| `dns.resolve*()` | Обращается напрямую к DNS-серверам, минуя системные настройки                                      | Указанные DNS-серверы     |

## Заключение

Модуль `dns` в Node.js предоставляет мощный и гибкий API для работы с системой доменных имен. Он позволяет выполнять разрешение имен, получать различные типы DNS-записей и управлять настройками DNS для вашего приложения. Это особенно полезно при создании инструментов для сетевой диагностики, проверки доменов, отправки электронной почты и других приложений, требующих взаимодействия с DNS.

При разработке с использованием модуля DNS важно понимать разницу между методами `lookup()` и `resolve*()`, а также учитывать возможные задержки при выполнении DNS-запросов, особенно в приложениях с высокой нагрузкой.

---

[[Назад]]
