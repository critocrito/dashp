import {fc, testProp} from "ava-fast-check";

import clone from "../src/internal/clone";
import {mapArb} from "./_helpers";

testProp("clone arrays", [fc.array(fc.nat())], (t, xs) =>
  t.false(xs === clone(xs)),
);

testProp("clone objects", [fc.object()], (t, x) => t.false(x === clone(x)));

testProp("clone functions", [fc.compareFunc()], (t, f) =>
  t.false(f === clone(f)),
);

testProp("clone maps", [mapArb], (t, m) => t.false(m === clone(m)));
