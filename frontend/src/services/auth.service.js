import api from './api'

export const loginService = async (email, password) => {
  const response = await api.post('/login', { email, password })
  return response.data
}

export const registerService = async (nombre, email, password) => {
  const response = await api.post('/registro', { 
    nombre_completo: nombre, 
    email, 
    password 
  })
  return response.data
}