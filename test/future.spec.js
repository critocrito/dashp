import {isEqual} from "lodash/fp";
import {property} from "jsverify";

import {anyArb, isEqualAry} from "./arbitraries";
import future from "../lib/combinators/future";

describe("Lifting values into a promise", () => {
  property("is equivalent to Promise.resolve", anyArb, x =>
    Promise.all([future(x), Promise.resolve(x)]).then(isEqualAry)
  );

  property("lifts any value into a promise", anyArb, x =>
    future(x).then(isEqual(x))
  );
});
