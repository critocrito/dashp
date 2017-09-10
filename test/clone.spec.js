import {property} from "jsverify";
import clone from "../lib/internal/clone";

describe("Cloning of reference types", () => {
  property("clone arrays", "array nat", xs => xs !== clone(xs));
  property("clone objects", "dict string", x => x !== clone(x));
  property("clone functions", "bool -> bool", f => f !== clone(f));
});
