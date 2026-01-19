---
title: Модуль crypto в Node.js и основы криптографии
draft: true
tags:
  - "#NodeJS"
  - "#crypto"
  - "#безопасность"
  - "#шифрование"
  - "#хеширование"
info:
---

`crypto` - это встроенный модуль Node.js, который предоставляет криптографические функции для обеспечения безопасности данных. Модуль включает набор методов для хеширования, шифрования, дешифрования, создания цифровых подписей и управления сертификатами.

## Хеширование данных

Хеширование - это процесс преобразования данных в строку фиксированной длины. Хеш-функции используются для проверки целостности данных и хранения паролей.

### Создание хешей

```javascript
const crypto = require("crypto")

// Создание хеша из строки
function createHash(data, algorithm = "sha256") {
  const hash = crypto.createHash(algorithm)
  hash.update(data)
  return hash.digest("hex") // 'hex', 'base64', 'binary'
}

// Примеры использования
const sha256Hash = createHash("Мои секретные данные")
console.log("SHA-256:", sha256Hash)

const md5Hash = createHash("Мои секретные данные", "md5")
console.log("MD5:", md5Hash)

// Список доступных алгоритмов хеширования
console.log("Доступные алгоритмы хеширования:", crypto.getHashes())
```

### Создание HMAC (Hash-based Message Authentication Code)

HMAC - это алгоритм, который объединяет хеш-функцию с секретным ключом для проверки целостности и подлинности сообщения.

```javascript
const crypto = require("crypto")

// Создание HMAC
function createHmac(data, key, algorithm = "sha256") {
  const hmac = crypto.createHmac(algorithm, key)
  hmac.update(data)
  return hmac.digest("hex")
}

const secretKey = "мой-секретный-ключ"
const hmacResult = createHmac("Мои данные", secretKey)
console.log("HMAC:", hmacResult)
```

## Шифрование и дешифрование

### Симметричное шифрование

При симметричном шифровании используется один и тот же ключ для шифрования и дешифрования данных.

```javascript
const crypto = require("crypto")

// Шифрование данных
function encrypt(text, algorithm, key, iv) {
  const cipher = crypto.createCipheriv(algorithm, key, iv)
  let encrypted = cipher.update(text, "utf8", "hex")
  encrypted += cipher.final("hex")
  return encrypted
}

// Дешифрование данных
function decrypt(encrypted, algorithm, key, iv) {
  const decipher = crypto.createDecipheriv(algorithm, key, iv)
  let decrypted = decipher.update(encrypted, "hex", "utf8")
  decrypted += decipher.final("utf8")
  return decrypted
}

// Пример использования с AES-256-CBC
// Ключ должен быть 32 байта для AES-256
const key = crypto.randomBytes(32)
// Вектор инициализации должен быть 16 байт для AES
const iv = crypto.randomBytes(16)

const algorithm = "aes-256-cbc"
const textToEncrypt = "Секретное сообщение"

const encrypted = encrypt(textToEncrypt, algorithm, key, iv)
console.log("Зашифрованный текст:", encrypted)

const decrypted = decrypt(encrypted, algorithm, key, iv)
console.log("Расшифрованный текст:", decrypted)

// Список доступных алгоритмов шифрования
console.log("Доступные алгоритмы шифрования:", crypto.getCiphers())
```

### Асимметричное шифрование (RSA)

В асимметричном шифровании используются два ключа: открытый (public) для шифрования и закрытый (private) для дешифрования.

```javascript
const crypto = require("crypto")
const fs = require("fs")

// Генерация пары ключей RSA
function generateRSAKeyPair() {
  return crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048, // Длина ключа в битах
    publicKeyEncoding: {
      type: "spki",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs8",
      format: "pem",
    },
  })
}

// Шифрование данных с использованием открытого ключа
function encryptWithPublicKey(publicKey, data) {
  const bufferData = Buffer.from(data, "utf8")
  const encrypted = crypto.publicEncrypt(
    {
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    },
    bufferData,
  )
  return encrypted.toString("base64")
}

// Дешифрование данных с использованием закрытого ключа
function decryptWithPrivateKey(privateKey, encryptedData) {
  const bufferData = Buffer.from(encryptedData, "base64")
  const decrypted = crypto.privateDecrypt(
    {
      key: privateKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    },
    bufferData,
  )
  return decrypted.toString("utf8")
}

// Пример использования
const { publicKey, privateKey } = generateRSAKeyPair()

// Сохранение ключей в файлы (опционально)
fs.writeFileSync("public.pem", publicKey)
fs.writeFileSync("private.pem", privateKey)

const textToEncrypt = "Секретное сообщение для шифрования с RSA"

// Шифрование
const encrypted = encryptWithPublicKey(publicKey, textToEncrypt)
console.log("Зашифрованный текст (RSA):", encrypted)

// Дешифрование
const decrypted = decryptWithPrivateKey(privateKey, encrypted)
console.log("Расшифрованный текст (RSA):", decrypted)
```

## Цифровые подписи

Цифровые подписи используются для подтверждения подлинности и целостности данных.

```javascript
const crypto = require("crypto")
const fs = require("fs")

// Генерация пары ключей
const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: "spki",
    format: "pem",
  },
  privateKeyEncoding: {
    type: "pkcs8",
    format: "pem",
  },
})

// Создание цифровой подписи
function createSignature(data, privateKey) {
  const sign = crypto.createSign("SHA256")
  sign.update(data)
  sign.end()
  return sign.sign(privateKey, "base64")
}

// Проверка цифровой подписи
function verifySignature(data, signature, publicKey) {
  const verify = crypto.createVerify("SHA256")
  verify.update(data)
  verify.end()
  return verify.verify(publicKey, signature, "base64")
}

// Пример использования
const data = "Данные, требующие подписи"

// Подписание данных
const signature = createSignature(data, privateKey)
console.log("Цифровая подпись:", signature)

// Проверка подписи
const isVerified = verifySignature(data, signature, publicKey)
console.log("Подпись действительна:", isVerified)

// Проверка с измененными данными
const isVerifiedTampered = verifySignature(data + "изменено", signature, publicKey)
console.log("Подпись с измененными данными действительна:", isVerifiedTampered) // должно быть false
```

## Безопасное хранение паролей

Для хранения паролей следует использовать специальные алгоритмы, которые медленны и устойчивы к атакам перебором.

### Scrypt

```javascript
const crypto = require("crypto")

// Генерация соли
const salt = crypto.randomBytes(16)

// Хеширование пароля с использованием scrypt
function hashPasswordScrypt(password, salt) {
  return new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err)
      resolve(derivedKey.toString("hex"))
    })
  })
}

// Проверка пароля
async function verifyPasswordScrypt(password, salt, hash) {
  const newHash = await hashPasswordScrypt(password, salt)
  return newHash === hash
}

// Пример использования
async function example() {
  const password = "мой-секретный-пароль"

  // Хеширование пароля
  const hash = await hashPasswordScrypt(password, salt)
  console.log("Хеш пароля (scrypt):", hash)

  // Проверка правильного пароля
  const isValid = await verifyPasswordScrypt(password, salt, hash)
  console.log("Пароль верный:", isValid)

  // Проверка неправильного пароля
  const isInvalid = await verifyPasswordScrypt("неправильный-пароль", salt, hash)
  console.log("Неправильный пароль верный:", isInvalid)
}

example()
```

### PBKDF2

```javascript
const crypto = require("crypto")

// Хеширование пароля с использованием PBKDF2
function hashPasswordPbkdf2(password, salt, iterations = 100000) {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, iterations, 64, "sha512", (err, derivedKey) => {
      if (err) reject(err)
      resolve(derivedKey.toString("hex"))
    })
  })
}

// Пример использования
async function example() {
  const password = "мой-секретный-пароль"
  const salt = crypto.randomBytes(16)

  // Хеширование пароля
  const hash = await hashPasswordPbkdf2(password, salt)
  console.log("Хеш пароля (PBKDF2):", hash)
}

example()
```

## Случайные числа и буферы

```javascript
const crypto = require("crypto")

// Генерация криптографически стойких случайных чисел
const randomBytes = crypto.randomBytes(16)
console.log("Случайные байты:", randomBytes.toString("hex"))

// Генерация случайного числа в заданном диапазоне
function randomInt(min, max) {
  // Проверка аргументов
  if (min >= max) throw new Error("Максимальное значение должно быть больше минимального")

  const range = max - min
  if (range > 2 ** 32) throw new Error("Диапазон слишком большой")

  // Вычисление количества бит для представления диапазона
  const bitsNeeded = Math.ceil(Math.log2(range))
  const bytesNeeded = Math.ceil(bitsNeeded / 8)

  // Вычисление маски для отсечения лишних бит
  const mask = (1 << bitsNeeded) - 1

  let value
  do {
    const randomBytes = crypto.randomBytes(bytesNeeded)
    value = 0
    for (let i = 0; i < bytesNeeded; i++) {
      value |= randomBytes[i] << (8 * i)
    }
    value = value & mask
  } while (value >= range)

  return min + value
}

console.log("Случайное число от 1 до 100:", randomInt(1, 100))
```

## SSL/TLS и сертификаты

### Создание самоподписанного сертификата

```javascript
const crypto = require("crypto")
const fs = require("fs")

// Генерация RSA-ключей
const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2048,
})

// Создание самоподписанного сертификата
const cert = crypto.createCertificate()

// Установка субъекта сертификата
cert.setSubject([
  { name: "commonName", value: "example.com" },
  { name: "organizationName", value: "Example Corp" },
  { name: "organizationalUnitName", value: "IT Department" },
])

// Установка издателя (тот же, что и субъект для самоподписанного сертификата)
cert.setIssuer([
  { name: "commonName", value: "example.com" },
  { name: "organizationName", value: "Example Corp" },
  { name: "organizationalUnitName", value: "IT Department" },
])

// Установка срока действия
cert.setStartDate("2023-01-01T00:00:00Z")
cert.setEndDate("2024-01-01T00:00:00Z")

// Установка публичного ключа
cert.setPublicKey(publicKey)

// Подписание сертификата закрытым ключом
cert.sign(privateKey, "sha256")

// Экспорт сертификата и ключа в формате PEM
const certPem = cert.getPeerCertificate().raw.toString("base64")
const privateKeyPem = privateKey.export({ type: "pkcs8", format: "pem" })

// Сохранение в файлы
fs.writeFileSync("certificate.pem", certPem)
fs.writeFileSync("private-key.pem", privateKeyPem)
```

### Создание HTTPS сервера с TLS

```javascript
const https = require("https")
const fs = require("fs")

// Опции для HTTPS сервера
const options = {
  key: fs.readFileSync("private-key.pem"),
  cert: fs.readFileSync("certificate.pem"),
  // Можно добавить другие опции TLS
  ciphers: "ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384",
  minVersion: "TLSv1.2",
}

// Создание HTTPS сервера
https
  .createServer(options, (req, res) => {
    res.writeHead(200)
    res.end("Защищенный сервер работает!")
  })
  .listen(443, () => {
    console.log("HTTPS сервер запущен на порту 443")
  })
```

## Лучшие практики криптографической безопасности

1. **Используйте актуальные алгоритмы** - избегайте устаревших алгоритмов как MD5 и SHA-1.
2. **Храните ключи безопасно** - никогда не включайте криптографические ключи в исходный код.
3. **Используйте переменные окружения или сервисы управления секретами** для хранения ключей.
4. **Для хеширования паролей** используйте специальные алгоритмы (bcrypt, scrypt, PBKDF2) с достаточным количеством итераций.
5. **Всегда используйте соль** при хешировании паролей, чтобы предотвратить атаки по словарю.
6. **Применяйте правильное управление сертификатами и ключами** в продакшен-средах.
7. **Следите за уязвимостями в криптографических библиотеках** и обновляйте их.
8. **Проводите аудит безопасности** вашего криптографического кода.

Модуль `crypto` в Node.js предоставляет обширный набор инструментов для обеспечения безопасности данных и должен использоваться с пониманием основ криптографии.

---

[[Назад]]
