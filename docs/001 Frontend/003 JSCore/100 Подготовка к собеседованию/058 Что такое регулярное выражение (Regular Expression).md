---
uid: 70ENct5j9sftdAxoRJGTI
title: Что такое регулярное выражение (Regular Expression)?
tags:
  - "#JavaScript"
  - "#regularExpression"
info:
  - "https://www.honeybadger.io/blog/javascript-regular-expressions/"
draft: false
technology: JSCore
specialty: Frontend
tools: []
order: 58
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

![[Pasted image 20230702125300.png|600]]

_Регулярное выражение (Regular Expression)_, также известное как RegEx или RegExp, - это последовательность символов, которая определяет шаблон поиска текста. Они используются для поиска и замены текста в строках, основанных на заданном шаблоне.

Регулярные выражения могут содержать специальные символы, которые представляют собой определенные типы символов, например, цифры, буквы, пробелы и т.д. Они также могут содержать специальные символы, которые определяют определенные шаблоны поиска, такие как начало строки (^), конец строки ($), любой символ (.), повторение ( \* ) , альтернатива ( | ) и т.д.

Например, следующее регулярное выражение соответствует любой строке, которая содержит слово "hello":

```javascript
/hello/;
```

А следующее регулярное выражение соответствует любой строке, которая начинается с цифры и заканчивается буквой "a":

```javascript
/^\d.*a$/;
```

Регулярные выражения могут использоваться в JavaScript для поиска и замены текста в строках, валидации введенных данных пользователем на формах, а также для других задач, связанных с обработкой текстовых данных.

В JavaScript, регулярные выражения создаются с помощью конструктора `RegExp` или с помощью литерала регулярного выражения (`/.../`). Они могут быть использованы с методами строк, такими как `match()`, `replace()`, `search()` и `split()`, чтобы выполнить различные операции с текстом.

```Javascript
Palindrome

const regex = /\b(\w)(\w)?(\w)?\w?\3\2\1\b/g;

//    \b - spaces around the words / numbers
//    (\w) - first symbol
//    (\w)? - find out how many symbols in word/number
//    \b(\w)(\w)?(\w)?\w?\3\2\1\b checking for palyndrome
//        1   2    3    4 5 6 7

//    7th symbol must match 1 sub expression, 6 = 2, 5 = 3 and 4th symbol in the middle.
//    So \3 checks if the 5th symbol equal 3rd subexpression, /2 - if the 6th symbol match 2nd subexpression, /1 - if the 7th symbol math 1st subexpression.

//    for example str   '   A   B   C   D  C B A  '
//    regex             \b(\w)(\w)(\w)(\w)\3\2\1\\b
//    sub expression №      1   2   3   4

describe("Tests", () => {
  it("test", () => {
    Test.assertSimilar("aa bbb cccc ddddd eeeeee fffffff".match(regex), [ 'aa', 'bbb', 'cccc', 'ddddd', 'eeeeee', 'fffffff' ]);
    Test.assertSimilar("aaa bcccd".match(regex), [ 'aaa' ]);
    Test.assertSimilar("_x_x_ --- ~~|~~".match(regex), [ '_x_x_' ]);
    Test.assertSimilar("ABCDCBA ABABABA".match(regex), [ 'ABCDCBA', 'ABABABA' ]);
    Test.assertSimilar("121 1221 13577531 11211".match(regex) , [ '121', '1221', '11211' ]);
    Test.assertSimilar("aabbbcccc d".match(regex), null);
    Test.assertSimilar("abbA CdDc".match(regex), null);
    Test.assertSimilar("1    1".match(regex), null  );
    Test.assertSimilar("1231 12341 123451 1234561".match(regex), null  );

  });
});
```

---

[[003 JSCore|Назад]]
