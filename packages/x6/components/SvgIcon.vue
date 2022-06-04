<template>
  <svg :class="svgClass" aria-hidden="true" v-on="$listeners">
    <title>{{ title }}</title>
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
import { defineComponent, computed } from "@vue/composition-api";

export default defineComponent({
  name: "svg-icon",
  props: {
    title: {
      type: String,
      default: "",
    },
    iconClass: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const iconName = computed(() => `#icon-${props.iconClass}`);
    const svgClass = computed(() => {
      if (props.className) {
        return "svg-icon " + props.className;
      } else {
        return "svg-icon";
      }
    });
    return {
      iconName,
      svgClass,
    };
  },
});
</script>

<style scoped>
.svg-icon {
  width: 10em;
  height: 10em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
