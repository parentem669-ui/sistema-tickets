import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Dashboard() {
  const [tickets, setTickets] = useState([])
  const [usuario, setUsuario] = useState(null)
  const navigate = useNavigate()

  const fetchTickets = async (usuarioId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/tickets?usuario_id=${usuarioId}`)
      setTickets(response.data)
    } catch (error) {
      console.error("Error al obtener los tickets:", error)
    }
  }

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario')
    
    if (!usuarioGuardado || usuarioGuardado === "null") {
      localStorage.removeItem('usuario') 
      navigate('/login')
    } else {
      try {
        const datosUsuario = JSON.parse(usuarioGuardado)
        if (datosUsuario && datosUsuario.id) {
          setUsuario(datosUsuario)
          fetchTickets(datosUsuario.id)
        } else {
          localStorage.removeItem('usuario')
          navigate('/login')
        }
      } catch (error) {
        localStorage.removeItem('usuario')
        navigate('/login')
      }
    }
  }, [navigate])

  const cerrarSesion = () => {
    localStorage.removeItem('usuario')
    navigate('/login')
  }

  const totalTickets = tickets.length
  const ticketsNuevos = tickets.filter(t => t.estado === 'NUEVO').length
  const ticketsEnProgreso = tickets.filter(t => t.estado === 'EN_PROGRESO').length
  const ticketsResueltos = tickets.filter(t => t.estado === 'RESUELTO').length

  return (
    <div style={{ backgroundColor: '#0d1b42', minHeight: '100vh', padding: '40px', color: 'white', fontFamily: 'sans-serif' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '20px' }}>
        <div>
          <h1 style={{ fontSize: '28px', margin: 0 }}>Panel de Control</h1>
          <p style={{ color: '#a0abc0', margin: '5px 0 0 0', fontSize: '14px' }}>
            Bienvenido de vuelta, <strong style={{ color: 'white' }}>{usuario?.nombre || 'Usuario'}</strong>
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <Link to="/nuevo-ticket" style={{ backgroundColor: '#8b5cf6', color: 'white', padding: '10px 18px', textDecoration: 'none', borderRadius: '6px', fontWeight: 'bold', fontSize: '14px' }}>
            + Nuevo Ticket
          </Link>
          <button onClick={cerrarSesion} style={{ backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', border: '1px solid #ef4444', padding: '10px 16px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>
            Cerrar Sesión
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '35px' }}>
        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '20px', borderRadius: '12px' }}>
          <p style={{ color: '#a0abc0', fontSize: '14px', margin: '0 0 8px 0' }}>Mis Tickets (Total)</p>
          <h2 style={{ fontSize: '32px', margin: 0, color: '#38bdf8' }}>{totalTickets}</h2>
        </div>
        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '20px', borderRadius: '12px' }}>
          <p style={{ color: '#a0abc0', fontSize: '14px', margin: '0 0 8px 0' }}>Nuevos</p>
          <h2 style={{ fontSize: '32px', margin: 0, color: '#f59e0b' }}>{ticketsNuevos}</h2>
        </div>
        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '20px', borderRadius: '12px' }}>
          <p style={{ color: '#a0abc0', fontSize: '14px', margin: '0 0 8px 0' }}>En Progreso</p>
          <h2 style={{ fontSize: '32px', margin: 0, color: '#a855f7' }}>{ticketsEnProgreso}</h2>
        </div>
        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '20px', borderRadius: '12px' }}>
          <p style={{ color: '#a0abc0', fontSize: '14px', margin: '0 0 8px 0' }}>Resueltos</p>
          <h2 style={{ fontSize: '32px', margin: 0, color: '#10b981' }}>{ticketsResueltos}</h2>
        </div>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', color: '#333', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
        <h3 style={{ marginBottom: '20px', fontSize: '18px', color: '#1e293b' }}>Mi Listado de Requerimientos</h3>
        
        {tickets.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '20px', color: '#666' }}>No tienes tickets registrados aún.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #eee', color: '#888', fontSize: '14px' }}>
                <th style={{ padding: '12px' }}>ID</th>
                <th style={{ padding: '12px' }}>Título</th>
                <th style={{ padding: '12px' }}>Descripción</th>
                <th style={{ padding: '12px' }}>Estado</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map(ticket => (
                <tr key={ticket.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '12px', fontWeight: 'bold', color: '#6a4cff' }}>#{ticket.id}</td>
                  <td style={{ padding: '12px', fontWeight: '500' }}>{ticket.titulo}</td>
                  <td style={{ padding: '12px', color: '#666', fontSize: '14px' }}>{ticket.descripcion}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{ 
                      backgroundColor: ticket.estado === 'RESUELTO' ? '#dcfce7' : ticket.estado === 'EN_PROGRESO' ? '#f3e8ff' : '#e0f2fe', 
                      color: ticket.estado === 'RESUELTO' ? '#15803d' : ticket.estado === 'EN_PROGRESO' ? '#7e22ce' : '#0284c7', 
                      padding: '4px 12px', 
                      borderRadius: '12px', 
                      fontSize: '12px', 
                      fontWeight: 'bold' 
                    }}>
                      {ticket.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default Dashboard