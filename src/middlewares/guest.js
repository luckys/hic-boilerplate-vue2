import store from '@/store'

export default (to, from, next) => {
  if (!store.getters.token) {
    next()
  } else {
    next({name: 'Dashboard'})
  }
}
