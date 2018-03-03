import axios from 'axios'
import store from '@/store'

axios.defaults.baseURL = 'https://api.example.com';

// Request interceptor
axios.interceptors.request.use(request => {
  const token = store.getters.token
  if (token) {
    request.headers.common['Authorization'] = `Bearer ${token}`
  }

  return request
})
