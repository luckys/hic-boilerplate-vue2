import getters from './getters'
import mutations from './mutations'
import actions from './actions'

const initialState = {
  locale: 'en',
  locales: ['en', 'es']
}

export default {
  state: {...initialState},
  getters,
  actions,
  mutations,
}
