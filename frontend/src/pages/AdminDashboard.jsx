import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function AdminDashboard() {
  const [tickets, setTickets] = useState([])
  const navigate = useNavigate()

  const fetchTickets = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/tickets')
      setTickets(response.data)
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
    } catch (error) {
      console.error("Error al actualizar estado:", error)
      alert("Hubo un error al actualizar el ticket")
    }
  }

  // NUEVA FUNCIÓN: Eliminar Ticket
  const eliminarTicket = async (id) => {
    const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar este ticket de forma permanente?")
    
    if (confirmacion) {
      try {
        await axios.delete(`http://127.0.0.1:8000/tickets/${id}`)
        fetchTickets() 
      } catch (error) {
        console.error("Error al eliminar el ticket:", error)
        alert("Hubo un error al intentar eliminar el ticket.")
      }
    }
  }

  const cerrarSesion = () => {
    localStorage.removeItem('usuario')
    navigate('/login')
  }

  const formatearFecha = (fechaISO) => {
    const fechaUTC = fechaISO.endsWith('Z') ? fechaISO : `${fechaISO}Z`
    const fecha = new Date(fechaUTC)
    
    return fecha.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', padding: '40px', color: 'white', fontFamily: 'sans-serif' }}>
      
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
                      style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px',
                        backgroundColor: ticket.estado === 'RESUELTO' ? '#dcfce7' : ticket.estado === 'EN_PROGRESO' ? '#f3e8ff' : '#e0f2fe',
                        color: ticket.estado === 'RESUELTO' ? '#15803d' : ticket.estado === 'EN_PROGRESO' ? '#7e22ce' : '#0284c7'
                      }}
                    >
                      <option value="NUEVO">NUEVO</option>
                      <option value="EN_PROGRESO">EN PROGRESO</option>
                      <option value="RESUELTO">RESUELTO</option>
                      <option value="CERRADO">CERRADO</option>
                    </select>

                    <button 
                      onClick={() => eliminarTicket(ticket.id)}
                      style={{ 
                        backgroundColor: '#fee2e2', 
                        color: '#ef4444', 
                        border: '1px solid #f87171', 
                        padding: '8px 12px', 
                        borderRadius: '6px', 
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: '13px'
                      }}
                      title="Eliminar ticket"
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
    </div>
  )
}

export default AdminDashboard