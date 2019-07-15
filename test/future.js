import test from "ava";
import {fc, testProp} from "ava-fast-check";
import {isEqual} from "lodash/fp";
import sinon from "sinon";

import comp from "../src/compose";
import {ap, bimap, chain, map, of} from "../src/Future";
import {plus, plusP} from "./_helpers";

const fixture = Symbol("fixture");

// https://github.com/rpominov/static-land/blob/master/docs/spec.md#functor
testProp("identity of functor", [fc.anything()], async (a) =>
  isEqual(await map((x) => x, of(a)), a),
);

testProp(
  "composition of functor",
  [fc.nat(), fc.nat(), fc.nat()],
  async (a, b, c) => {
    const f = plus(b);
    const g = plus(c);

    return isEqual(await map(comp(f, g), of(a)), await map(f, map(g, of(a))));
  },
);

// https://github.com/rpominov/static-land/blob/master/docs/spec.md#bifunctor
testProp("identity of bifunctor", [fc.anything()], async (a) =>
  isEqual(await bimap((x) => x, (x) => x, of(a)), await of(a)),
);

testProp(
  "composition of bifunctor",
  [fc.nat(), fc.nat(), fc.nat(), fc.nat()],
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

testProp("deriving Functors map", [fc.nat(), fc.nat()], async (a, b) => {
  const f = plus(b);
  return isEqual(await bimap((x) => x, f, of(a)), await map(f, of(a)));
});

test("maps the left function over the rejection value", async (t) => {
  const a = sinon.stub().rejects();
  const f = sinon.mock().once();
  const g = sinon.mock().never();
  await bimap(f, g, a());
  t.true(f.verify());
  t.true(g.verify());
});

test("maps the right function over the resolution value", async (t) => {
  const a = sinon.stub().resolves(fixture);
  const f = sinon.mock().never();
  const g = sinon.mock().once();
  await bimap(f, g, a());
  t.true(f.verify());
  t.true(g.verify());
});

test("doesn't call the right function if the left one throws", async (t) => {
  const a = sinon.stub().rejects();
  const f = sinon
    .mock()
    .once()
    .rejects();
  const g = sinon.mock().never();
  try {
    await bimap(f, g, a());
  } catch (e) {} // eslint-disable-line no-empty
  t.true(f.verify());
  t.true(g.verify());
});

test("doesn't call the left function if the right one throws", async (t) => {
  const a = sinon.stub().resolves();
  const f = sinon.mock().never();
  const g = sinon
    .mock()
    .once()
    .rejects();
  try {
    await bimap(f, g, a());
  } catch (e) {} // eslint-disable-line no-empty
  t.true(f.verify());
  t.true(g.verify());
});

// https://github.com/rpominov/static-land/blob/master/docs/spec.md#applicative
testProp("identity applicative", [fc.nat()], async (a) => {
  const v = of(a);
  return isEqual(await ap(of((x) => x), v), a);
});

testProp("homomorphism applicative", [fc.nat(), fc.nat()], async (a, b) => {
  const f = plus(a);
  return isEqual(await ap(of(f), of(b)), await of(f(b)));
});

testProp("interchange applicative", [fc.nat(), fc.nat()], async (a, b) => {
  const u = of(plus(b));
  return isEqual(await ap(u, of(b)), await ap(of((f) => f(b)), u));
});

testProp(
  "composition of applicative",
  [fc.nat(), fc.nat(), fc.nat()],
  async (a, b, c) => {
    const x = of(a);
    const u = of(plus(b));
    const v = of(plus(c));

    return isEqual(await ap(ap(map(comp, u), v), x), await ap(u, ap(v, x)));
  },
);

testProp(
  "applicative deriving Functors map",
  [fc.nat(), fc.nat(), fc.nat()],
  async (a, b) => {
    const f = plus(b);

    return isEqual(await map(f, of(a)), await ap(of(f), of(a)));
  },
);

// https://github.com/rpominov/static-land/blob/master/docs/spec.md#monad
testProp(
  "monad associativity",
  [fc.nat(), fc.nat(), fc.nat()],
  async (a, b, c) => {
    const f = plusP(b);
    const g = plusP(c);

    return isEqual(
      await chain(f, chain(g, of(a))),
      await chain((x) => chain(g, f(x)), of(a)),
    );
  },
);

testProp("monad left identity", [fc.nat(), fc.nat()], async (a, b) => {
  const f = plusP(b);
  return isEqual(await chain(f, of(a)), await f(a));
});

testProp("monad right identity", [fc.nat()], async (a) =>
  isEqual(await chain(of, of(a)), await of(a)),
);
