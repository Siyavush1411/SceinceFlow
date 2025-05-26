<template>
  <v-container class="fill-height">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="pa-6 rounded-xl elevation-12" color="rgba(255, 255, 255, 0.9)">
          <v-card-title class="text-center text-h4 mb-6 primary--text">
            Регистрация
            <v-icon color="primary" large class="ml-2">mdi-account-plus</v-icon>
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
              v-model="name"
              :rules="registerRules.Name"
              label="Имя"
              prepend-inner-icon="mdi-account"
              variant="outlined"
              color="primary"
              required
              class="mb-4"
            ></v-text-field>

            <v-text-field
              v-model="lastname"
              :rules="registerRules.LastName"
              label="Фамилия"
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

              <v-text-field
                v-model="confirmPassword"
                :rules="registerRules.ConfirmationPassword"
                label="Подтвердите пароль"
                prepend-inner-icon="mdi-shield-check"
                variant="outlined"
                color="primary"
                required
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
                Зарегистрироваться
                <template v-slot:loader>
                  <v-progress-circular indeterminate></v-progress-circular>
                </template>
              </v-btn>

              <div class="text-center mt-4">
                <span class="text-caption">Уже есть аккаунт? </span>
                <router-link to="/login" class="text-primary text-decoration-none">
                  Войти
                </router-link>
              </div>
            </v-form>
          </v-card>

          <v-snackbar v-model="successSnackbar" color="success" timeout="2000">
            Регистрация прошла успешно!
          </v-snackbar>
        </v-col>
      </v-row>
    </v-container>
  </template>

  <script setup>
  import { ref } from 'vue'
  import api from '@/config/api'
  import registerRules from './helpers/rules'

const form = ref(null)
const username = ref('')
const name = ref('')
const lastname = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const successSnackbar = ref(false)


const submit = async () => {
  res = await api.post('/register', {
    'username': username.value,
    'name': name.value,
    'lastname': lastname.value,
    'password': password.value
  })
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