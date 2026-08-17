import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2' 

function Dashboard() {
  const [tickets, setTickets] = useState([])
  const [titulo, setTitulo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  
  const [ticketChat, setTicketChat] = useState(null)
  const [nuevoComentario, setNuevoComentario] = useState('')

  const navigate = useNavigate()
  const usuarioActual = JSON.parse(localStorage.getItem('usuario'))

  const fetchTickets = async () => {
    if (!usuarioActual) {
      navigate('/login')
      return
    }
    try {
      const response = await axios.get(`http://127.0.0.1:8000/tickets?usuario_id=${usuarioActual.id}`)
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
    fetchTickets()
  
  }, [])

  const crearTicket = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://127.0.0.1:8000/tickets', {
        titulo,
        descripcion,
        usuario_id: usuarioActual.id
      })
      setTitulo('')
      setDescripcion('')
      fetchTickets()
      
      Swal.fire({
        title: '¡Recibido!',
        text: 'Tu requerimiento ha sido enviado a soporte.',
        icon: 'success',
        confirmButtonColor: '#6366f1'
      })
    } catch (error) {
      console.error("Error al crear ticket:", error)
      Swal.fire('Error', 'Hubo un error al crear el ticket', 'error')
    }
  }

  const enviarComentario = async (e) => {
    e.preventDefault()
    if (!nuevoComentario.trim()) return

    try {
      await axios.post(`http://127.0.0.1:8000/tickets/${ticketChat.id}/comentarios`, {
        texto: nuevoComentario,
        usuario_id: usuarioActual.id
      })
      setNuevoComentario('') 
      fetchTickets() 
    } catch (error) {
      console.error("Error al enviar comentario:", error)
      Swal.fire('Error', 'No se pudo enviar el mensaje.', 'error')
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
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', padding: '40px', color: 'white', fontFamily: 'sans-serif' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '20px' }}>
        <div>
          <h1 style={{ fontSize: '28px', margin: 0, color: '#f8fafc' }}>Mi Panel de Soporte</h1>
          <p style={{ color: '#94a3b8', margin: '5px 0 0 0', fontSize: '14px' }}>
            Hola, {usuarioActual?.nombre || 'Cliente'}
          </p>
        </div>
        <button onClick={cerrarSesion} style={{ backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', border: '1px solid #ef4444', padding: '10px 16px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
          Cerrar Sesión
        </button>
      </div>

      <div style={{ display: 'flex', gap: '30px', alignItems: 'flex-start' }}>
        
        <div style={{ flex: '1', backgroundColor: 'white', borderRadius: '12px', padding: '24px', color: '#333', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: '18px' }}>Crear un nuevo ticket</h3>
          <form onSubmit={crearTicket} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input 
              type="text" 
              placeholder="Ej. Mi pantalla no enciende" 
              value={titulo} 
              onChange={e => setTitulo(e.target.value)} 
              required 
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px' }}
            />
            <textarea 
              placeholder="Describe tu problema con más detalle..." 
              value={descripcion} 
              onChange={e => setDescripcion(e.target.value)} 
              required 
              rows="4"
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px', resize: 'vertical' }}
            />
            <button type="submit" style={{ backgroundColor: '#6366f1', color: 'white', padding: '12px', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer', marginTop: '5px' }}>
              Enviar Requerimiento
            </button>
          </form>
        </div>

        <div style={{ flex: '2', backgroundColor: 'white', borderRadius: '12px', padding: '24px', color: '#333', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: '18px' }}>Mis requerimientos</h3>
          
          {tickets.length === 0 ? (
            <p style={{ color: '#94a3b8', fontStyle: 'italic' }}>Aún no has creado ningún ticket.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {tickets.map(ticket => (
                <div key={ticket.id} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                      <span style={{ fontWeight: 'bold', color: '#6a4cff', fontSize: '14px' }}>#{ticket.id}</span>
                      <strong style={{ fontSize: '16px' }}>{ticket.titulo}</strong>
                    </div>
                    <div style={{ color: '#64748b', fontSize: '13px', marginBottom: '8px' }}>{ticket.descripcion}</div>
                    <div style={{ fontSize: '12px', color: '#94a3b8' }}>{formatearFecha(ticket.fecha_creacion)}</div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-end' }}>
                    <span style={{ 
                      padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold',
                      backgroundColor: ticket.estado === 'RESUELTO' ? '#dcfce7' : ticket.estado === 'EN_PROGRESO' ? '#f3e8ff' : '#e0f2fe',
                      color: ticket.estado === 'RESUELTO' ? '#15803d' : ticket.estado === 'EN_PROGRESO' ? '#7e22ce' : '#0284c7'
                    }}>
                      {ticket.estado}
                    </span>
                    
                    <button 
                      onClick={() => setTicketChat(ticket)}
                      style={{ backgroundColor: '#e0e7ff', color: '#4f46e5', border: '1px solid #c7d2fe', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' }}
                    >
                      💬 Chat ({ticket.comentarios?.length || 0})
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {ticketChat && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, backdropFilter: 'blur(3px)' }}>
          <div style={{ backgroundColor: 'white', width: '90%', maxWidth: '500px', borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '80vh', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
            
            <div style={{ padding: '20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f8fafc' }}>
              <div>
                <h3 style={{ margin: 0, color: '#1e293b', fontSize: '18px' }}>Chat con Soporte</h3>
                <span style={{ fontSize: '13px', color: '#64748b' }}>Ticket #{ticketChat.id}: {ticketChat.titulo}</span>
              </div>
              <button onClick={() => setTicketChat(null)} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#94a3b8', lineHeight: '1' }}>✖</button>
            </div>

            <div style={{ padding: '20px', overflowY: 'auto', flex: 1, backgroundColor: '#f1f5f9', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {ticketChat.comentarios && ticketChat.comentarios.length > 0 ? (
                ticketChat.comentarios.map(com => {
                  const esMio = com.usuario.id === usuarioActual.id 
                  
                  return (
                    <div key={com.id} style={{ alignSelf: esMio ? 'flex-end' : 'flex-start', maxWidth: '85%', backgroundColor: esMio ? '#6366f1' : 'white', color: esMio ? 'white' : '#333', padding: '12px 16px', borderRadius: '16px', borderBottomRightRadius: esMio ? '4px' : '16px', borderBottomLeftRadius: esMio ? '16px' : '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                      <div style={{ fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: esMio ? '#c7d2fe' : '#64748b', display: 'flex', justifyContent: 'space-between', gap: '15px' }}>
                        <span>{com.usuario.nombre_completo} ({com.usuario.rol === 'admin' ? 'Staff' : 'Tú'})</span>
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
                  <p style={{ margin: 0, fontStyle: 'italic' }}>Aún no hay mensajes.<br/>El equipo de soporte te responderá por aquí.</p>
                </div>
              )}
            </div>

            <form onSubmit={enviarComentario} style={{ padding: '16px', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '10px', backgroundColor: 'white' }}>
              <input 
                type="text" 
                value={nuevoComentario} 
                onChange={(e) => setNuevoComentario(e.target.value)} 
                placeholder="Escribe tu mensaje..." 
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

export default Dashboard