/**
 * @module scripts/frontmatter
 * @remarks Генерация uid/created_at/updated_at для staged файлов.
 */
import fs from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { globby } from "globby";
import matter from "gray-matter";
import { nanoid } from "nanoid";
import prettier from "prettier";

import { DOCS_DIR, DOCS_IGNORE } from "../config";
import { orderFrontmatter } from "../helpers";

const execFileAsync = promisify(execFile);
type GenerateOptions = {
    all: boolean;
};

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

async function getAllDocsFiles(): Promise<string[]> {
    return globby(["**/*.md"], {
        cwd: DOCS_DIR,
        absolute: true,
        ignore: DOCS_IGNORE,
    });
}

async function getCreatedAt(filePath: string): Promise<string | null> {
    try {
        const { stdout } = await execFileAsync("git", [
            "log",
            "--follow",
            "--diff-filter=A",
            "--format=%aI",
            "--reverse",
            "--",
            filePath,
        ]);

        const line = stdout.split(/\r?\n/).find((value) => value.trim().length > 0);

        return line ? line.trim() : null;
    } catch {
        return null;
    }
}

async function updateFile(filePath: string, nowIso: string): Promise<boolean> {
    const raw = await fs.readFile(filePath, "utf8");
    const parsed = matter(raw);
    const data = { ...(parsed.data as Record<string, unknown>) };

    let changed = false;

    if (!("uid" in data)) {
        data.uid = nanoid();
        changed = true;
    }

    if (!("created_at" in data)) {
        const createdAt = await getCreatedAt(filePath);
        data.created_at = createdAt ?? nowIso;
        changed = true;
    }

    if (changed) {
        data.updated_at = nowIso;
        const updated = matter.stringify(parsed.content, orderFrontmatter(data));
        const formatted = await prettier.format(updated, {
            filepath: filePath,
            parser: "markdown"
        });
        await fs.writeFile(filePath, formatted, "utf8");
    }

    return changed;
}

async function stageFile(filePath: string): Promise<void> {
    await execFileAsync("git", ["add", "--", filePath]);
}

/**
 * Генерирует uid/created_at/updated_at для файлов.
 * В режиме all обрабатывает все docs/*.md, иначе только staged.
 */
export async function runGenerate(options: GenerateOptions): Promise<void> {
    const files = options.all ? await getAllDocsFiles() : await getStagedFiles();
    if (files.length === 0) {
        console.log("generate: нет файлов для обработки.");
        return;
    }

    const nowIso = new Date().toISOString();
    let changedCount = 0;
    let failedCount = 0;

    for (const file of files) {
        try {
            const changed = await updateFile(file, nowIso);

            if (changed) {
                changedCount += 1;
                console.log(`✓ ${file}`);
                if (!options.all) {
                    await stageFile(file);
                }
            }
        } catch (error) {
            failedCount += 1;
            console.error(`✗ ${file}`, error);
        }
    }

    const mode = options.all ? "all" : "staged";
    const icon = changedCount > 0 ? "✅" : "ℹ️";

    console.log(`\n${icon} Генерация завершена:`);
    console.log(`   Режим: ${mode}`);
    console.log(`   Обработано файлов: ${files.length}`);
    console.log(`   Изменено: ${changedCount}`);
    if (failedCount > 0) {
        console.log(`   ❌ Ошибок: ${failedCount}`);
    }

    if (failedCount > 0) {
        throw new Error(`generate: failed files=${failedCount}`);
    }
}

