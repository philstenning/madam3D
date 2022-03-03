// const postcssJitProps = require("postcss-jit-props");
const OpenProps = require("open-props");
// const postcssNesting = require("postcss-nesting");
// const postcssImport = require("postcss-import");
// const combineSelectors = require("postcss-combine-duplicated-selectors");
// // const cssnano = require("cssnano");
// const postcssSorting = require("postcss-sorting");
// const customMedia = require("postcss-custom-media");


module.exports = {
  plugins: {
    "postcss-flexbugs-fixes": {},
    "postcss-preset-env": {
      autoprefixer: {
        flexbox: "no-2009",
      },
      stage: 1,
      features: {
        "custom-properties": true,
        "nesting-rules": true,
        "custom-media-queries": {
          importFrom: ["node_modules/open-props/media.min.css"],
        },
      },
    },
    // "postcss-jit-props": OpenProps,
    // "postcss-combine-duplicated-selectors": {},
    // "postcss-sorting": {},
    // "postcss-import": {},
    // "postcss-jit-props": OpenProps,
    // "postcss-custom-media": {
    //   importFrom: ["node_modules/open-props/media.min.css"],
    // },
    // "postcss-nesting": {},
    // "postcss-combine-duplicated-selectors": {},
    // "postcss-sorting": {},
  },
};

