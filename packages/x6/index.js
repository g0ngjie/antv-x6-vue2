import index from "./index.vue";
import "./icons";

index.install = function (Vue) {
  Vue.component(index.name, index);
};

export default index;
