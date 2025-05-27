import { createRouter, createWebHistory } from 'vue-router'
import RegisterView from '@/pages/register.vue'
import LoginView from '@/pages/login.vue'
import Defaul from '@/pages/defaul.vue'
import Profile from '@/pages/profile.vue'
import Dashboard from '@/pages/dashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '',
      component: Defaul
    },
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
      path: '/default',
      name: 'default',
      component: Defaul
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    }
  ]
})

export default router