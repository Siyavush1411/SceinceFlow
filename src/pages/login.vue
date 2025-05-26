<template>  
  <v-snackbar
    v-model="errorSnackbar"
    color="error"
    timeout="2000"
    top
    right
    absolute
  >
  {{ errorMessage }}
  </v-snackbar>
  <v-container class="fill-height">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="pa-6 rounded-xl elevation-12" color="rgba(255, 255, 255, 0.9)">
          <v-card-title class="text-center text-h4 mb-6 primary--text">
            Вход
            <v-icon color="primary" large class="ml-2">mdi-login</v-icon>
          </v-card-title>

          <v-form @submit.prevent="submit" ref="form">
            <v-text-field
              v-model="username"
              :rules="registerRules.Username"
              label="Логин"
              prepend-inner-icon="mdi-account"
              variant="outlined"
              color="primary"
              required
              class="mb-4"
            ></v-text-field>

            <v-text-field
              v-model="password"
              :rules="registerRules.Password"
              label="Пароль"
              prepend-inner-icon="mdi-lock"
              variant="outlined"
              color="primary"
              required=true
              type="password"
              class="mb-4"
            ></v-text-field>

              <v-btn 
                type="submit" 
                block 
                size="large"
                color="primary"
                class="mt-4"
                :loading="loading"
              >
                Войти
                <template v-slot:loader>
                  <v-progress-circular indeterminate></v-progress-circular>
                </template>
              </v-btn>

              <div class="text-center mt-4">
                <span class="text-caption">Нет аккаунта? </span>
                <router-link to="/register" class="text-primary text-decoration-none">
                  Зарегистрируйся
                </router-link>
              </div>
            </v-form>
          </v-card>

          <v-snackbar v-model="successSnackbar" color="success" timeout="2000">
            Вход прошел успешно!
          </v-snackbar>
        </v-col>
      </v-row>
    </v-container>
  </template>

<script setup>
import { ref } from 'vue'
import api from '@/config/api'
import registerRules from './helpers/rules'
import { showSnack } from './helpers/auth_helpers'
import { useRouter } from 'vue-router'
import router from '@/config/routings'

const form = ref(null)
const username = ref('')
const password = ref('')
const loading = ref(false)
const successSnackbar = ref(false)
const errorSnackbar = ref(false)
const errorMessage = ref('')


const selectStatusList = [
  { id: 1, name: 'Преподаватель' },
  { id: 2, name: 'Магистрант' },
  { id: 3, name: 'Докторант' }
]

const submit = async () => {
  try{
    const res = await api.post('/login/', {
      'username': username.value,
      'password': password.value,
    })
    router.push('/default')
  }
  catch(error){
    if(error.response && error.response.status == 401){
      showSnack(errorMessage, errorSnackbar, "Может в другой вселенной есть такой пользователь, но точно не в этой")
    }
    else{
      showSnack(errorMessage, errorSnackbar, `Сервер временно не отвечат, так что жди ${error}`)
    }
  }
 }


</script>

<style scoped>
.fill-height {
  width: 100%;
}

.rounded-xl {
  border-radius: 24px !important;
}

.v-card {
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.v-card-title {
  letter-spacing: 1px;
}

.v-btn {
  text-transform: none;
  font-weight: 600;
  letter-spacing: 0.5px;
}
</style>