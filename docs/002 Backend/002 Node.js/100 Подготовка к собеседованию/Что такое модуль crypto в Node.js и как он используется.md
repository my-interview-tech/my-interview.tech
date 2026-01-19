---
title: Что такое модуль crypto в Node.js и как он используется
draft: false
tags:
  - "#NodeJS"
  - "#crypto"
  - "#безопасность"
  - "#шифрование"
  - "#хеширование"
info:
  - "[Документация Node.js - Crypto](https://nodejs.org/api/crypto.html)"
  - "[OWASP - Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)"
---

![[node-crypto.png|600]]

## Что такое модуль crypto в Node.js

`crypto` - это встроенный модуль Node.js, который предоставляет криптографические функции для обеспечения безопасности данных. Он включает в себя набор методов для хеширования, шифрования/дешифрования данных, создания цифровых подписей и управления сертификатами.

## Основные возможности модуля crypto

1. **Хеширование данных** - создание хешей для проверки целостности данных и безопасного хранения паролей
2. **Шифрование и дешифрование** - как симметричное, так и асимметричное
3. **Создание цифровых подписей** - для подтверждения подлинности данных
4. **Работа с сертификатами** - создание и управление SSL/TLS сертификатами
5. **Генерация криптографически стойких случайных чисел** - для ключей, токенов и паролей

## Хеширование данных

Хеширование используется для проверки целостности данных и безопасного хранения паролей.

```javascript
const crypto = require("crypto")

// Создание хеша с использованием алгоритма SHA-256
function createHash(data) {
  const hash = crypto.createHash("sha256")
  hash.update(data)
  return hash.digest("hex") // формат вывода: hex, base64, binary
}

// Пример использования
const hash = createHash("мой-пароль")
console.log(hash) // 128-символьная строка с хешем
```

## Симметричное шифрование

При симметричном шифровании один и тот же ключ используется как для шифрования, так и для дешифрования.

```javascript
const crypto = require("crypto")

// Функция шифрования
function encrypt(text, key) {
  // Генерация случайного вектора инициализации
  const iv = crypto.randomBytes(16)

  // Создание шифратора
  const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(key), iv)

  // Шифрование данных
  let encrypted = cipher.update(text, "utf8", "hex")
  encrypted += cipher.final("hex")

  // Возвращаем IV + зашифрованные данные
  return iv.toString("hex") + ":" + encrypted
}

// Функция дешифрования
function decrypt(encryptedText, key) {
  // Разделение IV и зашифрованных данных
  const parts = encryptedText.split(":")
  const iv = Buffer.from(parts[0], "hex")
  const encrypted = parts[1]

  // Создание дешифратора
  const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(key), iv)

  // Дешифрование данных
  let decrypted = decipher.update(encrypted, "hex", "utf8")
  decrypted += decipher.final("utf8")

  return decrypted
}

// Пример использования
const key = crypto.scryptSync("секретный-пароль", "соль", 32) // 32 байта для AES-256
const message = "Секретное сообщение"

const encryptedMessage = encrypt(message, key)
console.log("Зашифровано:", encryptedMessage)

const decryptedMessage = decrypt(encryptedMessage, key)
console.log("Расшифровано:", decryptedMessage) // "Секретное сообщение"
```

## Асимметричное шифрование (RSA)

В асимметричном шифровании используются два разных ключа: публичный (для шифрования) и приватный (для дешифрования).

```javascript
const crypto = require("crypto")

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

// Шифрование публичным ключом
function encryptWithPublicKey(text, pubKey) {
  const buffer = Buffer.from(text, "utf8")
  const encrypted = crypto.publicEncrypt(pubKey, buffer)
  return encrypted.toString("base64")
}

// Дешифрование приватным ключом
function decryptWithPrivateKey(encrypted, privKey) {
  const buffer = Buffer.from(encrypted, "base64")
  const decrypted = crypto.privateDecrypt(privKey, buffer)
  return decrypted.toString("utf8")
}

// Пример использования
const message = "Конфиденциальные данные"
const encrypted = encryptWithPublicKey(message, publicKey)
console.log("Зашифровано RSA:", encrypted)

const decrypted = decryptWithPrivateKey(encrypted, privateKey)
console.log("Расшифровано RSA:", decrypted) // "Конфиденциальные данные"
```

## Безопасное хранение паролей

Для хранения паролей рекомендуется использовать специальные алгоритмы, такие как scrypt, bcrypt или PBKDF2.

```javascript
const crypto = require("crypto")

// Хеширование пароля с использованием scrypt
function hashPassword(password) {
  // Генерация случайной соли
  const salt = crypto.randomBytes(16).toString("hex")

  // Хеширование пароля с солью
  const hash = crypto.scryptSync(password, salt, 64).toString("hex")

  // Возвращаем соль и хеш для хранения
  return `${salt}:${hash}`
}

// Проверка пароля
function verifyPassword(password, hashedPassword) {
  // Разделение соли и хеша
  const [salt, hash] = hashedPassword.split(":")

  // Хеширование введенного пароля с той же солью
  const hashVerify = crypto.scryptSync(password, salt, 64).toString("hex")

  // Сравнение хешей
  return hash === hashVerify
}

// Пример использования
const password = "сложный-пароль-123"
const hashedPassword = hashPassword(password)
console.log("Хешированный пароль:", hashedPassword)

// Проверка правильного пароля
console.log("Проверка правильного пароля:", verifyPassword(password, hashedPassword)) // true

// Проверка неправильного пароля
console.log("Проверка неправильного пароля:", verifyPassword("неправильный", hashedPassword)) // false
```

## Цифровые подписи

Цифровые подписи используются для подтверждения подлинности и целостности данных.

```javascript
const crypto = require("crypto")

// Создание цифровой подписи
function signData(data, privateKey) {
  const sign = crypto.createSign("SHA256")
  sign.update(data)
  return sign.sign(privateKey, "base64")
}

// Проверка цифровой подписи
function verifySignature(data, signature, publicKey) {
  const verify = crypto.createVerify("SHA256")
  verify.update(data)
  return verify.verify(publicKey, signature, "base64")
}

// Пример использования
// Используем ранее сгенерированные ключи RSA
const dataToSign = "Важный документ"
const signature = signData(dataToSign, privateKey)
console.log("Цифровая подпись:", signature)

// Проверка подписи
const isValid = verifySignature(dataToSign, signature, publicKey)
console.log("Подпись действительна:", isValid) // true

// Проверка подписи с изменёнными данными
const isValidTampered = verifySignature(dataToSign + " (изменено)", signature, publicKey)
console.log("Изменённая подпись действительна:", isValidTampered) // false
```

## Генерация случайных чисел

```javascript
const crypto = require("crypto")

// Генерация криптографически стойких случайных байтов
const randomBytes = crypto.randomBytes(16)
console.log("Случайные байты (hex):", randomBytes.toString("hex"))

// Генерация случайного токена для сессии
function generateToken(length = 32) {
  return crypto.randomBytes(length).toString("hex")
}

const sessionToken = generateToken()
console.log("Токен сессии:", sessionToken)
```

## Практические советы по использованию модуля crypto

1. **Для паролей всегда используйте соль** - это защищает от атак с помощью радужных таблиц и словарей
2. **Избегайте устаревших алгоритмов** - не используйте MD5 и SHA-1 для безопасности
3. **Никогда не храните ключи в коде** - используйте переменные окружения или системы управления секретами
4. **Используйте HTTPS для передачи данных** - даже зашифрованные данные лучше передавать по защищенному каналу
5. **Соблюдайте рекомендации по длине ключей** - для RSA минимум 2048 бит, для AES предпочтительно 256 бит
6. **Регулярно обновляйте криптографические библиотеки** - чтобы защититься от новых уязвимостей

---

[[002 Node.js|Назад]]
