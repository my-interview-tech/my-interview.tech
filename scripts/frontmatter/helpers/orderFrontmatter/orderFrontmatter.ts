import { FIELD_DEFS } from "../../constants";

/**
 * Приводит порядок ключей frontmatter к порядку FIELD_DEFS.
 */
export function orderFrontmatter<T extends Record<string, unknown>>(data: T): T {
  const ordered: Record<string, unknown> = {};
  const fieldOrder = Object.keys(FIELD_DEFS);

  for (const key of fieldOrder) {
    if (key in data) ordered[key] = data[key];
  }

  for (const key of Object.keys(data)) {
    if (!(key in ordered)) ordered[key] = data[key];
  }

  return ordered as T;
}
