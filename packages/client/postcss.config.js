const postcssJitProps = require("postcss-jit-props");
const OpenProps = require("open-props");
const postcssNesting = require("postcss-nesting");
const postcssImport = require("postcss-import");
const combineSelectors = require("postcss-combine-duplicated-selectors");
// // const cssnano = require("cssnano");
const postcssSorting = require("postcss-sorting");
const customMedia = require("postcss-custom-media");


module.exports = {
  plugins: [
    postcssImport(),
    // postcssJitProps(OpenProps),
    customMedia({
      importFrom: ["./node_modules/open-props/media.min.css"],
    }),
    postcssNesting(),
    combineSelectors(),
    postcssSorting(),
    // cssnano()
  ],
};


