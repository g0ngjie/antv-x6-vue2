<template>
  <div class="graph-container">
    <!-- 工具栏 -->
    <Toolbar :graph="graph" />
    <div class="layout">
      <!-- 悬浮窗 tooltip -->
      <div id="tooltip-container">
        <slot :name="tooltipsName" :row="tooltipsContent" />
      </div>
      <!-- 组件栏 -->
      <NodesBar :nodes="nodes" :graph="graph"></NodesBar>
      <!-- 图形容器 -->
      <div id="container" class="cavs" />
      <!-- 可操作区 -->
      <PanelArea>
        <template slot-scope="{ row }">
          <slot :name="panelAreaName" :row="row" />
        </template>
      </PanelArea>
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
      targetCell: { curCell: {} },
      nodes,
      tooltipsContent: null,
    };
  },
  computed: {
    // 可操作去插槽
    panelAreaName() {
      return Config.PANEL_AREA_SLOT;
    },
    // Tooltips插槽
    tooltipsName() {
      return Config.TOOLTIPS_SLOT;
    },
  },
  methods: {
    changeNodeName(name) {
      this.targetCell.curCell.isNode() &&
        this.targetCell.curCell.setAttrs({ label: { text: name } });
      this.targetCell.curCell.isEdge() &&
        this.targetCell.curCell.setLabels(name);
    },
    initListenerCustomEvent() {
      Channel.eventListener(
        CustomEventTypeEnum.TOOLTIPS_CALLBACK,
        (content) => (this.tooltipsContent = content)
      );
    },
  },
  mounted() {
    // 注册节点
    // registerNode();
    // 注册工具
    registerTools();
    // 实例化x6
    this.graph = initGraph(this.targetCell);
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
}
.layout {
  display: flex;
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  padding: 0 10px 10px 10px;

  .cavs {
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
