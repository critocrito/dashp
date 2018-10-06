import {isEqual} from "lodash/fp";
import timeSpan from "time-span";
import inRange from "in-range";

import {delay} from "../src";

const fixture = Symbol("fixture");
const isTrue = isEqual(true);
const isFixture = isEqual(fixture);

describe("The delay operator", () => {
  it("resolves a promise after some time", async () => {
    const end = timeSpan();
    const resolved = await delay(50, fixture);
    return isTrue(inRange(end(), 50, 70)) && isFixture(resolved);
  });

  it("can be used to delay a promise chain", async () => {
    const end = timeSpan();
    const resolved = await Promise.resolve(fixture).then(delay(50));
    return isTrue(inRange(end(), 50, 70)) && isFixture(resolved);
  });

  it("can cancel a promise", () => {
    const end = timeSpan();
    const p = delay(100, fixture);
    p.cancel();
    return p.should.be.rejected && end() < 100;
  });
});
