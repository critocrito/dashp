import test from "ava";
import inRange from "in-range";
import {isEqual} from "lodash/fp";
import timeSpan from "time-span";

import {delay} from "../src";

const fixture = Symbol("fixture");
const isFixture = isEqual(fixture);

test("resolves a promise after some time", async (t) => {
  const end = timeSpan();
  const result = await delay(50, fixture);
  return t.true(inRange(end(), {start: 50, end: 70}) && isFixture(result));
});

test("can be used to delay a promise chain", async (t) => {
  const end = timeSpan();
  const result = await Promise.resolve(fixture).then(delay(50));
  return t.true(inRange(end(), {start: 50, end: 70}) && isFixture(result));
});

test("can cancel a promise", (t) => {
  const end = timeSpan();
  const p = delay(100, fixture);
  p.cancel();
  return p.catch(() => t.true(end() < 100));
});
