import {flatten as loFlatten, isEqual} from "lodash/fp";
import jsc, {property} from "jsverify";

import flatten from "../src/internal/flatten";

const nest = (xs) => {
  switch (jsc.random(0, 4)) {
    case 0: // nest
      return [nest(xs)];
    case 1: // nest and duplicate
      return [nest(xs), nest(xs)];
    case 2: // duplicate
      return [xs, xs];
    case 3: // null
      return null;
    default:
      // do nothing
      return xs;
  }
};

const nestedArrayArb = jsc.array(jsc.nat).smap(nest, jsc.shrink.noop);

describe("Flattening of nested arrays", () => {
  property("flatten flat arrays", "array nat", (xs) =>
    isEqual(flatten(xs), xs),
  );

  property("flattens only one level deep", "array nat", (xs) =>
    isEqual(flatten([[xs]]), [xs]),
  );

  property("equivalency to lodash's flatten", nestedArrayArb, (xxs) =>
    isEqual(flatten(xxs), loFlatten(xxs)),
  );
});
