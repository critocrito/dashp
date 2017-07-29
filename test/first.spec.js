import {isEqual} from "lodash/fp";
import {assertForall, nat} from "jsverify";

import {add} from "../lib";

describe("basic math", () => {
  it("adds two numbers", () =>
    assertForall(nat, nat, (a, b) => isEqual(add(a, b), b + a)));
});

describe("haha", () => {});
