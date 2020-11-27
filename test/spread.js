import {fc, testProp} from "ava-fast-check";

import {Future as F, spread} from "../src";
import {plus} from "./_helpers";

testProp("applying variadic arguments", [fc.nat(), fc.nat()], async (t, x, y) =>
  t.is(await spread(plus, F.of([x, y])), plus(x, y)),
);

testProp("calls a function with a single argument", [fc.nat(), fc.nat()], async (t, x, y) =>
  t.is(await spread(plus(x), F.of(y)), plus(x, y)),
);
