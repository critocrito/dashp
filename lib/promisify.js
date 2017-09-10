import {of} from "./Future";

const promisify = f => (...args) =>
  Promise.all(args.map(of)).then(params => f(...params));

export default promisify;
