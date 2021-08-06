<template>
  <div class="tabs-container">
    <header>
      <div class="label-card">
        {{ label }}
      </div>
    </header>
    <div class="tabs-body">
      <slot />
    </div>
  </div>
</template>

<script>
// 标签页组件
export default {
  props: ["label"],
};
</script>

<style lang="scss" scoped>
@import "../styles/mixins.scss";

.tabs-container {
  background-color: #fff;
  // 头部高度
  $header-height: 30px;
  header {
    @include set_w_h(100%, $header-height);
    background-color: #f6f6f6;
    .label-card {
      @include set_w_h(100px, $header-height);
      @include flex_center;
      border-top-right-radius: 3px;
      cursor: pointer;
      background-color: #fff;
      color: #606266;
      font-size: 15px;
    }
  }
  .tabs-body {
    padding: 20px 0;
    @include flex_content_center;
  }
}
</style>
