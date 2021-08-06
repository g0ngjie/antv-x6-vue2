<template>
  <div class="node-info-container">
    <section v-show="cellType">
      <h3>{{ cellType }}</h3>
      <div>
        <p>标题：</p>
        <el-input type="text" v-model="cellInfo.cellName" />
      </div>
      <div>
        <p>信息：</p>
        <el-input
          :autosize="{ minRows: 4, maxRows: 8 }"
          type="textarea"
          v-model="cellInfo.cellDesc"
        ></el-input>
      </div>
      <div v-show="isSpecialNode">
        <p>脚本:</p>
        <el-input
          :autosize="{ minRows: 4, maxRows: 8 }"
          type="textarea"
          v-model="cellInfo.cellScript"
        ></el-input>
      </div>
    </section>
    <section>
      <div id="minimap"></div>
    </section>
  </div>
</template>
<script>
export default {
  props: ["curCell"],
  data() {
    return {
      cellType: "",
      cellInfo: {
        cellName: "",
        cellDesc: "",
        cellScript: "",
      },
      isSpecialNode: false,
    };
  },
  computed: {
    cellName() {
      return this.cellInfo.cellName;
    },
  },
  watch: {
    curCell(cell) {
      if (!cell) {
        this.cellType = "";
        return;
      }
      if (cell.isNode()) {
        this.cellType = "节点";
        console.log(cell.shape);
        cell.shape === "special-node"
          ? (this.isSpecialNode = true)
          : (this.isSpecialNode = false);
        this.cellInfo.cellName = cell.getAttrByPath("label/text");
      }
      if (cell.isEdge()) {
        this.cellType = "线";
        const linAttr = cell.getLabels()[0];
        this.cellInfo.cellName = linAttr ? linAttr.attrs.label.text : "";
      }
    },
    cellName(newName) {
      this.$emit("changeNodeName", newName);
    },
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.node-info-container {
  padding: 5px;
  min-width: 300px;
  background: #f6f6f6;
  section {
  }
}
</style>
