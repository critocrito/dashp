import {isArray} from "./is";

const clone = (obj, hash = new WeakMap()) => {
  // eslint-disable-next-line no-new-object
  if (new Object(obj) !== obj) return obj; // primitives
  if (hash.has(obj)) return hash.get(obj); // cyclic references
  let result;

  if (isArray(obj)) result = [];
  else if (obj.constructor) result = new obj.constructor();
  else result = Object.create(null);

  hash.set(obj, result);

  if (obj instanceof Map) {
    [...obj].map(([key, val]) => result.set(key, clone(val, hash)));
  }

  return Object.assign(
    result,
    ...Object.keys(obj).map((key) => ({[key]: clone(obj[key], hash)})),
  );
};

export default clone;
