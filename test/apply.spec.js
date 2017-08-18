import {property} from "jsverify";

import {addP, isEqualAry} from "./arbitraries";

import future from "../lib/combinators/future";
import apply from "../lib/combinators/apply";
import fmap from "../lib/combinators/fmap";
import all from "../lib/combinators/all";
import compose from "../lib/combinators/compose";

describe("The applicative functor", () => {
  const id = future;

  // future id <*> v = v
  property("holds for the law of identity for applicative", "nat", x =>
    all([apply(future(id), future(x)), future(x)])().then(isEqualAry)
  );

  // future f <*> future x = future (f x)
  property(
    "holds for the law of homomorphism for applicative",
    "nat",
    "nat",
    (x, y) => {
      const f = addP(x);

      return all([apply(future(f), future(y)), future(f(y))])().then(
        isEqualAry
      );
    }
  );

  // u <*> future y = future ($ y) <*> u
  property(
    "holds for the law of interchange for applicatives",
    "nat",
    "nat",
    (x, y) => {
      const u = future(addP(x));
      const p = future(y);

      return all([apply(u, p), apply(future(f => f(y)), u)])().then(isEqualAry);
    }
  );

  // future (.) <*> u <*> v <*> w = u <*> (v <*> w)
  property(
    "holds for the law of composition for applicatives",
    "nat",
    "nat",
    "nat",
    (x, y, z) => {
      const u = future(addP(x));
      const v = future(addP(y));
      const p = future(z);

      return all([
        apply(apply(apply(future(compose), u), v), p),
        apply(u, apply(v, p)),
      ])().then(isEqualAry);
    }
  );

  // fmap f x = future f <*> x
  property(
    "holds for the relation between fmap and apply",
    "nat",
    "nat",
    (x, y) => {
      const f = addP(x);
      const p = future(y);

      return all([fmap(f, p), apply(future(f), p)])().then(isEqualAry);
    }
  );
});
