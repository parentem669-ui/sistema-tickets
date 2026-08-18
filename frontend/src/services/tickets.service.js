import api from './api'

export const obtenerTickets = async (usuarioId = null) => {
  const url = usuarioId ? `/tickets?usuario_id=${usuarioId}` : '/tickets'
  const response = await api.get(url)
  return response.data
}

export const crearTicket = async (datosTicket) => {
  const response = await api.post('/tickets', datosTicket)
  return response.data
}

export const actualizarEstadoTicket = async (ticketId, nuevoEstado) => {
  const response = await api.put(`/tickets/${ticketId}/estado`, { nuevo_estado: nuevoEstado })
  return response.data
}

export const eliminarTicket = async (ticketId) => {
  const response = await api.delete(`/tickets/${ticketId}`)
  return response.data
}

export const enviarComentario = async (ticketId, contenido, usuarioId) => {
  const response = await api.post(`/tickets/${ticketId}/comentarios`, {
    contenido,
    usuario_id: usuarioId
  })
  return response.data
}