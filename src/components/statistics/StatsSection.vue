<template>
  <v-sheet color="primary" class="py-15">
    <v-container>
      <h2 class="text-h3 text-center mb-10 text-white">Статистика платформы</h2>
      <v-row justify="center">
        <v-col v-for="(stat, i) in stats" :key="i" cols="6" md="3">
          <div class="text-center">
            <div class="text-h2 font-weight-bold text-white">{{ stat.value }}+</div>
            <div class="text-h6 text-white">{{ stat.title }}</div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script setup>
defineProps({
  stats: {
    type: Array,
    required: true
  }
})
</script>