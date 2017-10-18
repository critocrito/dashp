# `combinators-p`

[![Build Status](https://travis-ci.org/critocrito/combinators-p.svg?branch=master)](https://travis-ci.org/critocrito/combinators-p)

`combinators-p` allows to program with
[Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
in a functional style. It offers a collection of higher-order and utility
functions that operate on Promises.

It implements [a *monadic* interface](#interoperability) for Promises, but
unlike other [great libraries](https://github.com/fluture-js/Fluture) it
doesn't introduce new semantics. It just forms a small wrapper around the
native Promise API. This is great for integrating it into any codebase that
already uses Promises, without having to relearn new semantics or changing the
structure.

This library intends to be very lightweight. It has no external dependencies
and has a size of less than 3K when minified and gzipped.

## Synopsis

```javascript
import {getJson, storeDb} from './async-utils';
import {flowP, tapP} from 'combinators-p';

const url = "https://url.horse/api";

const apiCall = flowP([getJson, tapP(console.log), storeDb]);

await apiCall(url);
```

## Interoperability

<a href="http://promises-aplus.github.com/promises-spec"><img width="82" height="82" alt="Promises/A+" src="https://promisesaplus.com/assets/logo-small.png"></a>
<a href="https://github.com/rpominov/static-land"><img width="131" height="82" src="https://raw.githubusercontent.com/rpominov/static-land/master/logo/logo.png" /></a>

`combinators-p` is [compatible with Promises/A+ and ES6 Promises](promises).
It also implements [Static Land](https://github.com/rpominov/static-land)
[`Functor`](https://github.com/rpominov/static-land/blob/master/docs/spec.md#functor),
[`Bifunctor`](https://github.com/rpominov/static-land/blob/master/docs/spec.md#bifunctor),
[`Apply`](https://github.com/rpominov/static-land/blob/master/docs/spec.md#apply),
[`Applicative`](https://github.com/rpominov/static-land/blob/master/docs/spec.md#applicative),
[`Chain`](https://github.com/rpominov/static-land/blob/master/docs/spec.md#chain)
and
[`Monad`](https://github.com/rpominov/static-land/blob/master/docs/spec.md#monad).

## Contents

- [Usage](#usage)
- [API](#api)

## Usage

    npm install --save combinators-p

Every function has an alias that appends _P_ to the function name,
e.g. `flowP` is an alias for `flow` and `collectP3` is an alias for
`collect3`. This allows for cleaner imports in situations where function names
can clash.

```javascript
import {map, sum} from "lodash/fp";
import {mapP} from "combinators-p";

map(sum, [1, 2, 3]); // Lodash version.
mapP(sum, [1, 2, 3]); // combinators-p version.
```

`combinators-p` depends on [`Array.isArray`][JS:Array.isArray]. You may need
to polyfill it if your JavaScript environment doesn't provide it.

<details><summary>Creating new Promises</summary>

- [`of`: Lift a value into a promise.](#of)
- [`reject`: Create a rejected promise.](#reject)

</details>

<details><summary>Transforming and combining Promises</summary>

- [`map`: Map a function over a promise.](#map)
- [`bimap`: Map either the left or right function over a promise.](#bimap)
- [`ap`: Apply a function wrapped in a promise to a promisified value.](#ap)
- [`chain`: Map a function over a promise.](#chain)
- [`compose`: Compose two functions that return promises.](#compose)
- [`whenElse`: Branch left if the predicate holds, otherwise branch right.](#whenelse)
- [`when`: Conditionally call a function if the predicate holds.](#when)
- [`unlessElse`: Branch left if the predicate doesn't hold, otherwise branch right.](#unlesselse)
- [`unless`: Conditionally call a function if the predicate doesn't hold.](#unless)

</details>

<details><summary>Collections</summary>

- [`all`: Resolve all promises in an array.](#all)
- [`fold`: Reduce a list of values to a single value, using a reduction function.](#fold)
- [`collect`: Map a function over every element of a list.](#collect)
- [`flatmap`: Map a function over every element of a list and concatenate the results.](#flatmap)

</details>

<details><summary>Utility functions</summary>

- [`isPromise`: Determine whether value is a promise.](#ispromise)
- [`tap`: Call a function for side effect and return the original value.](#tap)
- [`tapClone`: Call a function for side effect and return the original value.](#tapclone)
- [`caught`: Catch an exception on a promise and call a handler.](#caught)
- [`spread`: Call a variadic function with the value of a promise as it's arguments.](#spread)
- [`flow`: Compose functions into a chain.](#flow)
- [`flow2`: Lift a composed function chain over two arguments.](#flow2)
- [`flow3`: Lift a composed function chain over three arguments.](#flow3)
- [`flow4`: Lift a composed function chain over four arguments.](#flow4)
- [`constant`: Create a function that always returns the same value.](#constant)
- [`lift2`: Lift a binary function over two promises.](#lift2)
- [`lift3`: Lift a ternary function over three promises.](#lift3)
- [`lift4`: Lift a quatary function over four promises.](#lift4)
- [`delay`: Delay the resolution of a promise chain.](#delay)
- [`retry`: Call an action, and retry it in case it fails.](#retry)

</details>

## API

### `of`

Lift a value into a promise.

```hs
of :: b -> Promise a b
```

This is equivalent to `Promise.resolve`. It returns a promise that resolves to
the applied value. This function is compliant with the [Static Land
Applicative specification][SL:applicative].

```javascript
import {of} from "combinators-p";

const p = of(23);

p.then(x => console.log(`${x} things.`));
// Prints '23 things.'
```

### `reject`

Create a rejected promise.

```hs
reject :: Promise p => a -> p a b
```

This function can either take an `Error` object or an string. If a string is
provided, it is converted to an `Error`.

```javascript
import {reject} from "Combinators-p";

const msg = "Boom!";

reject(msg).catch(console.log);
// Prints `Error`
reject(new TypeError(msg)).catch(console.log);
// Prints `TypeError`
```

### `map`

Map a function over a promise.

```hs
map :: Promise p => (a -> b) -> p a -> p b
```

It transforms the value that a promise resolves to and returns a new
promise. This is equivalent to `promise.then(x => x + 1)`. The transformation
is only applied if the promise resolves successfully, it is ignored if the
promise gets rejected. This function is compliant with the [Static Land
Functor specification](SL:functor).

```javascript
import {of, map} from "combinators-p";

const p = of(1);
const f = x => x + 1;

map(f, p).then(console.log);
// Prints 2
```

### `bimap`

Map either the left or right function over a promise.

```hs
bimap :: Promise p => (a -> c) -> (b -> d) -> p a b -> p c d
```

Map the left function over the rejection value, and the right function over
the success value of a promise. This function is compliant with the [Static
Land Bifunctor specification](SL:bifunctor).

```javascript
import {of, bimap} from "combinators-p";

const f = () => console.log('Boom!');
const g = x => x + 1;

bimap(f, g, of(1)).then(console.log);
// Prints 2
bimap(f, g, Promise.reject());
// Prints 'Boom!'
```

### `ap`

Apply a function wrapped in a promise to a promisified value.

```hs
ap :: Promise p => p (a -> b) -> p a -> p b
```

This function is compliant with the [Static Land Apply
specification](SL:apply).

```javascript
import {of, ap} from "combinators-p";

const pf = of(v => v + 1);
const p = of(1);

ap(pf, p).then(console.log);
// Prints 2
```

### `chain`

Map a function over a promise.

```hs
chain :: Promise p => (a -> p b) -> p a -> p b
```

This is equivalent to `promise.then(f)`. In practice `chain` works the same as
`map`. The difference is only in the type. This function is compliant with the
[Static Land Chain specification](SL:chain).

```javascript
import {of, chain} from "combinators-p";

const f = x => of(x + 1);

chain(f, of(0)).then(consol.log);
// Prints 1
```

### `compose`

Compose two functions that return promises.

```hs
compose :: Promise p => (a -> p b) -> (b -> p c) -> p a -> p c
```

`compose` yields a third function that returns a promise. The resulting
composite function is denoted `g∘f : X → Z`, defined by `(g∘f)(x) = g(f(x))`
for all `x` in `X`.

```javascript
import {of, compose} from "combinators-p";

const f = x => of(x + 1);
const g = x => of(x + 5);
const h = compose(f, g);

h(10).then(console.log);
// Prints 16
```

### `whenElse`

Branch left if the predicate holds, otherwise branch right.

```hs
whenElse :: Promise p => (p a -> Boolean) -> (p a -> p b) -> (p a -> p b) -> p c
```

This is a conditional branch like the builtin `if ... else` construct.

```javascript
import {whenElse} from "combinators-p";

const predicate = userExists;
const consequent = updateUser;
const alternative = createUser;

whenElse(predicate, consequent, alternative, user);
// Calls updateUser if the user exists, and otherwise creates it
```

### `when`

Conditionally call a function if the predicate holds.

```hs
when :: Promise p => (p a -> Boolean) -> (p a -> p b) -> p c
```

This is a conditional branch like the builtin `if` construct. If the predicate
returns true, it will return the result of the consequent, otherwise it
returns the original value.

```javascript
import {when} from "combinators-p";

const pred = userExists;
const consequent = updateUser;

when(predicate, consequent, user);
// Calls updateUser if the user exists, otherwise returns the user
```

### `unlessElse`

Branch left if the predicate doesn't hold, otherwise branch right.

```hs
unlexxElse :; Promise p => (p a -> Boolean) -> (p a -> p b) -> (p a -> p b) -> p c
```

This is a conditional branch like the builtin `if (! ... ) ... else`
construct.

```javascript
import {unlessElse} from "combinators-p";

const predicate = userExists;
const consequent = createUser;
const alternative = createUser;

unlessEles(predicate, consequent, alternative, user);
// Creates the user unless it exists, otherwise updates it
```

### `unless`

Conditionally call a function if the predicate doesn't hold.

```hs
unless :: Promise p => (p a -> Boolean) -> (p a -> p b) -> p c
```

This is a conditional branch like the builtin `if (! ...)` construct. If the
predicate returns false, it will return the result of the consequent,
otherwise it returns the original value.

```javascript
import {unless} from "combinators-p";

const pred = userExists;
const consequent = createUser;

unless(predicate, consequent, user);
// Calls createUser if the user doesn't exist, otherwise returns the user
```

### `all`

Resolve all promises in an array.

```hs
all :: Promise p => [p b a] -> p b [a]
```

This is equivalent to `Promise.all`, with the difference that it creates a
callable function.

```javascript
import {all} from "combinators-p";

const f = all([openFile1(), opeFile2(), openFile3()]);

f().then(console.log);
// Prints [a, b, c]
```

### `fold`

Reduce a list of values to a single value, using a reduction function.

```hs
fold :: Promise p => (p b c -> p b a -> p b c) -> p b c -> [p b a] -> p b c
```

This is equivalent to `Array.reduce`.

```javascript
import {of, fold} from "combinators-p";

const f = (acc, x) => of(acc + x);
const xs = [...Array(5).keys()];

fold(f, 0, xs).then(console.log);
// Prints 10
```

### `collect`

Map a function over every element of a list.

```hs
collect :: Promise p => (p b a -> p b a) -> [p b a] -> p b [a]
```

This is equivalent to `Array.map`. In it's standard version it only resolves
one promise at a time. There are specialized versions to resolve multiple
promises at the same time.

- `collect2`: Resolve two promises at the same time.
- `collect3`: Resolve three promises at the same time.
- `collect4`: Resolve four promises at the same time.
- `collect5`: Resolve five promises at the same time.

```javascript
import {of, collect} from "combinators-p";

const f = x => of(x + 1);
const xs = [...Array(5).keys()];

collect(f, xs).then(console.log);
// Prints [1, 2, 3, 4, 5]
```

### `flatmap`

Map a function over every element of a list and concatenate the results.

```hs
flatmap :: Promise p => (p b a -> p b [a]) -> [p b a] -> p b [a]
```

This is equivalent to calling `collect` and flattening the resulting list of
lists into a single list. In it's standard version it only resolves one
promise at a time. There are specialized versions to resolve multiple promises
at the same time.

- `collect2`: Resolve two promises at the same time.
- `collect3`: Resolve three promises at the same time.
- `collect4`: Resolve four promises at the same time.
- `collect5`: Resolve five promises at the same time.

```javascript
import {flatmap} from "combinators-p";

const f = x => [x, x];
const xs = [1, 2];

flatmap(f, xs).then(console.log);
// Prints [1, 1, 2, 2]
```

### `isPromise`

Determine whether an object is a promise.

```hs
isPromise :: a -> Boolean
```

```javascript
import {of, isPromise} from "combinators-p";

const p = of(23);

isPromise(p);
// Prints true
```

### `tap`

Call a function for side effect and return the original value.

```hs
tap :: Promise p => (p b a -> ()) -> p b a -> p b a
```

```javascript
import {of, flow, tap} from "combinators-p";

const f = a => of(a);

flow([f, tap(console.log)])(23);
// Print "23"
```

### `tapClone`

Call a function for side effect and return the original value.

```hs
tap :: Promise p => (p b a -> ()) -> p b a -> p b a
```

This function is like `tap`, but makes a deep clone of the value before
applying it to the function.

```javascript
import {of, flow, tapClone} from "combinators-p";

const f = a => of(a);

flow([f, tapClone(console.log)])(23);
// Print "23"
```

### `caught`

Catch an exception on a promise and call a handler.

```hs
caught :: Promise p => (p b -> p b a) -> p b -> p b a
```

This is equivalent to `Promise.catch`.

```javascript
import {caught, flow} from "combinators-p";

const f = () => new Error("Boom");

flow([f, caught(console.err)]);
// Prints the exception
```

### `spread`

Call a variadic function with the value of a promise as it's arguments.

```hs
spread :: Promise p => (a -> b) -> p b [a] -> p b a
```

If the value is an array, flatten it to the formal parameters of the
fulfillment handler.

```javascript
import {of, flow, spread} from "combinators-p";

const plus = (x, y) => x + y;
const p = of([1, 2]);

spread(plus, p).then(console.log);
// Prints 3
```

### `flow`

Compose functions into a chain.

```hs
flow :: Promise p => [(a -> c)] -> p b a -> p b a
```

Create a function out of a list of functions, where each successive invocation
is supplied the return value of the previous function call. The new function
forms a pipe where the results flow from left to right so to speak. It's a
shortcut for composing more than two functions.

```javascript
import {of, flow} from "combinators-p";

const f = (x, y) => of(x + y);
const fs = [...Array(5).keys()].map(f);

flow(fs, 0).then(console.log);
// Prints 10
```

### `flow2`

Lift a composed function chain over two arguments.

```hs
flow :: Promise p => [(a -> a -> a) (a -> a)] -> p b a -> p b a -> p b a
```

This function works like `flow`, but it accepts two arguments, that are lifted
into the first function of the chain.

```javascript
import {of, flow2} from "combinators-p";

const f = (x, y) => of(x + y);
const fs = [...Array(5).keys()].map(f);

flow([f, ...fs], 0, 0).then(console.log);
// Prints 10
```

### `flow3`

Lift a composed function chain over three arguments.

```hs
flow :: Promise p => [(a -> a -> a -> a) (a -> a)] -> p b a -> p b a -> p b a -> p b a
```

This function works like `flow`, but it accepts three arguments, that are lifted
into the first function of the chain.

```javascript
import {of, flow3} from "combinators-p";

const f = (x, y) => of(x + y);
const g = (x, y, z) => of(x + y + z);
const fs = [...Array(5).keys()].map(f);

flow([g, ...fs], 0, 0, 0).then(console.log);
// Prints 10
```

### `flow4`

Lift a composed function chain over four arguments.

```hs
flow :: Promise p => [(a -> a -> a -> a ->) (a -> a)] -> p b a -> p b a -> p b a -> p b a -> p b a
```

This function works like `flow`, but it accepts four arguments, that are lifted
into the first function of the chain.

```javascript
import {of, flow4} from "combinators-p";

const f = (x, y) => of(x + y);
const g = (w, x, y, z) => of(w + x + y + z);
const fs = [...Array(5).keys()].map(f);

flow([g, ...fs], 0, 0, 0, 0).then(console.log);
// Prints 10
```

### `constant`

Create a function that always returns the same value.

```hs
constant :: a -> (b -> Promise a)
```

```javascript
import {constant} from "combinators-p";

const f = constant("Hello");

f().then(console.log);
// Prints "Hello"
```

### `lift2`

Lift a binary function over two promises.

```hs
lift2 :: Promise p => (a -> a -> a) -> p b a -> p b a -> p b a
```

```javascript
import {of, lift2} from "combinators-p";

const f = (x, y) => x + y;

lift2(f, of(1), of(2)).then(console.log);
// Prints 3
```

### `lift3`

Lift a ternary function over three promises.

```hs
lift3 :: Promise p => (a -> a -> a -> a) -> p b a -> p b a -> p b a -> p b a
```

```javascript
import {of, lift3} from "combinators-p";

const f = (x, y, z) => x + y + z;

lift3(f, of(1), of(2), of(3)).then(console.log);
// Prints 6
```

### `lift4`

Lift a quartary function over four promises.

```hs
lift4 :: Promise p => (a -> a -> a -> a -> a) -> p b a -> p b a -> p b a -> p b a -> p b a
```

```javascript
import {of, lift4} from "combinators-p";

const f = (w, x, y, z) => w + x + y + z;

lift4(f, of(1), of(2), of(3), of(4)).then(console.log);
// Prints 10
```

### `delay`

Delay the resolution of a promise chain.

```hs
delay :: Promise p => x -> p b a -> p b a
```

The first arguments is the delay in milliseconds.

```javascript
import {of, delay} from "combinators-p";

delay(100, of(23)).then(console.log);
// Waits 100 ms and print 23.
```

### `retry`

Call an action, and retry it in case it fails.

```hs
retry :: Promise p => p b a -> p b a
```

An action is retried up to five times with an increasing timeout. The action
can be a function as well. In it's standard version, the action function
doesn't receive any arguments.

```javascript
import {retry} from "combinators-p";

// Retries `fetchUser` in case of failure.
retry(fetchUser).then(console.log).catch(console.error);
```

## License

[GPL 3.0 licensed](LICENSE)

<!-- References -->

[SL]: https://github.com/rpominov/static-land
[SL:functor]: https://github.com/rpominov/static-land/blob/master/docs/spec.md#functor
[SL:chain]: https://github.com/rpominov/static-land/blob/master/docs/spec.md#chain
[SL:apply]: https://github.com/rpominov/static-land/blob/master/docs/spec.md#apply
[SL:applicative]: https://github.com/rpominov/static-land/blob/master/docs/spec.md#applicative
[SL:bifunctor]: https://github.com/rpominov/static-land/blob/master/docs/spec.md#bifunctor
