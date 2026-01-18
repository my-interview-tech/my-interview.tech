import { FIELD_DEFS } from "../../constants";

export type FieldKey = keyof typeof FIELD_DEFS;
type FieldDef = (typeof FIELD_DEFS)[FieldKey];

const fieldKeys = Object.keys(FIELD_DEFS) as FieldKey[];

/**
 * Возвращает ключи полей, подходящие под заданный predicate.
 */
export const pickFields = (predicate: (field: FieldDef) => boolean): FieldKey[] =>
  fieldKeys.filter((key) => predicate(FIELD_DEFS[key]));
