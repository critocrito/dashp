# `combinators-p`

Program with promises in a functional style.

## Synopsis

    import {getJson, storeDb} from './async-utils';
    import {flow as flowP} from 'combinators-p';

    const url = "https://url.horse/api";

    const apiCall = flow([getJson, storeDb]);

    await apiCall(url);

## Get started

    npm install --save combinators-p

## Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [API](#api)
  - [isPromise](#ispromise)
  - [future](#future)
  - [constant](#constant)
  - [fmap](#fmap)
  - [apply](#apply)
  - [all](#all)
  - [tap](#tap)
  - [lift2](#lift2)
  - [spread](#spread)
  - [flow](#flow)
  - [fold](#fold)
  - [compose](#compose)
  - [map](#map)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### isPromise

Test if an object is a promise.

**Parameters**

-   `p` **any** The object to test.

**Examples**

```javascript
const p = future(23);
isPromise(p); // Returns true;
```

Returns **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Returns `true` if the object is a promise, otherwise
`false`;

### future

Lift a value into a promise. This is equivalent to `Promise.resolve`.

**Parameters**

-   `x` **([Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;any> | any)** The value to lift into a promise. This can
    either be a value, or a promise that resolves to a value.

**Examples**

```javascript
const x = future(23);
const f = a => future(a + 1);
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;any>** The value inside a promise.

### constant

Create a function that always returns the same value.

**Parameters**

-   `x` **([Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;any> | any)** The value to return. This can either be a value
    or a promise for a value.

**Examples**

```javascript
const f = constant("Hello");
f().then(console.log); // Returns "Hello"
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;any>** A promise that resolves to `x`.

### fmap

Map a function over a promise.

**Parameters**

-   `f` **([Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)> | [Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)&lt;any>)** The function to apply. `f` can
    either be a function, or a promise that resolves to a promise. The function
    can either return a value, or a promise that resolves to a promise.
-   `x` **([Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;any> | any)** The value to apply to `f`. This can either be a
    value, or a promise that resolves to a value.

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;any>** The result of `x` applied to `f`.

### apply

Apply a function wrapped in a promise to a promisified value.

**Parameters**

-   `pf` **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)>** A promise that resolves to a function.
-   `p` **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;Any>** A promise that resolves to a value.

**Examples**

```javascript
const pf = future(v => v + 1);
const p = future(1);
apply(pf, f).then(console.log); // Returns 2.
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;Any>** A promise resolving to x applied to the function
that f resolves to.

### all

Create a function that evaluates all promises in an array when called. This
is equivalent to `Promise.all`, with the difference that it creates a
callable function.

**Parameters**

-   `xs` **([Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)> | [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;any>)** An array of values that are
    resolved. `xs` can either be an array, or a promise that resolves to an
    array. Each element of `xs` can either be a value, or a promise that
    resolves to a value.

**Examples**

```javascript
const f = all([openFile1(), opeFile2(), openFile3()]);
f().then(console.log); // Returns [a, b, c];
```

Returns **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)&lt;Promise.Array&lt;any>>** A function, that when called, resolves all
promises and returns an Array of values.

### tap

Run a function for side effect and return the original value. The original
value gets cloned and therefore can be modified in the tap handler.

**Parameters**

-   `f` **([Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)> | [Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function))** The function for side effect. The
    return value of this function will be ignored.
-   `x` **([Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;any> | any)** The value to use for side effect. This can
    either be a value or a promise that resolves to a value.

**Examples**

```javascript
const f = a => future(a);
flow([f, tap(console.log)])(23); // Print "23" to the console.
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;any>** Returns `x`.

### lift2

Lift a binary function over two promises.

**Parameters**

-   `f` **([Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)> | [Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)&lt;any, any>)** A binary function. This
    can either be a function, or a promise that resolves to a function. The
    function can either return a value, or a promise that resolves to a value.
-   `x` **([Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;any> | any)** A value that gets lifted as the first argument
    of `f`. This can either be a value, or a promise that resolves to a value.
-   `y` **([Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;any> | any)** A value that gets lifted as the first argument
    of `f`. This can either be a value, or a promise that resolves to a value.

**Examples**

```javascript
const f = (x, y) => future(x = y);
const a = future(1);
const b = future(2);
lift2(f, a, b).then(console.log); // Returns 3.
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;any>** The value that f returns when applied to `x` and
`y`.

### spread

Call a variadic function with the value of a promise as it's arguments. If
the value is an array, flatten it to the formal parameters of the
fulfillment handler.

**Parameters**

-   `f` **([Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)> | [Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)&lt;any>)** The function to apply to the
    value of p. This function can either return a value or the promise for a
    value. This function can also be a promise that resolves to a function.
-   `p` **([Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;any> | any)** The promise that resolves to the arguments for
    the function. This can either be a single value, an Array or a promise
    resolving to any of those.

**Examples**

```javascript
const add = (x, y) => x + y;
const p = future([1, 2]);
spread(add, p).then(console.log); // Prints 3
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;any>** The result of applying the value of `p` to `f`.

### flow

Create a function out of a list of functions, where each successive
invocation is supplied the return value of the previous function call. The
new function forms a pipe where the results flow from left to right so to
speak. It's a shortcut for composing more than two functions.

**Parameters**

-   `fs` **([Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)> | [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)>)** An array of functions to
    compose. `fs` can either be an array, or a promise that resolves to an
    array. Each function can either return a value or a promise for a value.
-   `x` **([Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) | any)** The argument to call the function pipeline with. It
    can either be any value, or the promise for any value.

**Examples**

```javascript
const f = (x, y) => future(x + y);
const fs = map(f, [...Array(5).keys()]);
flow(fs, 0).then(console.log); // The sum of [0, 1, 2, 3, 4], returns 10
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;any>** The result of applying `x` to the pipeline of
`fs`.

### fold

Reduce a list of values to a single value, using a reduction function. This
is equivalent to `Array.reduce`.

**Parameters**

-   `f` **([Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)> | [Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)&lt;any>)** The reduce function to map
    over the list. `f` can either be a function, or a promise that resolves to
    a promise. This function can either return a value or the promise for a
    value.
-   `acc` **([Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;any> | any)** The initial value to apply to the first call
    of `f`. It can either be any value or the promise for any value.
-   `xs` **([Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)> | [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;any>)** The list to reduce to a single
    value. This can either be an array, or the promise for an array.

**Examples**

```javascript
const f = (acc, x) => future(acc + x);
const xs = [...Array(5).keys()];
fold(f, 0, xs).then(console.log); // The sum of [0, 1, 2, 3, 4], returns 10;
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;any>** The value of `xs` reduced over `f`.

### compose

Compose two function that return promises to yield a third function that
returns a promise. The resulting composite function is denoted
`g∘f : X → Z`, defined by `(g∘f)(x) = g(f(x))` for all `x` in `X`.

**Parameters**

-   `f` **([Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)> | [Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function))** The first function to
    compose. This argument can either be a function, or a promise that resolves
    to a function. The function can either return a value or a promise for a
    value.
-   `g` **([Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)> | [Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function))** The second function to
    compose. This argument can either be a function, or a promise that resolves
    to a function. The function can either return a value or a promise for a
    value.
-   `x` **([Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) | any)** The argument to call `(g∘f)` with. It can either be
    any value, or the promise for any value.

**Examples**

```javascript
const f = x => future(x + 1);
const g = x => future(x + 5);
const h = compose(f, g);
h(10).then(console.log); // 10 + 1 + 5, returns 16.
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;any>** The result of calling `g` with the result of
`f(x)`.

### map

Map a function over every element of a list. This is equivalent to
`Array.map`. Only one promise at a time get's resolved.

**Parameters**

-   `f` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)&lt;any>** The function that is applied to every element. This
    function can either return a value or the promise for a value.
-   `xs` **([Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)> | [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;any>)** The list to map `f` over. This can
    either be an array, or the promise for an array.

**Examples**

```javascript
const f = x => future(x + 1);
const xs = [...Array(5).keys()];
map(f, xs).then(console.log); // Prints [1, 2, 3, 4, 5]
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)>** A list of the same length as `xs`, but with `f`
applied to each of its elements.
