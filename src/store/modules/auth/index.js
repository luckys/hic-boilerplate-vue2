import getters from './getters'
import mutations from './mutations'
import actions from './actions'

const initialState = {
  token: null
}

export default {
  state: {...initialState},
  getters,
  actions,
  mutations,
}
