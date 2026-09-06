import React, { useState, useEffect } from 'react'
import { formatearFecha } from '../utils/helpers'

function TicketList({ tickets, setTicketChat }) {
  const [paginaActual, setPaginaActual] = useState(1)
  const ticketsPorPagina = 5

  useEffect(() => {
    setPaginaActual(1)
  }, [tickets])

  const indiceUltimoTicket = paginaActual * ticketsPorPagina
  const indicePrimerTicket = indiceUltimoTicket - ticketsPorPagina
  const ticketsActuales = tickets.slice(indicePrimerTicket, indiceUltimoTicket)
  const totalPaginas = Math.ceil(tickets.length / ticketsPorPagina)

  if (!tickets || tickets.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px' }}>
        <div style={{ fontSize: '40px', marginBottom: '15px' }}>📭</div>
        <p style={{ color: '#94a3b8', fontSize: '16px', margin: 0 }}>No tienes tickets creados aún.</p>
        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '8px' }}>¡Usa el formulario para solicitar soporte!</p>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {ticketsActuales.map(ticket => (
          <div key={ticket.id} style={{ 
            border: '1px solid rgba(255, 255, 255, 0.05)', 
            borderRadius: '16px', 
            padding: '20px', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            backgroundColor: 'rgba(15, 23, 42, 0.4)', 
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontWeight: 'bold', color: '#818cf8', fontSize: '16px' }}>#{ticket.id}</span>
                <span style={{ fontWeight: '600', color: '#f8fafc', fontSize: '17px' }}>{ticket.titulo}</span>
                
                {/* Badges estilizados */}
                <span style={{ 
                  fontSize: '11px', padding: '6px 12px', borderRadius: '20px', fontWeight: 'bold', letterSpacing: '0.5px',
                  backgroundColor: ticket.estado === 'CERRADO' ? 'rgba(16, 185, 129, 0.1)' : (ticket.estado === 'NUEVO' ? 'rgba(99, 102, 241, 0.1)' : 'rgba(245, 158, 11, 0.1)'),
                  color: ticket.estado === 'CERRADO' ? '#34d399' : (ticket.estado === 'NUEVO' ? '#818cf8' : '#fbbf24'),
                  border: `1px solid ${ticket.estado === 'CERRADO' ? 'rgba(16, 185, 129, 0.2)' : (ticket.estado === 'NUEVO' ? 'rgba(99, 102, 241, 0.2)' : 'rgba(245, 158, 11, 0.2)')}`
                }}>
                  {ticket.estado}
                </span>
              </div>
              <div style={{ fontSize: '13px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>📅</span> {formatearFecha(ticket.fecha_creacion)}
              </div>
            </div>
            
            <button 
              onClick={() => setTicketChat(ticket)}
              style={{ 
                padding: '10px 20px', 
                backgroundColor: 'rgba(99, 102, 241, 0.1)', 
                color: '#818cf8', 
                border: '1px solid rgba(99, 102, 241, 0.3)', 
                borderRadius: '10px', 
                cursor: 'pointer', 
                fontWeight: '600', 
                transition: 'all 0.2s', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(99, 102, 241, 0.2)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(99, 102, 241, 0.1)'
              }}
            >
              💬 Chat
            </button>
          </div>
        ))}
      </div>

      {/* Paginación en Dark Mode */}
      {totalPaginas > 1 && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <button 
            onClick={() => setPaginaActual(prev => Math.max(prev - 1, 1))}
            disabled={paginaActual === 1}
            style={{ 
              padding: '10px 18px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', 
              backgroundColor: paginaActual === 1 ? 'transparent' : 'rgba(30, 41, 59, 0.5)', 
              color: paginaActual === 1 ? '#475569' : '#e2e8f0',
              cursor: paginaActual === 1 ? 'not-allowed' : 'pointer',
              fontWeight: '600', transition: 'all 0.2s'
            }}
          >
            Anterior
          </button>
          
          <span style={{ color: '#94a3b8', fontSize: '14px' }}>
            Página <strong style={{ color: '#e2e8f0' }}>{paginaActual}</strong> de <strong style={{ color: '#e2e8f0' }}>{totalPaginas}</strong>
          </span>
          
          <button 
            onClick={() => setPaginaActual(prev => Math.min(prev + 1, totalPaginas))}
            disabled={paginaActual === totalPaginas}
            style={{ 
              padding: '10px 18px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', 
              backgroundColor: paginaActual === totalPaginas ? 'transparent' : 'rgba(30, 41, 59, 0.5)', 
              color: paginaActual === totalPaginas ? '#475569' : '#e2e8f0',
              cursor: paginaActual === totalPaginas ? 'not-allowed' : 'pointer',
              fontWeight: '600', transition: 'all 0.2s'
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