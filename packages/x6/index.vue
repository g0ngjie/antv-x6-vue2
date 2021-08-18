<template>
  <div class="graph-container">
    <!-- 工具栏 -->
    <div class="toolbar-container">
      <Toolbar :graph="graph" />
    </div>
    <div class="layout">
      <!-- 悬浮窗 tooltip -->
      <div id="tooltip-container">
        {{ tooltipsContent }}
      </div>
      <!-- 组件栏 -->
      <div class="node-bar-container">
        <NodesBar :nodes="nodes" :graph="graph"></NodesBar>
      </div>
      <!-- 图形容器 -->
      <div id="container" class="graph-main-container" />
      <!-- 可操作区 -->
      <div class="panel-area-container">
        <PanelArea>
          <template slot-scope="{ row }">
            <slot :name="panelAreaName" :row="row" />
          </template>
        </PanelArea>
      </div>
    </div>
  </div>
</template>

<script>
import registerTools from "./tools/registerTools.js";
// import registerNode from "./shape/registerNode";
import { initGraph } from "./common/graph";
import NodesBar from "./components/NodesBar.vue";
import PanelArea from "./components/PanelArea.vue";
import Toolbar from "./components/Toolbar.vue";
import { nodes } from "./common/nodesBar";
import { Config, CustomEventTypeEnum } from "./common/enums.js";
import { Channel } from "./common/transmit.js";

export default {
  name: "antv-x6-vue2",
  components: {
    NodesBar,
    PanelArea,
    Toolbar,
  },
  data() {
    return {
      graph: {},
      nodes,
      tooltipsContent: null,
    };
  },
  computed: {
    // 可操作去插槽
    panelAreaName() {
      return Config.PANEL_AREA_SLOT;
    },
  },
  methods: {
    initListenerCustomEvent() {
      Channel.eventListener(
        CustomEventTypeEnum.TOOLTIPS_CALLBACK,
        (content) => (this.tooltipsContent = content)
      );
      // emit 节点单击
      Channel.eventListener(CustomEventTypeEnum.NODE_CLICK, (detail) =>
        this.$emit("node-click", detail)
      );
      // emit 节点双击
      Channel.eventListener(CustomEventTypeEnum.DOUBLE_NODE_CLICK, (detail) =>
        this.$emit("node-dblclick", detail)
      );
    },
  },
  mounted() {
    // 注册节点
    // registerNode();
    // 注册工具
    registerTools();
    // 实例化x6
    this.graph = initGraph();
    // 监听
    this.initListenerCustomEvent();
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
.graph-container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  .toolbar-container {
    position: absolute;
    width: 100%;
    z-index: 2;
    height: 30px;
    background-color: #fff;
  }
}
.layout {
  display: flex;
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  padding: 0 10px 10px 10px;
  margin-top: 30px;
  position: relative;

  .graph-main-container {
    width: 100%;
    height: 100%;
    flex: 1;
  }
  // tooltip
  #tooltip-container {
    // 禁止被双击||ctrl a选中
    user-select: none;
    border: 1px solid #e2e2e2;
    border-radius: 4px;
    font-size: 12px;
    color: #545454;
    width: 350px;
    word-break: break-all;
    background-color: rgba(255, 255, 255, 0.9);
    // padding: 10px 8px;
    box-shadow: rgb(174, 174, 174) 0px 0px 10px;
    position: absolute;
    z-index: 1;
    display: none;
    padding: 10px;
  }
  .node-bar-container {
    z-index: 2;
  }
  .panel-area-container {
    height: 100%;
    right: 0;
    top: 0;
    z-index: 2;
  }
}

.x6-node {
  [magnet="true"] {
    cursor: crosshair;
    transition: none;

    &[port-group="in"] {
      cursor: move;
    }
  }

  .x6-port-body {
    visibility: hidden;
  }
}

// 选中后样式加粗标识
.begin-node-selected {
  ellipse {
    fill: #7aa4f7;
    stroke-width: 2;
  }
}

.condition-node-selected {
  rect {
    fill: #7aa4f7;
    stroke-width: 2;
  }
}

.tail-node-selected {
  rect {
    fill: #7aa4f7;
    stroke-width: 2;
  }
}

// 连接点交互
circle[data-class="choice-point"]:hover {
  transition: all 0.05s;
  r: 9;
}
</style>
