import { formatearFecha } from '../utils/helpers'

function TicketList({ tickets, setTicketChat }) {
  return (
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
                <span style={{ padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold', backgroundColor: ticket.estado === 'RESUELTO' ? '#dcfce7' : ticket.estado === 'EN_PROGRESO' ? '#f3e8ff' : '#e0f2fe', color: ticket.estado === 'RESUELTO' ? '#15803d' : ticket.estado === 'EN_PROGRESO' ? '#7e22ce' : '#0284c7' }}>
                  {ticket.estado}
                </span>
                <button onClick={() => setTicketChat(ticket)} style={{ backgroundColor: '#e0e7ff', color: '#4f46e5', border: '1px solid #c7d2fe', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' }}>
                  💬 Chat ({ticket.comentarios?.length || 0})
                 </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
export default TicketList