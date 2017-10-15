import {isEqual} from "lodash/fp";
import jsc, {property} from "jsverify";
import sinon from "sinon";

import {of, caught} from "../lib";
import {anyArb} from "./arbitraries";

const fixture = Symbol("fixture");

describe("The caught operator", () => {
  it("calls exception handlers when throwing an error", async () => {
    const mock = sinon
      .mock()
      .once()
      .resolves(fixture);
    const stub = sinon.stub().rejects();
    const x = await caught(mock, stub());
    (isEqual(x, fixture) && mock.verify()).should.equal(true);
  });

  it("calls exception handlers when throwing an error", async () => {
    const mock = sinon.mock().never();
    const stub = sinon.stub().resolves(fixture);
    const x = await caught(mock, stub());
    (isEqual(x, fixture) && mock.verify()).should.equal(true);
  });

  property("throws if the first argument is not a function", anyArb, f => {
    const block = () => caught(f, of(fixture));
    return jsc.throws(block, TypeError, /^Future#caught (.+)to be a function/);
  });
});
