import {fc, testProp} from "ava-fast-check";
import {isEqual} from "lodash/fp";

import {Future as F, isPromise} from "../src";

const maybePromiseArb = fc
  .tuple(fc.anything(), fc.boolean())
  .map(([x, toPromisify]) => [toPromisify ? F.of(x) : x, toPromisify]);

testProp(
  "isPromise tests if an object is a promise",
  [maybePromiseArb],
  ([obj, gotPromisified]) => isEqual(isPromise(obj), gotPromisified),
);
