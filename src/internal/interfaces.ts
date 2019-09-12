import { ENTRY_TYPE } from "./entry-types";

export type primitive = string | number | bigint | boolean | undefined | null;

export type Entry =
  | NullEntry
  | NullUndefined
  | BooleanEntry
  | StringEntry
  | NumberEntry
  | BigIntEntry
  | UBigIntEntry
  | ObjectEntry
  | ObjectPropEntry
  | ArrayEntry
  | ArrayItemEntry;

export interface NullEntry {
  type: ENTRY_TYPE.NULL;
}

export interface NullUndefined {
  type: ENTRY_TYPE.UNDEFINED;
}

export interface BooleanEntry {
  type: ENTRY_TYPE.BOOLEAN;
  value: boolean;
}

export interface StringEntry {
  type: ENTRY_TYPE.STRING;
  value: string;
}

export interface NumberEntry {
  type: ENTRY_TYPE.NUMBER;
  value: number;
}

export interface BigIntEntry {
  type: ENTRY_TYPE.BIGINT;
  value: bigint;
}

export interface UBigIntEntry {
  type: ENTRY_TYPE.UBIGINT;
  value: bigint;
}

export interface ObjectEntry {
  type: ENTRY_TYPE.OBJECT;
  /**
   * Pointer to first prop
   * */
  value: number;
}

export interface ObjectPropEntry {
  type: ENTRY_TYPE.OBJECT_PROP;
  /**
   * Location of next element
   */
  value: {
    key: string;
    /**
     * Pointer to value entry
     */
    value: number;
    /**
     * Pointer to next prop
     */
    next: number;
  };
}

export interface ArrayEntry {
  type: ENTRY_TYPE.ARRAY;
  // pointer to the first array item
  value: number;
}

export interface ArrayItemEntry {
  type: ENTRY_TYPE.ARRAY_ITEM;
  value: {
    // pointer to value entry
    value: number;
    // pointer to next prop
    next: number;
  };
}