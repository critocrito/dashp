import test from "ava";
import {isEqual} from "lodash/fp";
import {testProp, fc} from "ava-fast-check";
import sinon from "sinon";

import {of} from "../src/Future";
import caught from "../src/caught";
import {flow, flow2, flow3, flow4} from "../src/flow";
import {throws} from "./_helpers";

const fixture = Symbol("fixture");
const isFixture = isEqual(fixture);
const flows = {flow, flow2, flow3, flow4};

test("calls exception handlers when throwing an error", async (t) => {
  const mock = sinon
    .mock()
    .once()
    .resolves(fixture);
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

Object.keys(flows).forEach((k) => {
  test(`catches exceptions inside "${k}"`, async (t) => {
    const mock = sinon
      .mock()
      .once()
      .resolves(fixture);
    const stub = sinon.stub().rejects();
    const f = flows[k];
    // The first mock will be skipped, since stub throws and jumps to caught.
    const x = await f([stub, mock, caught(mock)])(null, null, null, null);
    t.true(isFixture(x) && mock.verify());
  });
});

testProp(
  "throws if the first argument is not a function",
  [fc.anything()],
  (f) =>
    throws(
      () => caught(f, of(fixture)),
      TypeError,
      /^Future#caught (.+)to be a function/,
    ),
);