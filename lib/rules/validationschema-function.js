/**
 * @fileoverview Ensures formik's validationSchemas are actually functions
 * @author Lucio Merotta
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
            description: "Ensures formik's validationSchemas are actually functions",
            category: "Wrong formik usage" ,
            recommended: false
        },
        fixable: "code",
        schema: []
    },

    create: function(context) {

        // variables should be defined here

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {

            CallExpression: function(node) {
               if (node.callee.name === "withFormik" || node.callee.name === "withCrudForm") {
                  if (!node.arguments[0].properties) return
                  node.arguments[0].properties.forEach((prop) => {
                    let variable = prop.value
                    if (prop.key.name === "validationSchema") {
                        if(variable.type === "Identifier") {
                           variable = getVariable(variable, context.getScope())
                        }

                        !["ArrowFunctionExpression", "FunctionExpression"].includes(variable.type) && context.report({
                            node: variable,
                            message: 'Formik\'s validationSchema must be a function',
                            fix: function(fixer) {
                                return fixer.insertTextBefore(variable, '/* istanbul ignore next */() => ')
                            }
                        });
                    }
                   })
               }
            }

        };
    }
};
