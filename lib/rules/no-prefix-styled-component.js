/**
 * @fileoverview Prevent the declaration of a styled component prop without the dollar sign prefix
 * @author Max Balej
 */

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Prevent the declaration of a styled component prop without the dollar sign prefix",
      category: "Wrong component usage",
      recommended: true,
    },
    messages: {
      prefixError: "Expected prefix '$' for styled-components props.",
    },
    fixable: null,
    schema: [],
  },

  create: function (context) {
    const styleIdentifier = "styled";

    function isStyledComponentExpression(node) {
      const callExpression = node?.tag?.callee?.name === styleIdentifier; // styled(<component>)
      const memberExpression = node?.tag?.object?.name === styleIdentifier; // styled.<tag>

      if (callExpression || memberExpression) {
        return true;
      }
      return false;
    }

    function evaluateExpression(node) {
      const errors = [];
      const parsed = parseExpression(node);

      if (!parsed) {
        return undefined;
      }

      for (const member of parsed.members) {
        if (!member.startsWith("$")) {
          errors.push(member);
        }
      }

      return {
        errors: errors,
        nodeParameter: parsed.nodeParameter,
      };
    }

    function parseExpression(node) {
      const members = node.typeParameters?.params?.[0].members ?? undefined;
      if (!members) {
        return undefined;
      }
      return {
        members: members.map((member) => member.key.name),
        nodeParameter: node.typeParameters,
      };
    }

    return {
      TaggedTemplateExpression(node) {
        const isStyledComponent = isStyledComponentExpression(node);

        if (!isStyledComponent) return;

        const result = evaluateExpression(node);

        if (!result) return;

        if (result.errors.length > 0) {
          context.report({
            node: result.nodeParameter,
            messageId: "prefixError",
          });
        }
      },
    };
  },
};
