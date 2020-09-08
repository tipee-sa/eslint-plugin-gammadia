/**
 * @fileoverview Ensures that new Date() is not used in the code base
 * @author Simon MILHAU
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-new-date"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("no-new-date", rule, {

    valid: [],

    invalid: [
        {
            code: "new Date()",
            errors: [{
                message: "new Date() is forbidden, yous must use parseLocalDateTime()",
                type: "NewExpression"
            }],
        }
    ]
});
