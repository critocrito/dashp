import timeSpan from "time-span";
import inRange from "in-range";
import sinon from "sinon";

import {retry, retry2, retry3, retry4} from "../lib";

const fixture = Symbol("fixture");

describe("The retry operator for Promises", () => {
  it("retries a promise returning function", () => {
    const mock = sinon
      .mock()
      .once()
      .returns();
    return retry(mock).then(() => mock.verify().should.equal(true));
  });

  // eslint-disable-next-line func-names
  it("retries a promise 5 times", function() {
    this.timeout(3000);
    const mock = sinon
      .mock()
      .exactly(5)
      .rejects("Type Error");
    return retry(mock).catch(() => mock.verify().should.equal(true));
  });

  it("retries with a delay", () => {
    const mock = sinon
      .mock()
      .twice()
      .onFirstCall()
      .rejects("TypeError")
      .onSecondCall()
      .resolves();
    const end = timeSpan();
    return retry(mock).then(() =>
      (inRange(end(), 250, 300) && mock.verify()).should.equal(true)
    );
  });

  it("can retry functions with arguments", () => {
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

    return Promise.all([
      retry2(mock2, fixture),
      retry3(mock3, fixture, fixture),
      retry4(mock4, fixture, fixture, fixture),
    ]).then(
      () =>
        mock2.verify().should.equal(true) &&
        mock3.verify().should.equal(true) &&
        mock4.verify().should.equal(true)
    );
  });

  it("accepts promises and functions and actions", () => {
    const stub = sinon.stub().resolves(fixture);
    return retry(stub()).then(result => result.should.equal(fixture));
  });
});
