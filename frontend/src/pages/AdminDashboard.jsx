import React, { useState } from 'react'
import { useAdmin } from '../Hooks/useAdmin' 
import AdminHeader from '../components/AdminHeader'
import AdminTable from '../components/AdminTable'
import { formatearFecha } from '../utils/helpers'

function AdminDashboard() {
  const { tickets, actualizarEstado, eliminarTicket, cerrarSesion } = useAdmin()

  const [pestanaActiva, setPestanaActiva] = useState('activos')

  const ticketsActivos = tickets.filter(ticket => ticket.estado !== 'CERRADO')
  const ticketsHistorial = tickets.filter(ticket => ticket.estado === 'CERRADO')

  const ticketsAMostrar = pestanaActiva === 'activos' ? ticketsActivos : ticketsHistorial

  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', padding: '40px', fontFamily: 'sans-serif' }}>
      
      <AdminHeader cerrarSesion={cerrarSesion} />

      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <h2 style={{ margin: '0 0 20px 0', color: '#1e293b' }}>Gestión de Requerimientos</h2>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', borderBottom: '2px solid #e2e8f0', paddingBottom: '10px' }}>
          <button 
            onClick={() => setPestanaActiva('activos')}
            style={{
              padding: '10px 20px',
              border: 'none',
              backgroundColor: 'transparent',
              fontSize: '16px',
              fontWeight: pestanaActiva === 'activos' ? 'bold' : 'normal',
              color: pestanaActiva === 'activos' ? '#6366f1' : '#64748b',
              borderBottom: pestanaActiva === 'activos' ? '3px solid #6366f1' : 'none',
              cursor: 'pointer',
              marginBottom: '-12px'
            }}
          >
            🚀 Cola Activa ({ticketsActivos.length})
          </button>
          
          <button 
            onClick={() => setPestanaActiva('historial')}
            style={{
              padding: '10px 20px',
              border: 'none',
              backgroundColor: 'transparent',
              fontSize: '16px',
              fontWeight: pestanaActiva === 'historial' ? 'bold' : 'normal',
              color: pestanaActiva === 'historial' ? '#10b981' : '#64748b',
              borderBottom: pestanaActiva === 'historial' ? '3px solid #10b981' : 'none',
              cursor: 'pointer',
              marginBottom: '-12px'
            }}
          >
            📁 Historial Cerrados ({ticketsHistorial.length})
          </button>
        </div>

        <AdminTable 
          tickets={ticketsAMostrar} 
          actualizarEstado={actualizarEstado}
          eliminarTicket={eliminarTicket}
          formatearFecha={formatearFecha} // <-- AQUÍ SE LA PASAMOS A LA TABLA
        /> 

      </div>
    </div>
  )
}

export default AdminDashboard