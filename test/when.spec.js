import {identity, isEqual} from "lodash/fp";
import jsc, {property} from "jsverify";
import sinon from "sinon";

import {maybePromisify} from "./arbitraries";
import {when, whenElse, unless, unlessElse} from "../lib";

const pred = bool => () => identity(bool);
const predMaybeP = bool => () => maybePromisify(identity(bool));

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

describe("The conditional operators", () => {
  property("when is equivalent to if", jsc.bool, x => {
    const stub = sinon.stub().returns(consequent);
    const result = pred(x)() ? whenTable.true : whenTable.false;
    return when(pred(x), stub, fixture).then(isEqual(result));
  });

  property(
    "when accepts promisified and non promisified arguments",
    jsc.bool,
    x => {
      const stub = sinon.stub().returns(consequent);
      return when(
        predMaybeP(x),
        maybePromisify(stub),
        maybePromisify(fixture)
      ).then(isEqual(whenTable[x]));
    }
  );

  property("whenElse is equivalent to if-else", jsc.bool, x => {
    const stubC = sinon.stub().returns(consequent);
    const stubA = sinon.stub().returns(alternative);
    const result = pred(x)() ? whenElseTable.true : whenElseTable.false;
    return whenElse(pred(x), stubC, stubA, fixture).then(isEqual(result));
  });

  property(
    "whenElse accepts promisified and non promisified arguments",
    jsc.bool,
    x => {
      const stubC = sinon.stub().returns(consequent);
      const stubA = sinon.stub().returns(alternative);
      return whenElse(
        predMaybeP(x),
        maybePromisify(stubC),
        maybePromisify(stubA),
        maybePromisify(fixture)
      ).then(isEqual(whenElseTable[x]));
    }
  );

  property("unless is equivalent to if-not", jsc.bool, x => {
    const stub = sinon.stub().returns(consequent);
    const result = pred(x)() ? unlessTable.true : unlessTable.false;
    return unless(pred(x), stub, fixture).then(isEqual(result));
  });

  property(
    "unless accepts promisified and non promisified arguments",
    jsc.bool,
    x => {
      const stub = sinon.stub().returns(consequent);
      return unless(
        predMaybeP(x),
        maybePromisify(stub),
        maybePromisify(fixture)
      ).then(isEqual(unlessTable[x]));
    }
  );

  property("unlessElse is equivalent to if-not-else", jsc.bool, x => {
    const stubC = sinon.stub().returns(consequent);
    const stubA = sinon.stub().returns(alternative);
    const result = pred(x)() ? unlessElseTable.true : unlessElseTable.false;
    return unlessElse(pred(x), stubC, stubA, fixture).then(isEqual(result));
  });

  property(
    "unlessElse accepts promisified and non promisified arguments",
    jsc.bool,
    x => {
      const stubC = sinon.stub().returns(consequent);
      const stubA = sinon.stub().returns(alternative);
      return unlessElse(
        predMaybeP(x),
        maybePromisify(stubC),
        maybePromisify(stubA),
        maybePromisify(fixture)
      ).then(isEqual(unlessElseTable[x]));
    }
  );
});
