import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2' 

function AdminDashboard() {
  const [tickets, setTickets] = useState([])
  const [ticketChat, setTicketChat] = useState(null) 
  const [nuevoComentario, setNuevoComentario] = useState('') 
  
  const navigate = useNavigate()

  const fetchTickets = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/tickets')
      setTickets(response.data)
      
      if (ticketChat) {
        const ticketActualizado = response.data.find(t => t.id === ticketChat.id)
        if (ticketActualizado) setTicketChat(ticketActualizado)
      }
    } catch (error) {
      console.error("Error al obtener los tickets:", error)
    }
  }

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario')
    if (!usuarioGuardado) {
      navigate('/login')
    } else {
      fetchTickets()
    }
  
  }, [navigate])

  const cambiarEstado = async (id, nuevoEstado) => {
    try {
      await axios.put(`http://127.0.0.1:8000/tickets/${id}/estado`, {
        nuevo_estado: nuevoEstado
      })
      fetchTickets()
      
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Estado actualizado',
        showConfirmButton: false,
        timer: 1500
      })
    } catch (error) {
      console.error("Error al actualizar estado:", error)
      Swal.fire('Error', 'Hubo un error al actualizar el ticket', 'error')
    }
  }

  const eliminarTicket = async (id) => {
    
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción eliminará el ticket y sus mensajes para siempre.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#94a3b8',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    })

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://127.0.0.1:8000/tickets/${id}`)
        fetchTickets() 
        if (ticketChat && ticketChat.id === id) setTicketChat(null)
        Swal.fire('¡Eliminado!', 'El ticket ha sido borrado.', 'success')
      } catch (error) {
        console.error("Error al eliminar el ticket:", error)
        Swal.fire('Error', 'Hubo un error al intentar eliminar el ticket.', 'error')
      }
    }
  }

  const enviarComentario = async (e) => {
    e.preventDefault()
    if (!nuevoComentario.trim()) return

    try {
      const usuario = JSON.parse(localStorage.getItem('usuario'))
      await axios.post(`http://127.0.0.1:8000/tickets/${ticketChat.id}/comentarios`, {
        texto: nuevoComentario,
        usuario_id: usuario.id
      })
      setNuevoComentario('') 
      fetchTickets() 
    } catch (error) {
      console.error("Error al enviar comentario:", error)
      Swal.fire('Error', 'Hubo un error al enviar el mensaje.', 'error')
    }
  }

  const cerrarSesion = () => {
    localStorage.removeItem('usuario')
    navigate('/login')
  }

  const formatearFecha = (fechaISO) => {
    if (!fechaISO) return ''
    const fechaUTC = fechaISO.endsWith('Z') ? fechaISO : `${fechaISO}Z`
    const fecha = new Date(fechaUTC)
    return fecha.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', padding: '40px', color: 'white', fontFamily: 'sans-serif', position: 'relative' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '20px' }}>
        <div>
          <h1 style={{ fontSize: '28px', margin: 0, color: '#f8fafc' }}>Panel de Administración (Staff)</h1>
          <p style={{ color: '#94a3b8', margin: '5px 0 0 0', fontSize: '14px' }}>
            Gestión interna y resolución de requerimientos
          </p>
        </div>
        <button onClick={cerrarSesion} style={{ backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', border: '1px solid #ef4444', padding: '10px 16px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
          Cerrar Sesión
        </button>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', color: '#333', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
        <h3 style={{ marginBottom: '20px', fontSize: '18px' }}>Cola de Trabajo Activa</h3>
        
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #eee', color: '#888', fontSize: '14px' }}>
              <th style={{ padding: '12px' }}>ID</th>
              <th style={{ padding: '12px' }}>Cliente</th>
              <th style={{ padding: '12px' }}>Requerimiento</th>
              <th style={{ padding: '12px' }}>Fecha</th>
              <th style={{ padding: '12px' }}>Acción</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map(ticket => (
              <tr key={ticket.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '12px', fontWeight: 'bold', color: '#6a4cff' }}>#{ticket.id}</td>
                <td style={{ padding: '12px' }}>
                  {ticket.usuario ? (
                    <>
                      <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{ticket.usuario.nombre_completo}</div>
                      <div style={{ color: '#888', fontSize: '12px' }}>{ticket.usuario.email}</div>
                    </>
                  ) : (
                    <span style={{ color: '#94a3b8', fontStyle: 'italic', fontSize: '14px' }}>Sin asignar</span>
                  )}
                </td>
                <td style={{ padding: '12px' }}>
                  <strong>{ticket.titulo}</strong>
                  <div style={{ color: '#666', fontSize: '13px', marginTop: '4px' }}>{ticket.descripcion}</div>
                </td>
                <td style={{ padding: '12px', color: '#64748b', fontSize: '13px' }}>
                  {formatearFecha(ticket.fecha_creacion)}
                </td>
                <td style={{ padding: '12px' }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    
                    <select 
                      value={ticket.estado} 
                      onChange={(e) => cambiarEstado(ticket.id, e.target.value)}
                      style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', backgroundColor: ticket.estado === 'RESUELTO' ? '#dcfce7' : ticket.estado === 'EN_PROGRESO' ? '#f3e8ff' : '#e0f2fe', color: ticket.estado === 'RESUELTO' ? '#15803d' : ticket.estado === 'EN_PROGRESO' ? '#7e22ce' : '#0284c7' }}
                    >
                      <option value="NUEVO">NUEVO</option>
                      <option value="EN_PROGRESO">EN PROGRESO</option>
                      <option value="RESUELTO">RESUELTO</option>
                      <option value="CERRADO">CERRADO</option>
                    </select>

                    <button 
                      onClick={() => setTicketChat(ticket)}
                      style={{ backgroundColor: '#e0e7ff', color: '#4f46e5', border: '1px solid #c7d2fe', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}
                    >
                      💬 Chat ({ticket.comentarios?.length || 0})
                    </button>

                    <button 
                      onClick={() => eliminarTicket(ticket.id)}
                      style={{ backgroundColor: '#fee2e2', color: '#ef4444', border: '1px solid #f87171', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}
                    >
                      Borrar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {ticketChat && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, backdropFilter: 'blur(3px)' }}>
          <div style={{ backgroundColor: 'white', width: '90%', maxWidth: '500px', borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '80vh', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
            
            <div style={{ padding: '20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f8fafc' }}>
              <div>
                <h3 style={{ margin: 0, color: '#1e293b', fontSize: '18px' }}>Chat del Ticket #{ticketChat.id}</h3>
                <span style={{ fontSize: '13px', color: '#64748b' }}>{ticketChat.titulo}</span>
              </div>
              <button onClick={() => setTicketChat(null)} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#94a3b8', lineHeight: '1' }}>✖</button>
            </div>

            <div style={{ padding: '20px', overflowY: 'auto', flex: 1, backgroundColor: '#f1f5f9', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {ticketChat.comentarios && ticketChat.comentarios.length > 0 ? (
                ticketChat.comentarios.map(com => {
                  const usuarioActual = JSON.parse(localStorage.getItem('usuario'))
                  const esMio = com.usuario.id === usuarioActual.id 
                  
                  return (
                    <div key={com.id} style={{ alignSelf: esMio ? 'flex-end' : 'flex-start', maxWidth: '85%', backgroundColor: esMio ? '#6366f1' : 'white', color: esMio ? 'white' : '#333', padding: '12px 16px', borderRadius: '16px', borderBottomRightRadius: esMio ? '4px' : '16px', borderBottomLeftRadius: esMio ? '16px' : '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                      <div style={{ fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: esMio ? '#c7d2fe' : '#64748b', display: 'flex', justifyContent: 'space-between', gap: '15px' }}>
                        <span>{com.usuario.nombre_completo} ({com.usuario.rol})</span>
                      </div>
                      <div style={{ fontSize: '15px', lineHeight: '1.4' }}>{com.texto}</div>
                      <div style={{ fontSize: '10px', textAlign: 'right', marginTop: '8px', color: esMio ? '#a5b4fc' : '#94a3b8' }}>
                        {formatearFecha(com.fecha_creacion)}
                      </div>
                    </div>
                  )
                })
              ) : (
                <div style={{ margin: 'auto', textAlign: 'center', color: '#94a3b8' }}>
                  <div style={{ fontSize: '40px', marginBottom: '10px' }}>💬</div>
                  <p style={{ margin: 0, fontStyle: 'italic' }}>Aún no hay mensajes.<br/>Escribe uno abajo para iniciar la conversación.</p>
                </div>
              )}
            </div>

            <form onSubmit={enviarComentario} style={{ padding: '16px', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '10px', backgroundColor: 'white' }}>
              <input 
                type="text" 
                value={nuevoComentario} 
                onChange={(e) => setNuevoComentario(e.target.value)} 
                placeholder="Escribe un mensaje para el cliente..." 
                required 
                style={{ 
                  flex: 1, 
                  padding: '12px 16px', 
                  borderRadius: '24px', 
                  border: '1px solid #cbd5e1', 
                  outline: 'none', 
                  fontSize: '14px', 
                  backgroundColor: '#f8fafc',
                  color: '#1e293b' 
                }} 
              />
              <button 
                type="submit" 
                style={{ backgroundColor: '#6366f1', color: 'white', border: 'none', padding: '0 24px', borderRadius: '24px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px', transition: 'background 0.2s' }}
              >
                Enviar
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  )
}

export default AdminDashboard