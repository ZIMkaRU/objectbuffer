export const LOCK_OFFSET = 0;
export const INITIAL_ENTRY_POINTER_TO_POINTER =
  LOCK_OFFSET + Uint32Array.BYTES_PER_ELEMENT;

export const INITIAL_ENTRY_POINTER_VALUE =
  INITIAL_ENTRY_POINTER_TO_POINTER + Uint32Array.BYTES_PER_ELEMENT;

export const MEM_POOL_START =
  INITIAL_ENTRY_POINTER_VALUE + Uint32Array.BYTES_PER_ELEMENT;
