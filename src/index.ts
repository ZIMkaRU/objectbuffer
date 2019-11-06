/**
 * Basic usage (Browser):
 *
 * ```js
[[include:docs/codeExamples/basicUsage.js]]
 * ```

 */ /** */

export {
  createObjectBuffer,
  resizeObjectBuffer,
  getUnderlyingArrayBuffer,
  loadObjectBuffer,
  replaceUnderlyingArrayBuffer,
  sizeOf,
  memoryStats,
  disposeWrapperObject
} from "./internal/api";
export { acquireLock, acquireLockWait, releaseLock } from "./internal/locks";
export type ExternalArgs = import("./internal/interfaces").ExternalArgsApi;
export type CreateObjectBufferOptions = import("./internal/api").CreateObjectBufferOptions;
