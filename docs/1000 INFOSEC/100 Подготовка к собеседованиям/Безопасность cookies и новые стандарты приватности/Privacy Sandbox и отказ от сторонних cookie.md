---
title: Privacy Sandbox и отказ от сторонних cookie
draft: true
tags:
  - infosec
  - Cookie
info:
---

Google и другие компании работают над инициативой Privacy Sandbox, которая предлагает альтернативы сторонним cookie для повышения приватности пользователей. Это важный шаг в сторону безопасности веб-адресов и персональных данных.

**Ключевые компоненты Privacy Sandbox:**

- FLoC (Federated Learning of Cohorts) – заменен на Topics API
- FLEDGE – для ретаргетинга без сторонних cookie
- Trust Tokens – для борьбы с мошенничеством без отслеживания

**Пример использования API Trust Token:**

```javascript
// Запрос на выдачу токена доверия
document.hasTrustToken("https://issuer.example").then((hasToken) => {
  if (hasToken) {
    // Использование токена для подтверждения легитимности
    fetch("https://website.example/resource", {
      trustToken: {
        type: "send-redemption-record",
        issuer: "https://issuer.example",
      },
    })
  }
})
```

___

