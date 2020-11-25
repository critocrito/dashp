import {fc, testProp} from "ava-fast-check";
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

testProp("when is equivalent to if", [fc.boolean()], async (t, x) => {
  const stub = sinon.stub().returns(consequent);
  const expected = pred(x)() ? whenTable.true : whenTable.false;

  const result = await when(pred(x), stub, of(fixture));

  t.is(result, expected);
});

testProp("whenElse is equivalent to if-else", [fc.boolean()], async (t, x) => {
  const stubC = sinon.stub().returns(consequent);
  const stubA = sinon.stub().returns(alternative);
  const expected = pred(x)() ? whenElseTable.true : whenElseTable.false;

  const result = await whenElse(pred(x), stubC, stubA, of(fixture));

  t.is(result, expected);
});

testProp("unless is equivalent to if-not", [fc.boolean()], async (t, x) => {
  const stub = sinon.stub().returns(consequent);
  const expected = pred(x)() ? unlessTable.true : unlessTable.false;

  const result = await unless(pred(x), stub, of(fixture));

  t.is(result, expected);
});

testProp(
  "unlessElse is equivalent to if-not-else",
  [fc.boolean()],
  async (t, x) => {
    const stubC = sinon.stub().returns(consequent);
    const stubA = sinon.stub().returns(alternative);
    const expected = pred(x)() ? unlessElseTable.true : unlessElseTable.false;

    const result = await unlessElse(pred(x), stubC, stubA, of(fixture));

    t.is(result, expected);
  },
);

testProp(
  "whenElse allows synchronous and asynchronous function arguments",
  [fc.boolean(), fc.boolean(), fc.boolean(), fc.boolean()],
  async (t, x, rnd, rnd2, rnd3) => {
    const predicate = rnd ? pred(x) : predP(x);
    const stubC = rnd2
      ? sinon.stub().resolves(consequent)
      : sinon.stub().returns(consequent);
    const stubA = rnd3
      ? sinon.stub().resolves(alternative)
      : sinon.stub().returns(alternative);
    const expected = x ? consequent : alternative;

    const result = await whenElse(predicate, stubC, stubA, of(fixture));

    t.is(result, expected);
  },
);

testProp(
  "unlessElse allows synchronous and asynchronous function arguments",
  [fc.boolean(), fc.boolean(), fc.boolean(), fc.boolean()],
  async (t, x, rnd, rnd2, rnd3) => {
    const predicate = rnd ? pred(x) : predP(x);
    const stubC = rnd2
      ? sinon.stub().resolves(consequent)
      : sinon.stub().returns(consequent);
    const stubA = rnd3
      ? sinon.stub().resolves(alternative)
      : sinon.stub().returns(alternative);
    const expected = x ? alternative : consequent;

    const result = await unlessElse(predicate, stubC, stubA, of(fixture));

    t.is(result, expected);
  },
);

testProp(
  "when allows synchronous and asynchronous function arguments",
  [fc.boolean(), fc.boolean(), fc.boolean()],
  async (t, x, rnd, rnd2) => {
    const predicate = rnd ? pred(x) : predP(x);
    const stubC = rnd2
      ? sinon.stub().resolves(consequent)
      : sinon.stub().returns(consequent);
    const expected = x ? consequent : fixture;

    const result = await when(predicate, stubC, of(fixture));

    t.is(result, expected);
  },
);

testProp(
  "unless allows synchronous and asynchronous function arguments",
  [fc.boolean(), fc.boolean(), fc.boolean()],
  async (t, x, rnd, rnd2) => {
    const predicate = rnd ? pred(x) : predP(x);
    const stubC = rnd2
      ? sinon.stub().resolves(consequent)
      : sinon.stub().returns(consequent);
    const expected = x ? fixture : consequent;

    const result = await unless(predicate, stubC, of(fixture));

    t.is(result, expected);
  },
);
