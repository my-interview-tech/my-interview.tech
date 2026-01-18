export type FileIssue = {
    file: string;
    issues?: string[];
    missing?: string[];
};

export const formatIssues = (issues: FileIssue[]): string =>
    issues
        .map((issue) => {
            const items = issue.issues ?? issue.missing ?? [];
            const formattedItems = items.map(item => `    • ${item}`).join("\n");
            return `\n  ${issue.file}\n${formattedItems}`;
        })
        .join("\n");
