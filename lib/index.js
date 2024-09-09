/**
 * @fileoverview Gammadia&#39;s ESLint rules
 * @author Lucio Merotta
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var requireIndex = require("requireindex");

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

// import all rules in lib/rules
module.exports.rules = requireIndex(__dirname + "/rules");
module.exports.configs = {
  all: {
    plugins: ["gammadia"],
    rules: {
      "gammadia/autofocusref-on-form": "error",
      "gammadia/forms": "error",
      "gammadia/no-react-router-navlink": "error",
      "gammadia/validationschema-function": "error",
      "gammadia/no-prefix-styled-component": "error",
    },
  },
};
