---
uid: RNuoG0vhiJoHewQruj4j-
title: Учимся писать сложные Typescript типы на примере роутинга в React
tags:
  - "#React"
  - "#TypeScript"
  - "#Router"
  - "#React-router"
draft: false
technology: TypeScript
specialty: Frontend
tools: []
order: 0
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

links:

- Роутинг библиотека react-router ([https://reactrouter.com/en/main](https://reactrouter.com/en/main))
- Роутинг библиотека type-route ([https://type-route.zilch.dev/](https://type-route.zilch.dev/))
- Typescript утилиты type-fest ([https://github.com/sindresorhus/type-fest](https://github.com/sindresorhus/type-fest))
- Документавция React ([https://react.dev/](https://react.dev/))
- Документация Typescript
- Практика ([https://github.com/type-challenges/type-challenges](https://github.com/type-challenges/type-challenges))
- JS-like написание типов ([https://github.com/mistlog/typetype](https://github.com/mistlog/typetype))
- Бонус: ПарсингJSON схемы с помощью infer ([https://alexharri.com/blog/build-schema-language-with-infer](https://alexharri.com/blog/build-schema-language-with-infer))

---

Вы используете TypeScript, но впадаете в ступор перед, когда видите типы в сторонних библиотеках? `Generics`, `generic constraint`, `infer`, `rest infer`, `conditional` и `recursive types`, `satisfies` вызывают головную боль? Мы постараемся снизить градус сложности и напишем типы для роутинга в React. Данный материал будет полезен как фронтендерам, так и бекендерам.

Статья предполагает, что вы уже знакомы с TypeScript, знаете основы и используете в повседневной разработке.

- Проблема
- Инструменты
- Извлекаем параметры из path
- Как работает преобразование конфигурации
- Satisfies, as const, type assertion
- Добавляем к объектам дерева полный путь до компонента
- Соединяем все вместе

### Проблема

Что такое **routing (роутинг)**?

В двух словах это система навигации между экранами состоящая из:

- `Screen` (экран) - место куда нам нужно попасть, в ui-библиотеках это компоненты.
- `Route` (маршрут, роут) - конфигурация маршрута до экрана, может включать в себя path, правила перенаправления и др.
- `Path` (путь) - путь, строка по которой формируется URL:
  - Статический `/about`, `/tasks`
  - Параметризированный `/tasks/:taskId`
- `URL` - конечный адрес сформированный согласно path `http://tutorial/tasks/1`

_*Эти термины будут использоваться далее*_

```jsx
// 1. Определяем маршрут
// Маршрут до экрана
<Route
  // правило, по которому формируется URL
  path="/tasks/:taskId"
  // экран
  component={Task}
/>;
// 2. Получаем URL
// <http://tutorial/tasks/1>
const url = generateUrl("/tasks/:taskId", { taskId: 1 });
// 3. Переходим по URL
navigate(url);
```

В `Single Page` приложениях роутинг производится на стороне клиента. И в большинстве React приложений, с которыми я работал:

1. Cистема роутинга разбросана по файлам

```jsx
// Tasks.tsx
function Tasks() {
  return (
    <Task path=":taskId" />
  )
}
// App.tsx
function App() {
  return (
    <Router>
	  <Tasks path="tasks" />
    <Router>
  )
}
```

2. Навигация по приложению осуществляется с помощью текстовых констант в свойствах компонента `to={'/path/to/component}`

Даже в примере из документации самой популярной библиотеки react-router, ссылки на экраны пишутся так:

```jsx
import { Outlet, Link } from "react-router-dom";

export default function Root() {
  return (
    <>
      <div id="sidebar">
        {/* other elements */}
        <nav>
          <ul>
            <li>
              <Link to={`contacts/1`}>Your Name</Link>
            </li>
            <li>
              <Link to={`contacts/2`}>Your Friend</Link>
            </li>
          </ul>
        </nav>

        {/* other elements */}
      </div>
    </>
  );
}
```

Приложение разрастается и количество роутов увеличивается. Наступает момент когда требуется изменить навигацию и приходится вручную искать файлы где используется этот роут и менять вручную.

Но path’ы не всегда встречаются полной строкой `/tasks/:taskId`, а могут собираться из разных переменных:

```jsx
const tasksPath = "tasks";
const { taskId } = useParams();
generateUrl(`${tasksPath}/:taskid, { taskId }`);
```

Поэтому зачастую при рефакторинге можно что-то пропустить. В приложении появляются битые ссылки и пользователи негодуют.

### К чему мы хотим прийти

В этом туториале мы научимся писать сложные TypeScript типы на примере централизованного роутинга.

В интернете можно найти TypeScript-first routing библиотеку [type-route](https://type-route.zilch.dev/), мы будем писать с нуля. К тому же наше решение универсально и работает с любой библиотекой роутинга.

#### Что получится в итоге

![Итоговый формат конфигурации роутинга](https://habrastorage.org/getpro/habr/upload_files/367/b69/be8/367b69be80db45d1d92b58e7c76bbb08.png "Итоговый формат конфигурации роутинга")

Итоговый формат конфигурации роутинга

![Валидация и пример использования](https://habrastorage.org/getpro/habr/upload_files/a0e/666/96e/a0e66696e382a0c368bb9ef0dbe457f3.png "Валидация и пример использования")

Валидация и пример использования

- Дерево всех роутов приложения в одном месте — json конфиг;
- Возможность получать эти роуты и видеть подсказки в IDE;
- Генерацию итогового URL по path»у;
- Валидацию параметров при генерации URL.

### Инструменты

Что мы будем использовать помимо самого TS

- [react](https://react.dev/) — библиотека рендеринга;
- [type‑fest](https://github.com/sindresorhus/type-fest) — набор ts утилит;
- [expect‑type](https://www.npmjs.com/package/expect-type) — тестирование типов;
- [react‑router](https://reactrouter.com/en/main) — библиотека роутинга для React.

### Извлекаем параметры из path

В [react-router](https://reactrouter.com/en/main) уже есть типы для этой задачи, но мы конечно-же изобретем велосипед.  
Для этого нам понадобится следующие типы:

```jsx
export type ExtractParams<Path> = Path extends `${infer Segment}/${infer Rest}`
  ? ExtractParam<Segment> & ExtractParams<Rest>
  : ExtractParam<Path>

// Пример
type Params = ExtractParams<'/tasks/:taskId/:commentId'>
// Params = { taskId: string; commentId: string; }

export type ExtractParam<Segment> = Segment extends `:${infer Param}`
  ? {
   [Param]: string;
  }
  : unknown;

// Пример
type Param = ExtractParam<':taskId'>
// Param = { taskId: string; }
```

Эти два типа — основа для валидации и IDE suggestions параметров при генерации URL на основе path:

![Валидация](https://habrastorage.org/getpro/habr/upload_files/067/f6d/b18/067f6db187cfcfa49d48814870ca8e5d.png "Валидация")

Валидация

![IDE-suggestions](https://habrastorage.org/getpro/habr/upload_files/f4e/fdc/36b/f4efdc36b6de48fa8aa07764a1d4dd78.png "IDE-suggestions")

IDE-suggestions

#### ExtractParam

Напомню, что path — это строка `/segment/:parameterSegment/segement2` по которому генерируется итоговый URL. Состоит из следующих сегментов:

- `:parameterSegment` — динамический параметр, который заменяется на конкретное значение в URL;
- `segment` — неизменяемая часть;
- `/` — разделяющий слеш.

Разберем первый тип `ExtractParam`. Он преобразует строку сегмента с параметром в `object type` с таким же ключом

```jsx
export type ExtractParam<Path> = Path extends `:${infer Param}`
  ? {
   [Param]: string;
  }
  : {};

// expectTypeOf - функция из библиотеки expect-type
// @ts-expect-error - комментарий из expect-type наподобии eslint-disable-next-line
it('ExtractParam type ', () => {
  // { taskId: string }
  expectTypeOf({ taskId: '' })
    .toMatchTypeOf<ExtractParam<':taskId'>>();

  // { commentId: string }
  expectTypeOf({ commentId: '' })
    .toMatchTypeOf<ExtractParam<':commentId'>>();

  // {} вторая ветка conditional
  expectTypeOf({ }).toMatchTypeOf<ExtractParam<'somestring'>>();


  // @ts-expect-error
  // !== { taskId: number }
  expectTypeOf({ taskId: 1 }).toMatchTypeOf<ExtractParam<':taskId'>>();

  // @ts-expect-error
  // !== { }
  expectTypeOf({ }).toEqualTypeOf<ExtractParam<':taskId'>>();
});
```

Для облегчения понимания работы переведем тип `ExtractParam` в псевдокод на JS.

*(\* Я не утверждаю, что под капотом оно работает именно так)  
(\*\* Данный подход я позаимствовал из библиотеки* [_type‑type_](https://github.com/mistlog/typetype)_, она позволяет писать сложные типы в JS‑like нотации)_

```jsx
export const extractParam = (path: any) => {
  if (typeof path === "string" && path.startsWith(':')) {
   const param = path.slice(1);

   return {
    [param]: '',
   }
  }
  else {
    return {}
  }
}

it('extractParam func', function () {
  expect(extractParam(':taskId')).toEqual({ taskId: '' });
  expect(extractParam('taskId')).toEqual({ });
});
```

В таблице представлены эквиваленты всем ключевым словам и концепциям:

| Концепт                                                                                                                                                                                                                                                                                                                                                                                  | TS                                                                    | JS                                                 |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | -------------------------------------------------- |
| **Property mapping**                                                                                                                                                                                                                                                                                                                                                                     | `{   [Param]: string;   }`                                            | `{   [param]: ''   }`                              |
| [**GENERICS**](https://www.typescriptlang.org/docs/handbook/2/generics.html)Обобщенные типы - обычные функции принимающие на вход параметр                                                                                                                                                                                                                                               | `type ExtractParam<Path>`                                             | `const extractParam = (path: any)`                 |
| [**GENERICS CONSTRAINTS**](https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints)Ограничения соответствуют обычным условиям, в данном случае проверка на то что входной параметр принадлежит множеству строк                                                                                                                                                  | `if (typeof path === "string" && path.startsWith(':'))`               | `Path extends ':${infer Param}'`                   |
| [**_CONDITIONAL TYPES_**](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)Условные типы соответствуют обычному if-else блоку, либо тернарному оператору                                                                                                                                                                                                            | `Path extends ':${infer Param}'   ? {   [Param]: string;   }   : {};` | `if (condition) {   }   else {   return {}   }   ` |
| [**INFER**](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#type-inference-in-conditional-types) <br>соответствует извлечению исходного типа в данном случае остальной части после символа `:` <br>\* Может использоваться только в generic constraints <br>_\*\* Если TS не может вывести тип указанный после ключевого слова, то он возвращает unknown_ | `Path extends ':${infer Param}'`                                      | `const param = path.slice(1);`                     |

#### ExtractParams

Тип `ExtractParams` преобразует строку path в объект где ключи это сегменты с параметрами, а значения тип `string`

```jsx
export type ExtractParams<Path> = Path extends `${infer Segment}/${infer Rest}`
  ? ExtractParam<Segment> & ExtractParams<Rest>
  : ExtractParam<Path>

it('ExtractParams', () => {
  // { taskId: string; }
  expectTypeOf({ taskId: '' })
  .toMatchTypeOf<ExtractParams<'/:taskId'>>();


  // Рекурсия ( {} & { taskId: string } & { tab: string } )
  // { taskId: string; tab: string; }
  expectTypeOf({ taskId: '', tab: '' })
    .toMatchTypeOf<ExtractParams<'/tasks/:taskId/:tab'>>();

  // Рекурсия ( {} & {} & {} )
  // { }
  expectTypeOf({ }).toEqualTypeOf<ExtractParams<'/path/without/params'>>();
  // @ts-expect-error
  // { taskId: number; }
  expectTypeOf({ taskId: 1 }).toMatchTypeOf<ExtractParams<'/:taskId'>>();
})
```

```jsx
export const extractParams = (path: string): Record<string, string> => {
  const firstSlash = path.indexOf('/');
  // условие прекращения рекурсии
  if (firstSlash === -1) {
    return extractParam(path);
  }
  // выделяем первый сегмент и оставшуются строку
  // например [segment, rest] = ['tasks', ':taskId']
  const [segment, rest] = [path.slice(0, firstSlash), path.slice(firstSlash + 1)];
  return {
    ...extractParam(segment),
    // рекурсивный вызов
    ...extractParams(rest)
  }
}

it('extractParams func', function () {
  expect(extractParams('/:taskId')).toEqual({ taskId: '' });
  expect(extractParams('/tasks/:taskId/:tab')).toEqual({ taskId: '', tab: '' });
  expect(extractParams('/path/without/params')).toEqual({ });
});
```

Заметим, что здесь используются [**Recursive types**](https://www.typescriptlang.org/play#example/recursive-type-references) . Если вспомнить как устроены рекурсивные функции, то выглядит примерно так:

- Объявление функции
- Условие прекращения рекурсии
- Рекурсивный вызов

| Описание                     | TS                                              | JS                                                                                                  |
| ---------------------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Объявление                   | `type ExtractParams<Path>`                      | `const extractParams`                                                                               |
| Условие прекращения рекурсии | `Path extends ‘${infer Segment}/${infer Rest}’` | `const firstSlash = path.indexOf('/');   if (firstSlash === -1) {   return extractParam(path);   }` |
| Рекурсивный вызов            | `ExtractParam<Segment> & ExtractParams<Rest>`   | `{   ...extractParam(segment),   ...extractParams(rest)   }`                                        |

### Как работает преобразование конфигурации

![Формат преобразования](https://habrastorage.org/getpro/habr/upload_files/262/39c/502/26239c502b379c2ee31a593168847701.png "Формат преобразования")

**Формат преобразования**

В react‑router можно использовать для дерева роутинга простой json объект.

Для построения дерева используется массив children.

Но проблема в том, что обращение по индексу `children[0].fullPath` — невозможно использовать.

Поэтому нужно преобразовать массивы children в дерево объектов и добавить полный путь до компонента:

![Схема преобразования JS объектов](https://habrastorage.org/getpro/habr/upload_files/30f/f7b/007/30ff7b007477a50364f1a70fc335f585.png "Схема преобразования JS объектов")

Схема преобразования JS объектов

**Дано:**

- интерфейс конфигурации конкретного роута из react-router;
- конфигурация роутинга на основе этого интерфейса;
- функция трансформирующая исходную конфигурацию в нужный нам вид.

**На выходе:**

Мы получаем финальный объект который нам позволяет извлекать пути следующим образом`ROUTES.tasks.task.fullPath` = `/tasks/:taskId`

![Схема преобразования TS типов](https://habrastorage.org/getpro/habr/upload_files/111/703/ea6/111703ea61c6af25a92054f6b472449a.png "Схема преобразования TS типов")

Схема преобразования TS типов

С типами нужно проделать примерно то же самое: к исходному интерфейсу `RouteObject` из react-router добавить `fullPath` с полным путем до экрана и заменить `path` как обычную строку, на path где будет константная строка из конфигурации:

```jsx
path: ":taskId";
fullPath: "/tasks/:taskId";
```

### Satisfies, as const, type assertion

```jsx
// Исходная конфигурация
export const ROUTES_CONFIG = {
  id: 'root',
  path: '',
  element: <App/>,
  children: [{
    path: 'tasks',
    id: 'tasks',
    element: <Tasks />,
    children: [
      { path: ':taskId',  id: 'task' }
    ]
  }]
} as const satisfies ReadonlyDeep<RouteObject>;
```

Первые ключевые слова которые нам встретились [**satisfies**](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html#the-satisfies-operator) и [**as const**](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions) это фундамент на котором держатся все остальные типы.

[**Type assertion**](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions) (приведение типов) — ключевое слово `as`.

```jsx
interface User {
  id: number;
  name: string;
}
// any -> User
const typeUser = user as User;
```

Ключевое слово `as const` позволяет преобразовать значение переменной в такой же тип

![Пример as const и satisfies](https://habrastorage.org/getpro/habr/upload_files/264/58d/d2c/26458dd2ca01746a0ccbaca4dad61259.png "Пример as const и satisfies")

Пример as const и satisfies

`Satisfies` позволяет валидировать, что значение удовлетворяет какому-то типу. **Но не приводит к нему.** В последнем примере мы не теряем тип `as const` но в тоже время проверяем чтобы в массиве не было ничего лишнего.

### Добавляем к объектам дерева полный путь до компонента

Для начала разберем вспомогательные типы, которые нам понадобятся позже:

```jsx
type ConstantRoute<
  FullPath extends string,
  Path extends string
> = Omit<RouteObject, 'path'> & {
  path: CurrentPath;
  fullPath: FullPath;
};
type ConcatPath<
  Path extends string,
  CurrentPath extends string> = `${Path}/${CurrentPath}`;
```

- `ConcatPath` соединяет сегменты path c помощью слеша
- `ConstantRoute` преобразует две входных строки в `object type` с ключами `path`, `fullPath` где будут лежать константы строк

Преобразуем эти типы в такие же JS функции

```jsx
export const constantRoute = (path: string, fullPath: string): {
  path: string;
  fullPath: string;
} => ({
  path,
  fullPath,
})

function concatPath(fullPath: string, path: string) {
  return replaceTrailingSlash(`${fullPath}/${path}`);
}
```

Здесь напомню, что у нас есть объект с конфигурацией `ROUTES_CONFIG` и самое сложное преобразовать тип объекта в такой же тип с полными путями.

```jsx
export const ROUTES_CONFIG = {
  id: 'root',
  path: '',
  element: <App/>,
  children: [{
    path: 'tasks',
    id: 'tasks',
    element: <Tasks />,
    children: [
      { path: ':taskId',  id: 'task' }
    ]
  }]
} as const satisfies ReadonlyDeep<RouteObject>;
```

Для этого нужно рекурсивно пройти по этому дереву и преобразовать следующим образом

**Было:**

```jsx
{
  children: [
    {
      path: "tasks",
      id: "tasks",
      children: [
        {
          path: ":taskId",
          id: "task",
        },
      ],
    },
  ];
}
```

**Стало:**

```jsx
{
  tasks: {
    path: 'tasks',
    fullPath: 'tasks',
    task: {
      path: ':taskId',
      fullPath: '/tasks/:taskId'
    }
  }
}
```

В этом нам помогут следующие типы:

```jsx
type MergeArrayOfObjects<T, Path extends string = ''> =
  T extends readonly [infer R, ...infer Rest]
    ? RecursiveValues<R, Path> & MergeArrayOfObjects<Rest, Path>
    : unknown;

type RecursiveTransform<
  T,
  Path extends string = ''
> = /* содержимое типа */
```

Первым разберем `MergeArrayOfObjects` , который преобразует массив объектов:

```jsx
type MergeArrayOfObjects<T, Path extends string = ''> =
  T extends readonly [infer R, ...infer Rest]
    ? RecursiveValues<R, Path> & MergeArrayOfObjects<Rest, Path>
    : unknown;
```

```jsx
export function mergeArrayOfObjects(arr: RouteObject[], path = '') {
  if (Array.isArray(arr)) {
    return;
  }
  const [first, ...rest] = arr;
  if (first == null) {
    return {}
  }
  return {
      ...recursiveValues(first, path),
      ...mergeArrayOfObjects(rest, path),
  };
}
```

| Описание                                               | TS                                            | JS                                     |     |
| ------------------------------------------------------ | --------------------------------------------- | -------------------------------------- | --- |
| **Rest Infer **Работает он также как и оператор spread | `[infer R, ...infer Rest]`                    | `const [first, ...rest] = arr`         |     |
| Условие прекращения рекурсии                           | `T extends readonly [infer R, ...infer Rest]` | `if (first == null) {   return {}   }` |

Опишем шаги рекурсии:

```jsx
const routeArr = [
  { id: 'tasks', path: '/tasks' },
  { id: 'home', path: '/home' }
];
expectTypeOf(routeArr).toMatchTypeOf<MergeArrayOfObjects<typeof routeArr>>();
// 1 шаг
T = typeof routeArr
// T extends readonly [infer R, ...infer Rest] === true
R = { id: 'tasks'; path: '/tasks' }
Rest = [{ id: 'home', path: '/home' }]
// R != unknown === true
MergeArrayOfObjects<Rest, Path>
// 2 шаг
T = [{ id: 'home', path: '/home' }]
// T extends readonly [infer R, ...infer Rest] === true
R = { id: 'home'; path: '/home' }
Rest = []
// R != unknown === true
MergeArrayOfObjects<Rest, Path>
// 3 шаг
T = []
// T extends readonly [infer R, ...infer Rest] === true
R = null
Rest = null
// R != unknown === false
// Окончание рекурсии
```

Разберем финальный тип:

```jsx
// проверям что объект содержит id и path, извлекаем исходные константы строк
// и трансформируем
// { id: 'tasks', children: [{ id: 'task' }] }
// -> {tasks: { task: {} }}
type RecursiveTransform<
  RouteObject,
  FullPath extends string = ''
> = RouteObject extends {
  id: infer Name extends string;
  path: infer Path extends string;
}
  ? TransformIdToProperty<Name, RouteObject, Path, FullPath>
  : { }


type TransformIdToProperty<
  ID extends string,
  RouteObject,
  Path extends string,
  FullPath extends string,
  // вкратце const = concatPath(fullPath,path), используем параметр вместо переменной
  ConcatedPath extends string = ConcatPath<FullPath, Path>
> = {
  // проверяем наличие children
  [Prop in ID]: RouteObject extends { children: infer Children }
    // рекурсивно преобразуем
    ? MergeArrayOfObjects<Children, ConcatedPath> & ConstantRoute<ConcatedPath, Path>
    : ConstantRoute<ConcatedPath, Path>
}
```

### Соединяем все вместе

```jsx
export const ROUTES_CONFIG = {
  id: 'root',
  path: '',
  element: <App/>,
  children: [{
    path: 'tasks',
    id: 'tasks',
    element: <Tasks />,
    children: [
      { path: ':taskId',  id: 'task' }
    ]
  }]
} as const satisfies ReadonlyDeep<RouteObject>;

type RoutesConfigType = typeof RecursiveTransform;

const transfromRoutes = (config: RouteObject, fullPath = '') => {
  // transform code
  return config as RecursiveTransform<RoutesConfigType>
}

const ROUTES = transfromRoutes(ROUTES_CONFIG);

// ROUTES type and ROUTES object имеют итоговую структуру
ROUTES = {
  root: {
    tasks: {
      path: 'tasks',
      fullPath: 'tasks',
      task: {
        path: ':taskId',
        fullPath: '/tasks/:taskId'
      }
    }
  }
}
```

Теперь мы можем использовать наш преобразованный объект:

```jsx
// to='/'
<Link to={ROUTES.root.fullPath}>Home</Link>
// to='/tasks
<Link to={ROUTES.root.tasks.fullPath}>Tasks</Link>

<Link
  // to='tasks/1'
  to={generatePath(
    ROUTES.root.tasks.task.fullPath,
    {
      taskId: item.id.toString(),
    }
  )}>
  {item.name}
</Link>
```

### В итоге мы научились использовать

- Generics ([https://www.typescriptlang.org/docs/handbook/2/generics.html](https://www.typescriptlang.org/docs/handbook/2/generics.html))
- Generic constraints ([https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints](https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints))
- Conditional Types ([https://www.typescriptlang.org/docs/handbook/2/conditional-types.html](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html))
- Infer /Rest infer ([https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#type-inference-in-conditional-types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#type-inference-in-conditional-types))
- Recursive types ([https://www.typescriptlang.org/play#example/recursive-type-references](https://www.typescriptlang.org/play#example/recursive-type-references))
- Satisfies ([https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html#the-satisfies-operator](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html#the-satisfies-operator))
- As const ([https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions))
- Написали типизированный роутинг

Поздравляю вы дошли до конца. Полный код, вы можете посмотреть в репозитории:

[https://github.com/Mozzarella123/typescript_routing](https://github.com/Mozzarella123/typescript_routing)

Для тех, кто хочет потренироваться в написании Typescript типов:

[https://github.com/type-challenges/type-challenges](https://github.com/type-challenges/type-challenges)
