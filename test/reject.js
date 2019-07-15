import {fc, testProp} from "ava-fast-check";

import {reject} from "../src";
import {throws} from "./_helpers";

testProp("takes a string", [fc.boolean(), fc.string()], (b, msg) =>
  throws(() => (b ? reject(new Error(msg)) : reject(msg)), Error, msg),
);
