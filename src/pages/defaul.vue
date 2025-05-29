<template>
  <v-app>
    <AppHeader />
    
    <v-main>
      <HeroSection />
      <FeaturesSection :features="features" />
      <StatsSection :stats="stats" />
      <RecentWorksSection :recent-works="recentWorks" />
    </v-main>

    <AppFooter :links="links" />
  </v-app>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router'
import api from '@/config/api';

import AppHeader from '@/components/AppHeader.vue';
import HeroSection from '@/components/HeroSection.vue';
import FeaturesSection from '@/components/FeaturesSection.vue';
import StatsSection from '@/components/statistics/StatsSection.vue';
import RecentWorksSection from '@/components/RecentWorksSection.vue';
import AppFooter from '@/components/AppFooter.vue';


const router = useRouter()

const stats = ref([
  { title: 'Научных работ', value: '1500' },
  { title: 'Пользователей', value: '850' },
  { title: 'Загрузок', value: '25K' },
  { title: 'Категорий', value: '45' }
]);

const recentWorks = ref([
  {
    title: 'Исследование AI в образовании',
    author: 'Иванов П.С.',
    date: '2024-03-15',
    tags: ['ИИ', 'Образование', 'Магистратура']
  },
  {
    title: 'Новые материалы в строительстве',
    author: 'Петрова А.В.',
    date: '2024-03-14',
    tags: ['Материаловедение', 'Докторантура']
  },
  {
    title: 'Экономика устойчивого развития',
    author: 'Сидоров М.К.',
    date: '2024-03-13',
    tags: ['Экономика', 'Учителя']
  }
]);

</script>

<style scoped>
/* Глобальные стили если нужны */
</style>