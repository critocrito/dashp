import {isEqual} from "lodash/fp";
import {property} from "jsverify";
import {addP} from "./arbitraries";
import {collect} from "../lib";

describe("Compatibility with await", () => {
  property("map", "array nat", "nat", (xs, y) =>
    // eslint-disable-next-line lodash-fp/no-extraneous-function-wrapping
    collect(addP(y), xs).then(async ys =>
      isEqual(await collect(addP(y), xs), ys)
    )
  );
});
