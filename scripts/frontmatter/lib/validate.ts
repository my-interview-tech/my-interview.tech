/**
 * @module scripts/frontmatter
 * @remarks Валидация обязательных полей frontmatter.
 */

import fs from "node:fs/promises";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { globby } from "globby";
import matter from "gray-matter";

import {
  DOCS_DIR,
  DOCS_IGNORE,
  deriveFromPath,
  loadCategoryMapping,
} from "../config/index.js";

import { FileIssue, formatIssues, pickFields } from "../helpers";
import { ARRAY_STRING_FIELDS } from "../constants";

type FrontmatterData = Record<string, unknown>;

/** Проверяет типы значений во frontmatter и возвращает список ошибок. */
const validateTypes = (data: FrontmatterData): string[] => {
  const issues: string[] = [];

  for (const field of pickFields((field) => field.type === "string")) {
    if (field in data && typeof data[field] !== "string") {
      issues.push(`${field}: invalid type`);
    }
  }

  for (const field of pickFields((field) => field.type === "number")) {
    if (field in data && typeof data[field] !== "number") {
      issues.push(`${field}: invalid type`);
    }
  }

  for (const field of pickFields((field) => field.type === "array")) {
    if (field in data && !Array.isArray(data[field])) {
      issues.push(`${field}: invalid type`);
    }
  }

  for (const field of pickFields((field) => field.type === "boolean")) {
    if (field in data && typeof data[field] !== "boolean") {
      issues.push(`${field}: invalid type`);
    }
  }

  for (const field of ARRAY_STRING_FIELDS) {
    if (field in data && Array.isArray(data[field])) {
      const allStrings = data[field].every((item) => typeof item === "string");

      if (!allStrings) {
        issues.push(`${field}: invalid items`);
      }
    }
  }

  return issues;
}

type ValidateMissingOptions = {
  data: FrontmatterData;
  specialty: string | undefined;
};

const REQUIRED_VALIDATE_FIELDS = pickFields((field) => field.required);

/** Проверяет наличие обязательных полей в frontmatter и возвращает список ошибок. */
const validateMissing = ({ data, specialty }: ValidateMissingOptions): string[] => {
  const issues: string[] = [];

  for (const field of REQUIRED_VALIDATE_FIELDS) {
    if (!(field in data)) {
      issues.push(`${field}: missing`);
    }
  }

  if (!("specialty" in data) && !specialty) {
    issues.push("specialty: no mapping");
  }

  return issues;
}

/** Выполняет команду git diff и возвращает список файлов в staged состоянии. */
const execFileAsync = promisify(execFile);

/** Получает список файлов в staged состоянии. */
async function getStagedFiles(): Promise<string[]> {
  const { stdout } = await execFileAsync("git", [
    "diff",
    "--cached",
    "--name-only",
    "--diff-filter=ACMR",
  ]);

  return stdout
    .split(/\r?\n/)
    .map((file) => file.trim())
    .filter(Boolean)
    .filter((file) => file.startsWith(`${DOCS_DIR}/`) && file.endsWith(".md"));
}

type ValidateOptions = {
  staged: boolean;
};

/** Валидирует frontmatter файлов. */
export async function runValidate(options: ValidateOptions): Promise<FileIssue[]> {
  const mapping = await loadCategoryMapping();

  const files = options.staged
    ? await getStagedFiles()
    : await globby(["**/*.md"], {
      cwd: DOCS_DIR,
      absolute: true,
      ignore: DOCS_IGNORE,
    });

  const issues: FileIssue[] = [];

  for (const file of files) {
    const raw = await fs.readFile(file, "utf8");
    const parsed = matter(raw);
    const relPath = path.relative(DOCS_DIR, file);
    const derived = deriveFromPath(relPath);
    const specialty = mapping[derived.technology];

    const fileIssues = [
      ...validateMissing({ data: parsed.data, specialty }),
      ...validateTypes(parsed.data as FrontmatterData),
    ];

    if (fileIssues.length > 0) {
      issues.push({ file: relPath, issues: fileIssues });
    }
  }

  return issues;
}