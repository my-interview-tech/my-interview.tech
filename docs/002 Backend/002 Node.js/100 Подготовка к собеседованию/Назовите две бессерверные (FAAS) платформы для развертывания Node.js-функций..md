---
title: Назовите две бессерверные (FAAS) платформы для развертывания Node.js-функций
draft: false
tags:
  - "#NodeJS"
  - "#FAAS"
  - "#серверлесс"
  - "#AWS-Lambda"
  - "#Google-Cloud-Functions"
  - "#облачные-сервисы"
info:
  - "[Документация AWS Lambda по Node.js](https://docs.aws.amazon.com/lambda/latest/dg/nodejs-handler.html)"
  - "[Документация Google Cloud Functions](https://cloud.google.com/functions/docs/concepts/nodejs-runtime)"
  - "[Сравнение бессерверных платформ](https://www.serverless.com/blog/serverless-faas-vs-containers)"
---

Вот две популярные бессерверные (FAAS) платформы для развертывания **Node.js**-функций:

### 1. **AWS Lambda**

- **Описание**: AWS Lambda — это серверless-платформа от Amazon Web Services, которая позволяет запускать Node.js-функции (и функции на других языках) без необходимости управлять серверами. Вы просто пишете функции, и Lambda автоматически масштабирует их в зависимости от нагрузки.
- **Особенности**:
  - Оплата только за фактическое время выполнения.
  - Легко интегрируется с другими сервисами AWS.
  - Поддержка Node.js и других популярных языков.
- **Сайт**: [https://aws.amazon.com/lambda](https://aws.amazon.com/lambda)

### 2. **Google Cloud Functions**

- **Описание**: Google Cloud Functions — это бессерверная вычислительная платформа от Google для развертывания и выполнения Node.js-функций (и других языков). Функции автоматически масштабируются и запускаются по событиям.
- **Особенности**:
  - Интеграция с другими сервисами Google Cloud.
  - Оплата только за время работы функции.
  - Простота настройки и развертывания.
- **Сайт**: [https://cloud.google.com/functions](https://cloud.google.com/functions)

Обе платформы позволяют легко развернуть и масштабировать Node.js-функции, полностью избавляя от необходимости управлять серверной инфраструктурой.

---

[[002 Node.js|Назад]]
