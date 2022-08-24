<template>
  <div class="node-bar-container">
    <ul class="nodes-bar">
      <li v-for="(node, index) in nodes" :key="index">
        <div
          :class="[freeze ? `freeze-${node.shape}` : `default-${node.shape}`]"
          :style="node.styles"
          @mousedown="startDrag(node, $event)"
        >
          <span>{{ node.label }}</span>
        </div>
      </li>
    </ul>
    <hr style="border-color: #f2f6fc" />
    <ul class="nodes-bar">
      <!-- Vue组件 -->
      <li
        @mousedown="
          startDrag(
            {
              label: 'Vue-node',
              shape: 'rect',
              actionType: 'Vue-node',
            },
            $event
          )
        "
      >
        <VueNode :class="[freeze ? `freeze-rect` : `static-vue-node`]" />
      </li>
    </ul>
  </div>
</template>
<script>
import { Addon } from "@antv/x6";
import { Channel } from "../common/transmit";
import { ActionType, CustomEventTypeEnum } from "../common/enums";
import {
  getDiamondNode,
  getEllipseNode,
  getRectNode,
  getVueNode,
} from "../common/transform";
import { defineComponent, reactive, toRefs, watch } from "@vue/composition-api";
import { useGraph } from "../store";
import VueNode from "./vue-static-shape/VueNode.vue";

export default defineComponent({
  props: ["nodes"],
  components: {
    VueNode,
  },
  setup() {
    const graph = useGraph();

    const data = reactive({
      dnd: {},
      freeze: false,
    });

    const methods = {
      startDrag(currentTarget, e) {
        const { actionType, shape, label } = currentTarget;
        const { TRIGGER, CONDITION, ACTION } = ActionType;
        let json;
        switch (actionType) {
          // 触发器
          case TRIGGER:
            json = getEllipseNode({
              shape,
              tooltip: label,
              size: { width: 100, height: 50 },
              actionType,
              initialization: true,
            });
            break;
          // 条件
          case CONDITION:
            json = getDiamondNode({
              // x6 不存在 diamond 形状, 转义 rect
              shape: "rect",
              tooltip: label,
              actionType,
              initialization: true,
            });
            break;
          // 动作
          case ACTION:
            json = getRectNode({
              shape,
              tooltip: label,
              size: { width: 100, height: 50 },
              actionType,
              initialization: true,
            });
            break;
          case "Vue-node":
            json = getVueNode({
              shape: "rect",
              tooltip: label,
              size: { width: 110, height: 50 },
              actionType,
              initialization: true,
            });
            break;
          default:
            break;
        }
        const node = graph.value.createNode(json);
        if (!data.freeze) data.dnd.start(node, e);
      },
      initDnd() {
        data.dnd = new Addon.Dnd({
          target: graph.value,
          validateNode() {
            return true;
          },
        });
      },
    };

    watch(() => graph.value, methods.initDnd);

    // 冻结工具栏
    Channel.eventListener(CustomEventTypeEnum.FREEZE_GRAPH, (bool) => {
      data.freeze = bool;
    });

    return {
      ...toRefs(data),
      ...methods,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "../styles/index.scss";
@include mixin_scrollbar;
ul,
li {
  padding: 0;
  margin: 0;
  list-style: none;
}
.node-bar-container {
  // 禁止被双击选中
  user-select: none;
  width: 150px;
  height: 100%;
  overflow: scroll;
  background: #f6f6f6;
  .nodes-bar {
    width: 100%;
    padding: 20px 0;
    li {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-bottom: 20px;
      & > div {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #303133;
        font-size: 12px;
        white-space: nowrap;
        overflow: hidden;
      }

      [class^="default-"] {
        transition: all 0.08s;
        &:hover {
          transform: scale(1.1) !important;
          color: #333;
        }
      }

      // 静态vue节点
      .static-vue-node {
        transition: all 0.08s;
        &:hover {
          transform: scale(1.1) !important;
          color: #333;
        }
      }

      // 默认菱形
      .default-diamond {
        &:hover {
          transform: rotateZ(45deg) scale(1.1) !important;
        }
        span {
          transform: rotate(-45deg);
        }
      }

      [class^="freeze-"] {
        opacity: 0.7;
        cursor: no-drop;
      }
      .freeze-diamond {
        &:hover {
          transform: rotateZ(45deg) scale(1) !important;
        }
        span {
          transform: rotate(-45deg);
        }
      }
    }
  }
}
</style>
