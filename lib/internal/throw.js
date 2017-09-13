const ordinal = ["first", "second", "third", "fourth", "fifth"];

const show = p => JSON.stringify(p, null, 2);

export const typeError = message => {
  throw new TypeError(message);
};

export const invalidArgument = (it, at, expected, actual) =>
  typeError(
    `${it} expects its ${ordinal[at]} argument to ${expected}\n  Actual: ${show(
      actual
    )}`
  );

export const invalidFunction = (it, at, actual) =>
  invalidArgument(it, at, "be a function", actual);

export const invalidArray = (it, at, actual) =>
  invalidArgument(it, at, "be an array", actual);

export const invalidThenable = (it, at, actual) =>
  invalidArgument(it, at, "be a promise", actual);
