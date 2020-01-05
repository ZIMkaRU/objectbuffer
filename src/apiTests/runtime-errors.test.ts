/* eslint-env jest */

import * as util from "util";

import { createObjectBuffer } from "../";
import { memoryStats } from "../internal/api";
import { externalArgsApiToExternalArgsApi } from "../internal/utils";

// actually not very good, as the browser's TextEncoder won't work with SAB, but node will.
describe("Runtime errors", () => {
  const externalArgs = externalArgsApiToExternalArgsApi({
    textEncoder: new util.TextEncoder(),
    textDecoder: new util.TextDecoder(),
    arrayAdditionalAllocation: 0,
    minimumStringAllocation: 0
  });

  test("Fail to create when not enough memory", () => {
    expect(() => {
      createObjectBuffer(externalArgs, 8, { value: "" });
    }).toThrowErrorMatchingInlineSnapshot(`"Invalid typed array length: 7"`);
  });

  test("Fail to set new data when enough memory", () => {
    const objectBuffer = createObjectBuffer<any>(externalArgs, 256, {
      value: "first value 123"
    });
    const freeSpaceLeft = memoryStats(objectBuffer).available;

    expect(() => {
      objectBuffer.anotherValue = "1".repeat(512);
    }).toThrowErrorMatchingInlineSnapshot(`"OutOfMemoryError"`);

    expect(memoryStats(objectBuffer).available).toEqual(freeSpaceLeft);
    expect(freeSpaceLeft).toMatchInlineSnapshot(`8`);

    expect(objectBuffer).toMatchInlineSnapshot(`
      Object {
        "value": "first value 123",
      }
    `);
  });
});