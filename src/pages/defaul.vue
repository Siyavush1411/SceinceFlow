<template>
    <NavBar
      @toggle-drawer="toggleDrawer"
      @open-settings="openSettings"
      @open-profile="openProfile"
      @logout="logout"
    />
</template>

<script setup>
import NavBar from '@/components/nav-bar.vue'

function toggleDrawer() {
  console.log('Открытие меню')
}
function openSettings() {
  console.log('Настройки')
}
function openProfile() {
  console.log('Профиль')
}
function logout() {
  console.log('Выход')
}
</script>
