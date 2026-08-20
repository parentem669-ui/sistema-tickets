import React from 'react'

function ClientHeader({ usuarioActual, cerrarSesion }) {
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
      <div>
        <h1 style={{ color: 'white', margin: 0 }}>Mi Panel de Soporte</h1>
        
        <p style={{ color: '#94a3b8', margin: '5px 0 0 0' }}>
          Hola, {usuarioActual?.nombre_completo || 'Cliente'}
        </p>
      </div>
      <button onClick={cerrarSesion} style={{ backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}>
        Cerrar Sesión
      </button>
    </header>
  )
}

export default ClientHeader