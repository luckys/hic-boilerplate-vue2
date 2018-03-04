import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import lang from './modules/lang'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    auth,
    lang
  },
  strict: debug,
})
