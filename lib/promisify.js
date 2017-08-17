import future from "./combinators/future";

const promisify = f => (...args) =>
  Promise.all(args.map(future)).then(params => f(...params));

export default promisify;
