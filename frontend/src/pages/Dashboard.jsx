import { useClient } from '../Hooks/useClient'
import { formatearFecha } from '../utils/helpers'

import ClientHeader from '../components/ClientHeader'
import TicketForm from '../components/TicketForm'
import TicketList from '../components/TicketList'
import ChatModal from '../components/ChatModal'

function Dashboard() {
  const { 
    tickets, titulo, setTitulo, descripcion, setDescripcion, 
    ticketChat, setTicketChat, nuevoComentario, setNuevoComentario, 
    usuarioActual, handleCrearTicket, enviarComentario, cerrarSesion 
  } = useClient()

  const usuarioProcesado = {
    ...usuarioActual,
    nombre: usuarioActual?.nombre_completo || usuarioActual?.nombre || 'Cliente'
  }

  return (
    <div style={{ 
      backgroundColor: '#0b0f19', // Fondo oscuro profundo
      minHeight: '100vh', 
      fontFamily: 'system-ui, -apple-system, sans-serif',
      color: '#f8fafc',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* Efectos de luz de fondo (Glows sutiles) */}
      <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: '60%', height: '60%', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '60%', height: '60%', background: 'radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 0 }} />

      {/* Contenedor Principal */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1400px', margin: '0 auto', padding: '30px 40px' }}>
        
        {/* Header (Lo actualizaremos en el siguiente paso) */}
        <ClientHeader usuarioActual={usuarioProcesado} cerrarSesion={cerrarSesion} />

        {/* Grid Layout moderno para Formulario y Lista */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
          gap: '30px', 
          alignItems: 'start',
          marginTop: '40px'
        }}>
          
          {/* Tarjeta Glassmorphism: Crear Ticket */}
          <div style={{ 
            background: 'rgba(30, 41, 59, 0.4)', 
            backdropFilter: 'blur(16px)', 
            border: '1px solid rgba(255, 255, 255, 0.08)', 
            borderRadius: '20px', 
            padding: '30px',
            boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.5)'
          }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '20px', color: '#818cf8', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>✍️</span> Nuevo Requerimiento
            </h2>
            <TicketForm 
              titulo={titulo} 
              setTitulo={setTitulo} 
              descripcion={descripcion} 
              setDescripcion={setDescripcion} 
              manejarSubmit={handleCrearTicket} 
            />
          </div>
          
          {/* Tarjeta Glassmorphism: Historial de Tickets */}
          <div style={{ 
            background: 'rgba(30, 41, 59, 0.4)', 
            backdropFilter: 'blur(16px)', 
            border: '1px solid rgba(255, 255, 255, 0.08)', 
            borderRadius: '20px', 
            padding: '30px',
            boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
            minHeight: '400px'
          }}>
             <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '20px', color: '#a5b4fc', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>📋</span> Mis Tickets
            </h2>
            <TicketList 
              tickets={tickets} 
              setTicketChat={setTicketChat} 
            />
          </div>

        </div>
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

export default Dashboard