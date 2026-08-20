import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { obtenerTickets, actualizarEstadoTicket, eliminarTicket, enviarComentario as apiEnviarComentario } from '../services/tickets.service'

export const useAdmin = () => {
  const [tickets, setTickets] = useState([])
  const [ticketChat, setTicketChat] = useState(null) 
  const [nuevoComentario, setNuevoComentario] = useState('') 
  
  const navigate = useNavigate()

  const fetchTickets = async () => {
    try {
      const data = await obtenerTickets()
      setTickets(data)
      if (ticketChat) {
        const ticketActualizado = data.find(t => t.id === ticketChat.id)
        if (ticketActualizado) setTicketChat(ticketActualizado)
      }
    } catch (error) {
      console.error("Error al obtener los tickets:", error)
    }
  }

  useEffect(() => {
    fetchTickets()
  }, [])

  const cambiarEstado = async (id, nuevoEstado) => {
    try {
      await actualizarEstadoTicket(id, nuevoEstado)
      fetchTickets()
      Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Estado actualizado', showConfirmButton: false, timer: 1500 })
    } catch (error) {
      Swal.fire('Error', 'Hubo un error al actualizar el ticket', 'error')
    }
  }

  const handleEliminarTicket = async (id) => {
    const result = await Swal.fire({ title: '¿Estás seguro?', text: "Esta acción eliminará el ticket y sus mensajes.", icon: 'warning', showCancelButton: true, confirmButtonColor: '#ef4444', cancelButtonColor: '#94a3b8', confirmButtonText: 'Sí, eliminar', cancelButtonText: 'Cancelar' })
    if (result.isConfirmed) {
      try {
        await eliminarTicket(id)
        fetchTickets() 
        if (ticketChat && ticketChat.id === id) setTicketChat(null)
        Swal.fire('¡Eliminado!', 'El ticket ha sido borrado.', 'success')
      } catch (error) {
        Swal.fire('Error', 'Hubo un error al intentar eliminar el ticket.', 'error')
      }
    }
  }

  const enviarComentario = async (e) => {
    e.preventDefault()
    if (!nuevoComentario.trim()) return
    try {
      const usuario = JSON.parse(localStorage.getItem('usuario'))
      await apiEnviarComentario(ticketChat.id, nuevoComentario, usuario.id)
      setNuevoComentario('') 
      fetchTickets() 
    } catch (error) {
      Swal.fire('Error', 'Hubo un error al enviar el mensaje.', 'error')
    }
  }

  const cerrarSesion = () => {
    localStorage.removeItem('usuario')
    localStorage.removeItem('token')
    navigate('/login')
  }

  return {
    tickets,
    ticketChat,
    setTicketChat,
    nuevoComentario,
    setNuevoComentario,
    cambiarEstado,
    handleEliminarTicket,
    enviarComentario,
    cerrarSesion
  }
}