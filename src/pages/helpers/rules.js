const nameRules = [
  v => !!v || 'Имя обязательно',
  v => (v && v.length >= 3) || 'Имя должно быть не менее 3 символов'
]

const lastnameRules = [
  v => !!v || 'Фамилия обязательна',
  v => (v && v.length >= 3) || 'Фамилия должна быть не менее 3 символов'
]

const usernameRules = [
  v => !!v || 'Логин обязательно',
  v => /^[a-zA-Z]+$/.test (v) || 'Логин должен быть из латинских символов'
]

const passwordRules = [
  v => !!v || 'Пароль обязателен',
  v => (v && v.length >= 8) || 'Пароль должен быть не менее 8 символов'
]

const confirmPasswordRules = [
  v => !!v || 'Подтвердите пароль',
  v => v === password.value || 'Пароли не совпадают'
]

export default {
    'Name': nameRules,
    'LastName': lastnameRules,
    'Username': usernameRules,
    'Password': passwordRules,
    'ConfirmationPassword': confirmPasswordRules
}

 