import { defineStore } from 'pinia'
import api from '@/config/api'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null
  }),
  actions: {
    async loadUser() {
      try {
        const response = await api.get('/profile/', localStorage.getItem('token'))
        this.user = response.data
      } catch (error) {
        console.error('Error loading user:', error)
      }
    },
    async logout() {
      await api.post('/auth/logout')
      this.user = null
    }
  }
})