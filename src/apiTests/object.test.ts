/* eslint-env jest */

import * as util from "util";

import { createObjectBuffer } from "../";
import { memoryStats } from "../internal/api";
import { externalArgsApiToExternalArgsApi } from "../internal/utils";

describe("object tests", () => {
  const externalArgs = externalArgsApiToExternalArgsApi({
    textEncoder: new util.TextEncoder(),
    textDecoder: new util.TextDecoder()
  });

  test("delete object prop", () => {
    const objectBuffer = createObjectBuffer<any>(externalArgs, 1024, {});
    expect(memoryStats(objectBuffer).available).toMatchInlineSnapshot(`872`);

    objectBuffer.foo = "a";
    expect(memoryStats(objectBuffer).available).toMatchInlineSnapshot(`800`);

    delete objectBuffer.foo;

    expect(memoryStats(objectBuffer).available).toMatchInlineSnapshot(`872`);
    expect(objectBuffer).toMatchInlineSnapshot(`Object {}`);
  });

  test("Basic object with values", () => {
    const input = {
      a: 1,
      b: true,
      c: false,
      d: null,
      e: undefined,
      foo: { a: 1, b: true, c: false, d: null, e: undefined }
    };

    const objectBuffer = createObjectBuffer<any>(externalArgs, 1024, input);
    expect(memoryStats(objectBuffer).available).toMatchInlineSnapshot(`96`);
    expect(input).toEqual(objectBuffer);
    expect(objectBuffer).toMatchInlineSnapshot(`
      Object {
        "a": 1,
        "b": true,
        "c": false,
        "d": null,
        "e": undefined,
        "foo": Object {
          "a": 1,
          "b": true,
          "c": false,
          "d": null,
          "e": undefined,
        },
      }
    `);
  });
});
