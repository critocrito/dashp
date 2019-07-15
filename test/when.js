import {fc, testProp} from "ava-fast-check";
import {isEqual} from "lodash/fp";
import sinon from "sinon";

import {of, unless, unlessElse, when, whenElse} from "../src";

const pred = (bool) => () => bool;
const predP = (bool) => () => of(bool);

const fixture = Symbol("fixture");
const consequent = Symbol("consequent");
const alternative = Symbol("alternative");

const whenTable = {
  true: consequent,
  false: fixture,
};

const whenElseTable = {
  true: consequent,
  false: alternative,
};

const unlessTable = {
  true: fixture,
  false: consequent,
};

const unlessElseTable = {
  true: alternative,
  false: consequent,
};

testProp("when is equivalent to if", [fc.boolean()], (x) => {
  const stub = sinon.stub().returns(consequent);
  const result = pred(x)() ? whenTable.true : whenTable.false;
  return when(pred(x), stub, of(fixture)).then(isEqual(result));
});

testProp("whenElse is equivalent to if-else", [fc.boolean()], (x) => {
  const stubC = sinon.stub().returns(consequent);
  const stubA = sinon.stub().returns(alternative);
  const result = pred(x)() ? whenElseTable.true : whenElseTable.false;
  return whenElse(pred(x), stubC, stubA, of(fixture)).then(isEqual(result));
});

testProp("unless is equivalent to if-not", [fc.boolean()], (x) => {
  const stub = sinon.stub().returns(consequent);
  const result = pred(x)() ? unlessTable.true : unlessTable.false;
  return unless(pred(x), stub, of(fixture)).then(isEqual(result));
});

testProp("unlessElse is equivalent to if-not-else", [fc.boolean()], (x) => {
  const stubC = sinon.stub().returns(consequent);
  const stubA = sinon.stub().returns(alternative);
  const result = pred(x)() ? unlessElseTable.true : unlessElseTable.false;
  return unlessElse(pred(x), stubC, stubA, of(fixture)).then(isEqual(result));
});

[whenElse, unlessElse].forEach((f) => {
  testProp(
    `${f.name} allows synchronous and asynchronous arguments`,
    [fc.boolean(), fc.boolean(), fc.boolean(), fc.boolean()],
    (x, rnd, rnd2, rnd3) => {
      const predicate = rnd ? pred(x) : predP(x);
      const stubC = rnd2
        ? sinon.stub().resolves(consequent)
        : sinon.stub().returns(consequent);
      const stubA = rnd3
        ? sinon.stub().resolves(alternative)
        : sinon.stub().returns(alternative);
      return f(predicate, stubC, stubA, of(fixture)).then(
        (result) => isEqual(result, consequent) || isEqual(result, alternative),
      );
    },
  );
});

[when, unless].forEach((f) => {
  testProp(
    `${f.name} allows synchronous and asynchronous arguments`,
    [fc.boolean(), fc.boolean(), fc.boolean()],
    (x, rnd, rnd2) => {
      const predicate = rnd ? pred(x) : predP(x);
      const stubC = rnd2
        ? sinon.stub().resolves(consequent)
        : sinon.stub().returns(consequent);
      return f(predicate, stubC, of(fixture)).then(
        (result) => isEqual(result, consequent) || isEqual(result, fixture),
      );
    },
  );
});
