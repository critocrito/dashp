import {sum, isEqual} from "lodash/fp";
import {assertForall, array, nat} from "jsverify";
import Promise from "bluebird";

import {maybePromisify, add, addP, addMaybeP} from "./arbitraries";
import fold from "../lib/combinators/fold";

describe("The fold combinator", () => {
  it("accepts non promisified and promisified arguments", () =>
    assertForall(array(nat), nat, (xs, y) =>
      fold(addMaybeP, maybePromisify(y), maybePromisify(xs)).then(
        isEqual(sum(xs) + y)
      )
    ));

  it("produces the same result as a synchronous reduce", () =>
    assertForall(array(nat), nat, (xs, y) =>
      fold(add, y, xs).then(isEqual(xs.reduce(add, y)))
    ));

  it("produces the same result as reduce of Bluebird", () =>
    assertForall(array(nat), nat, (xs, y) =>
      Promise.all([
        Promise.reduce(xs, addP, y),
        fold(addP, y, xs),
      ]).then(([a, b]) => isEqual(a, b))
    ));
});
