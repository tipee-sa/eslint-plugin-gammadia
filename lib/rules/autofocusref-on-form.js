/**
 * @fileoverview Forces to use a useAutoFocusRef on every form
 * @author Lucio Merotta
 */
"use strict";

const getVariable = require("../utils/getVariable")

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
        const hasRefInAttribute = (attrib) => {
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
        }

        const hasAutoFocusRef = (node) => {

            if (node.type === "JSXExpressionContainer") { return hasAutoFocusRef(node.expression.body) }

            let hasAutoFocus = node.openingElement && node.openingElement.attributes.filter(hasRefInAttribute).length > 0

            if (!hasAutoFocus && node.children && node.children.length > 0) {
                hasAutoFocus = node.children.map(hasAutoFocusRef).filter((v) => v === true).length > 0
            }

            return hasAutoFocus
        }

        return {

            JSXElement(node) {
                if (node.openingElement.name.name.toLowerCase() === "form") {
                    const hasIt = hasAutoFocusRef(node)
                    !hasIt && context.report({
                        node,
                        message: 'Missing useAutoFocusRef() on one element in this form',
                    })
                }
            }
        };
    }
};
