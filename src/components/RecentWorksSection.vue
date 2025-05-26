<template>
  <v-container class="my-15">
    <h2 class="text-h3 text-center mb-10">Последние загрузки</h2>
    <v-row>
      <v-col v-for="(work, i) in recentWorks" :key="i" cols="12" md="4">
        <v-card class="pa-4">
          <v-card-title class="text-h5">
            {{ work.title }}
          </v-card-title>
          <v-card-subtitle>
            {{ work.author }} • {{ work.date }}
          </v-card-subtitle>
          <v-card-text>
            <v-chip
              v-for="(tag, j) in work.tags"
              :key="j"
              class="ma-1"
              color="primary"
              variant="outlined"
            >
              {{ tag }}
            </v-chip>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
defineProps({
  recentWorks: {
    type: Array,
    required: true
  }
})
</script>