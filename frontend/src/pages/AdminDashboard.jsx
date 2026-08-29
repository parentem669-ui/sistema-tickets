import React, { useState } from 'react'
import { useAdmin } from '../Hooks/useAdmin' 
import AdminLayout from '../components/AdminLayout'
import AdminTabs from '../components/AdminTabs'
import AdminTable from '../components/AdminTable'
import ChatModal from '../components/ChatModal'
import { formatearFecha } from '../utils/helpers'

function AdminDashboard() {
  const { 
    tickets, cambiarEstado, handleEliminarTicket, cerrarSesion, 
    ticketChat, setTicketChat, nuevoComentario, setNuevoComentario, enviarComentario
  } = useAdmin()

  const [pestanaActiva, setPestanaActiva] = useState('activos')

  const ticketsActivos = tickets.filter(ticket => ticket.estado !== 'CERRADO')
  const ticketsHistorial = tickets.filter(ticket => ticket.estado === 'CERRADO')
  const ticketsAMostrar = pestanaActiva === 'activos' ? ticketsActivos : ticketsHistorial

  return (
    <>
      <AdminLayout cerrarSesion={cerrarSesion}>
        
        <AdminTabs 
          pestanaActiva={pestanaActiva} 
          setPestanaActiva={setPestanaActiva} 
          conteoActivos={ticketsActivos.length} 
          conteoCerrados={ticketsHistorial.length} 
        />

        <AdminTable 
          tickets={ticketsAMostrar} 
          cambiarEstado={cambiarEstado} 
          setTicketChat={setTicketChat}    
          handleEliminarTicket={handleEliminarTicket} 
          formatearFecha={formatearFecha} 
        /> 

      </AdminLayout>

      <ChatModal 
        ticketChat={ticketChat} 
        setTicketChat={setTicketChat} 
        nuevoComentario={nuevoComentario} 
        setNuevoComentario={setNuevoComentario} 
        enviarComentario={enviarComentario} 
        formatearFecha={formatearFecha} 
      />
    </>
  )
}

export default AdminDashboard