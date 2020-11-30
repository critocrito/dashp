import test from "ava";
import {isEqual} from "lodash/fp";
import sinon from "sinon";

import caught from "../src/caught";
import {flow} from "../src/flow";

const fixture = Symbol("fixture");
const isFixture = isEqual(fixture);

test("calls exception handlers when throwing an error", async (t) => {
  const mock = sinon.mock();
  mock.once().resolves(fixture);
  const stub = sinon.stub().rejects();
  const x = await caught(mock, stub());
  t.true(isFixture(x) && mock.verify());
});

test("doesn't call the exception handlers unless it throws", async (t) => {
  const mock = sinon.mock().never();
  const stub = sinon.stub().resolves(fixture);
  const x = await caught(mock, stub());
  t.true(isFixture(x) && mock.verify());
});

test("catches exceptions inside 'flow'", async (t) => {
  const mock = sinon.mock();
  mock.once().resolves(fixture);
  const stub = sinon.stub().rejects();

  // The first mock will be skipped, since stub throws and jumps to caught.
  const x = await flow([stub, mock, caught(mock)])(undefined);
  t.true(isFixture(x) && mock.verify());
});
