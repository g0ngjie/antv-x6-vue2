<template>
  <div class="panel-area-container">
    <!-- Node区 -->
    <Tabs label="Node" class="node-container">
      <el-form inline label-width="60px">
        <slot :row="nodeForm" />
      </el-form>
    </Tabs>
    <!-- Minimap区 -->
    <Tabs label="Minimap" class="minimap-container">
      <div id="minimap" />
    </Tabs>
  </div>
</template>

<script>
import Tabs from "./Tabs.vue";
// 可操作区域
export default {
  components: { Tabs },
  data() {
    return {
      currentNodeTab: "node",
      nodeForm: {},
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/mixins.scss";

.panel-area-container {
  padding: 5px;
  min-width: 300px;
  background: #f6f6f6;
  @include flex_column_between;

  // Node区
  .node-container {
    flex: 1;
  }
  // Minimap区域
  .minimap-container {
    margin-top: 5px;
  }
}
</style>
