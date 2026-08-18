function AdminTable({ tickets, cambiarEstado, setTicketChat, handleEliminarTicket, formatearFecha }) {
  return (
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
                    style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', backgroundColor: ticket.estado === 'RESUELTO' ? '#dcfce7' : ticket.estado === 'EN_PROGRESO' ? '#f3e8ff' : '#e0f2fe', color: ticket.estado === 'RESUELTO' ? '#15803d' : ticket.estado === 'EN_PROGRESO' ? '#7e22ce' : '#0284c7' }}
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
                    onClick={() => handleEliminarTicket(ticket.id)}
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
  )
}

export default AdminTable