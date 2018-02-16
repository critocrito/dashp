import {isEqual} from "lodash/fp";
import jsc, {property} from "jsverify";
import sinon from "sinon";

import {of, caught} from "../lib";
import {flow, flow2, flow3, flow4} from "../lib/flow";
import {anyArb} from "./arbitraries";

const fixture = Symbol("fixture");
const isFixture = isEqual(fixture);
const flows = {flow, flow2, flow3, flow4};

describe("The caught operator", () => {
  it("calls exception handlers when throwing an error", async () => {
    const mock = sinon
      .mock()
      .once()
      .resolves(fixture);
    const stub = sinon.stub().rejects();
    const x = await caught(mock, stub());
    (isFixture(x) && mock.verify()).should.equal(true);
  });

  it("doesn't call the exception handlers unless it throws", async () => {
    const mock = sinon.mock().never();
    const stub = sinon.stub().resolves(fixture);
    const x = await caught(mock, stub());
    (isFixture(x) && mock.verify()).should.equal(true);
  });

  Object.keys(flows).forEach(k => {
    it(`catches exceptions inside "${k}"`, async () => {
      const mock = sinon
        .mock()
        .once()
        .resolves(fixture);
      const stub = sinon.stub().rejects();
      const f = flows[k];
      // The first mock will be skipped, since stub throws and jumps to caught.
      const x = await f([stub, mock, caught(mock)])(null, null, null, null);
      (isFixture(x) && mock.verify()).should.equal(true);
    });
  });

  property("throws if the first argument is not a function", anyArb, f => {
    const block = () => caught(f, of(fixture));
    return jsc.throws(block, TypeError, /^Future#caught (.+)to be a function/);
  });
});
