import { Channel } from "../common/transmit";
import { CustomEventTypeEnum } from "../common/enums";
import { Lang } from "@antv/x6";

function getTargetByNode(node) {
  const { data = {} } = node
  const label = node.data.tooltip
  const { actionType } = data
  return { node, label, nodeId: node.id, actionType }
}

export default (graph) => {
  // 单击
  graph.on('node:click', ({ node }) => {
    const detail = getTargetByNode(node)
    Channel.dispatchEvent(CustomEventTypeEnum.NODE_CLICK, detail)
  });
  // 双击
  graph.on('node:dblclick', ({ node }) => {
    const cells = graph.getSelectedCells()
    if (Lang.isArray(cells) && cells.length === 1) {
      const detail = getTargetByNode(node)
      Channel.dispatchEvent(CustomEventTypeEnum.DOUBLE_NODE_CLICK, detail)
    }
  });
}
