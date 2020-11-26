import {fc, testProp} from "ava-fast-check";

import {isPromise} from "../src";

const maybePromiseArb = fc
  .tuple(fc.anything(), fc.boolean())
  .map(([x, toPromisify]) => [
    toPromisify ? Promise.resolve(x) : x,
    toPromisify,
  ]);

testProp(
  "isPromise tests if an object is a promise",
  [maybePromiseArb],
  (t, [obj, gotPromisified]) => t.is(isPromise(obj), gotPromisified),
);
