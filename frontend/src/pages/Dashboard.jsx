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
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', padding: '40px', fontFamily: 'sans-serif' }}>
      
      
      <ClientHeader usuarioActual={usuarioProcesado} cerrarSesion={cerrarSesion} />

      <div style={{ display: 'flex', gap: '30px', alignItems: 'flex-start' }}>
        <TicketForm 
          titulo={titulo} 
          setTitulo={setTitulo} 
          descripcion={descripcion} 
          setDescripcion={setDescripcion} 
          manejarSubmit={handleCrearTicket} 
        />
        
        <TicketList 
          tickets={tickets} 
          setTicketChat={setTicketChat} 
        />
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