import React, { useState, useEffect } from 'react'

function AdminTable({ tickets, cambiarEstado, setTicketChat, handleEliminarTicket, formatearFecha }) {
  const [paginaActual, setPaginaActual] = useState(1)
  const ticketsPorPagina = 5

  // Si cambiamos de pestaña (activos/historial) regresamos a la página 1
  useEffect(() => {
    setPaginaActual(1)
  }, [tickets])

  // Lógica para cortar la lista de tickets
  const indiceUltimoTicket = paginaActual * ticketsPorPagina
  const indicePrimerTicket = indiceUltimoTicket - ticketsPorPagina
  const ticketsActuales = tickets.slice(indicePrimerTicket, indiceUltimoTicket)
  const totalPaginas = Math.ceil(tickets.length / ticketsPorPagina)

  if (tickets.length === 0) {
    return <p style={{ textAlign: 'center', color: '#64748b', padding: '20px' }}>No hay tickets en esta sección.</p>
  }

  return (
    <div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', marginTop: '10px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e2e8f0', color: '#64748b' }}>
              <th style={{ padding: '12px' }}>ID</th>
              <th style={{ padding: '12px' }}>Cliente</th>
              <th style={{ padding: '12px' }}>Requerimiento</th>
              <th style={{ padding: '12px' }}>Fecha</th>
              <th style={{ padding: '12px' }}>Acción</th>
            </tr>
          </thead>
          <tbody>
            {/* AQUÍ ESTÁ EL TRUCO: Mapeamos 'ticketsActuales' en lugar de 'tickets' */}
            {ticketsActuales.map(ticket => (
              <tr key={ticket.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '12px', fontWeight: 'bold', color: '#6366f1' }}>#{ticket.id}</td>
                <td style={{ padding: '12px', fontWeight: 'bold' }}>{ticket.nombre_cliente}</td>
                <td style={{ padding: '12px' }}>
                  <div style={{ fontWeight: 'bold' }}>{ticket.titulo}</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>{ticket.descripcion}</div>
                </td>
                <td style={{ padding: '12px', fontSize: '14px', color: '#64748b' }}>
                  {formatearFecha(ticket.fecha_creacion)}
                </td>
                <td style={{ padding: '12px' }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <select
                      value={ticket.estado}
                      onChange={(e) => cambiarEstado(ticket.id, e.target.value)}
                      style={{ padding: '6px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                    >
                      <option value="NUEVO">NUEVO</option>
                      <option value="EN PROCESO">EN PROCESO</option>
                      <option value="RESUELTO">RESUELTO</option>
                      <option value="CERRADO">CERRADO</option>
                    </select>

                    <button 
                      onClick={() => setTicketChat(ticket)}
                      style={{ padding: '6px 12px', backgroundColor: '#e0e7ff', color: '#4f46e5', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      💬 Chat
                    </button>

                    <button 
                      onClick={() => handleEliminarTicket(ticket.id)}
                      style={{ padding: '6px 12px', backgroundColor: '#fee2e2', color: '#ef4444', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
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

      {/* CONTROLES DE PAGINACIÓN */}
      {totalPaginas > 1 && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', paddingTop: '10px', borderTop: '1px solid #e2e8f0' }}>
          <button 
            onClick={() => setPaginaActual(prev => Math.max(prev - 1, 1))}
            disabled={paginaActual === 1}
            style={{ 
              padding: '8px 16px', borderRadius: '6px', border: '1px solid #cbd5e1', 
              backgroundColor: paginaActual === 1 ? '#f1f5f9' : 'white', 
              color: paginaActual === 1 ? '#94a3b8' : '#1e293b',
              cursor: paginaActual === 1 ? 'not-allowed' : 'pointer' 
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
              cursor: paginaActual === totalPaginas ? 'not-allowed' : 'pointer' 
            }}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  )
}

export default AdminTable