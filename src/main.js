// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import store from './store'
import { VueExtendLayout, layout } from 'vue-extend-layout'
import i18n from './plugins/i18n'
import './plugins'

Vue.use(VueExtendLayout)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  ...layout
})
