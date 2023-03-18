import { createRouter, createWebHistory } from 'vue-router/auto'
import { useAuth } from '@/utils/auth'

const router = createRouter({
  history: createWebHistory(),
})

router.beforeEach((to, from, next) => {
  const auth = useAuth()

  if (to.meta.requiresAuth) {
    if (auth.credentials?.token)
      next()
    else
      next({ path: '/login' })
  }
  else {
    next()
  }
})

export default router
