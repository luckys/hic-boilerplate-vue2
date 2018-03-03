import {
  SET_TOKEN,
} from './mutation-types'

export default {
  login ({ commit }, token) {
    commit(SET_TOKEN, token)
  },

  logout ({ commit }) {
    commit(SET_TOKEN, null)
  },
}
