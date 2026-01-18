---
uid: RdPdIgAy-oi80Ax2RbMu6
title: Как создавать высокопроизводительные CSS-анимации
tags: []
draft: false
technology: JSCore
specialty: Frontend
tools: []
order: 0
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

В этом руководстве вы узнаете, как создавать высокопроизводительные CSS-анимации.

Смотрите, [почему некоторые анимации медленные?](https://web.dev/animations-overview/)изучить теорию, лежащую в основе этих рекомендаций. [[Почему некоторые анимации медленные]]

## Совместимость с браузером [#](https://web.dev/animations-guide/#browser-compatibility)

Все свойства CSS, рекомендуемые в этом руководстве, имеют хорошую кроссбраузерную поддержку.

- [`transform`](https://developer.mozilla.org/docs/Web/CSS/transform#Browser_compatibility)
- [`opacity`](https://developer.mozilla.org/docs/Web/CSS/opacity#Browser_compatibility)
- [`will-change`](https://developer.mozilla.org/docs/Web/CSS/will-change#Browser_compatibility)

## Переместить элемент [#](https://web.dev/animations-guide/#move)

Чтобы переместить элемент, используйте `translate``rotation` значения ключевого слова или [`transform`](https://developer.mozilla.org/docs/Web/CSS/transform)для свойства.

Например, чтобы переместить элемент в поле зрения, используйте `translate`.

```css
.animate {
  animation: slide-in 0.7s both;
}
@keyframes slide-in {
  0% {
    transform: translateY(-1000px);
  }
  100% {
    transform: translateY(0);
  }
}
```

Элементы также можно поворачивать, в примере ниже на 360 градусов.

```css
.animate {
  animation: rotate 0.7s ease-in-out both;
}
@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
```

## Изменение размера элемента [#](https://web.dev/animations-guide/#resize)

Чтобы изменить размер элемента, используйте `scale` ключевое слово value [`transform`](https://developer.mozilla.org/docs/Web/CSS/transform)свойства.

```css
.animate {
  animation: scale 1.5s both;
}
@keyframes scale {
  50% {
    transform: scale(0.5);
  }
  100% {
    transform: scale(1);
  }
}
```

## Изменение видимости элемента [#](https://web.dev/animations-guide/#visibility)

Чтобы показать или скрыть элемент, используйте [`opacity`](https://developer.mozilla.org/docs/Web/CSS/opacity).

```css
.animate {
  animation: opacity 2.5s both;
}
@keyframes opacity {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
```

Найдите примеры копирования и вставки различных анимаций в [Animista](https://animista.net/).

## Избегайте свойств, которые запускают layout или paint [#](https://web.dev/animations-guide/#triggers)

Прежде чем использовать какое-либо свойство CSS для анимации (кроме `transform` и `opacity`), определите влияние этого свойства на [конвейер рендеринга](https://web.dev/animations-overview/#pipeline). Избегайте любых свойств, которые запускают layout или paint, если в этом нет крайней необходимости.

**Предупреждение**

Если вам необходимо использовать свойство, которое запускает layout или paint, маловероятно, что вы сможете сделать анимацию плавной и высокопроизводительной.

## Принудительное создание слоя [#](https://web.dev/animations-guide/#force)

Как объясняется в разделе "[Почему некоторые анимации медленные?](https://web.dev/animations-overview)", помещая элементы на новый слой, их можно перекрасить, не требуя перекраски остальной части макета.

Браузеры часто принимают правильные решения о том, какие элементы следует разместить на новом слое, но вы можете вручную принудительно создать слой с помощью этого [`will-change`](https://developer.mozilla.org/docs/Web/CSS/will-change)свойства. Как следует из названия, это свойство сообщает браузеру, что этот элемент будет каким-то образом изменен.

**Внимание**

Поскольку создание слоя может вызвать другие проблемы с производительностью, это свойство не следует использовать в качестве преждевременной оптимизации. Вместо этого вы должны использовать его только тогда, когда видите jank и думаете, что продвижение элемента на новый слой может помочь.

В CSS это свойство может быть применено к любому селектору:

```css
body > .sidebar {
  will-change: transform;
}
```

Однако [спецификация](https://drafts.csswg.org/css-will-change/) предполагает, что этот подход следует применять только к элементам, которые всегда могут измениться. Если бы приведенный выше пример представлял собой боковую панель, в которую пользователь мог бы входить и выходить, это могло бы иметь место. Некоторые элементы на вашей странице могут меняться нечасто, и поэтому было бы лучше применить `will-change`использование JavaScript в тот момент, когда становится вероятным, что изменение произойдет. Вам нужно будет убедиться, что у браузера достаточно времени для выполнения необходимых оптимизаций, а затем удалить свойство, как только изменение прекратится.

Для получения дополнительной информации и примеров правильного использования `will-change`прочитайте [Все, что вам нужно знать о свойстве CSS`will-change`](https://dev.opera.com/articles/css-will-change-property/).

Если вам нужен способ принудительного создания слоя в одном из редких браузеров, который не поддерживается `will-change`(на данный момент, скорее всего, Internet Explorer), вы можете установить `transform: translateZ(0)`.

## Отлаживать медленные или неаккуратные анимации [#](https://web.dev/animations-guide/#debug)

В Chrome DevTools и Firefox DevTools есть множество инструментов, которые помогут вам выяснить, почему ваши анимации медленные или неуклюжие.

### Проверьте, запускает ли анимация макет [#](https://web.dev/animations-guide/#layout)

Анимация, которая перемещает элемент, используя что-то другое, чем`transform`, вероятно, будет медленной. В следующем примере я добился того же визуального результата, анимируя `top`и `left`, и используя `transform`.

Не

```css
.box {
  position: absolute;
  top: 10px;
  left: 10px;
  animation: move 3s ease infinite;
}
@keyframes move {
  50% {
    top: calc(90vh - 160px);
    left: calc(90vw - 200px);
  }
}
```

Делать

```css
.box {
  position: absolute;
  top: 10px;
  left: 10px;
  animation: move 3s ease infinite;
}
@keyframes move {
  50% {
    transform: translate(calc(90vw - 200px), calc(90vh - 160px));
  }
}
```

Вы можете проверить это в следующих двух примерах сбоев и изучить производительность с помощью DevTools.

- [Перед](https://glitch.com/~animation-with-top-left).
- [После](https://glitch.com/~animation-with-transform).

#### Chrome DevTools [#](https://web.dev/animations-guide/#layout-chrome)

1.  Откройте панель **производительности**.
2.  [Записывайте производительность во время выполнения](https://developer.chrome.com/docs/devtools/evaluate-performance/reference/#record-runtime) во время выполнения анимации.
3.  Просмотрите вкладку **Сводка**.

Если вы видите ненулевое значение для **рендеринга** на вкладке **Сводка**, это может означать, что ваша анимация заставляет браузер выполнять работу с макетом.

![Сводная панель показывает 37 мс для рендеринга и 79 мс для рисования.](https://web-dev.imgix.net/image/admin/cMNQR2jBEwa6ku5POXtZ.jpg?auto=format)

Пример [анимации с верхним левым](https://animation-with-top-left.glitch.me/) углом вызывает работу рендеринга.

![На панели "Сводка" отображаются нулевые значения для рендеринга и рисования.](https://web-dev.imgix.net/image/admin/3bn44P9h6lR93uBNRXY3.jpg?auto=format)

Пример [анимации с преобразованием](https://animation-with-transform.glitch.me/) не вызывает работы по рендерингу.

#### Firefox DevTools [#](https://web.dev/animations-guide/#layout-firefox)

В Firefox DevTools [водопад](https://developer.mozilla.org/docs/Tools/Performance/Waterfall) может помочь вам понять, на что браузер тратит время.

1.  Откройте панель **производительности**.
2.  На панели Начните записывать представление во время выполнения анимации.
3.  Остановите запись и проверьте вкладку **Водопад**.

Если вы видите записи для [**стиля пересчета**](https://developer.mozilla.org/docs/Tools/Performance/Scenarios/Animating_CSS_properties), то браузеру приходится начинать с начала [каскада рендеринга](https://developer.mozilla.org/docs/Tools/Performance/Scenarios/Animating_CSS_properties).

### Проверьте, не отбрасывает ли анимация кадры [#](https://web.dev/animations-guide/#fps)

1.  Откройте вкладку [**рендеринга**](https://developer.chrome.com/docs/devtools/evaluate-performance/reference/#rendering) Chrome DevTools.
2.  Установите флажок **FPS meter** (Счетчик кадров в секунду).
3.  Следите за значениями во время выполнения анимации.

В верхней части пользовательского интерфейса **FPS meter** вы видите **рамки** ярлыков. Ниже вы видите значение в соответствии со строками `50% 1 (938 m) dropped of 1878`. Высокопроизводительная анимация будет иметь высокий процент, например `99%`. Высокий процент означает, что пропущено несколько кадров и анимация будет выглядеть плавной.

![Счетчик кадров в секунду показывает, что было удалено 50% кадров](https://web-dev.imgix.net/image/admin/i9Cg7nswyO7jB768kpdQ.jpg?auto=format)

Пример [анимации с верхним левым](https://animation-with-top-left.glitch.me/) углом приводит к удалению 50% кадров

![Счетчик кадров в секунду показывает, что был удален только 1% кадров](https://web-dev.imgix.net/image/admin/FGROZ0i15tCAoiIOoEdG.jpg?auto=format)

Пример [анимации с преобразованием](https://animation-with-transform.glitch.me/) приводит к удалению только 1% кадров.

### Проверьте, вызывает ли анимация рисование [#](https://web.dev/animations-guide/#paint)

Когда дело доходит до рисования, некоторые вещи стоят дороже, чем другие. Например, все, что связано с размытием (например, тень), будет рисовать дольше, чем рисование красного прямоугольника. Однако с точки зрения CSS это не всегда очевидно: `background: red;`и `box-shadow: 0, 4px, 4px, rgba(0,0,0,0.5);`не обязательно выглядит так, будто они имеют совершенно разные характеристики производительности, но это так.

Browser DevTools can help you to identify which areas need to be repainted, and performance issues related to painting.

#### Chrome DevTools [#](https://web.dev/animations-guide/#paint-chrome)

1.  Open the [**Rendering** tab](https://developer.chrome.com/docs/devtools/evaluate-performance/reference/#rendering) of Chrome DevTools.
2.  Select **Paint Flashing**.
3.  Move the pointer around the screen.

![Элемент пользовательского интерфейса, выделенный зеленым для демонстрации, будет перерисован](https://web-dev.imgix.net/image/admin/MzAeQc5PvCltcm3gWaNV.jpg?auto=format)

В этом примере из Google Maps вы можете увидеть элементы, которые будут перерисованы.

Если вы видите, что весь экран мигает или выделены области, которые, по вашему мнению, не должны меняться, тогда вы можете провести некоторое расследование.

Если вам нужно разобраться, вызывает ли конкретное свойство проблемы с производительностью из-за рисования, [профилировщик рисования](https://developer.chrome.com/docs/devtools/evaluate-performance/reference/#paint-profiler) в Chrome DevTools может помочь.

#### Firefox DevTools [#](https://web.dev/animations-guide/#paint-firefox)

1.  Откройте **Настройки** и добавьте кнопку Toolbox для [переключения мигания paint](https://developer.mozilla.org/docs/Tools/Paint_Flashing_Tool).
2.  На странице, которую вы хотите просмотреть, включите кнопку и переместите мышь или прокрутите, чтобы увидеть выделенные области.

## Заключение [#](https://web.dev/animations-guide/#conclusion)

По возможности ограничивайте анимацию `opacity`и `transform`для того, чтобы сохранить анимацию на этапе компоновки пути рендеринга. Используйте DevTools, чтобы проверить, на какой этап пути влияет ваша анимация.

Используйте профилировщик рисования, чтобы узнать, являются ли какие-либо операции рисования особенно дорогостоящими. Если вы что-нибудь найдете, посмотрите, будет ли другое свойство CSS выглядеть так же с лучшей производительностью.

Используйте `will-change`свойство экономно и только в том случае, если вы столкнулись с проблемой производительности.
