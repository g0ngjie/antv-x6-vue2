<template>
  <div class="container"></div>
</template>

<script>
export default {
  // 通过注入方式获取 画布、节点 实例
  // inject: ["getGraph", "getNode"],
};
</script>

<style lang="scss" scoped>
.container {
  height: 50px;
  width: 100%;
  display: flex;
  user-select: none;
  background-color: #ff8228;
  border: 2px solid rgba(58, 184, 129, 0.5);
  background-color: rgba(58, 184, 129, 0.5);
  border-radius: 4px;
  color: rgb(125, 118, 113);
  display: flex;
  justify-content: center;
  font-size: 13px;
  align-items: center;
}
</style>
