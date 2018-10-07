import {identity} from "lodash/fp";
import sinon from "sinon";

import checkTypes from "../src/internal/checkTypes";

const fixture = Symbol("fixture");

describe("runtime type checking", () => {
  it("passes function arguments", () => {
    const f = (g) => g();
    const stub = sinon.stub().returns(fixture);
    const checkedF = checkTypes(["function"], f);
    const result = checkedF(stub);
    result.should.equal(fixture);
    stub.callCount.should.equal(1);
  });

  it("passes array arguments", () => {
    const checkedF = checkTypes(["array"], identity);
    const result = checkedF([]);
    result.should.eql([]);
  });

  it("passes thenable arguments", () => {
    const checkedF = checkTypes(["thenable"], identity);
    const expected = Promise.resolve(fixture);
    const result = checkedF(expected);
    return Promise.all([expected, result]).then(([r, e]) => r.should.equal(e));
  });

  it("passes multiple arguments", () => {
    const checkedF = checkTypes(["function", "array"], identity);
    const goodF = () => checkedF(identity, []);
    // prettier-ignore
    (goodF).should.not.throw();
  });

  it("allows for any type", () => {
    const stub = sinon.stub();
    const checkedF = checkTypes(["any"], stub);

    checkedF(identity);
    checkedF(23);
    checkedF(fixture);

    // eslint-disable-next-line no-unused-expressions
    stub.calledThrice.should.be.true;
    stub.firstCall.calledWithExactly(identity);
    stub.secondCall.calledWithExactly(23);
    stub.thirdCall.calledWithExactly(fixture);
  });

  it("throws if the argument is not a function", () => {
    const checkedF = checkTypes(["function"], identity);
    const badF = () => checkedF(23);
    // prettier-ignore
    (badF).should.throw(TypeError, /to be a function/);
  });

  it("throws if the argument is not an array", () => {
    const checkedF = checkTypes(["array"], identity);
    const badF = () => checkedF(23);
    // prettier-ignore
    (badF).should.throw(TypeError, /to be an array/);
  });

  it("throws if the argument is not a thenable", () => {
    const checkedF = checkTypes(["thenable"], identity);
    const badF = () => checkedF(23);
    // prettier-ignore
    (badF).should.throw(TypeError, /to be a promise/);
  });
});
