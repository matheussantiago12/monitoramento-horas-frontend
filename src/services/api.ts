import axios, { AxiosRequestConfig } from 'axios'

export const api = axios.create({
  baseURL: 'https://backend-monitoramento-horas.herokuapp.com/api/'
})

api.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = localStorage.getItem('accessToken')

  if (token) {
    config.headers!.authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(response => {
  return response
}, error => {
  if (error.response.status === 401) {
    location.href = '/login'
    localStorage.removeItem('accessToken')
  }
  return error
})
