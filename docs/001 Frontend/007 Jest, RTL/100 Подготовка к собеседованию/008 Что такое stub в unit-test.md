---
uid: anMTCx9W32G_00PGGpMBp
title: Что такое stub в unit-test?
tags:
  - "#testing"
  - "#unit-test"
  - "#unit-stub"
info:
  - "https://blog.pragmatists.com/test-doubles-fakes-mocks-and-stubs-1a7491dfa3da"
draft: false
technology: "Jest, RTL"
specialty: Frontend
tools: []
order: 8
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

В unit-тестировании `Stub` (англ. "заглушка") - это объект, который _заменяет реальный объект, но не имитирует его полностью, а предоставляет только минимальный набор функций_, необходимых для тестирования. `Stub` обычно используется, когда необходимо создать объект, который зависит от других компонентов, но эти компоненты еще не готовы или не доступны на момент тестирования.

`Stub` может предоставлять фиктивные данные для тестирования, а также имитировать поведение реального объекта. Однако он не предоставляет полную функциональность реального объекта, а только те методы, которые необходимы для тестирования.

`Stub` может быть реализован как самостоятельный класс или как часть другого класса. Он может быть создан вручную или с помощью специальных инструментов.

Использование Stub в unit-тестировании позволяет изолировать тестируемый объект от внешних зависимостей и контролировать его поведение в тестовых условиях. Это позволяет улучшить качество и надежность программного обеспечения, а также ускорить процесс тестирования.

**Пример**

Представим, что у нас есть функциональный компонент `OrderProcessor`, который зависит от сервиса `PaymentService` для обработки платежей. Сервис `PaymentService` имеет метод `processPayment`, который принимает на вход сумму платежа и возвращает результат обработки платежа. Для тестирования этого компонента нам нужно изолировать его от зависимости от `PaymentService`.

Мы можем создать Stub объект `PaymentServiceStub`, который будет имитировать работу реального объекта, но будет возвращать фиктивный результат.

```jsx
const PaymentServiceStub = {
  processPayment: (amount) => true,
};
```

Затем мы можем создать функциональный компонент `OrderProcessor`, который будет использовать этот Stub сервис.

```jsx
import React, { useState } from "react";

const OrderProcessor = ({ amount, paymentService }) => {
  const [paymentResult, setPaymentResult] = useState(null);

  const handleProcessOrder = async () => {
    const result = await paymentService.processPayment(amount);
    setPaymentResult(result);
  };

  return (
    <div>
      <button onClick={handleProcessOrder}>Process Order</button>
      {paymentResult !== null && (
        <div>Payment Result: {paymentResult ? "Success" : "Failure"}</div>
      )}
    </div>
  );
};
```

Теперь мы можем протестировать компонент `OrderProcessor` с использованием Stub сервиса `PaymentServiceStub`.

```jsx
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

test("processes order and shows success message", () => {
  render(<OrderProcessor amount={100} paymentService={PaymentServiceStub} />);
  const processButton = screen.getByText(/Process Order/i);

  fireEvent.click(processButton);
  const paymentResultElement = screen.getByText(/Payment Result: Success/i);

  expect(paymentResultElement).toBeInTheDocument();
});
```

Таким образом, использование Stub объекта позволяет нам изолировать тестируемый компонент от внешних зависимостей и контролировать его поведение в тестовых условиях.

---

[[007 Jest, RTL|Назад]]
