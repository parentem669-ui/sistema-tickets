import React from 'react'
import { useAdmin } from '../Hooks/useAdmin' 
import AdminLayout from '../components/AdminLayout'
import AdminTable from '../components/AdminTable'
import ChatModal from '../components/ChatModal'
import { formatearFecha } from '../utils/helpers'

function AdminDashboard() {
  const { 
    tickets, cambiarEstado, handleEliminarTicket, cerrarSesion, 
    ticketChat, setTicketChat, nuevoComentario, setNuevoComentario, enviarComentario,
    usuarioActual // Extraemos usuarioActual para el menu flotante
  } = useAdmin()

  const usuarioProcesado = {
    ...usuarioActual,
    nombre: usuarioActual?.nombre_completo || usuarioActual?.nombre || 'Administrador'
  }

  return (
    <div style={{ 
      backgroundColor: '#0b0f19',
      minHeight: '100vh', 
      fontFamily: 'system-ui, -apple-system, sans-serif',
      color: '#f8fafc',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* Efectos de luz de fondo */}
      <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '50%', height: '50%', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: '50%', height: '50%', background: 'radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 0 }} />

      {/* Capa de contenido */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <AdminLayout usuarioActual={usuarioProcesado} cerrarSesion={cerrarSesion}>
          
          <AdminTable 
            tickets={tickets} 
            cambiarEstado={cambiarEstado} 
            setTicketChat={setTicketChat}    
            handleEliminarTicket={handleEliminarTicket} 
            formatearFecha={formatearFecha} 
          /> 

        </AdminLayout>
      </div>

      <ChatModal 
        ticketChat={ticketChat} 
        setTicketChat={setTicketChat} 
        nuevoComentario={nuevoComentario} 
        setNuevoComentario={setNuevoComentario} 
        enviarComentario={enviarComentario} 
        formatearFecha={formatearFecha} 
      />
    </div>
  )
}

export default AdminDashboard