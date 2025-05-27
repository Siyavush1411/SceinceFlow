import axios from "axios";

const api = axios.create({
    baseURL : 'http://127.0.0.1:8000/api'
})

export const user_id = localStorage.getItem('user_id')

export default api
