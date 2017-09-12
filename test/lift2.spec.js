import {isEqual} from "lodash/fp";
import {property} from "jsverify";

import {add} from "./arbitraries";
import {Future as F, lift2} from "../lib";

describe("The lift2 operator", () => {
  property("lifts two arguments", "nat", "nat", (x, y) =>
    lift2(add, F.of(x), F.of(y)).then(isEqual(x + y))
  );
});
