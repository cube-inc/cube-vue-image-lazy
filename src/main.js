import Vue from 'vue'
import App from './App.vue'
import { name, version, description } from '../package.json'

const packageInfo = { name, version, description }

Vue.config.productionTip = false

new Vue({
  packageInfo,
  render: h => h(App)
}).$mount('#app')
