---
title: Объясните назначение параметров `publicRuntimeConfig()` и `serverRuntimeConfig()` в Next.js? Чем они отличаются от обычных переменных среды?
draft: false
tags:
  - NextJS
  - publicRuntimeConfig
  - serverRuntimeConfig
info:
  - https://nextjs.org/docs/pages/api-reference/next-config-js/runtime-configuration
---
В Next.js параметры publicRuntimeConfig и serverRuntimeConfig используются для настройки приложения, но они отличаются по доступности и назначению от обычных переменных среды. Давайте рассмотрим каждый из них подробнее:

***publicRuntimeConfig***

**Назначение:** Хранит конфигурационные значения, которые доступны как на серверной, так и на клиентской стороне. Это идеально для настроек, таких как API endpoints, базовые URL-адреса или информацию о теме.

**Доступность:** Значения сериализуются в скомпилированный JavaScript-бандл во время серверного рендеринга. Это означает, что они легко доступны в любом компоненте на клиентской стороне.

Пример использования:

```javascript
// next.config.js
module.exports = {
  publicRuntimeConfig: {
    API_URL: process.env.API_URL,
    THEME: 'light',
  },
};
```

```javascript
// В компоненте
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
console.log(publicRuntimeConfig.API_URL);
```

***serverRuntimeConfig***

**Назначение:** Хранит конфигурационные значения, которые доступны только на серверной стороне. Это идеально для хранения чувствительной информации, так как она никогда не будет доступна клиенту.

**Доступность:** Значения доступны только в серверном коде и не передаются клиенту.

Пример использования:

```javascript
// next.config.js
module.exports = {
  serverRuntimeConfig: {
    SECRET_KEY: process.env.SECRET_KEY,
  },
};
```

```javascript
// В серверном коде
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();
console.log(serverRuntimeConfig.SECRET_KEY);
```

***Отличия от переменных среды***

**Переменные среды:** Устанавливаются на уровне системы или развертывания и доступны во время выполнения как на серверной, так и на клиентской стороне. Они могут быть доступны через process.env.

**publicRuntimeConfig:** Предоставляет контролируемый доступ к конфигурационным значениям на клиентской стороне без необходимости использования переменных среды.

**serverRuntimeConfig:** Предоставляет способ хранения чувствительных данных, которые никогда не будут доступны клиенту, что делает их более безопасными по сравнению с переменными среды, которые могут быть доступны на клиентской стороне, если они не имеют префикса NEXT_PUBLIC_.

Использование publicRuntimeConfig и serverRuntimeConfig позволяет более гибко управлять конфигурацией приложения, обеспечивая безопасность и удобство доступа к различным настройкам.

____

[[006 Next.js|Назад]]