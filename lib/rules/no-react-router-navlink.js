/**
 * @fileoverview Prevent usage of React Router's NavLink component
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
            description: "Prevent usage of React Router's NavLink component",
            category: "Wrong component usage",
            recommended: false
        },
        fixable: null,
        schema: []
    },

    create: function(context) {

        // variables should be defined here

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        // any helper functions should go here or else delete this section

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {
            ImportDeclaration: function(node) {
                const hasNavlink = node.specifiers.filter(function(specifier) {
                    return specifier.type === 'ImportDefaultSpecifier' && specifier.local.name === 'NavLink' || specifier.imported.name === 'NavLink';
                }).length > 0;

                if (hasNavlink && node.source.value !== 'ui/components/routing/NavLink') {
                    context.report({
                        node,
                        message: 'Wrong NavLink component imported. Replace with ui/components/routing/NavLink'
                    });
                }
            }
        };
    }
};
