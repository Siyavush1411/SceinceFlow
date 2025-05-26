import { createRouter, createWebHistory } from 'vue-router'
import RegisterView from '@/pages/register.vue'
import LoginView from '@/pages/login.vue'
import Defaul from '@/pages/defaul.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/main',
      name: 'main',
      component: Defaul
    }

  ]
})

export default router