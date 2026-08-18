import api from './api'

export const registrarUsuario = async (nombreCompleto, email, password) => {
  const response = await api.post('/registro', {
    nombre_completo: nombreCompleto,
    email: email,
    password: password
  })
  return response.data
}

export const iniciarSesion = async (email, password) => {
  const response = await api.post('/login', {
    email: email,
    password: password
  })
  
  // 1. Si el backend nos manda el token, lo guardamos para el interceptor de api.js
  if (response.data.token) {
    localStorage.setItem('token', response.data.token)
  }

  // 2. Retornamos los datos del usuario (ya sea el objeto 'usuario' o la respuesta directa)
  const usuarioInfo = response.data.usuario || response.data
  return usuarioInfo
}