import fs from "node:fs/promises";
import path from "node:path";
import { globby } from "globby";
import matter from "gray-matter";
import prettier from "prettier";

import {
  DOCS_DIR,
  DOCS_IGNORE,
  deriveFromPath,
  loadCategoryMapping,
} from "../config";

import { FieldKey, FileIssue, formatIssues, orderFrontmatter, pickFields, stripOrderPrefix } from "../helpers";
import { DEFAULTS } from "../constants";

type FrontmatterData = Record<string, unknown>;
type MissingFields = {
  data: FrontmatterData;
  specialty: string | undefined;
}

/** Поля, которые автозаполняются в update-скрипте. */
export const REQUIRED_FIELDS = pickFields((field) => field.update);

const isMissingField = (data: FrontmatterData, field: string): boolean => !(field in data);

/**
 * Собирает список отсутствующих обязательных полей для автозаполнения.
 * Если отсутствует `specialty` и нет маппинга из категории, добавляет пометку "specialty (no mapping)".
 */
const buildMissingFields = ({ data, specialty }: MissingFields): string[] => {
  const missing: string[] = REQUIRED_FIELDS.filter((field) => isMissingField(data, field));

  if (missing.includes("specialty") && !specialty) {
    missing.push("specialty (no mapping)");
  }

  return missing;
}


type ApplyDefaultsOptions = {
  data: FrontmatterData;
  derived: ReturnType<typeof deriveFromPath>;
  specialty: string | undefined;
  filename: string;
}

type ApplyDefaultsResult = {
  next: FrontmatterData;
  changed: boolean;
}

type DefaultsValue = {
  field: FieldKey;
  value: () => unknown;
}

/**
 * Применяет дефолтные значения к frontmatter для отсутствующих полей.
 * Значения берутся из пути файла (derived) или констант (DEFAULTS).
 * Пропускает поля, если значение undefined/null/пустая строка.
 */
const applyDefaults = ({ data, derived, specialty, filename }: ApplyDefaultsOptions): ApplyDefaultsResult => {
  const next: FrontmatterData = { ...data };
  let changed = false;

  // Создаём title из имени файла без префикса и без расширения .md
  const titleFromFilename = () => {
    const nameWithoutExt = filename.replace(/\.md$/, '');
    return stripOrderPrefix(nameWithoutExt);
  };

  const DEFAULTS_VALUES: Array<DefaultsValue> = [
    { field: "title", value: titleFromFilename },
    { field: "order", value: () => derived.order },
    { field: "technology", value: () => derived.technology },
    { field: "specialty", value: () => specialty },
    { field: "tools", value: () => DEFAULTS.tools },
    { field: "chapter", value: () => DEFAULTS.chapter },
    { field: "access", value: () => DEFAULTS.access },
  ];

  for (const { field, value } of DEFAULTS_VALUES) {
    if (!isMissingField(next, field)) continue;

    const resolved = value();
    if (resolved === undefined || resolved === null || resolved === "") continue;

    next[field] = resolved;
    changed = true;
  }

  return { next, changed };
}

/**
 * Обновляет frontmatter во всех markdown-файлах в docs/.
 * Автозаполняет отсутствующие обязательные поля из пути файла и маппинга категорий.
 */
export async function runUpdate(): Promise<void> {
  const mapping = await loadCategoryMapping();

  const files = await globby(["**/*.md"], {
    cwd: DOCS_DIR,
    absolute: true,
    ignore: DOCS_IGNORE,
  });

  const issues: FileIssue[] = [];
  let changedCount = 0;

  for (const file of files) {
    const raw = await fs.readFile(file, "utf8");
    const parsed = matter(raw);
    const relPath = path.relative(DOCS_DIR, file);
    const derived = deriveFromPath(relPath);
    const specialty = mapping[derived.technology];
    const filename = path.basename(file);

    const { next, changed } = applyDefaults(
      { data: parsed.data, derived, specialty, filename },
    );

    const missing = buildMissingFields({ data: parsed.data, specialty });

    if (missing.length > 0) {
      issues.push({ file: relPath, missing });
    }

    if (changed) {
      changedCount += 1;
      console.log(`✓ ${relPath}`);
      const updated = matter.stringify(parsed.content, orderFrontmatter(next));
      const formatted = await prettier.format(updated, {
        filepath: file,
        parser: "markdown"
      });
      await fs.writeFile(file, formatted, "utf8");
    }
  }

  if (issues.length > 0) {
    const totalIssues = issues.reduce((sum, issue) => {
      const items = issue.missing ?? [];
      return sum + items.length;
    }, 0);

    console.log(`\n⚠️  Есть файлы с отсутствующими полями frontmatter:`);
    console.log(`   Файлов с проблемами: ${issues.length}`);
    console.log(`   Всего отсутствующих полей: ${totalIssues}`);
    console.log(formatIssues(issues));
  }

  console.log(`\n✅ Готово. Обновлено файлов: ${changedCount}.`);
}

