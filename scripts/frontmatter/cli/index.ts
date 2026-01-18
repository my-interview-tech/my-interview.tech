import { formatIssues } from "../helpers";
import { runGenerate, runUpdate, runValidate } from "../lib";

type Command = "check" | "update" | "generate";

const hasFlag = (flag: string): boolean => process.argv.includes(flag);

async function main(): Promise<void> {
    const command = process.argv[2] as Command | undefined;

    switch (command) {
        case "check": {
            const issues = await runValidate({ staged: hasFlag("--staged") });

            if (issues.length > 0) {
                const totalIssues = issues.reduce((sum, issue) => {
                    const items = issue.issues ?? issue.missing ?? [];

                    return sum + items.length;
                }, 0);

                console.log(`\n❌ Найдены проблемы с frontmatter:`);
                console.log(`   Файлов с проблемами: ${issues.length}`);
                console.log(`   Всего проблем: ${totalIssues}`);
                console.log(formatIssues(issues));

                process.exit(1);
            }

            console.log("\n✅ Frontmatter валиден.");
            break;
        }
        case "update": {
            await runUpdate();
            break;
        }
        case "generate": {
            await runGenerate({ all: hasFlag("--all") });
            break;
        }
        default: {
            console.log(
                [
                    "Usage:",
                    "  frontmatter check [--staged]",
                    "  frontmatter update",
                    "  frontmatter generate [--all]",
                ].join("\n"),
            );

            process.exit(1);
        }
    }
}

main().catch((error) => {
    console.error('❌', { error });
    process.exit(1);
});
