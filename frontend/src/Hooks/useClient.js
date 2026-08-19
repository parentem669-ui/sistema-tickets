import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { obtenerTickets, crearTicket as apiCrearTicket, enviarComentario as apiEnviarComentario } from '../services/tickets.service'

export const useClient = () => {
  const [tickets, setTickets] = useState([])
  const [titulo, setTitulo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [ticketChat, setTicketChat] = useState(null)
  const [nuevoComentario, setNuevoComentario] = useState('')

  const navigate = useNavigate()
  
  const usuarioActual = JSON.parse(localStorage.getItem('usuario'))

  const fetchTickets = async () => {
    try {
      const data = await obtenerTickets(usuarioActual?.id)
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

  const handleCrearTicket = async (e) => {
    e.preventDefault()
    try {
      await apiCrearTicket({ titulo, descripcion, usuario_id: usuarioActual.id })
      setTitulo('')
      setDescripcion('')
      fetchTickets()
      Swal.fire({ title: '¡Recibido!', text: 'Tu requerimiento ha sido enviado a soporte.', icon: 'success', confirmButtonColor: '#6366f1' })
    } catch (error) {
      Swal.fire('Error', 'Hubo un error al crear el ticket', 'error')
    }
  }

  const enviarComentario = async (e) => {
    e.preventDefault()
    if (!nuevoComentario.trim()) return
    try {
      await apiEnviarComentario(ticketChat.id, nuevoComentario, usuarioActual.id)
      setNuevoComentario('') 
      fetchTickets() 
    } catch (error) {
      Swal.fire('Error', 'No se pudo enviar el mensaje.', 'error')
    }
  }

  const cerrarSesion = () => {
    localStorage.removeItem('usuario')
    localStorage.removeItem('token')
    navigate('/login')
  }

  return {
    tickets, titulo, setTitulo, descripcion, setDescripcion,
    ticketChat, setTicketChat, nuevoComentario, setNuevoComentario,
    usuarioActual, handleCrearTicket, enviarComentario, cerrarSesion
  }
}