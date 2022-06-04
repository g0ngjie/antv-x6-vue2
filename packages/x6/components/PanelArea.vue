<template>
  <div class="panel-area-container">
    <!-- Minimap区 -->
    <div id="minimap" />
  </div>
</template>

<style lang="scss" scoped>
$minimap_border_color: #31d0c6;
.panel-area-container {
  padding: 5px;
  min-width: 300px;
  background: #f6f6f6;

  ::v-deep.x6-widget-minimap-viewport {
    border: 2px solid $minimap_border_color;
  }
  ::v-deep.x6-widget-minimap-viewport-zoom {
    border: 2px solid $minimap_border_color;
  }
}
</style>
