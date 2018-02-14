import {isArray} from "./is";

// Flattens an array of arrays into an array. It only flattens one level deep,
// which is what is required by flatmap.
export default xxs => {
  const result = [];

  if (xxs == null) return result;

  xxs.forEach(xs => {
    if (isArray(xs)) result.push(...xs);
    else result.push(xs);
  });

  return result;
};
