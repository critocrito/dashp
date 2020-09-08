import test from "ava";
import inRange from "in-range";
import sinon from "sinon";
import timeSpan from "time-span";

import {retry, retry2, retry3, retry4, retry5} from "../src";

const fixture = Symbol("fixture");

test("retries a promise returning function", async (t) => {
  const mock = sinon
    .mock()
    .once()
    .returns();
  await retry(mock);
  t.true(mock.verify());
});

// eslint-disable-next-line func-names
test("retries a promise 5 times", async function(t) {
  const mock = sinon
    .mock()
    .exactly(5)
    .rejects("Type Error");
  try {
    await retry(mock);
  } catch (e) {} // eslint-disable-line no-empty
  t.true(mock.verify());
});

test("retries with a delay", async (t) => {
  const mock = sinon
    .mock()
    .twice()
    .onFirstCall()
    .rejects("TypeError")
    .onSecondCall()
    .resolves();
  const end = timeSpan();
  await retry(mock);
  t.true(inRange(end(), {start: 250, end: 300}) && mock.verify());
});

test("can retry functions with arguments", async (t) => {
  const mock2 = sinon
    .mock()
    .once()
    .withArgs(fixture)
    .resolves();
  const mock3 = sinon
    .mock()
    .once()
    .withArgs(fixture, fixture)
    .resolves();
  const mock4 = sinon
    .mock()
    .once()
    .withArgs(fixture, fixture, fixture)
    .resolves();
  const mock5 = sinon
    .mock()
    .once()
    .withArgs(fixture, fixture, fixture, fixture)
    .resolves();

  await Promise.all([
    retry2(mock2, fixture),
    retry3(mock3, fixture, fixture),
    retry4(mock4, fixture, fixture, fixture),
    retry5(mock5, fixture, fixture, fixture, fixture),
  ]);
  t.true(mock2.verify() && mock3.verify() && mock4.verify() && mock5.verify());
});

test("accepts promises and functions and actions", async (t) => {
  const stub = sinon.stub().resolves(fixture);
  const result = await retry(stub());
  t.is(result, fixture);
});
