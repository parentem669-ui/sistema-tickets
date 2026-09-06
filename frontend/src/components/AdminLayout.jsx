import React from 'react'
import AdminHeader from './AdminHeader'

function AdminLayout({ children, usuarioActual, cerrarSesion }) {
  return (
    <div style={{ padding: '20px 40px', width: '100%', boxSizing: 'border-box' }}>
      
      {/* Header Estilizado con Menú Flotante */}
      <AdminHeader usuarioActual={usuarioActual} cerrarSesion={cerrarSesion} />

      <div style={{ marginTop: '30px' }}>
        <h2 style={{ 
          margin: '0 0 20px 0', 
          color: '#f8fafc', 
          fontSize: '24px', 
          fontWeight: '600',
          letterSpacing: '-0.5px'
        }}>
          Gestión de Requerimientos
        </h2>
        
        {children}
        
      </div>
    </div>
  )
}

export default AdminLayout