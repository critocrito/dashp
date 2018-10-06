import Benchmark from "benchmark";
import {curry} from "lodash/fp";

import {curry2, curry3, curry4, curry5} from "../src/internal/curry";

const add2 = (a, b) => a + b;
const add3 = (a, b, c) => a + b + c;
const add4 = (a, b, c, d) => a + b + c + d;
const add5 = (a, b, c, d, e) => a + b + c + d + e;

const loAdd2 = curry(add2);
const loAdd3 = curry(add3);
const loAdd4 = curry(add4);
const loAdd5 = curry(add5);

const dashpAdd2 = curry2("add2", add2);
const dashpAdd3 = curry3("add3", add3);
const dashpAdd4 = curry4("add4", add4);
const dashpAdd5 = curry5("add5", add5);

const suite = new Benchmark.Suite();

suite
  .add("Lodash add2", () => loAdd2(1, 23))
  .add("DashP add2", () => dashpAdd2(1, 23))
  .add("Lodash add3", () => loAdd3(1, 23, 42))
  .add("DashP add3", () => dashpAdd3(1, 23, 42))
  .add("Lodash add4", () => loAdd4(1, 23, 42, 37))
  .add("DashP add4", () => dashpAdd4(1, 23, 42, 37))
  .add("Lodash add5", () => loAdd5(1, 23, 42, 37, 66))
  .add("DashP add5", () => dashpAdd5(1, 23, 42, 37, 66))
  .add("Lodash add2 piecemeal", () => loAdd2(1)(23))
  .add("DashP add2 piecemeal", () => dashpAdd2(1)(23))
  .add("Lodash add3 piecemeal", () => loAdd3(1)(23)(42))
  .add("DashP add3 piecemeal", () => dashpAdd3(1)(23)(42))
  .add("Lodash add4 piecemeal", () => loAdd4(1)(23)(42)(37))
  .add("DashP add4 piecemeal", () => dashpAdd4(1)(23)(42)(37))
  .add("Lodash add5 piecemeal", () => loAdd5(1)(23)(42)(37)(66))
  .add("DashP add5 piecemeal", () => dashpAdd5(1)(23)(42)(37)(66))
  .on("cycle", (ev) => console.log(String(ev.target)))
  .on("error", (e) => console.error(e.target.error))
  .run();
