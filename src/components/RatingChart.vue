<template>
  <ApexChart
    v-if="hasData"
    type="line"
    height="300"
    :options="chartOptions"
    :series="series"
  />
  <div v-else class="no-data">
    Нет данных для отображения
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  data: {
    type: Object,
    default: () => ({
      labels: [],
      datasets: [{ data: [] }]
    })
  }
})

const series = computed(() => [{
  name: 'Рейтинг',
  data: props.data.datasets[0]?.data || []
}])

const hasData = computed(() => 
  series.value[0]?.data?.length > 0
)

const chartOptions = computed(() => ({
  chart: {
    toolbar: { show: false },
    zoom: { enabled: false }
  },
  xaxis: {
    categories: props.data.labels,
    title: { text: 'Названия работ' },
    labels: { rotate: -45 }
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