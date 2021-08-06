import AntvX6Vue2 from "./x6";
import "./x6/icons";

const components = [AntvX6Vue2];

function install(Vue) {
  components.forEach((component) => {
    Vue.component(component.name, component);
  });
}

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export { AntvX6Vue2 };

export default { install };
