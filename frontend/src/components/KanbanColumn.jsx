import React from 'react'
import KanbanCard from './KanbanCard'

function KanbanColumn({ columna, tickets, cambiarEstado, setTicketChat, handleEliminarTicket, formatearFecha }) {
  return (
    <div style={{ 
      flex: '1', 
      minWidth: '280px', 
      /* maxWidth ELIMINADO para que abarque toda la pantalla */
      backgroundColor: 'rgba(30, 41, 59, 0.4)', 
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '16px',
      display: 'flex',
      flexDirection: 'column',
      maxHeight: '75vh'
    }}>
      
      {/* Cabecera */}
      <div style={{ 
        padding: '16px 20px', 
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center'
      }}>
        <h3 style={{ margin: 0, fontSize: '15px', color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>{columna.emoji}</span> {columna.titulo}
        </h3>
        <span style={{ 
          backgroundColor: 'rgba(0, 0, 0, 0.3)', 
          color: columna.color, 
          padding: '4px 12px', 
          borderRadius: '20px', 
          fontSize: '12px', 
          fontWeight: 'bold',
          border: `1px solid ${columna.color}40`
        }}>
          {tickets.length}
        </span>
      </div>

      {/* Lista de Tarjetas */}
      <div style={{ 
        padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto', flex: 1
      }}>
        {tickets.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#475569', fontSize: '13px', marginTop: '20px', fontStyle: 'italic' }}>
            Columna vacía
          </div>
        ) : (
          tickets.map(ticket => (
            <KanbanCard 
              key={ticket.id} 
              ticket={ticket} 
              color={columna.color}
              cambiarEstado={cambiarEstado}
              setTicketChat={setTicketChat}
              handleEliminarTicket={handleEliminarTicket}
              formatearFecha={formatearFecha}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default KanbanColumn