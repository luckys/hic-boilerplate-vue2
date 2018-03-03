import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import store from '@/store'
import { sync } from 'vuex-router-sync'

Vue.use(Router)

// Load middleware modules dynamically.
const routeMiddleware = resolveMiddleware(
  require.context('@/middlewares', false, /.*\.js$/)
)

const router = createRouter()

sync(store, router)

function createRouter() {
  const router = new Router({
    mode: 'history',
    routes,
    scrollBehavior
  })

  router.beforeEach(beforeEach)
  router.afterEach(afterEach)

  return router
}

/**
 * Global router guard.
 *
 * @param {Route} to
 * @param {Route} from
 * @param {Function} next
 */
async function beforeEach(to, from, next) {

  // Get the middlewares for all the matched routes.
  const middlewares = getMiddleware(to)

  // Call each middleware.
  callMiddleware(middlewares, to, from, (...args) => {
    next(...args)
  })
}

/**
 * Global after hook.
 *
 * @param {Route} to
 * @param {Route} from
 * @param {Function} next
 */
async function afterEach(to, from, next) {
  await router.app.$nextTick()
}

/**
 * Merge the the global middleware with the route middleware.
 *
 * @param  {Route} route
 * @return {Array}
 */
function getMiddleware(route) {
  const middlewares = []

  if (route.meta.middleware) {
    if (Array.isArray(route.meta.middleware)) {
      middlewares.push(...route.meta.middleware)
    } else {
      middlewares.push(route.meta.middleware)
    }
  }

  return middlewares
}

/**
 * Call each middleware.
 *
 * @param {Array} middleware
 * @param {Route} to
 * @param {Route} from
 * @param {Function} next
 */
function callMiddleware(middleware, to, from, next) {
  const stack = middleware.reverse()

  const _next = (...args) => {
    // Stop if "_next" was called with an argument or the stack is empty.
    if (args.length > 0 || stack.length === 0) {
      return next(...args)
    }

    const middleware = stack.pop()

    if (typeof middleware === 'function') {
      middleware(to, from, _next)
    } else if (routeMiddleware[middleware]) {
      routeMiddleware[middleware](to, from, _next)
    } else {
      throw Error(`Undefined middleware [${middleware}]`)
    }
  }

  _next()
}

/**
 * @param  {Object} requireContext
 * @return {Object}
 */
function resolveMiddleware(requireContext) {
  return requireContext.keys()
    .map(file =>
      [file.replace(/(^.\/)|(\.js$)/g, ''), requireContext(file)]
    )
    .reduce((guards, [name, guard]) => (
      {...guards, [name]: guard.default}
    ), {})
}

/**
 * Scroll Behavior
 *
 * @link https://router.vuejs.org/en/advanced/scroll-behavior.html
 *
 * @param  {Route} to
 * @param  {Route} from
 * @param  {Object|undefined} savedPosition
 * @return {Object}
 */
function scrollBehavior(to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition
  }

  if (to.hash) {
    return {selector: to.hash}
  }

  const [component] = router.getMatchedComponents({...to}).slice(-1)

  if (component && component.scrollToTop === false) {
    return {}
  }

  return {x: 0, y: 0}
}

export default router
