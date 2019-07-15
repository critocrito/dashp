import test from "ava";
import {identity} from "lodash/fp";
import sinon from "sinon";

import checkTypes from "../src/internal/checkTypes";

const fixture = Symbol("fixture");

test("passes function arguments", (t) => {
  const f = (g) => g();
  const stub = sinon.stub().returns(fixture);
  const checkedF = checkTypes(["function"], f);
  const result = checkedF(stub);
  t.is(result, fixture);
  t.is(stub.callCount, 1);
});

test("passes array arguments", (t) => {
  const checkedF = checkTypes(["array"], identity);
  const result = checkedF([]);
  t.deepEqual(result, []);
});

test("passes thenable arguments", async (t) => {
  const checkedF = checkTypes(["thenable"], identity);
  const result = await checkedF(Promise.resolve(fixture));
  t.is(result, fixture);
});

test("passes multiple arguments", (t) => {
  const checkedF = checkTypes(["function", "array"], identity);
  t.notThrows(() => checkedF(identity, []));
});

test("allows for any type", (t) => {
  const stub = sinon.stub();
  const checkedF = checkTypes(["any"], stub);

  checkedF(identity);
  checkedF(23);
  checkedF(fixture);

  // eslint-disable-next-line no-unused-expressions
  t.true(stub.calledThrice);
  t.true(stub.firstCall.calledWithExactly(identity));
  t.true(stub.secondCall.calledWithExactly(23));
  t.true(stub.thirdCall.calledWithExactly(fixture));
});

test("throws if the argument is not a function", (t) => {
  const checkedF = checkTypes(["function"], identity);
  t.throws(() => checkedF(23), {
    instanceOf: TypeError,
    message: /to be a function/,
  });
});

test("throws if the argument is not an array", (t) => {
  const checkedF = checkTypes(["array"], identity);
  t.throws(() => checkedF(23), {
    instanceOf: TypeError,
    message: /to be an array/,
  });
});

test("throws if the argument is not a thenable", (t) => {
  const checkedF = checkTypes(["thenable"], identity);
  t.throws(() => checkedF(23), {
    instanceOf: TypeError,
    message: /to be a promise/,
  });
});
