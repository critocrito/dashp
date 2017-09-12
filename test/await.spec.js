import {isEqual} from "lodash/fp";
import {property} from "jsverify";

import {plusP} from "./arbitraries";
import {collect} from "../lib";

describe("Compatibility with await", () => {
  property("map", "array nat", "nat", (xs, y) =>
    // eslint-disable-next-line lodash-fp/no-extraneous-function-wrapping
    collect(plusP(y), xs).then(async ys =>
      isEqual(await collect(plusP(y), xs), ys)
    )
  );
});
