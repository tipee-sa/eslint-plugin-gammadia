/**
 * @fileoverview Rule for forms
 * @author Lucio Merotta
 */
"use strict";
const filterJSXTree = require("../utils/filterJSXTree")

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "Rule for forms",
            category: "Gammadia Guidelines",
            recommended: false
        },
        fixable: null,  // or "code" or "whitespace"
        schema: [
            // fill in your schema
        ]
    },

    create: function(context) {

        const checkModalHeader = (node) => {
            const isModalHeader = (node) => (
                node.openingElement.name.name === "ModalHeader" ||
                node.openingElement.attributes.filter(a => a.value && a.value.expression && a.value.expression.name === "ModalHeader").length > 0
            )

            filterJSXTree(node, isModalHeader).length === 0 && context.report({
                node,
                message: 'Missing ModalHeader',
            })
        }

        const checkButtons = (node) => {
            // Retrieve all buttons

            const isButton = (node) => (
                node.openingElement.name.name === "TranslateElement" &&
                node.openingElement.attributes.filter(a =>
                  a.name.name === "component" &&
                  a.value.expression &&
                  a.value.expression.name === "Button"
                ).length > 0
            )

            const buttons = filterJSXTree(node, isButton)
            if (buttons.length === 0) {
                context.report({
                    node,
                    message: "No button found on form"
                })
                return
            }

            // The first button must be the "close" one
            buttons[0].openingElement.attributes.filter(a => (
                (a.name.name === "outline" && !a.value) ||
                (a.name.name === "id" && a.value.value === "tipee.cancel") ||
                (a.name.name === "color" && a.value.value === "default")
            )).length !== 3 && context.report({
                node: buttons[0],
                message: "First button must be a close button (outline, value equals 'tipee.cancel', color equals 'default'"
            })

            // At least one submit button if there is a form
            buttons.filter(b =>
                b.openingElement.attributes.filter(a => a.name.name === "type" && a.value.value === "submit").length === 1
            ).length !== 1 && context.report({
                node,
                message: "Submit button missing in form"
            })
        }

        return {
            JSXElement(node) {
                const isForm = (node) => ( node.openingElement.name.name.toLowerCase() === "form" )

                const isFormEmbedded = filterJSXTree(node, isForm).length === 1
                if (isFormEmbedded) {
                    checkModalHeader(node)
                    checkButtons(node)
                }
            }
        };
    }
};
