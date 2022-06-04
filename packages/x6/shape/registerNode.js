
import { Graph } from "@antv/x6";
import '@antv/x6-vue-shape'

import VueNode from "./VueNode.vue";

export default () => {
  // 渲染Vue节点
  // https://x6.antv.vision/zh/docs/tutorial/advanced/react
  Graph.registerVueComponent('vue-node', {
    template: `<vue-node />`,
    components: { VueNode },
  }, true)
}
