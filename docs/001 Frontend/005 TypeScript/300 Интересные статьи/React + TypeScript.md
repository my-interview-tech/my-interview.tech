---
uid: gILDPjW-WDGN8fWxnjo6U
title: React + TypeScript
tags:
  - React
  - TypeScript
draft: false
technology: TypeScript
specialty: Frontend
tools: []
order: 0
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

Подробнее:

- [Карманная книга по TypeScript](https://my-js.org/docs/guide/ts/);
- [Шпаргалка по TypeScript](https://my-js.org/docs/cheatsheet/ts/);
- [TypeScript в деталях](https://my-js.org/docs/cheatsheet/mastering-ts/);
- [Шпаргалка по React + TypeScript](https://my-js.org/docs/cheatsheet/react-typescript/);
- [Выдержки из определений типов TypeScript для React](https://my-js.org/docs/cheatsheet/react-types/).

---

Преимущества изучения TS могут быть сведены к следующему:

- ваши шансы получить более высокооплачиваемую работу сильно увеличатся;
- в вашем коде будет намного меньше багов, его будет легче читать и поддерживать;
- рефакторить код и обновлять зависимости станет гораздо проще.

Эта статья представляет собой минимальное введение по использованию TS в React.

Антигероем нашей истории будет Пэт — очень неприятный технический директор.

## Основы TS, необходимые в React

**Примитивы**

Существует 3 основных примитива, которые являются фундаментом для других типов:

```ts
string; // например, "Pat"
boolean; // например, true
number; // например, 23 или 1.99
```

**Массивы**

Тип массива состоит из примитивов или других типов:

```ts
number[] // например, [1, 2, 3]
string[] // например, ["Lisa", "Pat"]
User[] // кастомный тип, например, [{ name: "Pat" }, { name: "Lisa" }]
```

**Объекты**

Объекты повсюду. Пример простого объекта:

```ts
const user = {
  firstName: "Pat",
  age: 23,
  isNice: false,
  role: "CTO",
  skills: ["HTML", "CSS", "jQuery"],
};
```

Тип, описывающий этот объект, выглядит следующим образом:

```ts
type User = {
  firstName: string;
  age: number;
  isNice: boolean;
  role: string;
  skills: string[];
};
```

Предположим, что у пользователя есть друзья, которые также являются пользователями:

```ts
type User = {
  // ...
  friends: User[];
};
```

Пэт всегда ставил карьеру на первое место, поэтому у него вполне может не быть друзей:

```ts
const user = {
  firstName: "Pat",
  age: 23,
  isNice: false,
  role: "CTO",
  skills: ["CSS", "HTML", "jQuery"],
  friends: undefined,
};
```

В TS для обозначения опционального (необязательного) поля используется символ `?` после названия поля:

```ts
type User = {
  // ...
  friends?: User[];
};
```

**Перечисления**

Мы определили тип поля `role` как `string`:

```ts
type User = {
  // ...
  role: string;
};
```

Пэту это не нравится. Он считает, что тип `string` недостаточно строгий. Его работники должны выбирать из ограниченного набора ролей.

Для этого отлично подойдет перечисление (enumeration, enum):

```ts
enum UserRole {
  CEO,
  CTO,
  SUBORDINATE,
}
```

Так намного лучше. Но Пэт знает, что значениями элементов перечисления являются числа. Значением `CEO` является `0`, `CTO` — `1`, а `SUBORDINATE` — `2`. Пэту это не по душе.

К счастью, в качестве значений элементов перечисления можно использовать строки:

```ts
enum UserRole {
  CEO = "ceo",
  CTO = "cto",
  SUBORDINATE = "inferior-person",
}
```

Теперь Пэт доволен:

```ts
enum UserRole {
  CEO = "ceo",
  CTO = "cto",
  SUBORDINATE = "inferior-person",
}

type User = {
  firstName: string;
  age: number;
  isNice: boolean;
  role: UserRole;
  skills: string[];
  friends?: User[];
};

const user = {
  firstName: "Pat",
  age: 23,
  isNice: false,
  role: UserRole.CTO, // равняется "cto"
  skills: ["HTML", "CSS", "jQuery"],
};
```

**Функции**

Пэт любит показывать свою власть, увольняя подчиненных. Определим функцию, позволяющую Пэту делать это.

_Типизация параметров функции_

Существует, как минимум, 3 способа идентифицировать увольняемое лицо. Во-первых, мы можем использовать несколько параметров:

```ts
function fireUser(firstName: string, age: number, isNice: boolean) {
  // ...
}

// или так
const fireUser = (firstName: string, age: number, isNice: boolean) => {
  // ...
};
```

Во-вторых, мы можем обернуть параметры в объект и определить типы в объекте:

```ts
function fireUser({
  firstName,
  age,
  isNice,
}: {
  firstName: string;
  age: number;
  isNice: boolean;
}) {
  // ...
}
```

Наконец, мы можем вынести параметры в отдельный тип. Спойлер: такая техника часто используется для пропов компонентов React:

```ts
type User = {
  firstName: string;
  age: number;
  role: UserRole;
};

function fireUser({ firstName, age, role }: User) {
  // ...
}
```

_Типизация значения, возвращаемого функцией_

Пэт считает, что просто уволить сотрудника недостаточно. Поэтому может быть хорошей идеей возвращать пользователя из функции.

Для определения типа значения, возвращаемого функцией, также существует несколько способов. Мы можем добавить `: Type` после закрывающей скобки списка параметров функции:

```ts
function fireUser(firstName: string, age: number, role: UserRole): User {
  // ...
  return { firstName, age, role };
}

// или так
const fireUser = (firstName: string, age: number, role: UserRole): User => {
  // ...
  return { firstName, age, role };
};
```

Если мы попытается вернуть `null`, например, то получим ошибку:

![](https://habrastorage.org/webt/rv/75/wp/rv75wpwcl31enskrzpfw9vj2evk.png)

На самом деле, чаще всего у нас нет необходимости определять тип значения, возвращаемого функцией, явно. TS отлично справляется с предположением (выводом) таких типов:

![](https://habrastorage.org/webt/ny/ud/3-/nyud3-phtk2y9nskpoidhhcq33c.png)

При наличии сомнений в корректности выводимого TS типа, достаточно навести курсор на название переменной или функции (спасибо современным редакторам кода).

**Другие вещи, с которыми вам придется иметь дело**

Существует еще несколько полезных вещей, которые могут вам пригодиться при использовании TS в React. Пожалуй, самыми важными из них являются:

- [`объединения (unions — TypeA | TypeB`)](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types);
- [`пары ключ значение — Record<TypeA, TypeB>`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type).

## React и TS

Когда речь заходит об использовании TS в React, следует помнить, что компоненты и хуки React — это всего лишь функции, а пропы — всего лишь объекты.

_Функциональные компоненты_

В большинстве случаев у нас нет необходимости определять тип, возвращаемый компонентом:

```ts
function UserProfile() {
  return <div>If you're Pat: YOU'RE AWESOME!!</div>
}
```

Типом, возвращаемым компонентом является `JSX.Element`, как видно на приведенном ниже изображении:

![](https://habrastorage.org/webt/fh/0h/rm/fh0hrmfsry8w2gwsto6f4vfaq8w.png)

Если мы попробуем вернуть из компонента не `JSX`, то получим предупреждение:

![](https://habrastorage.org/webt/ns/yc/mt/nsycmt_x1u8ltspmx7sc2hcixnq.png)

В данном случае объект `user` не является валидным `JSX`:

```ts
'UserProfile' cannot be used as a JSX component.
Its return type 'User' is not a valid JSX element.
```

_Пропы_

Как отмечалось ранее, пропы — это всего лишь объекты:

```ts
enum UserRole {
  CEO = "ceo",
  CTO = "cto",
  SUBORDINATE = "inferior-person",
}

type UserProfileProps = {
  firstName: string;
  role: UserRole;
}

function UserProfile({ firstName, role }: UserProfileProps) {
    if (role === UserRole.CTO) {
    return <div>Hey Pat, you're AWESOME!!</div>
  }
  return <div>Hi {firstName}, you suck!</div>
}

// или так
const UserProfile = ({ firstName, role }: UserProfileProps) => {
    if (role === UserRole.CTO) {
    return <div>Hey Pat, you're AWESOME!!</div>
  }
  return <div>Hi {firstName}, you suck!</div>
}
```

_Обратите внимание_: при работе над React-проектами вы, скорее всего, встретите много кода, в котором используется тип `React.FC` или `React.FunctionComponent`:

```ts
const UserProfile: React.FC<UserProfileProps>({ firstName, role }) {
  // ...
}
```

Использовать эти типы [больше не рекомендуется](https://github.com/facebook/create-react-app/pull/8177).

_Пропы-коллбэки_

В качестве пропов компонентам часто передаются функции обратного вызова (коллбэки):

```ts
type UserProfileProps = {
  id: string;
  firstName: string;
  role: UserRole;
  fireUser: (id: string) => void;
};

function UserProfile({ id, firstName, role, fireUser }: UserProfileProps) {
  if (role === UserRole.CTO) {
    return <div>Hey Pat, you're AWESOME!!</div>;
  }
  return (
    <>
      <div>Hi {firstName}, you suck!</div>
      <button onClick={() => fireUser(id)}>Fire this loser!</button>
    </>
  );
}
```

`void` означает, что функция ничего не возвращает.

_Дефолтные пропы_

Как вы помните, мы можем сделать поле опциональным с помощью `?`. Тоже самое можно делать с пропами:

```ts
type UserProfileProps = {
  age: number;
  role?: UserRole;
};
```

Опциональный проп может иметь значение по умолчанию:

```ts
function UserProfile({ firstName, role = UserRole.SUBORDINATE }: UserProfileProps) {
  if (role === UserRole.CTO) {
    return <div>Hey Pat, you're AWESOME!!</div>
  }
  return <div>Hi {firstName}, you suck!</div>
}
```

## Хуки

_useState()_

`useState` — самый популярный хук React. Во многих случаях его не нужно типизировать. TS способен вывести типы значений, возвращаемых `useState()`, на основе начального значения:

```ts
function UserProfile({ firstName, role }: UserProfileProps) {
  const [isFired, setIsFired] = useState(false);

  return (
    <>
      <div>Hi {firstName}, you suck!</div>
      <button onClick={() => setIsFired(!isFired)}>
        {isFired ? "Oops, hire them back!" : "Fire this loser!"}
      </button>
    </>
  );
}
```

![](https://habrastorage.org/webt/oj/pu/hp/ojpuhpr7ol7nwtb5wgu69g3vqpy.png)

Теперь мы в безопасности. При попытке обновить состояние не логическим значением получаем ошибку:

![](https://habrastorage.org/webt/ly/cr/4k/lycr4kugtflokenb2anylp6u-54.png)

В некоторых случаях TS не может вывести тип значений, возвращаемых `useState()`:

```ts
// TS не знает, элементы какого типа будет содержать массив
const [names, setNames] = useState([]);

// начальным значением является `undefined`, поэтому TS неизвестен настоящий тип
const [user, setUser] = useState();

// тоже самое справедливо для `null` в качестве начального значения
const user = useState(null);
```

![](https://habrastorage.org/webt/aa/xr/-k/aaxr-ksy0oemed6q6ah0ro8qa1q.png)

`useState()` реализован с помощью общего типа (дженерика, generic type). Мы можем использовать это для типизации состояния:

```ts
// типом `names` является `string[]`
const [names, setNames] = useState<string[]>([]);
setNames(["Pat", "Lisa"]);

// типом user является `User | undefined`
const [user, setUser] = useState<User>();
setUser({ firstName: "Pat", age: 23, role: UserRole.CTO });
setUser(undefined);

// типом `user` является `User | null`
const [user, setUser] = useState<User | null>(null);
setUser({ firstName: "Pat", age: 23, role: UserRole.CTO });
setUser(null);
```

Мы не будем рассматривать другие встроенные хуки, они типизируются похожим образом, за исключением `useEffect()`, который не нуждается в типизации.

_Кастомные хуки_

Кастомный хук — это просто функция:

```ts
function useFireUser(firstName: string) {
    const [isFired, setIsFired] = useState(false);
  const hireAndFire = () => setIsFired(!isFired);

    return {
    text: isFired ? `Oops, hire ${firstName} back!` : "Fire this loser!",
    hireAndFire,
  };
}

function UserProfile({ firstName, role }: UserProfileProps) {
  const { text, hireAndFire } = useFireUser(firstName);

  return (
    <>
      <div>Hi {firstName}, you suck!</div>
      <button onClick={hireAndFire}>
        {text}
      </button>
    </>
  );
}
```

## События

Со встроенными обработчиками событий в React работать легко, поскольку TS известны типы событий:

```ts
function FireButton() {
  return (
    <button onClick={(event) => event.preventDefault()}>
      Fire this loser!
    </button>
  );
}
```

Но определение обработчика в виде отдельной функции в корне меняет дело:

```ts
function FireButton() {
  const onClick = (event: /* ??? */) => {
    event.preventDefault();
  };

  return (
    <button onClick={onClick}>
      Fire this loser!
    </button>
  );
}
```

Какой тип имеет `event`? Существует 2 подхода:

- гуглить (не рекомендуется, вызывает головокружение));
- приступить к реализации встроенной функции и позволить TS вывести типы:

![](https://habrastorage.org/webt/ql/ii/qi/qliiqi0ljlt0njwxfwqxsnht3fm.gif)

Счастливый копипастинг. Нам даже не нужно понимать, что происходит (большинство обработчиков являются дженериками, как `useState()`).

```ts
function FireButton() {
  const onClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
  };

  return (
    <button onClick={onClick}>
      Fire this loser!
    </button>
  );
}
```

Что насчет обработчика изменения значения инпута?

```ts
function Input() {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };

  return <input onChange={onChange} />;
}
```

А селекта?

```ts
function Select() {
  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
  };

  return <select onChange={onChange}>...</select>;
}
```

## Дочерние компоненты

Композиция компонентов, от которой мы все в восторге, предполагает передачу пропа `children`:

```ts
type LayoutProps = {
  children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
  return <div>{children}</div>;
}
```

Тип `React.ReactNode` предоставляет большую свободу выбора передаваемого значения. Он позволяет передавать почти что угодно (кроме объекта):

![](https://habrastorage.org/webt/yo/n0/ff/yon0ff_6pxdzcd0nnytlfukjuks.png)

Если в качестве пропа должна передаваться только разметка, тип `children` можно ограничить до `React.ReactElement` или `JSX.Element` (что по сути одно и тоже):

```ts
type LayoutProps = {
  children: React.ReactElement; // или `JSX.Element`
};
```

Эти типы являются гораздо более строгими:

![](https://habrastorage.org/webt/-j/-q/uq/-j-quqxycnth6dnpujuucjx9w08.png)

## Сторонние библиотеки

**Добавление типов**

Сегодня многие сторонние библиотеки содержат соответствующие типы. В этом случае отдельный пакет (с типами) устанавливать не требуется.

Типы для большого количества существующих библиотек содержатся в репозитории [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) на GitHub и публикуются под эгидой организации `@types` (в том числе типы React). При установке пакета без типов и его импорте получаем такую ошибку:

![](https://habrastorage.org/webt/m_/em/ak/m_emak2fek801_vodu5krxsoqka.png)

Копируем выделенную команду и выполняем ее в терминале:

```bash
npm i --save-dev @types/styled-components
```

Если вы все же столкнулись с отсутствием типов для сторонней библиотеки, придется определить глобальные типы самостоятельно в файле `.d.ts` (мы не будем рассматривать его в рамках статьи).

**Использование дженериков**

Библиотеки рассчитаны на разные случаи использования, поэтому они должны быть гибкими. Для обеспечения гибкости типов используются дженерики. Мы их уже видели в `useState()`:

```ts
const [names, setNames] = useState<string[]>([]);
```

Такой прием является очень распространенным для сторонних библиотек. Пример с Axios:

```ts
import axios from "axios";

async function fetchUser() {
  const response = await axios.get<User>("https://example.com/api/user");
  return response.data;
}
```

![](https://habrastorage.org/webt/1y/22/xx/1y22xxaoubtvy1ie6ajlbi_ndlm.png)

React Query:

```ts
import { useQuery } from "@tanstack/react-query";

function UserProfile() {
  // общие типы данных и ошибки
  const { data, error } = useQuery<User, Error>(["user"], () => fetchUser());

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  // ...
}
```

Styled Components:

```ts
import styled from "styled-components";

// общий тип для пропов
const MenuItem = styled.li<{ isActive: boolean }>`
  background: ${(props) => (props.isActive ? "red" : "gray")};
`;

function Menu() {
  return (
    <ul>
      <MenuItem isActive>Menu Item 1</MenuItem>
    </ul>
  );
}
```

## Способы устранения неполадок

**Начало работы с React & TS**

Создание нового React-проекта с поддержкой TS — дело одной команды. Я рекомендую использовать шаблоны Vite + React + TS или Next.js + TS:

```ts
npm create vite [project-name] --template react-ts

npx create-next-app [project-name] --ts
```

**Обнаружение правильного типа**

Мы это уже рассматривали, но повторим еще раз: начинаем писать встроенную функцию и позволяем TS вывести правильный тип события:

![](https://habrastorage.org/webt/ql/ii/qi/qliiqi0ljlt0njwxfwqxsnht3fm.gif)

При наличии сомнений относительно количества доступных параметров набираем `(...args) =>` и получаем соответствующий массив:

![](https://habrastorage.org/webt/ya/ip/te/yaiptegmkbbds6fk2abuzbloykw.png)

**Изучение типа**

Простейший способ получить список всех доступных полей типа — использовать автозавершение в IDE. Для этого достаточно нажать CTRL + Пробел (Windows) или Option + Пробел (Mac):

![](https://habrastorage.org/webt/sr/gd/zf/srgdzfil9nblft8wnf7ku6cqjim.png)

Для того, чтобы перейти к определению типа, следует нажать CTRL + Click (Windows) или CMD + Click (Mac):

![](https://habrastorage.org/webt/jt/hp/el/jthpelymlud8fq4xfyuytjoinhw.gif)

**Чтение сообщений об ошибках**

Сообщения об ошибках и предупреждения TS являются очень информативными, главное — научиться их правильно читать. Рассмотрим пример:

```ts
function Input() {
  return <input />;
}

function Form() {
  return (
    <form>
      <Input onChange={() => console.log("change")} />
    </form>
  );
}
```

Вот что показывает TS:

![](https://habrastorage.org/webt/5t/qt/tv/5tqttvywbbj6tyvrftoifm3wuws.png)

Что это означает? Что еще за тип `IntrinsicAttributes`? При работе с библиотеками (в том числе, с самим React) вы будете часто встречать странные названия типов, вроде этого.

Мой совет: игнорируйте их поначалу.

Самой важной частью является последняя строка:

```ts
Property 'onChange' does not exist on type...
```

Смотрим на определение компонента `Input`:

```ts
function Input() {
  return <input />;
}
```

У него нет пропа `onChange`. Именно это "не нравится" TS.

Теперь рассмотрим более сложный пример:

```ts
const MenuItem = styled.li`
  background: "red";
`;

function Menu() {
  return <MenuItem isActive>Menu Item</MenuItem>;
}
```

![](https://habrastorage.org/webt/md/1u/w-/md1uw-10zdvr7msymks8pjh3_ci.png)

Ничего себе сообщение об ошибке! Без паники: прокручиваем в самый конец сообщения — как правило, ответ находится там:

![](https://habrastorage.org/webt/lg/-7/ua/lg-7uagpwsxweefircxq2xatcg0.gif)

**Пересечения**

Предположим, что у нас имеется тип `User`, определенный в отдельном файле, например, `types.ts`:

```ts
export type User = {
  firstName: string;
  role: UserRole;
};
```

Он используется для типизации пропов компонента `UserProfile`:

```ts
function UserProfile({ firstName, role }: User) {
  // ...
}
```

Который используется в компоненте `UserPage`:

```ts
function UserPage() {
  const user = useFetchUser();

  return <UserProfile {...user} />;
}
```

Пока все хорошо. Но что если `UserProfile` будет принимать еще один проп — функцию `fireUser`?

```ts
function UserProfile({ firstName, role, fireUser }: User) {
  return (
    <>
      <div>Hi {firstName}, you suck!</div>
      <button onClick={() => fireUser({ firstName, role })}>
        Fire this loser!
      </button>
    </>
  );
}
```

Получаем ошибку:

![](https://habrastorage.org/webt/zg/m1/4v/zgm14vhh2f-f-vgmvqif05w6n94.png)

Эту проблему можно решить с помощью пересечения (intersection type). При пересечении все поля двух типов объединяются в один тип. Пересечения создаются с помощью символа `&`:

```ts
type User = {
  firstName: string;
  role: UserRole;
}

// `UserProfileProps` будет содержать все поля `User` и `fireUser`
type UserProfileProps = User & {
    fireUser: (user: User) => void;
}

function UserProfile({ firstName, role, fireUser }: UserProfileProps) {
  return (
    <>
      <div>Hi {firstName}, you suck!</div>
      <button onClick={() => fireUser({ firstName, role })}>
        Fire this loser!
      </button>
    </>
  );
}
```

Более "чистым" способом является определение отдельных типов для принимаемых компонентом пропов:

```ts
type User = {
  firstName: string;
  role: UserRole;
}

// !
type UserProfileProps = {
  user: User;
  fireUser: (user: User) => void;
}

function UserProfile({ user, onClick }: UserProfileProps) {
  return (
    <>
      <div>Hi {user.firstName}, you suck!</div>
      <button onClick={() => fireUser(user)}>
        Fire this loser!
      </button>
    </>
  );
}
```
