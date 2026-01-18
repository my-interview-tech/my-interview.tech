/**
 * Убирает числовой префикс из имени (например, "001 Example" → "Example").
 */
export const stripOrderPrefix = (name: string): string => {
    return name.replace(/^\d+\s+/, "").trim();
}