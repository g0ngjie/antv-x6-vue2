<template>
  <div class="node-bar-container">
    <ul class="nodes-bar">
      <li v-for="(node, index) in nodes" :key="index">
        <div
          :class="[freeze ? `freeze-${node.type}` : `default-${node.type}`]"
          :style="node.styles"
          :node-type="node.nodeType"
          @mousedown="startDrag"
        >
          <span>{{ node.label }}</span>
        </div>
      </li>
      <li style="margin-top:20px;">
        <el-button @click="exportData">Export</el-button>
      </li>
    </ul>
  </div>
</template>
<script>
import { Addon } from "@antv/x6";
import { Channel } from "../common/transmit";
import { CustomEventTypeEnum } from "../common/enums";

export default {
  props: ["nodes", "graph"],
  data() {
    return {
      dnd: {},
      freeze: false,
    };
  },
  watch: {
    graph() {
      this.initDnd();
    },
  },
  methods: {
    startDrag(e) {
      const target = e.currentTarget;
      const type = target.getAttribute("node-type");
      let node;
      console.log("[debug]type:", type);
      // if (type === "general-node") {
      //   node = this.graph.createNode({
      //     shape: "general-node",
      //   });
      // }
      // if (type === "start-node") {
      //   node = this.graph.createNode({
      //     shape: "start-node",
      //   });
      // }
      // if (type === "special-node") {
      //   node = this.graph.createNode({
      //     shape: "special-node",
      //   });
      // }
      node = this.graph.createNode({ shape: type });
      if (!this.freeze) this.dnd.start(node, e);
    },
    initDnd() {
      this.dnd = new Addon.Dnd({
        target: this.graph,
        validateNode() {
          return true;
        },
      });
    },
    exportData() {
      console.log(JSON.stringify(this.graph.toJSON({ diff: true }), null, 2));
    },
  },
  created() {
    Channel.eventListener(CustomEventTypeEnum.FREEZE_GRAPH, () => {
      this.freeze = true;
    });
  },
};
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
  width: 200px;
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
      }
      // .general-node {
      //   width: 80px;
      //   height: 40px;
      //   line-height: 36px;
      //   text-align: center;
      //   border: 1px solid #ff7c0e;
      //   border-radius: 4px;
      //   margin: 10px auto;
      // }

      // .ellipse {
      //   height: 50px;
      //   width: 100px;
      //   font-size: 12px;
      //   margin-top: 20px;
      //   border-radius: 50px / 25px;
      //   text-align: center;
      //   line-height: 50px;
      // }

      // .start-node {
      //   width: 40px;
      //   height: 40px;
      //   line-height: 38px;
      //   border-radius: 50%;
      //   text-align: center;
      //   border: 1px solid #06cc76;
      //   margin: 10px auto;
      // }
      // .end-node {
      //   width: 40px;
      //   height: 40px;
      //   line-height: 38px;
      //   border-radius: 50%;
      //   text-align: center;
      //   border: 1px solid #4440aa;
      //   margin: 10px auto;
      // }
      // .special-node {
      //   width: 80px;
      //   height: 40px;
      //   line-height: 36px;
      //   text-align: center;
      //   margin: 10px auto;
      //   border: 1px solid #f33b3d;
      //   border-radius: 4px;
      // }

      [class^="default-"] {
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

      // .shunt-node {
      //   width: 40px;
      //   height: 40px;
      //   line-height: 45px;
      //   text-align: center;
      //   transform: rotateZ(45deg);
      //   margin: 10px auto;
      //   border: 1px solid #3e8bf8;
      //   border-radius: 4px;
      // }
    }
  }
}
</style>
