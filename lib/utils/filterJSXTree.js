/**
 * 
 * @param {*} node 
 * @param {*} callback a callback used to filter nodes
 * @return {Array} an array of JSX nodes the callback returns true for
 */
const filterJSXTree = (node, callback, nodes = []) => {

  if (node.type === "JSXExpressionContainer") { return filterJSXTree(node.expression.body, callback, nodes) }

  node.openingElement && callback(node) > 0 && nodes.push(node)

  if (node.children && node.children.length > 0) {
      node.children.forEach((n) => filterJSXTree(n, callback, nodes))
  }

  return nodes
}

module.exports = filterJSXTree