import {isEqual} from "lodash/fp";
import Promise from "bluebird";
import {assertForall} from "jsverify";

import {anyArb} from "./arbitraries";
import future from "../lib/combinators/future";

describe("Lifting values into a promise", () => {
  it("is equivalent to Promise.resolve", () =>
    assertForall(anyArb, x =>
      Promise.all([future(x), Promise.resolve(x)]).spread(isEqual)
    ));

  it("lifts any value into a promise", () =>
    assertForall(anyArb, x => future(x).then(isEqual(x))));
});
