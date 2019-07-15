import {fc, testProp} from "ava-fast-check";
import {flatten as loFlatten, isEqual} from "lodash/fp";

import flatten from "../src/internal/flatten";
import {random} from "./_helpers";

const nest = (xs) => {
  switch (random(0, 4)) {
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

testProp("flatten flat arrays", [fc.array(fc.nat())], (xs) =>
  isEqual(flatten(xs), xs),
);

testProp("flattens only one level deep", [fc.array(fc.nat())], (xs) =>
  isEqual(flatten([[xs]]), [xs]),
);

testProp(
  "equivalency to lodash's flatten",
  [fc.array(fc.nat()).map(nest)],
  (xxs) => isEqual(flatten(xxs), loFlatten(xxs)),
);
