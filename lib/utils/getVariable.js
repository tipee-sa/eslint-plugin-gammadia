const getVariable = (node, scope) => {
  const newNode = scope.set.get(node.name).references[0].writeExpr

  if (newNode.type === "Identifier") {
      return getVariable(newNode, scope)
  }

  return newNode
}

module.exports = getVariable