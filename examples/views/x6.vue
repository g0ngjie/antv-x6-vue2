<template>
  <div class="container">
    <div class="title-container">
      <el-link
        type="primary"
        href="https://github.com/g0ngjie/antv-x6-vue2"
        :underline="false"
        target="_blank"
        >antv-x6-vue2</el-link
      >
    </div>
    <div class="graph-container">
      <antv-x6-vue2>
        <div slot="tooltips_slot" slot-scope="{ row }">
          <div class="tooltips-container">
            {{ row }}
          </div>
        </div>
        <div slot="panel_area_slot" slot-scope="{ row }">
          <el-form-item label="Label:">
            <el-input
              clearable
              placeholder="请输入"
              v-model="row.label"
            ></el-input>
          </el-form-item>
        </div>
      </antv-x6-vue2>
    </div>
    <div class="options-container">
      <el-button size="mini" :disabled="disabled" @click="handleExport"
        >导出</el-button
      >
      <el-button
        size="mini"
        :type="disabled ? 'danger' : ''"
        @click="handleOnlyLook"
        >只读</el-button
      >
      <el-button size="mini" :disabled="disabled" @click="handleSwitchDefault"
        >切换默认数据</el-button
      >
      <div>
        <el-input
          size="mini"
          clearable
          :disabled="!isUpdate"
          v-model="form.label"
          style="width: 300px; margin: 10px 10px 0 0;"
          @keyup.enter.native="handleUpdateLabel"
        ></el-input>
        <el-button size="mini" :disabled="!isUpdate" @click="handleUpdateLabel"
          >修改数据</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import * as g6NodEdges from "./g6NodEdges";
import { graphFunc } from "../../packages";

const list = [
  {
    nodes: g6NodEdges.nodes2,
    edges: g6NodEdges.edges2,
  },
  {
    nodes: g6NodEdges.nodes1,
    edges: g6NodEdges.edges1,
  },
  {
    nodes: g6NodEdges.nodes3,
    edges: g6NodEdges.edges3,
  },
];

export default {
  data() {
    return {
      disabled: false,
      currentIndex: 0,
      isUpdate: false,
      form: { label: "" },
    };
  },
  methods: {
    switchData() {
      const data = list[this.currentIndex++];
      if (this.currentIndex > list.length - 1) this.currentIndex = 0;
      return data;
    },
    handleExport() {
      const { nodes, edges } = graphFunc.exportData();
      console.log("[debug]nodes:", nodes);
      console.log("[debug]edges:", edges);
      this.$message.success("导出成功,请在控制台查看");
    },
    handleOnlyLook() {
      this.disabled = !this.disabled;
      graphFunc.onlyLook(this.disabled);
    },
    handleSwitchDefault() {
      const { nodes, edges } = this.switchData();
      graphFunc.initDefaultData(nodes, edges);
    },
    handleUpdateLabel() {
      graphFunc.updateLabel(this.form.label);
      this.form.label = "";
      this.isUpdate = false;
    },
    listener() {
      graphFunc.GraphListener.doubleNodeClick((detail) => {
        this.form.label = detail.label;
        this.isUpdate = true;
        console.log("[debug]detail:", detail);
      });
    },
  },
  mounted() {
    this.handleSwitchDefault();
    this.listener();
  },
};
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  .title-container {
    padding: 5px 20px;
    background-color: #f2f6fc;
  }
}
.graph-container {
  height: 85vh;
  .tooltips-container {
    padding: 20px;
    background-color: #f2f6fc;
    color: #333;
  }
}
.options-container {
  padding: 0 10px;
}
</style>
