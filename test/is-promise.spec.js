import {isEqual} from "lodash/fp";
import jsc, {property} from "jsverify";

import {anyArb} from "./arbitraries";
import future from "../lib/combinators/future";
import isPromise from "../lib/utils/is-promise";

const maybePromiseArb = jsc
  .tuple([anyArb, jsc.bool])
  .smap(
    ([x, toPromisify]) => [toPromisify ? future(x) : x, toPromisify],
    jsc.shrink.tuple([anyArb.shrink, jsc.shrink.noop])
  );

describe("The isPromise util", () => {
  property(
    "tests if an object is a promise",
    maybePromiseArb,
    ([obj, gotPromisified]) => isEqual(isPromise(obj), gotPromisified)
  );
});
