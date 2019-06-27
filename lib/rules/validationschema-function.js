/**
 * @fileoverview Ensures formik's validationSchemas are actually functions
 * @author Lucio Merotta
 */
"use strict";

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

        const getVariable = (node, scope) => {
            const newNode = scope.set.get(node.name).references[0].writeExpr

            if (newNode.type === "Identifier") {
                return getVariable(newNode, scope)
            }

            return newNode
        }

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {

            CallExpression: function(node) {
               if (node.callee.name === "withFormik" || node.callee.name === "withCrudForm") {
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
