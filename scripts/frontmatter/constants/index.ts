
export const FIELD_DEFS = {
    uid: { required: true, type: "string", update: true },
    title: { required: true, type: "string", update: false },
    subtitle: { required: false, type: "string", update: false },
    description: { required: false, type: "string", update: false },
    tags: { required: false, type: "array", update: false },
    info: { required: false, type: "array", update: false },
    draft: { required: false, type: "boolean", update: false },
    technology: { required: true, type: "string", update: true },
    specialty: { required: true, type: "string", update: true },
    tools: { required: true, type: "array", update: true },
    chapter: { required: false, type: "string", update: true },
    order: { required: true, type: "number", update: true },
    access: { required: true, type: "string", update: true },
    created_at: { required: true, type: "string", update: true },
    updated_at: { required: true, type: "string", update: true },
} as const;

export const DEFAULTS = {
    tools: [] as string[],
    chapter: "",
    access: "free",
};

export const ARRAY_STRING_FIELDS = ["tags", "info"] as const;