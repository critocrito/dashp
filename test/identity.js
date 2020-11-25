import {fc, testProp} from "ava-fast-check";

import identity from "../src/internal/identity";

testProp("returns it's arguments", [fc.anything()], (t, x) =>
  t.is(identity(x), x),
);
