import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/invoices'
  },
  {
    path: '/auth',
    name: 'Authentication',
    component: () => import('@/views/auth/Authentication.vue')
  },
  {
    path: '/invoices',
    name: 'InvoicesList',
    meta: {
      requiresAuth: true
    },
    component: () => import('@/views/invoices/InvoicesList.vue')
  },
  {
    path: '/invoices/new',
    name: 'InvoicesCreate',
    meta: {
      requiresAuth: true
    },
    component: () => import('@/views/invoices/InvoicesList.vue')
  },
  {
    path: '/invoices/:id/edit',
    name: 'InvoicesEdit',
    meta: {
      requiresAuth: true
    },
    component: () => import('@/views/invoices/InvoicesSingle.vue')
  },
  {
    path: '/invoices/:id',
    name: 'InvoicesSingle',
    meta: {
      requiresAuth: true
    },
    component: () => import('@/views/invoices/InvoicesSingle.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/auth') {
    if (localStorage.getItem('user')) {
      next(from.path)
      return
    }

    return next()
  }

  if (to.meta.requiresAuth) {
    if (localStorage.getItem('user')) return next()

    return next({ name: 'Authentication' })
  }

  return next()
})

export default router