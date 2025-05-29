<template>
  <apexchart
    type="bar"
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
  name: 'Количество',
  data: props.data.series
}])

const chartOptions = computed(() => ({
  chart: {
    type: 'bar',
    toolbar: { show: false }
  },
  xaxis: {
    categories: props.data.labels
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      columnWidth: '70%'
    }
  },
  dataLabels: {
    enabled: false
  }
}))
</script>