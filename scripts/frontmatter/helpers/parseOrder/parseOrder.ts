
/**
 * Извлекает порядок из имени файла (например, "001 File.md" → 1).
 */
export const parseOrder = (fileName: string): number => {
    const match = /^(\d+)[\s._-]/.exec(fileName);

    if (!match) return 0;

    return Number(match[1]);
}
