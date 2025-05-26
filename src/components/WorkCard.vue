<template>
  <v-card class="pa-4">
    <div class="d-flex justify-space-between">
      <div>
        <v-card-title class="text-h6">{{ work.title }}</v-card-title>
        <v-card-subtitle class="text-caption">
          {{ work.type }} • {{ work.date }}
        </v-card-subtitle>
      </div>
      <v-chip :color="statusColor" variant="flat">{{ work.status }}</v-chip>
    </div>

    <v-card-text>
      <div class="d-flex gap-4">
        <div class="d-flex align-center">
          <v-icon icon="mdi-eye" size="18" class="mr-2"></v-icon>
          {{ work.views }}
        </div>
        <div class="d-flex align-center">
          <v-icon icon="mdi-download" size="18" class="mr-2"></v-icon>
          {{ work.downloads }}
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  work: {
    type: Object,
    required: true
  }
})

const statusColor = computed(() => {
  switch(props.work.status) {
    case 'Опубликовано': return 'success'
    case 'На проверке': return 'warning'
    default: return 'primary'
  }
})
</script>