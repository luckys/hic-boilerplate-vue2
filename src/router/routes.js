export default [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/Home'),
    meta: {
      layout: 'App'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/Login'),
    meta: {
      layout: 'App',
      middleware: 'guest'
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/pages/Dashboard'),
    meta: {
      layout: 'App',
      middleware: ['auth', 'admin']
    }
  },
  {
    path: '*',
    name: 'Error',
    component: () => import('@/pages/errors/404Page'),
    meta: {
      layout: 'Error'
    }
  }
]
