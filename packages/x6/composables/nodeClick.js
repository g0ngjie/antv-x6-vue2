import { Channel } from "../common/transmit";
import { CustomEventTypeEnum } from "../common/enums";

export default (graph) => {
  // 单击
  graph.on('node:click', ({ node }) => {
    Channel.dispatchEvent(CustomEventTypeEnum.NODE_CLICK, { node })
  });
  // 双击
  graph.on('node:dblclick', ({ node }) => {
    const { data = {} } = node
    const { actionType } = data
    Channel.dispatchEvent(CustomEventTypeEnum.DOUBLE_NODE_CLICK, { node, actionType })
  });
}
