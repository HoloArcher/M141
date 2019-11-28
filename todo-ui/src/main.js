import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import router from './router'

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  var authorized = (localStorage.getItem('token')) ? localStorage.getItem('token') : undefined;
  if (typeof authorized === 'undefined' && to.path == '/todos') {
    return next('/')
  } else if (authorized && to.path === '/') {
    next('/todos')
  }
  else {
    next()
  }

})

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
