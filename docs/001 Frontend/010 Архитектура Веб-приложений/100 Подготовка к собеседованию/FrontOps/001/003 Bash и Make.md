---
title: "Примитивные сборки: Bash и Make"
draft: true
tags:
  - Bash
  - Make
  - build
info:
---
## Примитивные сборки: Bash и Make

### Начальный этап автоматизации

Простейшие сборки писались на bash или с использованием Make. Основная задача заключалась в склеивании файлов для ускорения загрузки:

```bash
#!/bin/bash
# Простой скрипт сборки

# Объединение CSS файлов
cat src/css/reset.css src/css/main.css src/css/responsive.css > dist/app.css

# Объединение JavaScript файлов
cat src/js/utils.js src/js/main.js src/js/app.js > dist/app.js

# Минификация (если доступна)
if command -v uglifyjs &> /dev/null; then
    uglifyjs dist/app.js -o dist/app.min.js
fi

echo "Сборка завершена!"
```

Makefile пример:

```
# Makefile для простой сборки
CSS_FILES = src/css/reset.css src/css/main.css src/css/responsive.css
JS_FILES = src/js/utils.js src/js/main.js src/js/app.js

dist/app.css: $(CSS_FILES)
	cat $(CSS_FILES) > dist/app.css

dist/app.js: $(JS_FILES)
	cat $(JS_FILES) > dist/app.js

build: dist/app.css dist/app.js
	@echo "Сборка завершена!"

clean:
	rm -f dist/*

.PHONY: build clean
```

Эти подходы работали для простых проектов, но быстро становились неуправляемыми при росте сложности приложений.

___

