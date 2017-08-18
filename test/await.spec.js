import {isEqual} from "lodash/fp";
import {property} from "jsverify";
import {addP} from "./arbitraries";
import {map} from "../lib/combinators/map";

describe("Compatibility with await", () => {
  property("map", "array nat", "nat", (xs, y) =>
    // eslint-disable-next-line lodash-fp/no-extraneous-function-wrapping
    map(addP(y), xs).then(async ys => isEqual(await map(addP(y), xs), ys))
  );
});
