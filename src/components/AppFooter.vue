<template>
  <v-footer class="bg-primary">
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <h3 class="text-h5 text-white">Контакты</h3>
          <p class="text-white mt-4">
            Email: science@pittu.edu<br>
            Телефон: +7 123 456-78-90
          </p>
        </v-col>
        <v-col cols="12" md="4">
          <h3 class="text-h5 text-white">Быстрые ссылки</h3>
          <v-list class="bg-transparent">
            <v-list-item
              v-for="(link, i) in links"
              :key="i"
              :to="link.to"
              class="text-white"
            >
              {{ link.title }}
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup>
defineProps({
  links: {
    type: Array,
    required: true
  }
})
</script>