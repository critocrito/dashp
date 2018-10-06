import {property} from "jsverify";
import clone from "../src/internal/clone";

import {mapArb} from "./arbitraries";

describe("Cloning of reference types", () => {
  property("clone arrays", "array nat", (xs) => xs !== clone(xs));
  property("clone objects", "dict string", (x) => x !== clone(x));
  property("clone functions", "bool -> bool", (f) => f !== clone(f));
  property("clone maps", mapArb, (m) => m !== clone(m));
});
