# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="0.2.0"></a>
# [0.2.0](https://gitlab.com/critocrito/combinators-p/compare/v0.1.0...v0.2.0) (2017-08-17)


### Features

* **isPromise:** Added the isPromise check. ([1f0c366](https://gitlab.com/critocrito/combinators-p/commit/1f0c366))



<a name="0.1.0"></a>
# 0.1.0 (2017-08-01)


### Bug Fixes

* **all:** The argument xs can be either an array or a promise that resolves to an array. ([764115c](https://gitlab.com/critocrito/combinators-p/commit/764115c))
* **compose:** The argumens f and g can either be functions or promises that resolves to a function. ([7299749](https://gitlab.com/critocrito/combinators-p/commit/7299749))
* **flow:** The argument fs can be either an array or a promise that resolves to an array. ([4821584](https://gitlab.com/critocrito/combinators-p/commit/4821584))
* **fold:** The argument f can be either a function or a promise that resolves to a function. ([22a5ad2](https://gitlab.com/critocrito/combinators-p/commit/22a5ad2))


### Features

* **all:** Added the all combinator. ([ca77613](https://gitlab.com/critocrito/combinators-p/commit/ca77613))
* **apply:** Added the apply combinator. ([6b99ed8](https://gitlab.com/critocrito/combinators-p/commit/6b99ed8))
* **compose:** Added a promisified compose operator. ([1ed6905](https://gitlab.com/critocrito/combinators-p/commit/1ed6905))
* **constant:** Added the constant combinator. ([1bcb459](https://gitlab.com/critocrito/combinators-p/commit/1bcb459))
* **deps:** Removed lodash and bluebird as dependency. ([5bca8a2](https://gitlab.com/critocrito/combinators-p/commit/5bca8a2))
* **flow:** Added a flow operator to compose more than two functions. ([9f6ced7](https://gitlab.com/critocrito/combinators-p/commit/9f6ced7))
* **fmap:** Added fmap operator. ([6f945ac](https://gitlab.com/critocrito/combinators-p/commit/6f945ac))
* **fold:** Added the fold operator, that is an asynchronous version of Array.reduce. ([ec28ccf](https://gitlab.com/critocrito/combinators-p/commit/ec28ccf))
* **future:** Added the future combinator to lift values into Promises. ([9d15dc4](https://gitlab.com/critocrito/combinators-p/commit/9d15dc4))
* **lift2:** Added the lift2 combinator. ([f3fbb63](https://gitlab.com/critocrito/combinators-p/commit/f3fbb63))
* **map:** Added a map operator. ([b9030eb](https://gitlab.com/critocrito/combinators-p/commit/b9030eb))
* **tap:** Added a tap combinator for side effects. ([5a9a001](https://gitlab.com/critocrito/combinators-p/commit/5a9a001))
