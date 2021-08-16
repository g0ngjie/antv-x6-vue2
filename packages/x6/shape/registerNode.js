
import { Graph } from "@antv/x6";
// import '@antv/x6-vue-shape'
// 开始节点
import BeginNode from "./begin";
// 条件节点
import ConditionNode from "./condition";
// 尾部节点
import TailNode from "./tail";

// VueNode
// import VueNode from "../components/VueNode.vue";

import { NodeTypeEnum } from "../common/enums";

export default () => {
  Graph.registerNode(NodeTypeEnum.BEGIN, BeginNode, true)
  Graph.registerNode(NodeTypeEnum.CONDITION, ConditionNode, true)
  Graph.registerNode(NodeTypeEnum.TAIL, TailNode, true)

  // 渲染Vue节点
  // https://x6.antv.vision/zh/docs/tutorial/advanced/react
  // Graph.registerVueComponent('vue-node', VueNode, true)
}

/**
 * 需要使用实例化 Graph添加Vue node节点
 */
// export function enableVueNode(graph) {
//   graph.addNode({
//     shape: "vue-shape",
//     x: 300,
//     y: 250,
//     width: 150,
//     height: 100,
//     component: 'vue-node',
//   });
// }