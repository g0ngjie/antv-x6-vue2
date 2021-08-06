<template>
  <div>
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
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.tooltips-container {
  padding: 20px;
  background-color: #f2f6fc;
  color: #333;
}
</style>
