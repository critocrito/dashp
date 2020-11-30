import {fc, testProp} from "ava-fast-check";

import {reject} from "../src";

testProp("takes a string", [fc.boolean(), fc.string()], async (t, b, msg) => {
  const error = await t.throwsAsync(() => (b ? reject(new Error(msg)) : reject(msg)));

  t.is(error.message, msg);
});
