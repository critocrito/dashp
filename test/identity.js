import {isEqual} from "lodash/fp";
import {testProp, fc} from "ava-fast-check";

import identity from "../src/internal/identity";

testProp("returns it's arguments", [fc.anything()], (x) =>
  isEqual(identity(x), x),
);
