import type { createObjectBuffer as createObjectBufferType } from "../src";

import { Suite } from "benchmark";
// @ts-expect-error arbitrary json
import oneComment from "./fixtures/oneComment.json";
// @ts-expect-error arbitrary json
import K1000RowsMockData from "./fixtures/MOCK_DATA.json";

const EXPECTED_MAX_ITERATIONS = 1000;
const COMMENTS_ARR_SIZE = 2500;
const MIN_SAMPLES = 5;
const arrOfComments = Array.from({ length: COMMENTS_ARR_SIZE }, () => ({
  ...oneComment,
}));

export function savingAndCreatingSuite(
  createObjectBuffer: typeof createObjectBufferType
) {
  global.testTargetIndex = 0;
  global.testTargets = [];

  const suite = new Suite("savingAndCreatingSuite");

  return suite
    .add(
      `create empty, size: 1e6`,
      () => {
        createObjectBuffer({}, 1e6, {});
      },
      {
        minSamples: MIN_SAMPLES,
      }
    )
    .add(
      `create with ${COMMENTS_ARR_SIZE} comments. size: 1e6`,
      () => {
        createObjectBuffer({}, 1e6, {
          arrOfComments,
        });
      },
      {
        minSamples: MIN_SAMPLES,
      }
    )
    .add(
      `save ${COMMENTS_ARR_SIZE} comments into pre-created OB, size: 1e6`,
      () => {
        // use pre created object buffer
        global.testTargets[
          global.testTargetIndex
        ].arrOfComments = arrOfComments;

        global.testTargetIndex += 1;
      },
      {
        minSamples: MIN_SAMPLES,
        /**
         * pre-create empty object buffers
         */
        onStart() {
          global.testTargetIndex = 0;
          global.testTargets = [];

          for (let i = 0; i < EXPECTED_MAX_ITERATIONS; i++) {
            global.testTargets.push(createObjectBuffer({}, 1e6, {}));
          }

          if (typeof global.gc !== "undefined") {
            global.gc();
          }
        },
        onComplete() {
          global.testTargetIndex = 0;
          global.testTargets = [];
          if (typeof global.gc !== "undefined") {
            global.gc();
          }
        },
      }
    )
    .add(
      `create with all mock data rows. size: 1e6`,
      () => {
        createObjectBuffer<any>({}, 1e6, { K1000RowsMockData });
      },
      {
        minSamples: MIN_SAMPLES,
      }
    )
    .on("cycle", (event: any) => {
      console.log(String(event.target));
    })
    .on("complete", () => {
      //
      // process.toString();
    });
}
