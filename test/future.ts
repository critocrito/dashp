import test from "ava";
import {fc, testProp} from "ava-fast-check";
import sinon from "sinon";

import comp from "../src/compose";
import {ap, bimap, chain, map, of} from "../src/future";
import {plus, plusP} from "./_helpers";

const fixture = Symbol("fixture");

// https://github.com/rpominov/static-land/blob/master/docs/spec.md#functor
testProp("identity of functor", [fc.anything()], async (t, a) =>
  t.is(await map(<T extends unknown>(x: T): T => x, of(a)), a),
);

testProp(
  "composition of functor",
  [fc.nat(), fc.nat(), fc.nat()],
  async (t, a, b, c) => {
    const f = plus(b);
    const g = plus(c);

    return t.is(await map(comp(f, g), of(a)), await map(f, map(g, of(a))));
  },
);

// https://github.com/rpominov/static-land/blob/master/docs/spec.md#bifunctor
testProp("identity of bifunctor", [fc.anything()], async (t, a) =>
  t.is(
    await bimap(
      <T extends unknown>(x: T): T => x,
      <T extends unknown>(x: T): T => x,
      of(a),
    ),
    await of(a),
  ),
);

testProp(
  "composition of bifunctor",
  [fc.nat(), fc.nat(), fc.nat(), fc.nat(), fc.nat()],
  async (t, a, b, c, d, e) => {
    const f = plus(b);
    const g = plus(c);
    const h = plus(d);
    const i = plus(e);

    return t.is(
      await bimap(
        (x: number): number => f(g(x)),
        (x: number): number => h(i(x)),
        of(a),
      ),
      await bimap(f, h, bimap(g, i, of(a))),
    );
  },
);

testProp("deriving Functors map", [fc.nat(), fc.nat()], async (t, a, b) => {
  const f = plus(b);
  return t.is(
    await bimap((x: number): number => x, f, of(a)),
    await map(f, of(a)),
  );
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
  const f = sinon.mock().once().rejects();
  const g = sinon.mock().never();
  try {
    await bimap(f, g, a());
  } catch {} // eslint-disable-line no-empty
  t.true(g.verify());
});

test("doesn't call the left function if the right one throws", async (t) => {
  const a = sinon.stub().resolves();
  const f = sinon.mock().never();
  const g = sinon.mock().once().rejects();
  try {
    await bimap(f, g, a());
  } catch {} // eslint-disable-line no-empty
  t.true(f.verify());
});

// https://github.com/rpominov/static-land/blob/master/docs/spec.md#applicative
testProp("identity applicative", [fc.nat()], async (t, a) => {
  const v = of(a);
  return t.is(
    await ap(
      of((x: number): number => x),
      v,
    ),
    a,
  );
});

testProp("homomorphism applicative", [fc.nat(), fc.nat()], async (t, a, b) => {
  const f = plus(a);
  return t.is(await ap(of(f), of(b)), await of(f(b)));
});

testProp("interchange applicative", [fc.nat()], async (t, a) => {
  const u = of(plus(a));
  return t.is(
    await ap(u, of(a)),
    await ap(
      of(<T extends (x: number) => number>(f: T) => f(a)),
      u,
    ),
  );
});

testProp(
  "composition of applicative",
  [fc.nat(), fc.nat(), fc.nat()],
  async (t, a, b, c) => {
    const x = of(a);
    const u = of(plus(b));
    const v = of(plus(c));

    return t.is(await ap(ap(map(comp, u), v), x), await ap(u, ap(v, x)));
  },
);

testProp(
  "applicative deriving Functors map",
  [fc.nat(), fc.nat()],
  async (t, a, b) => {
    const f = plus(b);

    return t.is(await map(f, of(a)), await ap(of(f), of(a)));
  },
);

// https://github.com/rpominov/static-land/blob/master/docs/spec.md#monad
testProp(
  "monad associativity",
  [fc.nat(), fc.nat(), fc.nat()],
  async (t, a, b, c) => {
    const f = plusP(b);
    const g = plusP(c);

    return t.is(
      await chain(f, chain(g, of(a))),
      await chain((x: number) => chain(g, f(x)), of(a)),
    );
  },
);

testProp("monad left identity", [fc.nat(), fc.nat()], async (t, a, b) => {
  const f = plusP(b);
  return t.is(await chain(f, of(a)), await f(a));
});

testProp("monad right identity", [fc.nat()], async (t, a) =>
  t.is(await chain(of, of(a)), await of(a)),
);
