const coreWebVitals = require("eslint-config-next/core-web-vitals");
const typescript = require("eslint-config-next/typescript");

/** @type {import("eslint").Linter.Config[]} */
module.exports = [
  ...coreWebVitals,
  ...typescript,
  {
    rules: {
      "indent": ["error", 2],
      "react/jsx-indent": ["error", 2],
      "react/jsx-indent-props": ["error", 2],
      "semi": ["error", "always"],
    }
  }
];
