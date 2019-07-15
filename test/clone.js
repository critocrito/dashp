import {testProp, fc} from "ava-fast-check";

import {mapArb} from "./_helpers";
import clone from "../src/internal/clone";

testProp("clone arrays", [fc.array(fc.nat())], (xs) => xs !== clone(xs));

testProp("clone objects", [fc.object()], (x) => x !== clone(x));

testProp("clone functions", [fc.compareFunc()], (f) => f !== clone(f));

testProp("clone maps", [mapArb], (m) => m !== clone(m));
