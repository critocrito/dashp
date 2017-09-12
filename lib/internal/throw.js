const ordinal = ["first", "second", "third", "fourth", "fifth"];

const show = p => JSON.stringify(p, null, 2);

export const error = message => {
  throw new Error(message);
};

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
  typeError(
    `${it} expects its ${ordinal[
      at
    ]} argument to be a function\n  Actual: ${show(actual)}`
  );

export const invalidPromise = (it, at, actual) =>
  typeError(`${it} expects its ${ordinal[at]} argument to be a promise.
  Actual: ${show(actual)}`);

export const invalidFuture = it =>
  typeError(`${it} was invoked outside the context of a Promise.`);
