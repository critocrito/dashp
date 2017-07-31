import {isEqual} from "lodash/fp";
import Promise from "bluebird";
import {
  assertForall,
  oneof,
  array,
  number,
  char,
  string,
  json,
  bool,
} from "jsverify";

import future from "../lib/combinators/future";

describe("Lifting values into a promise", () => {
  const arb = oneof([
    number,
    char,
    string,
    json,
    bool,
    array(number),
    array(char),
    array(string),
    array(json),
    array(bool),
  ]);

  it("lifts any value into a promise", () =>
    assertForall(arb, x =>
      Promise.all([future(x), Promise.resolve(x)]).spread(isEqual)
    ));

  it("lpifts any value into a promise", () =>
    assertForall(arb, x => future(x).then(isEqual(x))));
});
