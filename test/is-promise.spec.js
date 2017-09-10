import {isEqual} from "lodash/fp";
import jsc, {property} from "jsverify";

import {anyArb} from "./arbitraries";
import {Future as F, isPromise} from "../lib";

const maybePromiseArb = jsc
  .tuple([anyArb, jsc.bool])
  .smap(
    ([x, toPromisify]) => [toPromisify ? F.of(x) : x, toPromisify],
    jsc.shrink.tuple([anyArb.shrink, jsc.shrink.noop])
  );

describe("The isPromise util", () => {
  property(
    "tests if an object is a promise",
    maybePromiseArb,
    ([obj, gotPromisified]) => isEqual(isPromise(obj), gotPromisified)
  );
});
