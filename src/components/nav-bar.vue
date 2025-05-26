<template>
  <v-app-bar app color="primary" dark>
    <!-- Левый логотип или кнопка -->
    <v-app-bar-nav-icon @click="onMenuClick" />

    <!-- Заголовок приложения -->
    <v-toolbar-title>Моё Приложение</v-toolbar-title>

    <!-- Распихивает элементы вправо -->
    <v-spacer />

    <!-- Кнопки/иконки справа -->
    <v-btn icon @click="goToProfile">
      <v-icon>mdi-account</v-icon>
    </v-btn>

    <v-btn icon @click="logout">
      <v-icon>mdi-logout</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script setup>
function onMenuClick() {
  console.log('меню нажато');
}

function goToProfile() {
  console.log('профиль');
}

function logout() {
  console.log('выход');
}
</script>
