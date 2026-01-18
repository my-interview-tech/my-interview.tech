---
uid: egQ6d4UBHRZJNHXdK4Llb
title: Что такое свойство `valueAsNumber`?
tags:
  - "#HTML"
  - "#valueAsNumber"
info: []
draft: false
technology: HTML
specialty: Frontend
tools: []
order: 52
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

![[Pasted image 20230704021651.png|600]]

Свойство `valueAsNumber` является свойством элемента формы в HTML5 и представляет числовое значение введенного пользователем в поле формы типа "number".

При использовании свойства `value` для получения значения элемента формы типа "number" возвращается строковое значение, которое содержит введенное пользователем число. Однако свойство `valueAsNumber` преобразует эту строку в числовое значение. Если пользователь ввел некорректное значение, то свойство `valueAsNumber` вернет значение `NaN` (Not a Number).

Свойство `valueAsNumber` может быть использовано для получения числового значения из поля формы типа "number" и использования его в JavaScript для выполнения вычислений или других операций, которые требуют числовых значений.

Например, следующий код использует свойство `valueAsNumber` для получения числовых значений из двух полей формы типа "number" и вычисления их суммы:

```html
<form>
  <label for="num1">Number 1:</label>
  <input type="number" id="num1" />

  <label for="num2">Number 2:</label>
  <input type="number" id="num2" />

  <button onclick="sum()">Calculate Sum</button>
</form>

<script>
  function sum() {
    var num1 = document.getElementById("num1").valueAsNumber;
    var num2 = document.getElementById("num2").valueAsNumber;

    var result = num1 + num2;
    alert("The sum is: " + result);
  }
</script>
```

В этом примере, при нажатии на кнопку "Calculate Sum", значения из полей ввода "num1" и "num2" преобразуются в числовые значения с помощью свойства `valueAsNumber`, и затем складываются, а результат выводится в диалоговом окне.

---

[[001 HTML|Назад]]
