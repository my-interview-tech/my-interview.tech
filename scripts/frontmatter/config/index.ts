import fs from "node:fs/promises";
import path from "node:path";
import yaml from "js-yaml";
import { parseOrder, stripOrderPrefix } from "../helpers";

export const DOCS_DIR = process.env.FRONTMATTER_DOCS_DIR ?? "docs";
export const DOCS_IGNORE = ["**/img/**", "**/sidian/**", "**/.obsidian/**"];

const CATEGORY_MAPPING_PATH =
  process.env.FRONTMATTER_MAPPING_PATH ??
  path.join("scripts", "frontmatter", "config", "category-mapping.yaml");


type DerivedValues = {
  category: string;
  technology: string;
  chapter: string;
  order: number;
};

/**
 * Получает derived-поля из относительного пути документа.
 */
export function deriveFromPath(relPath: string): DerivedValues {
  const segments = relPath.split(path.sep).filter(Boolean);
  const fileName = segments.at(-1) ?? "";
  const categoryRaw = segments[0] ?? "";
  
  // Определяем technology:
  // Для файлов типа "100 Git\..." technology = category
  // Для файлов типа "001 Frontend\003 JSCore\..." technology = segments[1]
  const category = stripOrderPrefix(categoryRaw);
  let technologyRaw: string;
  
  // Если категория начинается с цифр (100, 200, 300), то это уже technology
  if (/^\d+/.test(categoryRaw) && segments.length >= 2) {
    technologyRaw = categoryRaw;
  } else {
    technologyRaw = segments[1] ?? categoryRaw;
  }
  
  const chapterRaw = segments[2] ?? "";

  // Убираем расширение .md из technology если это файл
  let technology = stripOrderPrefix(technologyRaw);
  if (technology.endsWith('.md')) {
    technology = technology.slice(0, -3);
  }

  return {
    category,
    technology,
    chapter: stripOrderPrefix(chapterRaw),
    order: parseOrder(fileName),
  };
}

type TechnologyConfig = {
  specialty: string;
  priority: number;
  description: string;
};

type CategoryMapping = Record<string, string>;

/**
 * Загружает маппинг технологии → specialty из YAML.
 * Поддерживает две структуры:
 * 1. Старая: specialtyByCategory: { Technology: "Specialty" }
 * 2. Новая: { Technology: { specialty: "Specialty", priority: 1, description: "..." } }
 */
export async function loadCategoryMapping(): Promise<CategoryMapping> {
  const raw = await fs.readFile(CATEGORY_MAPPING_PATH, "utf8");
  const parsed = (yaml.load(raw) ?? {}) as Record<string, unknown>;
  
  // Проверяем старый формат с ключом specialtyByCategory
  const mapping =
    (parsed.specialtyByCategory as Record<string, unknown> | undefined) ??
    parsed;

  const result: CategoryMapping = {};

  for (const [key, value] of Object.entries(mapping)) {
    // Старый формат: просто строка
    if (typeof value === "string") {
      result[key] = value;
      continue;
    }

    // Новый формат: объект с полями specialty, priority, description
    if (typeof value === "object" && value !== null) {
      const config = value as TechnologyConfig;
      if (typeof config.specialty === "string") {
        result[key] = config.specialty;
      }
    }
  }

  return result;
}
