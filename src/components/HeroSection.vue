<template>
  <v-parallax src="@/assets/science-bg.jpg" height="600">
    <div class="d-flex flex-column fill-height justify-center align-center text-white">
      <h1 class="text-h3 font-weight-bold mb-4 text-center">
        Платформа для научных исследований ПИТТУ
      </h1>
      <p class="text-h5 text-center mb-8">
        Загрузка, анализ и распространение научных работ
      </p>
      <v-btn
        color="primary"
        size="x-large"
        to="/upload"
        prepend-icon="mdi-cloud-upload"
      >
        Загрузить работу
      </v-btn>
    </div>
  </v-parallax>
</template>