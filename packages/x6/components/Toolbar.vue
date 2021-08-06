<template>
  <div class="toolbar-container">
    <svg-icon
      v-for="(icon, key) in tools"
      :key="key"
      class="icon"
      :class="[
        'can' in icon && !icon.can ? 'disabled' : 'enabled',
        { freeze: icon.freeze },
      ]"
      :icon-class="icon.svg"
      :title="icon.title"
      @click="handleTrigger(icon.svg)"
    />
    <svg-icon
      v-show="!freeze"
      class="icon tips"
      :class="{ light: showTips }"
      icon-class="tips"
      title="提示"
      @mouseenter="handleTipsHover"
      @mouseleave="handleTipsLeave"
    />
    <transition name="fade">
      <!-- 文案提示容器 -->
      <div
        class="tips-container"
        @mouseenter="handleTipsHover"
        @mouseleave="handleTipsLeave"
        v-show="showTips"
      >
        <div
          class="tips-row"
          v-for="(content, index) in tipsContent"
          :key="index"
        >
          <div class="label">{{ content.label }}</div>
          <div class="value">{{ content.value }}</div>
        </div>
        <div class="arrow" />
      </div>
    </transition>
  </div>
</template>

<script>
// 工具栏
import { onPaste, selectAll, deleteCells } from "../common/trigger";
import { Channel } from "../common/transmit";
import { CustomEventTypeEnum, SelectStateEnum } from "../common/enums";
import SvgIcon from "../components/SvgIcon.vue";

export default {
  props: ["graph"],
  components: { SvgIcon },
  data() {
    return {
      showTips: false,
      timeId: null,
      freeze: false,
      tools: {
        undo: {
          svg: "undo",
          can: false,
          title: "撤销",
        },
        redo: {
          svg: "redo",
          can: false,
          title: "重做",
        },
        zoomin: {
          svg: "zoomin",
          title: "放大",
        },
        zoomout: {
          svg: "zoomout",
          title: "缩小",
        },
        copy: {
          svg: "copy",
          title: "复制",
        },
        delete: {
          svg: "dustbin",
          title: "删除",
          can: false,
        },
        focus: {
          svg: "focus",
          title: "居中",
        },
        selectAll: {
          svg: "select_all",
          title: "全选",
        },
      },
      // 引导文案
      tipsContent: [
        {
          label: "Ctrl+a",
          value: "单元全选",
        },
        {
          label: "Ctrl+c",
          value: "单元复制",
        },
        {
          label: "Ctrl+v",
          value: "单元粘贴",
        },
        {
          label: "Delete / BackSpace",
          value: "单元删除",
        },
        {
          label: "Ctrl+z",
          value: "单元撤销",
        },
        {
          label: "Ctrl+y",
          value: "单元重做",
        },
        {
          label: "Esc",
          value: "取消所有选中单元",
        },
        {
          label: "Alt+h",
          value: "帮助信息",
        },
        {
          label: "Alt+f",
          value: "画布居中",
        },
        {
          label: "Ctrl+mouseWheel",
          value: "放大/缩小",
        },
        {
          label: "Ctrl+leftMouseDown",
          value: "框选",
        },
      ],
    };
  },
  methods: {
    handleTipsHover() {
      this.showTips = true;
      clearTimeout(this.timeId);
    },
    handleTipsLeave(delay = 500) {
      this.timeId = setTimeout(() => {
        this.showTips = false;
        this.timeId = null;
      }, delay);
    },
    handleTrigger(name) {
      switch (name) {
        // 撤销/重做
        case "undo":
        case "redo":
          if (this.tools[name].can) this.graph.history[name]();
          break;
        case "zoomin":
          this.graph.zoom(0.1);
          break;
        case "zoomout":
          this.graph.zoom(-0.1);
          break;
        case "copy":
          onPaste(this.graph);
          break;
        case "dustbin":
          deleteCells(this.graph);
          break;
        case "focus":
          this.graph.centerContent();
          break;
        case "select_all":
          selectAll(this.graph);
          break;
        default:
          break;
      }
    },
  },
  mounted() {
    // 监听全局select事件
    Channel.eventListener(CustomEventTypeEnum.CELL_CLICK, (state) => {
      const { SELECTED } = SelectStateEnum;
      this.tools.delete.can = state === SELECTED;
    });
    Channel.eventListener(CustomEventTypeEnum.HELP, (state) => {
      if (state === "close") this.showTips = false;
      else this.showTips = !this.showTips;
      if (this.showTips) this.handleTipsLeave(30 * 1000);
    });
    // 监听是否可操作
    setTimeout(() => {
      const _history = this.graph.history;
      _history.on("change", () => {
        this.tools.undo.can = _history.canUndo();
        this.tools.redo.can = _history.canRedo();
      });
    }, 1000);
    // 监听是否禁用
    Channel.eventListener(CustomEventTypeEnum.FREEZE_GRAPH, () => {
      this.freeze = true;
      for (const key in this.tools) {
        if (Object.hasOwnProperty.call(this.tools, key)) {
          const tool = this.tools[key];
          if (["undo", "redo", "copy", "select_all"].includes(tool.svg)) {
            tool.freeze = true;
          }
        }
      }
    });
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/mixins.scss";

.toolbar-container {
  position: relative;
  @include flex_item_center;
  .icon {
    margin: 3px 20px;
    font-size: 2.3px;
  }
  .enabled {
    cursor: pointer;
    transition: all 0.2s;
    color: #666;
    &:hover {
      transform: scale(1.1);
      color: #333;
    }
    &:active {
      transform: scale(0.9);
    }
  }
  .disabled {
    cursor: not-allowed;
    transition: none;
    color: #999;
    &:hover {
      transform: none;
      color: #999;
    }
    &:active {
      transform: none;
    }
  }
  .freeze {
    cursor: not-allowed;
    transition: none;
    color: #999;
    &:hover {
      transform: none;
      color: #999;
    }
    &:active {
      transform: none;
    }
  }
  .tips {
    cursor: pointer;
    color: #333;
    font-size: 2.3px;
    margin-left: auto;
    margin-right: 30px;
  }
  .light {
    color: #67c23a;
  }
  .tips-container {
    position: absolute;
    top: 45px;
    right: 10px;
    z-index: 999;
    @include set_w_h(300px, auto);
    border-radius: 4px;
    border: 1px solid #ebeef5;
    text-align: justify;
    font-size: 14px;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    word-break: break-all;
    padding: 18px 20px;
    font-size: 14px;
    color: #606266;
    .arrow {
      position: absolute;
      z-index: -1;
      top: -15px;
      right: 0;
      display: inline-block;
      width: 0;
      height: 0;
      border-left: 30px solid transparent;
      border-right: 30px solid transparent;
      border-bottom: 50px solid #fff;
    }

    // 文案容器
    .tips-row {
      @include flex_between_center;
      margin-bottom: 5px;
      .label {
        padding: 1px 5px;
        background-color: #5f5f61;
        border-radius: 3px;
        color: #fff;
      }
      .value {
        font-size: 14px;
        color: #333;
      }
    }
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
}
</style>
