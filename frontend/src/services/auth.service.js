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
  
  if (response.data.token) {
    localStorage.setItem('token', response.data.token)
  }

  const usuarioInfo = response.data.usuario || response.data
  return usuarioInfo
}