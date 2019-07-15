import {fc, testProp} from "ava-fast-check";
import {isEqual} from "lodash/fp";

import identity from "../src/internal/identity";

testProp("returns it's arguments", [fc.anything()], (x) =>
  isEqual(identity(x), x),
);
