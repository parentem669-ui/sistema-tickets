import React from 'react'

function ChatModal({ 
  ticketChat, 
  setTicketChat, 
  nuevoComentario, 
  setNuevoComentario, 
  enviarComentario, 
  formatearFecha 
}) {
  if (!ticketChat) return null;

  const usuarioActual = JSON.parse(localStorage.getItem('usuario')) || {};

  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%', 
      backgroundColor: 'rgba(2, 6, 23, 0.75)', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      zIndex: 1000, 
      backdropFilter: 'blur(12px)' 
    }}>
      {/* Ventana Modal Glassmorphism */}
      <div style={{ 
        backgroundColor: 'rgba(15, 23, 42, 0.85)', 
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        width: '90%', 
        maxWidth: '520px', 
        borderRadius: '20px', 
        overflow: 'hidden', 
        display: 'flex', 
        flexDirection: 'column', 
        height: '80vh', 
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)' 
      }}>
        
        {/* Cabecera del Chat */}
        <div style={{ 
          padding: '20px 24px', 
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          backgroundColor: 'rgba(30, 41, 59, 0.4)' 
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '18px' }}>💬</span>
              <h3 style={{ margin: 0, color: '#f8fafc', fontSize: '18px', fontWeight: '600' }}>
                Ticket #{ticketChat.id}
              </h3>
            </div>
            <span style={{ fontSize: '13px', color: '#94a3b8', display: 'block', marginTop: '2px' }}>
              {ticketChat.titulo}
            </span>
          </div>
          <button 
            onClick={() => setTicketChat(null)} 
            style={{ 
              background: 'rgba(255, 255, 255, 0.05)', 
              border: '1px solid rgba(255, 255, 255, 0.1)', 
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              fontSize: '16px', 
              cursor: 'pointer', 
              color: '#94a3b8', 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#f8fafc'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
          >
            ✖
          </button>
        </div>

        {/* Cuerpo / Historial de Mensajes */}
        <div style={{ 
          padding: '24px', 
          overflowY: 'auto', 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '16px' 
        }}>
          {ticketChat.comentarios && ticketChat.comentarios.length > 0 ? (
            ticketChat.comentarios.map(com => {
              const esMio = com.usuario_id === usuarioActual.id 
              
              return (
                <div 
                  key={com.id} 
                  style={{ 
                    alignSelf: esMio ? 'flex-end' : 'flex-start', 
                    maxWidth: '82%', 
                    backgroundColor: esMio ? '#4f46e5' : 'rgba(30, 41, 59, 0.8)', 
                    color: esMio ? '#ffffff' : '#f8fafc', 
                    padding: '12px 18px', 
                    borderRadius: '18px', 
                    borderBottomRightRadius: esMio ? '4px' : '18px', 
                    borderBottomLeftRadius: esMio ? '18px' : '4px', 
                    border: esMio ? 'none' : '1px solid rgba(255, 255, 255, 0.08)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)' 
                  }}
                >
                  <div style={{ 
                    fontSize: '11px', 
                    fontWeight: 'bold', 
                    marginBottom: '4px', 
                    color: esMio ? '#c7d2fe' : '#818cf8', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    gap: '15px' 
                  }}>
                    <span>Usuario #{com.usuario_id}</span>
                  </div>
                  
                  <div style={{ fontSize: '14px', lineHeight: '1.5', wordBreak: 'break-word' }}>
                    {com.contenido}
                  </div>

                  <div style={{ 
                    fontSize: '10px', 
                    textAlign: 'right', 
                    marginTop: '6px', 
                    color: esMio ? '#a5b4fc' : '#64748b' 
                  }}>
                    {formatearFecha(com.fecha_creacion)}
                  </div>
                </div>
              )
            })
          ) : (
            <div style={{ margin: 'auto', textAlign: 'center', color: '#64748b' }}>
              <div style={{ fontSize: '44px', marginBottom: '12px' }}>💬</div>
              <p style={{ margin: 0, fontStyle: 'italic', fontSize: '14px', lineHeight: '1.5' }}>
                Aún no hay mensajes en este ticket.<br/>Escribe una respuesta abajo para conversar.
              </p>
            </div>
          )}
        </div>

        {/* Input para Enviar Comentario */}
        <form 
          onSubmit={enviarComentario} 
          style={{ 
            padding: '16px 20px', 
            borderTop: '1px solid rgba(255, 255, 255, 0.08)', 
            display: 'flex', 
            gap: '12px', 
            backgroundColor: 'rgba(15, 23, 42, 0.95)' 
          }}
        >
          <input 
            type="text" 
            value={nuevoComentario} 
            onChange={(e) => setNuevoComentario(e.target.value)} 
            placeholder="Escribe un mensaje..." 
            required 
            style={{ 
              flex: 1, 
              padding: '12px 18px', 
              borderRadius: '24px', 
              border: '1px solid rgba(255, 255, 255, 0.1)', 
              outline: 'none', 
              fontSize: '14px', 
              backgroundColor: 'rgba(30, 41, 59, 0.6)', 
              color: '#f8fafc' 
            }} 
          />
          <button 
            type="submit" 
            style={{ 
              background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', 
              color: 'white', 
              border: 'none', 
              padding: '0 22px', 
              borderRadius: '24px', 
              cursor: 'pointer', 
              fontWeight: '600', 
              fontSize: '14px',
              boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            Enviar
          </button>
        </form>

      </div>
    </div>
  )
}

export default ChatModal