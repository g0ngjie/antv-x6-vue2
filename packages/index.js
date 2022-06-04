import AntvX6Vue2 from "./x6";
import "./x6/icons";
import * as graphFunc from "./functions.js";
import VueCompositionApi from '@vue/composition-api'

const components = [AntvX6Vue2];

function install(Vue) {
  Vue.use(VueCompositionApi)
  components.forEach((component) => {
    Vue.component(component.name, component);
  });
}

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export { AntvX6Vue2, graphFunc };

export default { install };
