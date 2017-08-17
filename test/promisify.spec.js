import {property} from "jsverify";
import {identity, isEqual} from "lodash/fp";
import sinon from "sinon";
import promisify from "../lib/promisify";
import isPromise from "../lib/utils/is-promise";

describe("The promisification of arguments", () => {
  property("returns a promise", "nat", x => isPromise(promisify(identity)(x)));

  property("promisifies its arguments", "nat", x =>
    promisify(identity)(x).then(isEqual(x))
  );

  property("promisifies variadic functions", "array nat", xs => {
    const spy = sinon.spy();
    return promisify(spy)(...xs).then(() => spy.args[0].length === xs.length);
  });
});
