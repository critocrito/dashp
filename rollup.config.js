import babel from "rollup-plugin-babel";
import uglify from "rollup-plugin-uglify";
import pkg from "./package.json";

const plugins = [
  babel({
    presets: [["es2015", {modules: false}]],
    plugins: ["external-helpers"],
    babelrc: false,
    exclude: "node_modules/**",
  }),
];

const minify = plugins.concat([uglify()]);

export default [
  {
    input: "lib/index.js",
    output: {
      file: pkg.main,
      format: "umd",
      sourcemap: true,  
    },
    name: "combinators-p",
    plugins,
  },
  {
    input: "lib/index.js",
    output: {
      file: `${pkg.browser.split(".")[0]}.min.js`,
      format: "umd",
      sourcemap: true,
    },
    name: "combinators-p",
    plugins: minify,
  },
];
