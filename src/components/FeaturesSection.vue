<template>
  <v-container class="my-15">
    <h2 class="text-h3 text-center mb-10">Наши возможности</h2>
    <v-row>
      <v-col v-for="(feature, i) in features" :key="i" cols="12" md="3">
        <v-card height="100%" class="pa-4 text-center">
          <v-icon
            :icon="feature.icon"
            size="64"
            :color="feature.color"
            class="my-4"
          ></v-icon>
          <v-card-title class="text-h5 justify-center">
            {{ feature.title }}
          </v-card-title>
          <v-card-text>
            {{ feature.text }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
defineProps({
  features: {
    type: Array,
    required: true
  }
})
</script>