import {isEqual} from "lodash/fp";
import jsc, {property} from "jsverify";
import sinon from "sinon";

import {plus, plusP, anyArb} from "./arbitraries";
import {of, map, bimap, ap, chain, compose as comp} from "../src";

const fixture = Symbol("fixture");

describe("The type Future", () => {
  // https://github.com/rpominov/static-land/blob/master/docs/spec.md#functor
  describe("is an instance of Functor", () => {
    property("identity", anyArb, async (a) =>
      isEqual(await map((x) => x, of(a)), a),
    );

    property("composition", "nat", "nat", "nat", async (a, b, c) => {
      const f = plus(b);
      const g = plus(c);

      return isEqual(await map(comp(f, g), of(a)), await map(f, map(g, of(a))));
    });

    property("throws if the first argument is not a function", anyArb, (f) => {
      const block = () => map(f, of(fixture));
      return jsc.throws(block, TypeError, /^Future#map (.+)to be a function/);
    });

    property("throws if the second argument is not a promise", anyArb, (a) => {
      const block = () => map((x) => x, a);
      return jsc.throws(block, TypeError, /^Future#map (.+)to be a promise/);
    });
  });

  // https://github.com/rpominov/static-land/blob/master/docs/spec.md#bifunctor
  describe("is an instance of Bifunctor", () => {
    property("identity", anyArb, async (a) =>
      isEqual(await bimap((x) => x, (x) => x, of(a)), await of(a)),
    );

    property(
      "composition",
      "nat",
      "nat",
      "nat",
      "nat",
      "nat",
      async (a, b, c, d, e) => {
        const f = plus(b);
        const g = plus(c);
        const h = plus(d);
        const i = plus(e);

        return isEqual(
          await bimap((x) => f(g(x)), (x) => h(i(x)), of(a)),
          await bimap(f, h, bimap(g, i, of(a))),
        );
      },
    );

    property("deriving Functors map", "nat", "nat", async (a, b) => {
      const f = plus(b);
      return isEqual(await bimap((x) => x, f, of(a)), await map(f, of(a)));
    });

    it("maps the left function over the rejection value", async () => {
      const a = sinon.stub().rejects();
      const f = sinon.mock().once();
      const g = sinon.mock().never();
      await bimap(f, g, a());
      f.verify().should.equal(true);
      g.verify().should.equal(true);
    });

    it("maps the right function over the resolution value", async () => {
      const a = sinon.stub().resolves(fixture);
      const f = sinon.mock().never();
      const g = sinon.mock().once();
      await bimap(f, g, a());
      f.verify().should.equal(true);
      g.verify().should.equal(true);
    });

    it("doesn't call the right function if the left one throws", async () => {
      const a = sinon.stub().rejects();
      const f = sinon
        .mock()
        .once()
        .rejects();
      const g = sinon.mock().never();
      try {
        await bimap(f, g, a());
      } catch (e) {} // eslint-disable-line no-empty
      f.verify().should.equal(true);
      g.verify().should.equal(true);
    });

    it("doesn't call the left function if the right one throws", async () => {
      const a = sinon.stub().resolves();
      const f = sinon.mock().never();
      const g = sinon
        .mock()
        .once()
        .rejects();
      try {
        await bimap(f, g, a());
      } catch (e) {} // eslint-disable-line no-empty
      f.verify().should.equal(true);
      g.verify().should.equal(true);
    });

    property("throws if the first argument is not a function", anyArb, (f) => {
      const block = () => bimap(f, (x) => x, of(fixture));
      return jsc.throws(block, TypeError, /^Future#bimap (.+)to be a function/);
    });

    property("throws if the second argument is not a function", anyArb, (f) => {
      const block = () => bimap((x) => x, f, of(fixture));
      return jsc.throws(block, TypeError, /^Future#bimap (.+)to be a function/);
    });

    property("throws if the third argument is not a promise", anyArb, (a) => {
      const block = () => bimap((x) => x, (x) => x, a);
      return jsc.throws(block, TypeError, /^Future#bimap (.+)to be a promise/);
    });
  });

  describe("is an instance of Applicative", () => {
    // https://github.com/rpominov/static-land/blob/master/docs/spec.md#applicative
    property("identity", "nat", async (a) => {
      const v = of(a);
      return isEqual(await ap(of((x) => x), v), a);
    });

    property("homomorphism", "nat", "nat", async (a, b) => {
      const f = plus(a);
      return isEqual(await ap(of(f), of(b)), await of(f(b)));
    });

    property("interchange", "nat", "nat", async (a, b) => {
      const u = of(plus(b));
      return isEqual(await ap(u, of(b)), await ap(of((f) => f(b)), u));
    });

    property("composition", "nat", "nat", "nat", async (a, b, c) => {
      const x = of(a);
      const u = of(plus(b));
      const v = of(plus(c));

      return isEqual(await ap(ap(map(comp, u), v), x), await ap(u, ap(v, x)));
    });

    property("deriving Functors map", "nat", "nat", async (a, b) => {
      const f = plus(b);

      return isEqual(await map(f, of(a)), await ap(of(f), of(a)));
    });

    property("throws if the first argument is not a promise", anyArb, (f) => {
      const block = () => ap(f, of(fixture));
      return jsc.throws(block, TypeError, /^Future#ap (.+)to be a promise/);
    });

    property("throws if the second argument is not a promise", anyArb, (a) => {
      const block = () => ap(of((x) => x), a);
      return jsc.throws(block, TypeError, /^Future#ap (.+)to be a promise/);
    });
  });

  describe("is an instance of Monad", () => {
    // https://github.com/rpominov/static-land/blob/master/docs/spec.md#monad
    property("associativity", "nat", "nat", "nat", async (a, b, c) => {
      const f = plusP(b);
      const g = plusP(c);

      return isEqual(
        await chain(f, chain(g, of(a))),
        await chain((x) => chain(g, f(x)), of(a)),
      );
    });

    property("left identity", "nat", "nat", async (a, b) => {
      const f = plusP(b);
      return isEqual(await chain(f, of(a)), await f(a));
    });

    property("right identity", "nat", async (a) =>
      isEqual(await chain(of, of(a)), await of(a)),
    );

    property("throws if the first argument is not a function", anyArb, (f) => {
      const block = () => chain(f, of(fixture));
      return jsc.throws(block, TypeError, /^Future#chain (.+)to be a function/);
    });

    property("throws if the second argument is not a promise", anyArb, (a) => {
      const block = () => chain((x) => x, a);
      return jsc.throws(block, TypeError, /^Future#chain (.+)to be a promise/);
    });
  });
});
