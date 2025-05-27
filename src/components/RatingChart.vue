<template>
  <apexchart
    type="line"
    height="300"
    :options="chartOptions"
    :series="series"
  ></apexchart>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const series = computed(() => [{
  name: 'Рейтинг',
  data: props.data.datasets[0].data
}])

const chartOptions = computed(() => ({
  chart: {
    type: 'line',
    toolbar: { show: false }
  },
  xaxis: {
    categories: props.data.labels,
    title: { text: 'Названия работ' }
  },
  yaxis: {
    title: { text: 'Рейтинг' },
    min: 0,
    max: 100
  },
  stroke: {
    width: 2,
    curve: 'smooth'
  },
  colors: ['#1976D2'],
  markers: {
    size: 5
  }
}))
</script>