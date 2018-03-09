import getters from './getters'
import mutations from './mutations'
import actions from './actions'

const initialState = {
  locale: 'en',
  locales: ['en', 'es']
}

export default {
  namespaced: true,
  state: {...initialState},
  getters,
  actions,
  mutations,
}
