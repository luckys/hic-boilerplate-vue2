const admin = true
export default async (to, from, next) => {
  if (admin) {
    next()
  } else {
    next({name: 'Home'})
  }
}
