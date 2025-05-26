<template>
  <v-app-bar color="primary" density="compact">
    <template v-slot:prepend>
      <v-img
        src="/logo.png"
        max-height="40"
        max-width="40"
        class="mr-2"
      ></v-img>
      <span class="text-h6 font-weight-bold">ПИТТУ Научный Архив</span>
    </template>

    <v-spacer></v-spacer>

    <v-btn variant="text" to="/default">Главная</v-btn>
    <v-btn variant="text" to="/upload">Загрузить работу</v-btn>
    <v-btn variant="text" to="/stats">Статистика</v-btn>
    <v-btn variant="text" to="/handbook">Справочник</v-btn>

    <v-avatar
      v-if="user"
      size="36"
      class="ml-4"
    >
      <v-img src="/default-avatar.png"></v-img>
    </v-avatar>
    <v-btn :to="'/profile'" v-if="user" class="ml-2 font-weight-medium white--text">
      {{ user.first_name }} {{ user.last_name?.charAt(0) }}.
    </v-btn>

    <v-btn v-else :to="'/login'" variant="outlined" class="ml-4">Вход</v-btn>
  </v-app-bar>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/config/api'

const user = ref(null)

onMounted(async () => {
  const token = localStorage.getItem('access')
  if (!token) return

  try {
    const res = await api.get('/profile/', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    user.value = res.data
    localStorage.setItem('user_id', user.value.id)
  } catch (err) {
    console.error('Профиль не получен:', err)
  }
})
</script>
