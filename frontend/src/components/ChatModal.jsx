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

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, backdropFilter: 'blur(3px)' }}>
      <div style={{ backgroundColor: 'white', width: '90%', maxWidth: '500px', borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '80vh', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
        
        <div style={{ padding: '20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f8fafc' }}>
         <div>
           <h3 style={{ margin: 0, color: '#1e293b', fontSize: '18px' }}>Chat del Ticket #{ticketChat.id}</h3>
           <span style={{ fontSize: '13px', color: '#64748b' }}>{ticketChat.titulo}</span>
         </div>
         <button onClick={() => setTicketChat(null)} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#94a3b8', lineHeight: '1' }}>✖</button>
        </div>

        <div style={{ padding: '20px', overflowY: 'auto', flex: 1, backgroundColor: '#f1f5f9', display: 'flex', flexDirection: 'column', gap: '15px' }}>
         {ticketChat.comentarios && ticketChat.comentarios.length > 0 ? (
           ticketChat.comentarios.map(com => {
             const usuarioActual = JSON.parse(localStorage.getItem('usuario'))
             const esMio = com.usuario_id === usuarioActual.id 
              
             return (
               <div key={com.id} style={{ alignSelf: esMio ? 'flex-end' : 'flex-start', maxWidth: '85%', backgroundColor: esMio ? '#6366f1' : 'white', color: esMio ? 'white' : '#333', padding: '12px 16px', borderRadius: '16px', borderBottomRightRadius: esMio ? '4px' : '16px', borderBottomLeftRadius: esMio ? '16px' : '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                 <div style={{ fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: esMio ? '#c7d2fe' : '#64748b', display: 'flex', justifyContent: 'space-between', gap: '15px' }}>
                   <span>Usuario #{com.usuario_id}</span>
                 </div>
                 <div style={{ fontSize: '15px', lineHeight: '1.4' }}>{com.contenido}</div>
                 <div style={{ fontSize: '10px', textAlign: 'right', marginTop: '8px', color: esMio ? '#a5b4fc' : '#94a3b8' }}>
                   {formatearFecha(com.fecha_creacion)}
                 </div>
               </div>
             )
           })
         ) : (
           <div style={{ margin: 'auto', textAlign: 'center', color: '#94a3b8' }}>
             <div style={{ fontSize: '40px', marginBottom: '10px' }}>💬</div>
             <p style={{ margin: 0, fontStyle: 'italic' }}>Aún no hay mensajes.<br/>Escribe uno abajo para iniciar la conversación.</p>
           </div>
         )}
        </div>

        <form onSubmit={enviarComentario} style={{ padding: '16px', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '10px', backgroundColor: 'white' }}>
          <input 
            type="text" 
            value={nuevoComentario} 
            onChange={(e) => setNuevoComentario(e.target.value)} 
            placeholder="Escribe un mensaje..." 
            required 
            style={{ flex: 1, padding: '12px 16px', borderRadius: '24px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px', backgroundColor: '#f8fafc', color: '#1e293b' }} 
          />
          <button type="submit" style={{ backgroundColor: '#6366f1', color: 'white', border: 'none', padding: '0 24px', borderRadius: '24px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' }}>
            Enviar
          </button>
        </form>

      </div>
    </div>
  )
}

export default ChatModal