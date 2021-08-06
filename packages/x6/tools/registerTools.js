import { Graph } from "@antv/x6";

// 删除元素
import removeBtn from "./removeBtn";

import { ToolTypeEnum } from "../common/enums";

// 注册自定义工具
export default () => {
  // 注册删除元素
  Graph.registerNodeTool(ToolTypeEnum.REMOVE_BUTTON, removeBtn, true)
  Graph.registerEdgeTool(ToolTypeEnum.REMOVE_BUTTON, removeBtn, true)
}
