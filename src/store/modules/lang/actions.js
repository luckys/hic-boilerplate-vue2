import {
  SET_LOCALE,
} from './mutation-types'

import { loadMessages } from '@/plugins/i18n'

export default {
  setLocale ({ commit }, locale) {
    commit(SET_LOCALE, locale)
    loadMessages(locale)
  }
}
