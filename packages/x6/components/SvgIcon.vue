<template>
  <svg :class="svgClass" aria-hidden="true" v-on="$listeners">
    <title>{{ title }}</title>
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
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
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`;
    },
    svgClass() {
      if (this.className) {
        return "svg-icon " + this.className;
      } else {
        return "svg-icon";
      }
    },
  },
};
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
