import {isThenable} from "./internal/is";

const isPromise = isThenable;

Object.defineProperty(isPromise, "name", {
  value: "isPromise",
  configureable: true,
});

export default isPromise;
