const getVariable = (node, scope) => {
  if (typeof(scope.set.get(node.name)) === 'undefined') {
    return getVariable(node, scope.upper);
  }
  const newNode = scope.set.get(node.name).references[0].writeExpr

  if (newNode.type === "Identifier") {
      return getVariable(newNode, scope)
  }

  return newNode
}

module.exports = getVariable
