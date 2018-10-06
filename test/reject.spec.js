import {property} from "jsverify";

import {throws} from "./arbitraries";
import {reject} from "../src";

describe("the reject constructor", () => {
  property("takes a string", "bool", "string", (b, msg) => {
    const block = () => (b ? reject(new Error(msg)) : reject(msg));

    return throws(block, Error, msg);
  });
});
