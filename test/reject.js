import {testProp, fc} from "ava-fast-check";

import {throws} from "./_helpers";
import {reject} from "../src";

testProp("takes a string", [fc.boolean(), fc.string()], (b, msg) =>
  throws(() => (b ? reject(new Error(msg)) : reject(msg)), Error, msg),
);
