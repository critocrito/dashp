# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="0.8.0"></a>
# [0.8.0](https://github.com/critocrito/combinators-p/compare/v0.7.0...v0.8.0) (2017-10-18)


### Features

* **flow:** Added the flow4 combinator. ([1c20f80](https://github.com/critocrito/combinators-p/commit/1c20f80))



<a name="0.7.0"></a>
# [0.7.0](https://github.com/critocrito/combinators-p/compare/v0.6.0...v0.7.0) (2017-10-18)


### Features

* **flow:** Added flow2 and flow3. ([1073edc](https://github.com/critocrito/combinators-p/commit/1073edc))
* **flow:** Check the array type of the first argument at runtime. ([62a4a59](https://github.com/critocrito/combinators-p/commit/62a4a59))
* **lift:** Added the lift3 and lift4 combinators. ([3b42601](https://github.com/critocrito/combinators-p/commit/3b42601))



<a name="0.6.0"></a>
# [0.6.0](https://github.com/critocrito/combinators-p/compare/v0.5.1...v0.6.0) (2017-10-16)


### Features

* **collect:** Assert that the type of the second argument is an array at runtime. ([6fd0270](https://github.com/critocrito/combinators-p/commit/6fd0270))
* **flatmap:** Assert that the type of the second argument is an array at runtime. ([5a351be](https://github.com/critocrito/combinators-p/commit/5a351be))
* **fold:** Check the type of the collection at runtime. ([2584a23](https://github.com/critocrito/combinators-p/commit/2584a23))
* **future:** Ensure the last argument to be of type promise at runtime. ([c2a3a49](https://github.com/critocrito/combinators-p/commit/c2a3a49))
* **reject:** Added the reject constructor. ([0e5f322](https://github.com/critocrito/combinators-p/commit/0e5f322))
* **when:** Ensure the last argument to be of type promise at runtime. ([51ec8b1](https://github.com/critocrito/combinators-p/commit/51ec8b1))
* Runtime check some arguments of caugh and compose. ([9b589c9](https://github.com/critocrito/combinators-p/commit/9b589c9))
* Set the name attribute for every function. ([7a04c59](https://github.com/critocrito/combinators-p/commit/7a04c59))



<a name="0.5.1"></a>
## [0.5.1](https://github.com/critocrito/combinators-p/compare/v0.5.0...v0.5.1) (2017-10-09)


### Bug Fixes

* **collect:** Use the correct amount of arguments when currying. ([4e575f8](https://github.com/critocrito/combinators-p/commit/4e575f8))



<a name="0.5.0"></a>
# [0.5.0](https://github.com/critocrito/combinators-p/compare/v0.4.0...v0.5.0) (2017-10-08)


### Features

* Added tapClone and make tap non cloning. ([54faa91](https://github.com/critocrito/combinators-p/commit/54faa91))
* Export a second version of the API with P appended to every function name. ([109228f](https://github.com/critocrito/combinators-p/commit/109228f))
* Export API as default and export Future type methods. ([ba453e2](https://github.com/critocrito/combinators-p/commit/ba453e2))



<a name="0.4.0"></a>
# [0.4.0](https://gitlab.com/critocrito/combinators-p/compare/v0.3.0...v0.4.0) (2017-09-15)


### Bug Fixes

* Use the right mapper functions for flatmap. ([27665ff](https://gitlab.com/critocrito/combinators-p/commit/27665ff))


### Features

* Added a bi-functorial type interface. ([c439608](https://gitlab.com/critocrito/combinators-p/commit/c439608))
* Added a monadic type interface. ([d25b9ee](https://gitlab.com/critocrito/combinators-p/commit/d25b9ee))
* Allow values, functions and promises as action. ([13f8aad](https://gitlab.com/critocrito/combinators-p/commit/13f8aad))
* Specify the types more precisely. ([43e83c8](https://gitlab.com/critocrito/combinators-p/commit/43e83c8))
* The conditional operators allow values, functions and promises as action. ([4f9376b](https://gitlab.com/critocrito/combinators-p/commit/4f9376b))
* Validate arguments that should be functions. ([04d88fb](https://gitlab.com/critocrito/combinators-p/commit/04d88fb))



<a name="0.3.0"></a>
# [0.3.0](https://gitlab.com/critocrito/combinators-p/compare/v0.2.0...v0.3.0) (2017-08-25)


### Bug Fixes

* Corrected the package name. ([040230d](https://gitlab.com/critocrito/combinators-p/commit/040230d))


### Features

* **caught:** Added caught combinator. ([e8a4e87](https://gitlab.com/critocrito/combinators-p/commit/e8a4e87))
* **conditional:** Added branching operators when, whenElse, unless and unlessElse. ([15807c5](https://gitlab.com/critocrito/combinators-p/commit/15807c5))
* **delay:** Added a delay combinator. ([544175a](https://gitlab.com/critocrito/combinators-p/commit/544175a))
* **flatmap:** Added the flatmap combinator. ([2fcf4c0](https://gitlab.com/critocrito/combinators-p/commit/2fcf4c0))
* **map:** Added more concurrent versions of the map combinator. ([1543fd9](https://gitlab.com/critocrito/combinators-p/commit/1543fd9))
* **retry:** Added various retry combinators. ([713a728](https://gitlab.com/critocrito/combinators-p/commit/713a728))
* **spread:** Added the spread combinator. ([a97fcc8](https://gitlab.com/critocrito/combinators-p/commit/a97fcc8))



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
