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
      <antv-x6-vue2 @node-click="handleNodeClick">
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
      <el-button size="mini" :disabled="disabled" @click="handleClean"
        >清空</el-button
      >
      <el-button size="mini" :disabled="disabled" @click="handleExportAtoms"
        >获取节点/边</el-button
      >
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
      <el-button
        size="mini"
        :disabled="disabled"
        type="danger"
        @click="handleTestError"
        >异常测试</el-button
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
import * as mockData from "./data";
import { graphFunc } from "../../packages";

const list = [
  {
    nodes: mockData.nodes2,
    edges: mockData.edges2,
  },
  {
    nodes: mockData.nodes1,
    edges: mockData.edges1,
  },
  {
    nodes: mockData.nodes3,
    edges: mockData.edges3,
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
    handleNodeClick(e) {
      console.log("[debug]节点单击Emit事件:", e);
    },
    switchData() {
      const data = list[this.currentIndex++];
      if (this.currentIndex > list.length - 1) this.currentIndex = 0;
      return data;
    },
    handleExportAtoms() {
      const data = graphFunc.getAtoms();
      console.log("[debug]data:", data);
    },
    handleExport() {
      const { ok, errs } = graphFunc.graphValidate();
      if (ok) {
        const { nodesJSON, edgesJSON } = graphFunc.exportData();
        console.log("[debug]nodesJSON:", nodesJSON);
        console.log("[debug]edgesJSON:", edgesJSON);
        this.$message.success("导出成功,请在控制台查看");
      } else {
        console.log("[debug]errs:", errs);
        this.$message.error(errs[0]);
      }
    },
    handleOnlyLook() {
      this.disabled = !this.disabled;
      graphFunc.onlyLook(this.disabled);
    },
    handleSwitchDefault() {
      const { nodes, edges } = this.switchData();
      graphFunc.initDefaultData(nodes, edges);
    },
    handleTestError() {
      graphFunc.initDefaultData();
    },
    handleClean() {
      graphFunc.clean();
    },
    handleUpdateLabel() {
      graphFunc.updateNode(this.form);
      this.form.label = "";
      this.isUpdate = false;
    },
    listener() {
      graphFunc.GraphListener.doubleNodeClick((detail) => {
        this.form.label = detail.label;
        this.isUpdate = true;
        console.log("[debug]detail:", detail);
      });
      graphFunc.GraphListener.runtimeError((err) => {
        console.log("[debug]errorCode, errorMsg:", err.errorCode, err.errorMsg);
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
}
.options-container {
  padding: 0 10px;
}
</style>
