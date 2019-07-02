/**
 *
 * @param {*} node
 * @param {*} callback a callback used to filter nodes
 * @return {Array} an array of JSX nodes the callback returns true for
 */
const filterJSXTree = (node, callback, nodes = []) => {

  const isObject = node.openingElement && node.openingElement.name.property && node.openingElement.name.property.name.length > 0
  if (node.type === "JSXExpressionContainer" && node.expression.body) { return filterJSXTree(node.expression.body, callback, nodes) }

  node.openingElement && !isObject && callback(node) > 0 && nodes.push(node)

  if (node.children && node.children.length > 0) {
      node.children.forEach((n) => filterJSXTree(n, callback, nodes))
  }

  return nodes
}

module.exports = filterJSXTree
