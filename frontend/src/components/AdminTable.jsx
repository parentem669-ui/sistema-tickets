import React from 'react'
import KanbanColumn from './KanbanColumn'

function AdminTable({ tickets, cambiarEstado, setTicketChat, handleEliminarTicket, formatearFecha }) {
  // Ajustamos el ID para que coincida con tu base de datos
  const columnas = [
    { id: 'PENDIENTE', titulo: 'Pendientes', emoji: '🆕', color: '#6366f1' },
    { id: 'EN PROCESO', titulo: 'En Proceso', emoji: '⚙️', color: '#f59e0b' },
    { id: 'RESUELTO', titulo: 'Resueltos', emoji: '✅', color: '#10b981' },
    { id: 'CERRADO', titulo: 'Cerrados', emoji: '🔒', color: '#64748b' }
  ]

  if (!tickets || tickets.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px', color: '#94a3b8' }}>
        <div style={{ fontSize: '40px', marginBottom: '15px' }}>📭</div>
        <p style={{ fontSize: '16px' }}>No hay tickets en el sistema.</p>
      </div>
    )
  }

  return (
    <div style={{ 
      display: 'flex', 
      gap: '24px', 
      overflowX: 'auto', 
      paddingBottom: '20px',
      minHeight: '70vh',
      alignItems: 'flex-start' 
    }}>
      {columnas.map(col => (
        <KanbanColumn 
          key={col.id}
          columna={col}
          tickets={tickets.filter(t => t.estado === col.id)}
          cambiarEstado={cambiarEstado}
          setTicketChat={setTicketChat}
          handleEliminarTicket={handleEliminarTicket}
          formatearFecha={formatearFecha}
        />
      ))}
    </div>
  )
}

export default AdminTable