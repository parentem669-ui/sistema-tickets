import React from 'react'

function KanbanCard({ ticket, color, cambiarEstado, setTicketChat, handleEliminarTicket, formatearFecha }) {

  // Lógica del botón inteligente
  const renderBotonAccion = () => {
    let texto = ''
    let proximoEstado = ''
    let btnColor = ''

    switch (ticket.estado) {
      case 'PENDIENTE':
        texto = '▶ Iniciar'
        proximoEstado = 'EN PROCESO'
        btnColor = '#f59e0b'
        break
      case 'EN PROCESO':
        texto = '✔ Resolver'
        proximoEstado = 'RESUELTO'
        btnColor = '#10b981'
        break
      case 'RESUELTO':
        texto = '🔒 Cerrar'
        proximoEstado = 'CERRADO'
        btnColor = '#64748b'
        break
      default:
        return null
    }

    return (
      <button 
        onClick={() => cambiarEstado(ticket.id, proximoEstado)}
        style={{ 
          padding: '6px 12px', borderRadius: '8px', 
          border: `1px solid ${btnColor}40`, backgroundColor: `${btnColor}15`, 
          color: btnColor, fontSize: '12px', fontWeight: '600', cursor: 'pointer',
          transition: 'all 0.2s', zIndex: 10
        }}
      >
        {texto}
      </button>
    )
  }

  return (
    /* Contenedor principal: define el grosor de la línea iluminada (padding: 1px) */
    <div style={{ 
      position: 'relative', 
      width: '100%', 
      borderRadius: '16px', 
      overflow: 'hidden', 
      padding: '1px', /* Este 1px es el grosor de la línea brillante */
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)'
    }}>
      
      {/* Animación CSS inyectada para hacer girar la línea */}
      <style>{`
        @keyframes spin-border {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      {/* Elemento de fondo que gira: crea el efecto de luz en el borde */}
      <div style={{
        position: 'absolute',
        zIndex: 1,
        top: '-50%',
        left: '-50%',
        width: '200%',
        height: '200%',
        background: `conic-gradient(transparent, transparent, transparent, ${color})`,
        animation: 'spin-border 4s linear infinite',
      }} />

      {/* Contenedor Interno: Es completamente opaco para tapar el centro y solo dejar ver el borde */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        backgroundColor: '#0b1120', /* Fondo oscuro sólido y limpio */
        borderRadius: '15px', /* 1px menos que el contenedor principal */
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}>

        {/* Header Tarjeta */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontWeight: 'bold', color: color, fontSize: '14px' }}>#{ticket.id}</span>
          <span style={{ fontSize: '11px', color: '#64748b' }}>{formatearFecha(ticket.fecha_creacion)}</span>
        </div>

        {/* Título y Descripción */}
        <div>
          <h4 style={{ margin: '0 0 6px 0', color: '#f1f5f9', fontSize: '15px', lineHeight: '1.4' }}>
            {ticket.titulo}
          </h4>
          <p style={{ 
            margin: 0, color: '#94a3b8', fontSize: '13px', lineHeight: '1.5',
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'
          }}>
            {ticket.descripcion}
          </p>
        </div>

        {/* Cliente Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#cbd5e1', backgroundColor: 'rgba(255,255,255,0.03)', padding: '6px 10px', borderRadius: '8px' }}>
          <span style={{ fontSize: '14px' }}>👤</span> 
          <span style={{ fontWeight: '500', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {ticket.cliente || ticket.nombre_cliente || 'Desconocido'}
          </span>
        </div>

        {/* Controles de Acción */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px', paddingTop: '12px', borderTop: '1px dashed rgba(255,255,255,0.1)' }}>
          {renderBotonAccion() || <div />}

          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              onClick={() => setTicketChat(ticket)}
              style={{ padding: '6px 10px', backgroundColor: 'rgba(99, 102, 241, 0.1)', color: '#818cf8', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: '6px', cursor: 'pointer' }}
              title="Abrir Chat"
            >💬</button>
            <button 
              onClick={() => handleEliminarTicket(ticket.id)}
              style={{ padding: '6px 10px', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '6px', cursor: 'pointer' }}
              title="Borrar Ticket"
            >🗑️</button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default KanbanCard