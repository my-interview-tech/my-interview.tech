---
title: getData()
draft: false
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#async"
  - "#тензор"
---
```html
   <div class="wrapper"></div>

   <div class="item item--template">
      <span class="name"></span>
      <div class="books"></div>
   </div>
```

```css
.item--template {
   display: none;
}

.item {
   margin-bottom: 12px;
}

.name {
   font-weight: bold;
}

.books {
   display: flex;
   flex-direction: column;
   padding-left: 8px;
}
```

```js
const users = [
   {
      name: 'Никита',
      books: [12, 35, 68, 90, 146]
   },
   {
      name: 'Арслан',
      books: [135, 24, 79]
   },
   {
      name: 'Александр',
      books: [12, 24, 35, 46, 57, 68, 79, 113, 68, 124, 135, 146, 90, 68]
   },
   {
      name: 'Андрей',
      books: [79, 12, 24, 46, 68, 79, 124, 135]
   },
   {
      name: 'Сергей',
      books: [79, 113, 124, 124, 135]
   }
];

const books = [
   {
      id: 12,
      name: 'Сборник сочинений',
      author: 'Иосиф Бродский'
   },
   {
      id: 24,
      name: 'Превращение',
      author: 'Франц Кафка'
   },
   {
      id: 35,
      name: 'Empire V',
      author: 'Виктор Пелевин'
   },
   {
      id: 46,
      name: 'Террор',
      author: 'Дэн Симмонс'
   },
   {
      id: 57,
      name: 'Рутина',
      author: 'Евгений Алёхин'
   },
   {
      id: 68,
      name: 'Симулякры и симуляция',
      author: 'Жан Бодрийяр'
   },
   {
      id: 79,
      name: 'Дюна',
      author: 'Френк Герберт'
   },
   {
      id: 113,
      name: 'Улитка на сколне',
      author: 'Аркадий и Борис Стругацкие'
   },
   {
      id: 124,
      name: 'Ночной дозор',
      author: 'Сергей Лукьяненко'
   },
   {
      id: 135,
      name: 'Тошнота',
      author: 'Жан Поль Сартр'
   },
   {
      id: 146,
      name: '1984',
      author: 'Джордж Оруэлл'
   },
   {
      id: 90,
      name: '451 градус по Фарингейту',
      author: 'Рей Брэдберри'
   }
];

function getData(data) {
   let resolver = null;
   const promise = new Promise((resolve) => resolver = resolve);

   setTimeout(() => resolver(data), 400);

   return promise;
}

const getUsers = () => getData(users);
const getBooks = () => getData(books);

// есть 2 функции getBooks и getUsers

// getBooks возвращает данные со структурой:
//   id: number - идентификатор книги
//   name: string - название книги
//   author: string - автор книги

// getUsers возвращает данные со структурой:
//   name: string - имя владельца книг(и)
//   books: number[] - массив идентификаторов книг

// нужно получить общий массив данных со структурой:
//   name: string - имя владельца книг(и)
//   books: {id: number, name: string, author: string}[] - структура из getBooks

// полученные данные нужно отрисовать без повторений через глобальную функцию injectData

// пример вызова функции
// у данных должна быть такая же структура
injectData([
   {
      name: 'Андрей',
      books: [
         {
            id: 12,
            name: 'Сборник сочинений',
            author: 'Иосиф Бродский'
         },
         {
            id: 79,
            name: 'Дюна',
            author: 'Френк Герберт'
         },
         {
            id: 146,
            name: '1984',
            author: 'Джордж Оруэлл'
         }
      ]
   },
   {
      name: 'Никита',
      books: [
         {
            id: 46,
            name: 'Террор',
            author: 'Дэн Симмонс'
         }
      ]
   },
   {
      name: 'Сергей',
      books: [
         {
            id: 12,
            name: 'Сборник сочинений',
            author: 'Иосиф Бродский'
         },
         {
            id: 24,
            name: 'Превращение',
            author: 'Франц Кафка'
         }
      ]
   }
]);

// _______________________________________

function injectData(data) {
   const template = document.querySelector('.item--template');
   const bookElem = document.createElement('span');
   const main = document.querySelector('.wrapper');
   const preparedData = [];

   bookElem.classList.add('book');

   let cloned;
   let booksWrapper;
   let clonedBookElem;

   data.forEach((userData) => {
      cloned = template.cloneNode(true);
      cloned.classList.remove('item--template');

      cloned.querySelector('.name').innerText = `пользователь: ${userData.name}`;
      booksWrapper = cloned.querySelector('.books');

      userData.books.forEach((book) => {
         clonedBookElem = bookElem.cloneNode(true);
         clonedBookElem.innerText = `автор: ${book.author}, название: ${book.name}`;

         booksWrapper.appendChild(clonedBookElem);
      });

      preparedData.push(cloned);
   });

   main.append(...preparedData);
}

//_______________________________________

```

___

[[011 Решение задач JS, TS и React|Назад]]