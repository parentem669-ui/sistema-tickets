import React from 'react'
import AdminHeader from './AdminHeader'

function AdminLayout({ children, cerrarSesion }) {
  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', padding: '40px', fontFamily: 'sans-serif' }}>
      
      <AdminHeader cerrarSesion={cerrarSesion} />

      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <h2 style={{ margin: '0 0 20px 0', color: '#1e293b' }}>Gestión de Requerimientos</h2>
        
        {children}
        
      </div>
    </div>
  )
}

export default AdminLayout