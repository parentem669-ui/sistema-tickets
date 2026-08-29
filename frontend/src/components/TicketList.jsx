import React, { useState, useEffect } from 'react'
import { formatearFecha } from '../utils/helpers'

function TicketList({ tickets, setTicketChat }) {
  // Estados para la paginación
  const [paginaActual, setPaginaActual] = useState(1)
  const ticketsPorPagina = 5

  // Si la lista de tickets cambia (ej. crea uno nuevo), regresamos a la página 1
  useEffect(() => {
    setPaginaActual(1)
  }, [tickets])

  // Matemáticas para cortar el arreglo
  const indiceUltimoTicket = paginaActual * ticketsPorPagina
  const indicePrimerTicket = indiceUltimoTicket - ticketsPorPagina
  const ticketsActuales = tickets.slice(indicePrimerTicket, indiceUltimoTicket)
  const totalPaginas = Math.ceil(tickets.length / ticketsPorPagina)

  if (!tickets || tickets.length === 0) {
    return (
      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', flex: 1, textAlign: 'center' }}>
        <p style={{ color: '#64748b', fontSize: '16px' }}>No tienes tickets creados aún. ¡Usa el formulario para crear uno!</p>
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', flex: 1, display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <h3 style={{ margin: '0 0 10px 0', color: '#1e293b', borderBottom: '2px solid #e2e8f0', paddingBottom: '10px' }}>
        Mis Requerimientos
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {ticketsActuales.map(ticket => (
          <div key={ticket.id} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.2s', backgroundColor: '#f8fafc' }}>
            <div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontWeight: 'bold', color: '#6366f1' }}>#{ticket.id}</span>
                <span style={{ fontWeight: 'bold', color: '#1e293b', fontSize: '16px' }}>{ticket.titulo}</span>
                <span style={{ 
                  fontSize: '12px', padding: '4px 10px', borderRadius: '20px', fontWeight: 'bold',
                  backgroundColor: ticket.estado === 'CERRADO' ? '#d1fae5' : (ticket.estado === 'NUEVO' ? '#dbeafe' : '#fef3c7'),
                  color: ticket.estado === 'CERRADO' ? '#065f46' : (ticket.estado === 'NUEVO' ? '#1e40af' : '#b45309')
                }}>
                  {ticket.estado}
                </span>
              </div>
              <div style={{ fontSize: '14px', color: '#64748b' }}>
                {formatearFecha(ticket.fecha_creacion)}
              </div>
            </div>
            
            <button 
              onClick={() => setTicketChat(ticket)}
              style={{ padding: '8px 16px', backgroundColor: '#e0e7ff', color: '#4f46e5', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              💬 Ver Chat
            </button>
          </div>
        ))}
      </div>

      {/* CONTROLES DE PAGINACIÓN */}
      {totalPaginas > 1 && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #e2e8f0' }}>
          <button 
            onClick={() => setPaginaActual(prev => Math.max(prev - 1, 1))}
            disabled={paginaActual === 1}
            style={{ 
              padding: '8px 16px', borderRadius: '6px', border: '1px solid #cbd5e1', 
              backgroundColor: paginaActual === 1 ? '#f1f5f9' : 'white', 
              color: paginaActual === 1 ? '#94a3b8' : '#1e293b',
              cursor: paginaActual === 1 ? 'not-allowed' : 'pointer',
              fontWeight: 'bold'
            }}
          >
            Anterior
          </button>
          
          <span style={{ color: '#64748b', fontSize: '14px' }}>
            Página <strong>{paginaActual}</strong> de <strong>{totalPaginas}</strong>
          </span>
          
          <button 
            onClick={() => setPaginaActual(prev => Math.min(prev + 1, totalPaginas))}
            disabled={paginaActual === totalPaginas}
            style={{ 
              padding: '8px 16px', borderRadius: '6px', border: '1px solid #cbd5e1', 
              backgroundColor: paginaActual === totalPaginas ? '#f1f5f9' : 'white', 
              color: paginaActual === totalPaginas ? '#94a3b8' : '#1e293b',
              cursor: paginaActual === totalPaginas ? 'not-allowed' : 'pointer',
              fontWeight: 'bold'
            }}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  )
}

export default TicketList