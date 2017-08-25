import {isEqual} from "lodash/fp";
import sinon from "sinon";

import caught from "../lib/combinators/caught";

const fixture = Symbol("fixture");

describe("The caught operator", () => {
  it("calls exception handlers when throwing an error", () => {
    const mock = sinon.mock().once().resolves(fixture);
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
});
