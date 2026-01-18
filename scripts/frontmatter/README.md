### Frontmatter

#### Назначение
Сервис управляет frontmatter в markdown-файлах документации. 

Он:
- генерирует uid/created_at/updated_at;
- валидирует обязательные поля и типы;
- автозаполняет поля из структуры папок и маппинга.

#### Точка входа
CLI: scripts/frontmatter/cli/index.ts

#### Команды

1) Генерация метаданных (staged)
   npm run frontmatter -- generate

2) Генерация метаданных по всем docs (разовый прогон)
   npm run frontmatter -- generate --all

3) Валидация всех docs
   npm run frontmatter -- check

4) Валидация staged
   npm run frontmatter -- check --staged

5) Автозаполнение обязательных полей
   npm run frontmatter -- update

#### Структура

scripts/frontmatter/
  cli/           - CLI-обертка
  lib/           - generate/update/validate
  config/        - конфигурация и category-mapping.yaml
  constants/     - константы (ARRAY_STRING_FIELDS и др.)
  helpers/       - утилиты

#### Правила

1) Порядок ключей в frontmatter приводится к порядку FIELD_DEFS.
2) uid/created_at/updated_at обязательны.
3) tags/info проверяются как string[].
4) specialty берется из category-mapping.yaml, включая значение All.

#### Маппинг категорий

Файл: scripts/frontmatter/config/category-mapping.yaml

specialtyByCategory:
  Frontend: Frontend
  Backend: Backend
  Git: All
  Паттерны: All
  INFOSEC: All

#### Переменные окружения

FRONTMATTER_DOCS_DIR   - корень docs (по умолчанию: docs)
FRONTMATTER_MAPPING_PATH - путь к category-mapping.yaml

#### Pre-commit

.husky/pre-commit:
- npm run frontmatter -- generate
- npm run frontmatter -- check --staged
