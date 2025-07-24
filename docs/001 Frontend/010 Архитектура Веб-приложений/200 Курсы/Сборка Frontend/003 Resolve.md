
**Resolver** - алгоритм нахождения по использованию символа в коде его декларации

require('./a')

В чем сложность задачи?

## Откуда может быть взят модуль?

* относительный путь
* абсолютный путь
* путь с алиасом
* из node_modules (б импорт)
* из global
* symlink

Еще нужно учитывать
* built in nodejs module.
* extension [.js .mjs .cjs .json .ts .tsx .jsx].
* специфичные для resolve системы механизмы.
* resolve может работать не только на файловой системе (https, virtual).

require('path')-?

### Resolve алгоритмы

* commonja
* es modules
* node: path module
* typescript (tsconfig paths)
* webpack (enhanced resolve)
* rspack resolver
* vite / rollup (plugin-alias / plugin-node-resolve)

### CommonJS

* require, module.exports
* расширение можно не указывать
* .js .json
* require folder [index.js]
* только синхронное подключение
* можно вызвать где угодно

#### node_modules resolution

```js
require('react')
```

##### Дополнительно использует легаси пути
$NODE_PATH

Legacy resolve:
$HOME/.node_modules
$HOME/.node_libraries
$PREFIX/lib/node

#### Resolve inside node_modules

```js
require('webpack/lib/DefinePlugin')

require('webpack')
```

Список зарезеревированных слов в nodejs/js

##### Resolve without require

Spec

```js
require.resolve('webpack')
```

##### Runtime consts

`__filename `- путь до исполняемого файла
`__dirname` - путь до директории где расположен исполняемый файл

используется для resolve, например если файл к которому обращаешься формата yaml.
История уникальна для commonJS

### ESM

* import, export, export default
* расширение обязательно
* .js
* нельзя подключить папку
* синхронное и асинхронное подклбчение
* только асинхронное подключение можно вызывать где угодно

#### import assert / attributes

Spec

```js
import json from './foo.json' with { type: 'json' }
import('foo.json', { with: {type: 'json' } } )
```

#### Главная идея ESM

Универсальная система для работы в nodejs и браузере

#### Resolve settings

##### alias

```js
import { Cache } from '../../../../cache'

import { Cache } from '@components'
```

##### package.json imports

```json
{
	"name": 'my-package',
	"imports": {
		"#utils": './src/utils',
		"#cache": './src/modules/cache'
	}
}
```

##### import map

spec
caniuse

```html
<script type='importmap'>
	{
		"imports": {
			"circle": 'https//example.com/shapes/circle.js',
			"square": './modules/shapes/square.js'
		}
	}
</scripts>
```

CommonJS умеет работать с расширениями CJS - .js, .cjs .mjs .json ...
ESM - .js .cjs .mjs
.js .mjs .cjs .jsx

##### Symlinks

Есть hardlink, есть symlink
Для чего он нужен в контексте сборки?

npm link // yarn link 

есть yulp для тестирования сборок.

### Resolve системы

#### typescript paths

TsConfig paths

```json
{
...
}
```

Typescript & modules

### Webpack

enhanced-resolve

```js
const resolve = require('enhanced-resolve')

...
```

частоиспользуемые расширения необходимо выносить вперед в extension

#### Rspack

Oxc resolver
Rspack-resolver - Oxc resolver fork [rust]
Compatible API with enhanced-resolve

сборщик яндекс который занимался бэм модулями - изучить