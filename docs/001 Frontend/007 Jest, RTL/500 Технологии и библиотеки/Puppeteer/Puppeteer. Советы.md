---
uid: L_5ktnKkPJgu725-piiqb
title: Puppeteer. Советы
tags:
  - "#pupperteer"
  - "#testing"
info: []
draft: false
technology: "Jest, RTL"
specialty: Frontend
tools: []
order: 0
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

Каждый раз, когда я пишу тесты, они помогают обнаружить баги.
Но у тестирования есть и другие плюсы.

Один из них — обнаружение подводных камней.
Подготовка тест-кейсов позволяет сложить в голове целостную картину бизнес-логики и того, как она должна работать. Тесты заставляют еще раз всё обдумать, и, быть может, это-то и спасет вас от неожиданных проблем на проде.

Кроме того, хорошие тесты — это вторая документация (а если ее нет, то единственная). По ним можно понять, какое поведение *ожидается* от кода, а не как оно достигнуто. Поэтому не стоит усложнять тесты и нагромождать их `utils`-функциями (а тем более писать тесты на тесты).

И конечно же, не стоит забывать, что тесты — это весело! Для их написания используется множество библиотек, и у каждой из них своя специфика, так что в процессе подготовки тестов возникает не меньше интересных задач.

## Тестирование с использованием Puppeteer

Так как это не туториал, а набор советов по решению проблем, с которыми я столкнулся, здесь не будет информации, как установить нужные библиотеки и начать работу. С этим вам поможет справиться [репозиторий Puppeteer](https://github.com/puppeteer/puppeteer) и поисковая строка [этого интернет-ресурса](https://google.com/).

Весь код, связанный с этой статьей, доступен в репозитории [`puppeteer-showcase`](https://github.com/Donnyyyyy/puppeteer-showcase).

### Запуск тестов

В ходе работы скриптов и тестов могут появляться побочные эффекты: записываться `cookie`, добавляться записи в `localStorage` и т. д., поэтому каждый тест надо запускать с чистого листа — в новом окне браузера.

> В этих тестах используется фреймворк [`Mocha`](https://mochajs.org/)

```js
describe("Puppeteer test cases", () => {
  // Перед каждым тестом запускаем браузер и переходим на тестовую страничку (127.0.0.1:5000)
  beforeEach(async () => {
    this.browser = await puppeteer.launch({
      // Для тестов не обязательно видеть UI браузера, поэтому запускаем его в headless режиме.
      headless: true,
    });
    this.page = await this.browser.newPage();
    await this.page.goto("http://127.0.0.1:5000/");
  });

  // Не забываем закрывать открытый браузер
  afterEach(async () => {
    await this.browser.close();
  });

  // Наши тесты будут здесь
});
```

Это достаточно очевидный, но очень важный момент: все написанные тесты должны быть независимыми и работать без опоры друг на друга. Писать связанные тесты — плохо!

### Вы ещё используете timeout? Тогда мы идём к вам

Предположим, у нас есть кнопка (`#button1`), при нажатии на которую выполняется следующий код:

```js
let redirectUrl = "https://example.com/default/url/";
try {
  const response = await fetch(
    "https://example.com/api/some/endpoint/?with=params",
  );
  redirectUrl = await response.json();
} catch (exc) {
  console.log(exc);
}

window.location = redirectUrl;
```

Этот скрипт направляет пользователя на URL, полученный от сервера. В случае ошибки скрипт логирует ее и направляет пользователя на URL по умолчанию.

В голову приходит несколько сценариев для тестирования:

- положительный — API повел себя как ожидалось и вернул `redirectUrl`;
- отрицательный — API недоступен, запрос не завершился;
- отрицательный — API вернул неверный ответ (например, не JSON).

Опишем их:

**Тесты под катом**

> В этих тестах используется библиотека [`Chai`](https://www.chaijs.com/)

Кода получилось много, как это часто бывает с тестами. Посмотрим внимательно на первый из них:

```js
it("should follow returned redirectUrl if response is ok", async () => {
  // Перехватываем все запросы со страницы
  this.page.on("request", (request) => {
    // Если это запрос к API, то возвращаем 200 ответ с redirectUrl в JSON
    if (request.url().endsWith("/api/some/endpoint/?with=params")) {
      request.respond({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify("https://example.com/returned/redirect/url/"),
      });
    } else {
      // Если это запрос не к API, то не пропускаем запрос
      request.continue();
    }
  });
  this.page.setRequestInterception(true);

  // Кликаем по кнопке
  this.page.click("#button1");
  // Ждем 100 мс, пока пройдет запрос и сменится страница
  await new Promise((resolve) => setTimeout(resolve, 100));

  // Проверяем, что мы попали на нужную страницу
  expect(this.page.url()).to.equal(
    "https://example.com/returned/redirect/url/",
  );
});
```

Пайплайн такой:

1. нажимаем на кнопку;
2. перехватываем запрос к API и возвращаем нужный `redirectUrl`;
3. ждем 100 мс;
4. проверяем, попали ли мы на нужную страницу.

Постойте, а что, если скрипт не успеет совершить запрос и перенаправить пользователя за 100 мс? Может быть, увеличить таймаут до 1 с? А что, если и за секунду не успеет? Да и если каждый тест будет ждать по секунде, сколько же будут работать все тесты?

Ответ прост: не используйте таймауты. У `Puppeteer API` есть множество методов, которые позволяют избежать таймаутов, дождавшись вместо этого совершения какого-либо действия. В нашем случае подойдет [`waitForNavigation`](https://github.com/puppeteer/puppeteer/blob/v5.5.0/docs/api.md#pagewaitfornavigationoptions). Этот метод ожидает, пока не произойдет смена страницы.

Хороший тест будет выглядеть так:

```js
it("should follow returned redirectUrl if response is ok", async () => {
  // Перехватываем все запросы со страницы
  this.page.on("request", (request) => {
    // Если это запрос к API, то возвращает 200 ответ с redirectUrl в JSON
    if (request.url().endsWith("/api/some/endpoint/?with=params")) {
      request.respond({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify("https://example.com/returned/redirect/url/"),
      });
    } else {
      // Если это запрос не к API, то не трогаем запрос
      request.continue();
    }
  });
  this.page.setRequestInterception(true);

  // Кликаем по кнопке
  this.page.click("#button1");
  // Ждем, пока сменится страница
  await this.page.waitForNavigation();

  // Проверяем, что мы попали на нужную страницу
  expect(this.page.url()).to.equal(
    "https://example.com/returned/redirect/url/",
  );
});
```

И никаких таймаутов!

---

Это очень простой пример, но от того не менее показательный. Для того чтобы выйти победителем из битвы с таймаутами, необходимо продумывать очередность `await`-ов: сначала действие, затем его ожидание. Тогда и тесты ускорятся, и CI не будет падать, когда не хватит таймаута.

### Среда выполнения тестов

Есть две независимые среды выполнения JavaScript-кода при написании тестов с Puppeteer:

1. Node, при помощи которого были запущены тесты, — в нем исполняется код тестов;
2. браузер, который был открыт Puppeteer, — в нем исполняется код, связанный с открытой страницей, — бизнес-логика.

Эти две среды изолированы, у них нет общей области видимости. Однако при помощи API Puppeteer может «общаться» с браузером. Также с браузером взаимодействуют и тесты, в том числе выполняют код и получают его результат через [`evaluate`](https://github.com/puppeteer/puppeteer/blob/v5.5.0/docs/api.md#pageevaluatepagefunction-args).

Понимание того, что бизнес-логика и тесты для нее исполняются в двух разных изолированных средах, между которыми есть только один мостик в виде Puppeteer, является критичным.

### Тестируем `console.log`

На этот раз бизнес-логика будет выглядеть чуть проще:

```js
console.log("Hello from main.js!");
```

и будет запускаться при нажатии на кнопку `#button2`.

Тогда напишем два теста:

1. первый будет проверять, что при нажатии на кнопку в консоль окружения тестов ничего не пишется;
2. второй — что при нажатии на кнопку в консоль браузера пишется «Hello from main.js!».

А вот и тесты:

```js
describe("button2 test cases", () => {
  it("should not print message to node console on button2 click", async () => {
    const printedMessages = [];

    // Подменяем console.log на функцию-шпиона и записываем логируемые сообщения
    console.log = (message) => {
      printedMessages.push(message);
    };
    // Нажимаем на кнопку, которая печатает в консоль
    await this.page.click("#button2");

    // Проверяем, что в консоль ничего не было написано
    expect(printedMessages).to.be.empty;
  });

  it("should print message to browser console on button2 click", async () => {
    // Подменяем браузерный console.log на функцию-шпиона и записываем логируемые сообщения
    await this.page.evaluate(() => {
      window.printedMessages = [];

      window.console.log = (message) => {
        window.printedMessages.push(message);
      };
    });
    // Нажимаем на кнопку, которая печатает в консоль
    await this.page.click("#button2");

    // Извлекаем шпионские данные от подмененного console.log
    const printedMessages = await this.page.evaluate(
      () => window.printedMessages,
    );

    // Проверяем, что в консоль было написано ожидаемое сообщение
    expect(printedMessages).to.contain("Hello from main.js!");
  });
});
```

Пайплайн тут следующий:

1. подменяем `console.log` (тестовый либо браузерный);
2. нажимаем на кнопку 2;
3. проверяем, какие сообщения были написаны через `console.log`.

Запускаем тесты и видим заветную картину:

![](https://habrastorage.org/webt/yv/ut/am/yvutam9m6psd9h4byrgzhjiffvc.gif)

*`should not print message to node console on button2 click`* и *`should print message to browser console on button2 click`* прошли, значит, я никого не обманул.

### Подсматриваем за Puppeteer

Еще одна прелесть тестов с использованием Puppeteer — их наглядность. Помните, как мы при запуске браузера указывали параметры?

```js
this.browser = await puppeteer.launch({
  headless: true, // <-- параметр
});
```

Мы использовали `headless: true` потому, что тесты так проходят (или падают) быстрее, так как не нужно тратить ресурсы на запуск графической оболочки браузера.

Однако если указать следующие параметры:

```js
this.browser = await puppeteer.launch({
  headless: false, // <-- запускаем графическую оболочку
  slowMo: 500, // <-- включаем задержку между действиями в 500 мс
});
```

и запустить тесты, мы сможем понаблюдать за тем, что делает Puppeteer по нашим указаниям:

![загружаем...](https://habrastorage.org/webt/87/hb/kn/87hbknm62y9do2fp1unsysm93t4.gif)

## Заключение

В этой статье я поделился небольшой частью интересностей Puppeteer, оставив за кадром его преимущества вроде кроссбраузерности (с некоторыми оговорками) и непростые задачи, которые приходилось решать для повышения стабильности тестов. Если мое повествование нашло отклик в вашей душе, напишите об этом в комментариях.
