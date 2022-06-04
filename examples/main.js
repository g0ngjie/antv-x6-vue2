import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './element'
import plugin from '../packages/index'
import VueCompositionApi from '@vue/composition-api'

Vue.use(VueCompositionApi)
Vue.use(plugin)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
