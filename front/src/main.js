import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import Axios from 'axios'
import VueTimeago from 'vue-timeago'
import router from './router'

Vue.config.productionTip = false

Vue.prototype.$http = Axios;
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

Vue.use(VueTimeago, {
  name: 'Timeago', // Component name, `Timeago` by default
  locale: 'es', // Default locale
  // We use `date-fns` under the hood
  // So you can use all locales from it
  locales: {
    'es-ES': require('date-fns/locale/es'),
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

