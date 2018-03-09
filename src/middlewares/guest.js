import store from '@/store'

export default (to, from, next) => {
  if (!store.getters['auth/token']) {
    next()
  } else {
    next({name: 'Dashboard'})
  }
}
