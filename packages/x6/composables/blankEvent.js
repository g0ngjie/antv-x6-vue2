export default (graph, targetCell) => {
  // 空白区域点击
  graph.on('blank:click', () => {
    targetCell.curCell = null
  })
}
