import {collect, collect2, collect3, collect4, collect5} from "./collect";
import {curry2} from "./internal/curry";
import flatten from "./internal/flatten";
import checkTypes from "./internal/checkTypes";

const flatmapN = (mapper, f, xs) => mapper(f, xs).then(flatten);

export const {flatmap, flatmap2, flatmap3, flatmap4, flatmap5} = [
  collect,
  collect2,
  collect3,
  collect4,
  collect5,
].reduce((memo, m, i) => {
  const name = `flatmap${i === 0 ? "" : i + 1}`;
  const f = curry2(
    name,
    checkTypes(["function", "array"], (g, xs) => flatmapN(m, g, xs)),
  );
  return Object.assign(memo, {[name]: f});
}, {});
