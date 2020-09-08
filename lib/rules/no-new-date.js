/**
 * @fileoverview Ensures that new Date() is not used in the code base
 * @author Simon MILHAU
 */
"use strict";

const getVariable = require("../utils/getVariable")

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        type: "problem",
        docs: {
            description: "Ensures that new Date() is not used in the code base",
            category: "Wrong expression usage",
            recommended: false
        },
        fixable: "code",
        schema: []
    },

    create: function (context) {

        // variables should be defined here

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {
            NewExpression(node) {
                if (node.callee.name === "Date") {
                    context.report({
                        node,
                        message: "new Date() is forbidden, yous must use parseLocalDateTime()"
                    });
                }
            }
        };
    }
};
