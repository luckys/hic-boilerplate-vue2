const auth = true
export default async (to, from, next) => {
  if (auth) {
    next()
  } else {
    next({name: 'Login'})
  }
}
