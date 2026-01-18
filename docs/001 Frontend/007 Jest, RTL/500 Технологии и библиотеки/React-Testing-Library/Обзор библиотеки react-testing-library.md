---
uid: OlmbJyK-yzdH5tkxXBU_6
title: Обзор библиотеки react-testing-library
tags:
  - "#React"
  - "#react-testing-library"
  - "#testing"
info:
  - "https://testing-library.com/docs/react-testing-library/intro/"
draft: false
technology: "Jest, RTL"
specialty: Frontend
tools: []
order: 0
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

## Общие сведения о библиотеке react-testing-library

Предположим, вы собираетесь писать тесты для компонентов React. Вы хотите, чтобы эти тесты было удобно поддерживать. Кроме того, вам надо, чтобы тесты не опирались на детали реализации компонентов и испытывали компоненты в условиях, приближённых к реальным сценариям их использования. Кроме того, вы стремитесь к тому, чтобы тесты оставались бы рабочими в долгосрочной перспективе, то есть, хотите, чтобы рефакторинг компонентов (то есть — изменение их реализации, но не функционала) не нарушал бы систему тестирования и не заставлял бы вас или вашу команду постоянно переписывать тесты, замедляя работу над проектом.

Что выбрать для достижения этих целей? В нашем случае ответом на эти вопросы стала библиотека `react-testing-library`, минималистичное решение, предназначенное для тестирования компонентов React.

![](https://habrastorage.org/getpro/habr/post_images/d23/07b/80c/d2307b80cdfb223a3f777cdcc75148bc.png)

_Логотип react-testing-library_

Эта библиотека даёт разработчику простые инструменты, построенные на базе `react-dom` и `react-dom/test-utild`, причём, библиотека устроена так, чтобы тот, кто пользуется ей, без особых проблем применял бы в своей работе передовые практики тестирования.

В основе `react-testing-library` лежит [следующий](https://twitter.com/kentcdodds/status/977018512689455106?ref_src=twsrc%5Etfw&ref_url=https%3A%2F%2Fblog.kentcdodds.com%2Fmedia%2Fa7c0bd4c78b2a36c7b9d996543a5d851%3FpostId%3De3a274307e65) принцип: чем больше процесс тестирования напоминает реальный сеанс работы с приложением — тем увереннее можно говорить о том, что, когда приложение попадёт в продакшн, оно будет работать так, как ожидается.

В результате вместо того, чтобы работать с экземплярами отрендеренных компонентов React, тесты будут взаимодействовать с реальными узлами DOM. Механизмы, предоставляемые библиотекой, выполняют обращения к DOM таким же образом, каким это бы делали пользователи проекта. Поиск элементов осуществляется по текстам их меток (так поступают и пользователи), поиск ссылок и кнопок так же происходит по их текстам (и это характерно для пользователей). Кроме того, здесь, в качестве «запасного выхода», есть возможность применять поиск элементов по `data-testid`. Это — распространённая практика, позволяющая работать с элементами, подписи которых не имеют смысла или непрактичны для данной цели.

Рассматриваемая библиотека способствует повышению доступности приложений, помогает приблизить тесты к реальным сценариям работы.

Библиотека `react-testing-library` является заменой для [enzyme](http://airbnb.io/enzyme/). Используя `enzyme`, можно следовать тем же принципам, которые заложены в рассматриваемой здесь библиотеке, но в этом случае их сложнее придерживаться из-за дополнительных средств, предоставляемых `enzyme` (то есть, всего того, что помогает в деталях реализации тестов). Подробности об этом можно почитать [здесь](https://github.com/kentcdodds/react-testing-library/blob/master/README.md#faq).

Кроме того, хотя `react-testing-library` предназначена для `react-dom`, она подходит и для React Native благодаря использованию этого небольшого [файла настроек](https://github.com/kentcdodds/react-testing-library/issues/22#issuecomment-376756260).

Сразу стоит сказать, о том, что эта библиотека не является средством для запуска тестов или фреймворком. Кроме того, она не привязана к некоему фреймворку для тестирования (хотя мы и рекомендуем #Jest, но это всего лишь инструмент, которым мы предпочитаем пользоваться, в целом же библиотека будет работать с любым фреймворком и даже в среде [CodeSandbox](https://codesandbox.io/s/5z6x4r7n0p)!).

## Практический пример

Рассмотрим следующий код, демонстрирующий практический пример работы с `react-testing-library`.

```tsx
import React from "react";
import { render, Simulate, wait } from "react-testing-library";
// Тут добавляется средство проверки ожиданий
import "react-testing-library/extend-expect";
// Mock-объект находится в директории __mocks__
import axiosMock from "axios";
import GreetingFetcher from "../greeting-fetcher";
test("displays greeting when clicking Load Greeting", async () => {
  // Этап Arrange
  axiosMock.get.mockImplementationOnce(({ name }) =>
    Promise.resolve({
      data: { greeting: `Hello ${name}` },
    }),
  );
  const { getByLabelText, getByText, getByTestId, container } = render(
    <GreetingFetcher />,
  ); // Этап Act
  getByLabelText("name").value = "Mary";
  Simulate.click(getByText("Load Greeting")); // Подождём разрешения mock-запроса `get`
  // Эта конструкция будет ждать до тех пор, пока коллбэк не выдаст ошибку
  await wait(() => getByTestId("greeting-text")); // Этап Assert
  expect(axiosMock.get).toHaveBeenCalledTimes(1);
  expect(axiosMock.get).toHaveBeenCalledWith(url); // собственный матчер!
  expect(getByTestId("greeting-text")).toHaveTextContent("Hello Mary"); // снэпшоты отлично работают с обычными узлами DOM!
  expect(container.firstChild).toMatchSnapshot();
});
```

Самое важное, что можно вынести из этого примера, заключается в том, что тесты напоминают работу с приложением реального пользователя.

Продолжим анализировать этот код.

`GreetingFletcher` может вывести некий HTML-код, например, такой:

```tsx
<div>
   <label for="name-input">Name</label>
   <input id="name-input" /> <button>Load Greeting</button>    <div data-testid="greeting-text"></div>
</div>
```

При работе с этими элементами ожидается следующая последовательность действий: задать имя, щёлкнуть по кнопке `Load Greeting`, что вызовет запрос к серверу для загрузки некоего текста, в котором использовано заданное имя.

В тесте понадобится найти поле `<input />`, в результате можно будет установить его параметр `value` в некое значение. Здравый смысл подсказывает, что тут можно использовать свойство `id` в CSS-селекторе: `#name-input`. Но так ли поступает пользователь для того, чтобы найти поле ввода? Определённо — не так! Пользователь смотрит на экран и находит поле с подписью `Name`, в которое он вводит данные. Поэтому именно так поступает наш тест с `getByLabelText`. Он обнаруживает элемент управления, основываясь на его метке.

Часто в тестах, созданных на основе `enzyme`, для поиска кнопки, например, с надписью `Load Greeting`, используется CSS-селектор или производится поиск по `displayName` конструктора компонента. Но когда пользователь хочет загрузить некий текст с сервера, он не думает о деталях реализации программы, вместо этого он ищет кнопку с надписью `Load Greetings` и щёлкает по ней. Именно это и делает наш тест с помощью вспомогательной функции `getByText`.

В дополнение к этому, конструкция `wait`, опять же, имитирует поведение пользователя. Тут организовано ожидание появления текста на экране. Система будет ждать столько, сколько нужно. В нашем тесте для этого используется mock-объект, поэтому вывод текста происходит практически мгновенно. Но наш тест не заботится о том, сколько времени это займёт. Нам не нужно использовать в тесте `setTimeout` или что-то подобное.

Мы просто сообщаем тесту: «Подожди появления узла greeting-text». Обратите внимание на то, что в данном случае используется атрибут `data-testid`, тот самый «запасной выход», применяемый в ситуациях, когда искать элементы, пользуясь каким-то другим механизмом, не имеет смысла. В подобных случаях `data-testid` [определённо лучше](https://blog.kentcdodds.com/making-your-ui-tests-resilient-to-change-d37a6ee37269), чем альтернативные методы.

## Общий обзор API

В самом начале библиотека давала разработчику лишь метод `queryByTestId`. Почитать об этом можно [здесь](https://blog.kentcdodds.com/making-your-ui-tests-resilient-to-change-d37a6ee37269). Однако, благодаря отклику на вышеупомянутую публикацию и этому фантастическому [выступлени](https://www.youtube.com/watch?v=qfnkDyHVJzs&feature=youtu.be&t=5h39m19s)ю, в библиотеку были добавлены дополнительные методы.

Подробности о библиотеке и о её API можно почитать в [официальной документации](https://github.com/kentcdodds/react-testing-library). Здесь же приведён общий обзор её возможностей.

- [Simulate](https://github.com/kentcdodds/react-testing-library/blob/fd2df8d18652786a95bce34741180137f9d2cef2/README.md#simulate) — реэкспорт из вспомогательного средства [Simulate](https://reactjs.org/docs/test-utils.html#simulate) `react-dom/test-utils`.
- [wait](https://github.com/kentcdodds/react-testing-library/blob/fd2df8d18652786a95bce34741180137f9d2cef2/README.md#wait) — позволяет организовать в тестах ожидание в течение неопределённого периода времени. Обычно следует применять mock-объекты для [запросов](https://github.com/kentcdodds/react-testing-library/blob/master/src/__tests__/fetch.js) к API или [анимаций](https://github.com/kentcdodds/react-testing-library/blob/master/src/__tests__/mock.react-transition-group.js), но даже при работе с немедленно разрешаемыми промисами, нужно, чтобы тесты ждали следующего тика цикла событий. Метод `wait` отлично для этого подходит. (Огромное спасибо Лукашу Гандецки, который [предложил](https://github.com/kentcdodds/react-testing-library/issues/21) это в качестве замены для API `flushPromises`, которое теперь считается устаревшим).
- [render](https://github.com/kentcdodds/react-testing-library/blob/fd2df8d18652786a95bce34741180137f9d2cef2/README.md#render): тут скрыта вся суть библиотеки. На самом деле, это — довольно простая функция. Она создаёт элемент `div` с помощью `document.createElement`, затем использует `ReactDOM.render` для вывода данных в этот `div`.

Функция `render` возвращает следующие объекты и вспомогательные функции:

- [container](https://github.com/kentcdodds/react-testing-library/blob/fd2df8d18652786a95bce34741180137f9d2cef2/README.md#container): элемент `div`, в который был выведен компонент.
- [unmount](https://github.com/kentcdodds/react-testing-library/blob/fd2df8d18652786a95bce34741180137f9d2cef2/README.md#unmount): простая обёртка вокруг `ReactDOM.unmountComponentAtNode` для размонтирования компонента (например, для упрощения тестирования `componentWillUnmount`).
- [getByLabelText](https://github.com/kentcdodds/react-testing-library/blob/fd2df8d18652786a95bce34741180137f9d2cef2/README.md#getbylabeltexttext-textmatch-options-selector-string---htmlelement): получает элемент управления формы, основываясь на его метке.
- [getByPlaceholderText](https://github.com/kentcdodds/react-testing-library/blob/fd2df8d18652786a95bce34741180137f9d2cef2/README.md#getbyplaceholdertexttext-textmatch-htmlelement): плейсхолдеры — это не слишком хорошие альтернативы меткам, но если это имеет смысл в конкретной ситуации, можно воспользоваться и ими.
- [getByText](https://github.com/kentcdodds/react-testing-library/blob/fd2df8d18652786a95bce34741180137f9d2cef2/README.md#getbytexttext-textmatch-htmlelement): получает элемент по его текстовому содержимому.
- [getByAltText](https://github.com/kentcdodds/react-testing-library/blob/fd2df8d18652786a95bce34741180137f9d2cef2/README.md#getbyalttexttext-textmatch-htmlelement): получает элемент (вроде ) по значению его атрибута `alt`.
- [getByTestId](https://github.com/kentcdodds/react-testing-library/blob/fd2df8d18652786a95bce34741180137f9d2cef2/README.md#getbytestidtext-textmatch-htmlelement): получает элемент по его атрибуту `data-testid`.

Каждый из этих вспомогательных get-методов выводит информативное сообщение об ошибке если элемент найти не удаётся. Кроме того, тут имеется и набор аналогичных query-методов (вроде `queryByText`). Они, вместо выдачи ошибки при отсутствии элемента, возвращают `null`, что может быть полезно в случае, если нужно проверить DOM на отсутствие элемента.

Кроме того, этим методам, для поиска нужного элемента, можно передавать следующее:

- Нечувствительную к регистру строку: например, `lo world` будет соответствовать `Hello World`.
- Регулярное выражение: например, `/^Hello World$/` будет соответствовать `Hello World`.
- Функцию, которая принимает текст и элемент: например, использование функции `(text, el) => el.tagName === 'SPAN' && text.startsWith('Hello')` приведёт к выбору элемента `span`, текстовое содержимое которого начинается с `Hello`.

Надо отметить, что благодаря [Энто Райену](https://github.com/antoaravinth) в библиотеке имеются собственные матчеры для Jest.

- [toBeInTheDOM](https://github.com/kentcdodds/react-testing-library/blob/fd2df8d18652786a95bce34741180137f9d2cef2/README.md#tobeinthedom): проверяет, присутствует ли элемент в DOM.
- [toHaveTextContent](https://github.com/kentcdodds/react-testing-library/blob/fd2df8d18652786a95bce34741180137f9d2cef2/README.md#tohavetextcontent): проверяет, имеется ли в заданном элементе текстовое содержимое.

## Итоги

Основная особенность библиотеки `react-testing-library` заключается в том, что у неё нет вспомогательных методов, которые позволяют тестировать детали реализации компонентов.
Она направлена на разработку тестов, которые способствуют применению передовых практик в области тестирования и разработки ПО.
Надеемся, библиотека [react-testing-library](https://github.com/kentcdodds/react-testing-library) вам пригодится.
