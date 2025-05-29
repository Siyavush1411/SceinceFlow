<template>
  <v-col cols="12" md="8">
    <v-card class="pa-4">
      <h2 class="text-h5 mb-4">Активность за 3 года</h2>
      <ActivityChart :data="activityData" />
    </v-card>
  </v-col>
</template>
<script setup>
import { defineProps, ref, computed } from 'vue';
import ActivityChart from './ActivityChart.vue';

const props = defineProps({
  data:{
    years: Date.years,
    works: []
  }
})

const activityData = computed(() => {
  const years = props.data.years || [];
  const works = props.data.works || [];

  return {
    labels: years,
    datasets: [
      {
        label: 'Количество работ',
        data: years.map(year => {
          return works.filter(work => new Date(work.date).getFullYear() === year).length;
        }),
        backgroundColor: '#42A5F5',
        borderColor: '#1E88E5',
        borderWidth: 1
      }
    ]
  };
});


</script>