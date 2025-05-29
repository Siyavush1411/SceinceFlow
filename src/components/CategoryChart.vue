<template>
  <div class="chart-container">
    <apexchart
      v-if="hasData"
      type="pie"
      height="300"
      :options="chartOptions"
      :series="series"
    ></apexchart>
    <div v-else class="no-data">
      Нет данных для отображения
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

const apexchart = VueApexCharts

const props = defineProps({
  data: {
    type: Object,
    default: () => ({
      labels: [],
      series: []
    })
  }
})

const series = computed(() => props.data?.series || [])
const hasData = computed(() =>
  Array.isArray(series.value) && series.value.length > 0
)

const chartOptions = computed(() => ({
  chart: {
    type: 'pie',
    toolbar: { show: false }
  },
  labels: props.data?.labels || [],
  colors: ['#4CAF50', '#2196F3', '#FF9800', '#9C27B0'],
  dataLabels: {
    enabled: true,
    formatter: (val) => `${Math.round(val)}%`
  },
  legend: {
    position: 'bottom'
  }
}))
</script>

<style scoped>
.chart-container {
  position: relative;
  min-height: 300px;
}
.no-data {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #999;
}
</style>