import {isEqual, startsWith} from "lodash/fp";
import {property} from "jsverify";
import sinon from "sinon";

import {caught} from "../lib";
import {anyArb} from "./arbitraries";

const fixture = Symbol("fixture");

describe("The caught operator", () => {
  it("calls exception handlers when throwing an error", () => {
    const mock = sinon
      .mock()
      .once()
      .resolves(fixture);
    const stub = sinon.stub().rejects();

    return caught(mock, stub()).then(
      x => isEqual(x, fixture) && mock.verify().should.equal(true)
    );
  });

  it("calls exception handlers when throwing an error", () => {
    const mock = sinon.mock().never();
    const stub = sinon.stub().resolves(fixture);

    return caught(mock, stub()).then(
      x => isEqual(x, fixture) && mock.verify().should.equal(true)
    );
  });

  property("validates that the mapper is a function", anyArb, f => {
    try {
      caught(f, fixture);
    } catch (e) {
      return e instanceof TypeError && startsWith("Future#caught", e.message);
    }
    return false;
  });
});
