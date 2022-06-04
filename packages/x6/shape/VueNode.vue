<template>
  <div class="container"></div>
</template>

<script>
export default {
  // 通过注入方式获取实例化对象
  // inject: ["getGraph", "getNode"],
};
</script>

<style lang="scss" scoped>
.container {
  height: 50px;
  width: 75%;
  display: flex;
  user-select: none;
  background-color: #ff8228;
  border: 2px solid rgb(164, 194, 255);
  background-color: rgb(208, 221, 249);
  border-radius: 4px;
  color: rgb(125, 118, 113);
  display: flex;
  justify-content: center;
  font-size: 13px;
  align-items: center;
}
</style>
