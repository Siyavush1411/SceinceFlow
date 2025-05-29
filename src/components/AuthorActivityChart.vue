<template>
  <apexchart
    v-if="series[0].data.length"
    type="bar"
    height="400"
    :options="chartOptions"
    :series="series"
  ></apexchart>
  <div v-else>Загрузка данных...</div>
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
      datasets: [{ data: [] }]
    })
  }
})

const series = computed(() => [{
  name: 'Количество работ',
  data: props.data.datasets[0]?.data || []
}])

const chartOptions = computed(() => ({
  chart: {
    type: 'bar',
    toolbar: { show: false }
  },
  xaxis: {
    categories: props.data.labels || [],
    title: { text: 'Авторы' },
    labels: {
      rotate: -45,
      style: {
        fontSize: '12px'
      }
    }
  },
  yaxis: {
    title: { text: 'Количество работ' },
    tickAmount: 5
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      columnWidth: '60%',
      distributed: true
    }
  },
  colors: ['#4CAF50', '#2196F3', '#FF9800', '#9C27B0'],
  dataLabels: {
    enabled: false
  }
}))
</script>