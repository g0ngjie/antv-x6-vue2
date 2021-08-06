
// import GeneralNode from "./general"
// import StartNode from "./start"
// import EndNode from "./end"
// import SpecialNode from "./special"
// 分流
// import ShuntNode from "./shunt"
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
  // Graph.registerNode('general-node', GeneralNode, true)
  Graph.registerNode(NodeTypeEnum.BEGIN, BeginNode, true)
  Graph.registerNode(NodeTypeEnum.CONDITION, ConditionNode, true)
  Graph.registerNode(NodeTypeEnum.TAIL, TailNode, true)
  // Graph.registerNode('start-node', StartNode, true)
  // Graph.registerNode('end-node', EndNode, true)
  // Graph.registerNode('special-node', SpecialNode, true)
  // Graph.registerNode('shunt-node', ShuntNode, true)

  // 渲染Vue节点
  // https://antv-x6.gitee.io/zh/docs/tutorial/advanced/react
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

// 一个不错的设计思路
// https://gitee.com/icefox1/x6-vue-demo/blob/master/antv-x6-vue2/src/views/er/xflow/controller/eventController.js