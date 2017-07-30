import {sum, isEqual} from "lodash/fp";
import {assertForall, nat} from "jsverify";

import {maybePromisify, addP, addMaybeP} from "./arbitraries";
import compose from "../lib/combinators/compose";

describe("The compose combinator", () => {
  it("accepts non promisified and promisified arguments", () =>
    assertForall(nat, nat, nat, (x, y, z) =>
      compose(addMaybeP(x), addMaybeP(y), maybePromisify(z)).then(
        isEqual(sum([x, y, z]))
      )
    ));

  it("is always associative", () =>
    assertForall(nat, nat, nat, nat, (w, x, y, z) =>
      Promise.all([
        compose(addP(w), compose(addP(x), addP(y)), z),
        compose(compose(addP(w), addP(x)), addP(y), z),
      ]).then(([a, b]) => isEqual(a, b))
    ));
});
