import {fc, testProp} from "ava-fast-check";

import clone from "../src/internal/clone";
import {mapArb} from "./_helpers";

testProp("clone arrays", [fc.array(fc.nat())], (xs) => xs !== clone(xs));

testProp("clone objects", [fc.object()], (x) => x !== clone(x));

testProp("clone functions", [fc.compareFunc()], (f) => f !== clone(f));

testProp("clone maps", [mapArb], (m) => m !== clone(m));
