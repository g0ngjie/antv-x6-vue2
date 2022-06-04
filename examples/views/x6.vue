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
          style="width: 300px; margin: 10px 10px 0 0"
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
import {
  defineComponent,
  onMounted,
  reactive,
  toRefs,
} from "@vue/composition-api";
import { Message } from "element-ui";

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

export default defineComponent({
  setup() {
    const data = reactive({
      disabled: false,
      currentIndex: 0,
      isUpdate: false,
      form: { label: "" },
    });

    const methods = {
      handleNodeClick(e) {
        console.log("[debug]节点单击Emit事件:", e);
      },
      switchData() {
        const current = list[data.currentIndex++];
        if (data.currentIndex > list.length - 1) data.currentIndex = 0;
        return current;
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
          Message.success("导出成功,请在控制台查看");
        } else {
          console.log("[debug]errs:", errs);
          Message.error(errs[0]);
        }
      },
      handleOnlyLook() {
        data.disabled = !data.disabled;
        graphFunc.onlyLook(data.disabled);
      },
      handleSwitchDefault() {
        const { nodes, edges } = methods.switchData();
        graphFunc.initDefaultData(nodes, edges);
      },
      handleTestError() {
        graphFunc.initDefaultData();
      },
      handleClean() {
        graphFunc.clean();
      },
      handleUpdateLabel() {
        graphFunc.updateNode(data.form);
        data.form.label = "";
        data.isUpdate = false;
      },
      listener() {
        graphFunc.GraphListener.doubleNodeClick((detail) => {
          data.form.label = detail.label;
          data.isUpdate = true;
          console.log("[debug]detail:", detail);
        });
        graphFunc.GraphListener.runtimeError((err) => {
          console.log(
            "[debug]errorCode, errorMsg:",
            err.errorCode,
            err.errorMsg
          );
        });
      },
    };

    onMounted(() => {
      methods.handleSwitchDefault();
      methods.listener();
    });

    return {
      ...toRefs(data),
      ...methods,
    };
  },
});
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
