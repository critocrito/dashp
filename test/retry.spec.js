import timeSpan from "time-span";
import inRange from "in-range";
import sinon from "sinon";

import {retry, retry2, retry3, retry4} from "../src";

const fixture = Symbol("fixture");

describe("The retry operator for Promises", () => {
  it("retries a promise returning function", async () => {
    const mock = sinon
      .mock()
      .once()
      .returns();
    await retry(mock);
    mock.verify().should.equal(true);
  });

  // eslint-disable-next-line func-names
  it("retries a promise 5 times", async function() {
    this.timeout(3000);
    const mock = sinon
      .mock()
      .exactly(5)
      .rejects("Type Error");
    try {
      await retry(mock);
    } catch (e) {} // eslint-disable-line no-empty
    mock.verify().should.equal(true);
  });

  it("retries with a delay", async () => {
    const mock = sinon
      .mock()
      .twice()
      .onFirstCall()
      .rejects("TypeError")
      .onSecondCall()
      .resolves();
    const end = timeSpan();
    await retry(mock);
    (inRange(end(), {start: 250, end: 300}) && mock.verify()).should.equal(
      true,
    );
  });

  it("can retry functions with arguments", async () => {
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

    await Promise.all([
      retry2(mock2, fixture),
      retry3(mock3, fixture, fixture),
      retry4(mock4, fixture, fixture, fixture),
    ]);
    (mock2.verify() && mock3.verify() && mock4.verify()).should.equal(true);
  });

  it("accepts promises and functions and actions", async () => {
    const stub = sinon.stub().resolves(fixture);
    const result = await retry(stub());
    result.should.equal(fixture);
  });
});
