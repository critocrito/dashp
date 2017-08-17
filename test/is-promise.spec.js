import {isEqual} from "lodash/fp";
import {assertForall, random} from "jsverify";

import {anyArb} from "./arbitraries";
import future from "../lib/combinators/future";
import isPromise from "../lib/utils/is-promise";

const isTrue = isEqual(true);
const isFalse = isEqual(false);

describe("The isPromise util", () => {
  it("tests if it's argument is a promise", () =>
    assertForall(anyArb, x => {
      switch (random(0, 1)) {
        case 0:
          return isTrue(isPromise(future(x)));
        default:
          return isFalse(isPromise(x));
      }
    }));
});
