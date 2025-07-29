<template>
  <v-app>
    <AppHeader />
    
    <v-main>
      <v-container class="mt-4">
        <v-card class="mb-4 pa-4">
          <v-row dense>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="filters.work_name"
                label="Название работы"
                clearable
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="filters.author"
                label="Автор"
                clearable
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="filters.category"
                label="Категория"
                clearable
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="filters.uniquenes_score"
                label="Уникальность"
                type="number"
                clearable
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card>

        <v-card class="mb-4">
          <v-data-table
            :headers="headers"
            :items="filteredWorks"
            :items-per-page="10"
            :loading="loading"
          >
            <template v-slot:item.author="{ item }">
              {{ getAuthorName(item.author) }}
            </template>
            
            <template v-slot:item.category="{ item }">
              {{ categories[item.category] || `Категория ${item.category}` }}
            </template>
          </v-data-table>
        </v-card>

        <v-row>
          <v-col cols="12" md="6">
            <v-card class="pa-4">
              <h3 class="text-h5 mb-4">Распределение по категориям</h3>
              <CategoryChart :data="categoryData" />
            </v-card>
          </v-col>
          
          <v-col cols="12" md="6">
            <v-card class="pa-4">
              <h3 class="text-h5 mb-4">Рейтинг работ</h3>
              <RatingChart :data="ratingData" />
            </v-card>
          </v-col>

          <v-col cols="12">
            <v-card class="pa-4">
              <h3 class="text-h5 mb-4">Активность авторов</h3>
              <AuthorActivityChart :data="authorActivityData" />
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <AppFooter :links="links" />
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import api from '@/config/api'
import CategoryChart from '@/components/statistics/CategoryChart.vue'
import RatingChart from '@/components/statistics/RatingChart.vue'
import AuthorActivityChart from '@/components/statistics/AuthorActivityChart.vue'
import router from '@/config/routings'

const headers = [
  { title: 'Название', key: 'work_name' },
  { title: 'Автор', key: 'author' },
  { title: 'Категория', key: 'category' },
  { title: 'Рейтинг', key: 'work_rating' },
  { title: 'Уникальность', key: 'uniquenes_score' },
]

const filters = ref({
  work_name: '',
  author: '',
  category: '',
  uniquenes_score: null
})

const works = ref([])
const authors = ref({})
const categories = ref({})
const loading = ref(false)

const loadData = async () => {
  loading.value = true
  const [worksRes, authorsRes] = await Promise.all([
    api.get('/scientufic-works/'),
    api.get('/users/')
  ])
  
  works.value = worksRes.data
  authors.value = authorsRes.data.reduce((acc, author) => {
    acc[author.id] = author.name
    return acc
  }, {})
  }

const filteredWorks = computed(() => {
  return works.value.filter(work => {
    return Object.entries(filters.value).every(([key, value]) => {
      if (!value) return true
      
      if (key === 'author') {
        const authorIds = work.author
        return authorIds.some(id => 
          getAuthorName(id).toLowerCase().includes(value.toLowerCase())
        ) 
      }
      
      if (key === 'category') {
        const categoryName = categories.value[work.category]?.toLowerCase() || ''
        return categoryName.includes(value.toLowerCase())
      }
      
      const workValue = work[key]
      
      if (typeof workValue === 'string') {
        return workValue.toLowerCase().includes(value.toLowerCase())
      }
      return workValue >= value
    })
  })
})

const categoryData = computed(() => {
  if (!works.value.length) return { labels: [], series: [] }
  
  const counts = works.value.reduce((acc, work) => {
    const categoryName = categories.value[work.category] || `Категория ${work.category}`
    acc[categoryName] = (acc[categoryName] || 0) + 1
    return acc
  }, {})

  return {
    labels: Object.keys(counts),
    series: Object.values(counts)
  }
})

const ratingData = computed(() => ({
  labels: works.value.map(w => w.work_name),
  datasets: [{
    label: 'Рейтинг',
    data: works.value.map(w => w.work_rating)
  }]
}))

const authorActivityData = computed(() => {
  if (!works.value.length) return { labels: [], datasets: [] }
  
  const counts = works.value.reduce((acc, work) => {
    work.author.forEach(authorId => {
      const author = getAuthorName(authorId)
      acc[author] = (acc[author] || 0) + 1
    })
    return acc
  }, {})

  return {
    labels: Object.keys(counts),
    datasets: [{
      label: 'Количество работ',
      data: Object.values(counts)
    }]
  }
})

const getAuthorName = (authorId) => authors.value[authorId] || 'Неизвестный автор'

onMounted(loadData)
</script>