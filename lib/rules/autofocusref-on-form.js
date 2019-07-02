/**
 * @fileoverview Forces to use a useAutoFocusRef on every form
 * @author Lucio Merotta
 */
"use strict";

const getVariable = require("../utils/getVariable")
const filterJSXTree = require("../utils/filterJSXTree")

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "Forces to use a useAutoFocusRef on every form ",
            category: "Gammadia Guidelines",
            recommended: false
        },
        fixable: false,  // or "code" or "whitespace"
        schema: [
            // fill in your schema
        ]
    },

    create: function(context) {
        const hasRefInAttribute = (node) => (
            node.openingElement.attributes.filter(attrib => {
                if (!attrib.value) { return false }
                const attributeName = attrib.name.name
                const attributeValue = attrib.value.expression

                if (!['innerRef', 'ref'].includes(attributeName)) { return false }

                if (
                    attributeValue.type === "CallExpression" &&
                    attributeValue.callee.name === "useAutoFocusRef"
                ) { return true }

                if (attributeValue.type === "Identifier") {
                    const variable = getVariable(attributeValue, context.getScope())
                    return (variable.type === "CallExpression" && variable.callee.name === "useAutoFocusRef")
                }
            }).length > 0
        )

        return {

            JSXElement(node) {
                if (node.openingElement.name.name.toLowerCase() === "form") {
                    const nodesWithAutofocusRef = filterJSXTree(node, hasRefInAttribute)
                    nodesWithAutofocusRef.length < 1 && context.report({
                        node,
                        message: 'Missing useAutoFocusRef() on one element in this form',
                    })
                    nodesWithAutofocusRef.length > 1 && context.report({
                        node,
                        message: 'useAutoFocusRef() is present more than once on this form',
                    })
                }
            }
        };
    }
};
