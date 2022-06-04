
export default (graph) => {

  graph.on('cell:removed', () => {
    graph.getNodes()?.forEach(node => {
      // 移除html模板
      if (node.shape === 'html') graph.removeNode(node)
    })
  });
}
