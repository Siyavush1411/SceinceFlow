<template>
  <v-app>
    <AppHeader />
    
    <v-main>
      <v-container class="mt-8">
        <v-row>
          <v-col cols="12" md="4">
            <v-card class="pa-4">
              <div class="text-center">
                <v-avatar size="200" class="mb-4">
                  <v-img :src="avatar" />
                  <v-file-input
                    v-if="editMode"
                    v-model="avatarFile"
                    accept="image/*"
                    class="avatar-upload"
                    @change="updateAvatar"
                  ></v-file-input>
                </v-avatar>
                
                <v-btn
                  variant="outlined"
                  color="primary"
                  @click="toggleEditMode"
                  class="mt-4"
                  :loading="loading"
                >
                  {{ editMode ? 'Сохранить' : 'Редактировать' }}
                </v-btn>
              </div>

              <v-card-text>
                <v-text-field
                  v-model="firstName"
                  label="Имя"
                  :readonly="!editMode"
                  variant="underlined"
                ></v-text-field>

                <v-text-field
                  v-model="lastName"
                  label="Фамилия"
                  :readonly="!editMode"
                  variant="underlined"
                ></v-text-field>

                <v-select
                  v-model="positionId"
                  :items="positions"
                  item-title="text"
                  item-value="value"
                  label="Должность"
                  variant="underlined"
                  :readonly="!editMode"
                ></v-select>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="8">
            <v-card class="pa-4">
              <h2 class="text-h5 mb-4">Активность за 3 года</h2>
              <ActivityChart :data="activityData" />
            </v-card>
          </v-col>
        </v-row>

        <v-row class="mt-4">
          <v-col cols="12">
            <v-card class="pa-4">
              <div class="d-flex justify-space-between align-center mb-4">
                <h2 class="text-h5">Мои работы</h2>
                <v-btn
                  color="primary"
                  to="/upload"
                  prepend-icon="mdi-plus"
                >
                  Добавить работу
                </v-btn>
              </div>

              <v-data-iterator
                :items="userWorks"
                :items-per-page="5"
              >
                <template v-slot:default="{ items }">
                  <v-row>
                    <v-col
                      v-for="(item, i) in items"
                      :key="i"
                      cols="12"
                      md="6"
                    >
                      <WorkCard :work="item.raw" />
                    </v-col>
                  </v-row>
                </template>
              </v-data-iterator>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <AppFooter :links="links" />
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { user_id } from '@/config/api'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import api from '@/config/api'

const editMode = ref(false)
const avatarFile = ref(null)
const loading = ref(false)
const firstName = ref('')
const lastName = ref('')
const positionId = ref(null)
const avatar = ref('')

const positions = ref([
  { text: 'Преподаватель', value: 1 },
  { text: 'Магистрант', value: 2 },
  { text: 'Докторант', value: 3 }
])

const activityData = ref({
  labels: ['2021', '2022', '2023'],
  datasets: [{ label: 'Публикации', data: [8, 12, 15], backgroundColor: '#1976D2' }]
})

const userWorks = ref([{
  title: 'Исследование AI в образовании',
  type: 'Диссертация',
  status: 'Опубликовано',
  date: '2024-03-15',
  views: 245,
  downloads: 89
}])

const loadUserData = async () => {
  try {
    const { data } = await api.get(`users/${user_id}`)
    firstName.value = data.first_name
    lastName.value = data.last_name
    positionId.value = data.status
    avatar.value = data.avatar_url
  } catch (error) {
    console.error('Ошибка загрузки:', error)
  }
}

const saveUserData = async () => {
  try {
    loading.value = true
    const formData = new FormData()
    formData.append('first_name', firstName.value)
    formData.append('last_name', lastName.value)
    formData.append('position_id', positionId.value)
    
    if (avatarFile.value?.length) {
      formData.append('avatar', avatarFile.value[0])
    }

    const { data } = await api.patch(`users/${user_id}/`, formData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
        'Content-Type': 'multipart/form-data'
      }
    })

    if (data.avatar_url) avatar.value = data.avatar_url
  } catch (error) {
    console.error('Ошибка сохранения:', error)
  } finally {
    loading.value = false
  }
}

const toggleEditMode = async () => {
  if (editMode.value) await saveUserData()
  editMode.value = !editMode.value
}

const updateAvatar = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => (avatar.value = e.target.result)
    reader.readAsDataURL(file)
  }
}

onMounted(loadUserData)
</script>

<style scoped>
.avatar-upload {
  position: absolute;
  opacity: 0;
  width: 200px;
  height: 200px;
  cursor: pointer;
}

.v-avatar:hover .avatar-upload {
  opacity: 1;
  background: rgba(0,0,0,0.5);
  transition: opacity 0.3s;
}
</style>