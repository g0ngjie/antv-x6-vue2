
export default (graph) => {
  const tooltipDom = document.getElementById("tooltip-container")

  graph.on('cell:removed', () => {
    tooltipDom.style.display = 'none'
  });
}
