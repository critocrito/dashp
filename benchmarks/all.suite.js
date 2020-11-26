const Benchmark = require("benchmark");

const {allP, of} = require("..");
const nameFn = require("../dist/cjs/internal/namefn");

const onePromise = () =>
  [...new Array(1).keys()].map((x) => Promise.resolve(x));
const fivePromises = () =>
  [...new Array(5).keys()].map((x) => Promise.resolve(x));
const tenPromises = () =>
  [...new Array(10).keys()].map((x) => Promise.resolve(x));
const hundredPromises = () =>
  [...new Array(100).keys()].map((x) => Promise.resolve(x));
const thousandPromises = () =>
  [...new Array(1000).keys()].map((x) => Promise.resolve(x));

const allTyped = nameFn("allTyped", (xs) => () => Promise.all(xs.map(of)));
const allTyped2 = nameFn("allTyped2", (xs) => () => Promise.all(xs));

const suite = new Benchmark.Suite();

suite
  // One Promise
  .add("native one promise", {
    defer: true,
    fn: (deferred) => Promise.all(onePromise()).then(() => deferred.resolve()),
  })
  .add("dashp one promise", {
    defer: true,
    fn: (deferred) => allP(onePromise())().then(() => deferred.resolve()),
  })
  .add("allTyped one promise", {
    defer: true,
    fn: (deferred) => allTyped(onePromise())().then(() => deferred.resolve()),
  })
  .add("allTyped2 one promise", {
    defer: true,
    fn: (deferred) => allTyped2(onePromise())().then(() => deferred.resolve()),
  })
  // Five Promises
  .add("native five promises", {
    defer: true,
    fn: (deferred) =>
      Promise.all(fivePromises()).then(() => deferred.resolve()),
  })
  .add("dashp five promises", {
    defer: true,
    fn: (deferred) => allP(fivePromises())().then(() => deferred.resolve()),
  })
  .add("allTyped five promises", {
    defer: true,
    fn: (deferred) => allTyped(fivePromises())().then(() => deferred.resolve()),
  })
  .add("allTyped2 five promises", {
    defer: true,
    fn: (deferred) =>
      allTyped2(fivePromises())().then(() => deferred.resolve()),
  })
  // Ten Promises
  .add("native ten promises", {
    defer: true,
    fn: (deferred) => Promise.all(tenPromises()).then(() => deferred.resolve()),
  })
  .add("dashp ten promises", {
    defer: true,
    fn: (deferred) => allP(tenPromises())().then(() => deferred.resolve()),
  })
  .add("allTyped ten promises", {
    defer: true,
    fn: (deferred) => allTyped(tenPromises())().then(() => deferred.resolve()),
  })
  .add("allTyped2 ten promises", {
    defer: true,
    fn: (deferred) => allTyped2(tenPromises())().then(() => deferred.resolve()),
  })
  // Hundred Promises
  .add("native hundred promises", {
    defer: true,
    fn: (deferred) =>
      Promise.all(hundredPromises()).then(() => deferred.resolve()),
  })
  .add("dashp hundred promises", {
    defer: true,
    fn: (deferred) => allP(hundredPromises())().then(() => deferred.resolve()),
  })
  .add("allTyped hundred promises", {
    defer: true,
    fn: (deferred) =>
      allTyped(hundredPromises())().then(() => deferred.resolve()),
  })
  .add("allTyped2 hundred promises", {
    defer: true,
    fn: (deferred) =>
      allTyped2(hundredPromises())().then(() => deferred.resolve()),
  })
  // Thousand Promises
  .add("native thousand promises", {
    defer: true,
    fn: (deferred) =>
      Promise.all(thousandPromises()).then(() => deferred.resolve()),
  })
  .add("dashp thousand promises", {
    defer: true,
    fn: (deferred) => allP(thousandPromises())().then(() => deferred.resolve()),
  })
  .add("allTyped thousand promises", {
    defer: true,
    fn: (deferred) =>
      allTyped(thousandPromises())().then(() => deferred.resolve()),
  })
  .add("allTyped2 thousand promises", {
    defer: true,
    fn: (deferred) =>
      allTyped2(thousandPromises())().then(() => deferred.resolve()),
  })
  // Run
  .on("cycle", (ev) => console.log(String(ev.target)))
  .on("error", (e) => console.error(e.target.error))
  .run();
