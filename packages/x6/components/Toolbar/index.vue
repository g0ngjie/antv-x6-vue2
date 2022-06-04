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
import { onPaste, selectAll, deleteCells } from "../../common/trigger";
import { Channel } from "../../common/transmit";
import { CustomEventTypeEnum, SelectStateEnum } from "../../common/enums";
import SvgIcon from "../SvgIcon.vue";
import { onMounted, reactive, toRefs } from "@vue/composition-api";
import { useGraph } from "../../store";
import { Tools, TipsContent } from "./config.js";

export default {
  components: { SvgIcon },
  setup() {
    const graph = useGraph();
    const data = reactive({
      showTips: false,
      timeId: null,
      freeze: false,
      tools: Tools,
      // 引导文案
      tipsContent: TipsContent,
    });

    const methods = {
      handleTipsHover() {
        data.showTips = true;
        clearTimeout(data.timeId);
      },
      handleTipsLeave(delay = 500) {
        data.timeId = setTimeout(() => {
          data.showTips = false;
          data.timeId = null;
        }, delay);
      },
      handleTrigger(name) {
        switch (name) {
          // 撤销/重做
          case "undo":
          case "redo":
            if (data.tools[name].can) graph.value.history[name]();
            break;
          case "zoomin":
            graph.value.zoom(0.1);
            break;
          case "zoomout":
            graph.value.zoom(-0.1);
            break;
          case "copy":
            onPaste(graph.value);
            break;
          case "dustbin":
            deleteCells(graph.value);
            break;
          case "focus":
            graph.value.centerContent();
            break;
          case "select_all":
            selectAll(graph.value);
            break;
          default:
            break;
        }
      },
    };

    onMounted(() => {
      // 监听全局select事件
      Channel.eventListener(CustomEventTypeEnum.CELL_CLICK, (state) => {
        const { SELECTED } = SelectStateEnum;
        data.tools.delete.can = state === SELECTED;
      });
      Channel.eventListener(CustomEventTypeEnum.HELP, (state) => {
        data.showTips = state !== "close";
        if (data.showTips) methods.handleTipsLeave(30 * 1000);
      });
      // 监听是否可操作
      setTimeout(() => {
        const _history = graph.value.history;
        _history.on("change", () => {
          data.tools.undo.can = _history.canUndo();
          data.tools.redo.can = _history.canRedo();
        });
      }, 1000);
      // 监听是否禁用
      Channel.eventListener(CustomEventTypeEnum.FREEZE_GRAPH, (bool) => {
        data.freeze = bool;
        for (const key in data.tools) {
          if (Object.hasOwnProperty.call(data.tools, key)) {
            const tool = data.tools[key];
            if (["undo", "redo", "copy", "select_all"].includes(tool.svg)) {
              tool.freeze = bool;
            }
          }
        }
      });
    });

    return {
      ...toRefs(data),
      ...methods,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/mixins.scss";

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
