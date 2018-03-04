import {
  SET_LOCALE,
} from './mutation-types'

export default {

  [SET_LOCALE] (state, value) {
    state.locale = value
  },
}
