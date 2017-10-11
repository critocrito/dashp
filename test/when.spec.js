import {identity, isEqual, startsWith} from "lodash/fp";
import jsc, {property} from "jsverify";
import sinon from "sinon";

import {anyArb} from "./arbitraries";
import {of, when, whenElse, unless, unlessElse} from "../lib";

const pred = bool => () => identity(bool);

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
    return when(pred(x), stub, of(fixture)).then(isEqual(result));
  });

  property("whenElse is equivalent to if-else", jsc.bool, x => {
    const stubC = sinon.stub().returns(consequent);
    const stubA = sinon.stub().returns(alternative);
    const result = pred(x)() ? whenElseTable.true : whenElseTable.false;
    return whenElse(pred(x), stubC, stubA, of(fixture)).then(isEqual(result));
  });

  property("unless is equivalent to if-not", jsc.bool, x => {
    const stub = sinon.stub().returns(consequent);
    const result = pred(x)() ? unlessTable.true : unlessTable.false;
    return unless(pred(x), stub, of(fixture)).then(isEqual(result));
  });

  property("unlessElse is equivalent to if-not-else", jsc.bool, x => {
    const stubC = sinon.stub().returns(consequent);
    const stubA = sinon.stub().returns(alternative);
    const result = pred(x)() ? unlessElseTable.true : unlessElseTable.false;
    return unlessElse(pred(x), stubC, stubA, of(fixture)).then(isEqual(result));
  });

  property(
    "validates that the arguments of whenElse are functions",
    anyArb,
    async f => {
      const args = [sinon.stub(), sinon.stub(), sinon.stub()];
      args[jsc.random(0, 2)] = f;
      try {
        await whenElse(...args.concat(fixture));
      } catch (e) {
        return (
          e instanceof TypeError && startsWith("Future#whenElse ", e.message)
        );
      }
      return false;
    }
  );

  property(
    "validates that the arguments of unlessElse are functions",
    anyArb,
    async f => {
      const args = [sinon.stub(), sinon.stub(), sinon.stub()];
      args[jsc.random(0, 2)] = f;
      try {
        await unlessElse(...args.concat(fixture));
      } catch (e) {
        return (
          e instanceof TypeError && startsWith("Future#unlessElse ", e.message)
        );
      }
      return false;
    }
  );

  property(
    "validates that the arguments of when are functions",
    anyArb,
    async f => {
      const args = [sinon.stub(), sinon.stub()];
      args[jsc.random(0, 1)] = f;
      try {
        await when(...args.concat(fixture));
      } catch (e) {
        return e instanceof TypeError && startsWith("Future#when ", e.message);
      }
      return false;
    }
  );

  property(
    "validates that the arguments of unless are functions",
    anyArb,
    async f => {
      const args = [sinon.stub(), sinon.stub()];
      args[jsc.random(0, 1)] = f;
      try {
        await unless(...args.concat(fixture));
      } catch (e) {
        return (
          e instanceof TypeError && startsWith("Future#unless ", e.message)
        );
      }
      return false;
    }
  );

  property(
    "throws if the fourth argument of whenElse is not a promise",
    anyArb,
    a => {
      const block = () => whenElse(() => true, x => x, x => x, a);
      return jsc.throws(
        block,
        TypeError,
        /^Future#whenElse (.+)to be a promise/
      );
    }
  );

  property(
    "throws if the fourth argument of unlessElse is not a promise",
    anyArb,
    a => {
      const block = () => unlessElse(() => true, x => x, x => x, a);
      return jsc.throws(
        block,
        TypeError,
        /^Future#unlessElse (.+)to be a promise/
      );
    }
  );

  property(
    "throws if the third argument of when is not a promise",
    anyArb,
    a => {
      const block = () => when(() => true, x => x, a);
      return jsc.throws(block, TypeError, /^Future#when (.+)to be a promise/);
    }
  );

  property(
    "throws if the third argument of unless is not a promise",
    anyArb,
    a => {
      const block = () => unless(() => true, x => x, a);
      return jsc.throws(block, TypeError, /^Future#unless (.+)to be a promise/);
    }
  );
});
