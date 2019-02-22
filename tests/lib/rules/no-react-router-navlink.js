/**
 * @fileoverview Prevent usage of React Router&#39;s NavLink component
 * @author Lucio Merotta
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-react-router-navlink"),

    RuleTester = require("eslint").RuleTester;

    RuleTester.setDefaultConfig({
        parserOptions: {
          sourceType: "module",
          ecmaVersion: 6,
          ecmaFeatures: {
            jsx: true,
          },
        }
      });

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("no-react-router-navlink", rule, {

    valid: [
        "import { NavLink } from 'ui/components/routing/NavLink'",
        "import NavLink from 'ui/components/routing/NavLink'"
    ],

    invalid: [
        {
            code: "import { NavLink } from 'react-router-dom' ",
            errors: [{
                message: "Wrong NavLink component imported. Replace with ui/components/routing/NavLink",
                type: "ImportDeclaration"
            }]
        },
        {
            code: "import NavLink from 'react-router-dom' ",
            errors: [{
                message: "Wrong NavLink component imported. Replace with ui/components/routing/NavLink",
                type: "ImportDeclaration"
            }]
        }
    ]
});
