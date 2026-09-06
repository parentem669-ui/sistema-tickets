import React, { useState } from 'react'

function UserProfileMenu({ usuarioActual, cerrarSesion }) {
  const [menuAbierto, setMenuAbierto] = useState(false)

  return (
    <div style={{ position: 'relative' }}>
      {/* Botón de Avatar para abrir el menú */}
      <button
        onClick={() => setMenuAbierto(!menuAbierto)}
        style={{ 
          display: 'flex', alignItems: 'center', gap: '10px', 
          background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(255,255,255,0.1)', 
          padding: '6px 16px 6px 6px', borderRadius: '30px', cursor: 'pointer', 
          color: '#f8fafc', transition: 'all 0.2s', backdropFilter: 'blur(8px)'
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(30, 41, 59, 0.9)'}
        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(30, 41, 59, 0.6)'}
      >
        <div style={{ 
          width: '32px', height: '32px', borderRadius: '50%', background: '#6366f1', 
          display: 'flex', justifyContent: 'center', alignItems: 'center', 
          fontSize: '14px', fontWeight: 'bold' 
        }}>
          {usuarioActual?.nombre?.charAt(0).toUpperCase() || 'U'}
        </div>
        <span style={{ fontSize: '14px', fontWeight: '500' }}>
          {usuarioActual?.nombre?.split(' ')[0] || 'Cliente'}
        </span>
        <svg fill="currentColor" viewBox="0 0 20 20" style={{ width: '16px', height: '16px', color: '#94a3b8' }} xmlns="http://www.w3.org/2000/svg">
          <path clipRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" fillRule="evenodd"></path>
        </svg>
      </button>

      {/* Tarjeta Flotante (Dropdown) */}
      {menuAbierto && (
        <div style={{ 
          position: 'absolute', top: 'calc(100% + 12px)', right: 0, width: '280px', 
          backgroundColor: 'rgba(15, 23, 42, 0.95)', backdropFilter: 'blur(16px)', 
          border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', 
          overflow: 'hidden', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.5)', zIndex: 50 
        }}>
          {/* Cabecera del Usuario */}
          <div style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'linear-gradient(to right, #3730a3, #4f46e5)' }}>
            <p style={{ fontSize: '11px', fontWeight: '600', color: '#c7d2fe', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 6px 0' }}>
              Sesión iniciada como
            </p>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '10px' }}>
                <svg fill="currentColor" viewBox="0 0 20 20" style={{ width: '16px', height: '16px' }} xmlns="http://www.w3.org/2000/svg">
                  <path clipRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" fillRule="evenodd"></path>
                </svg>
              </div>
              <p style={{ fontSize: '14px', fontWeight: '500', color: 'white', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {usuarioActual?.correo || 'cliente@ejemplo.com'}
              </p>
            </div>
          </div>

          {/* Opciones del menú */}
          <div style={{ padding: '8px 0' }}>
            <a href="#" style={{ display: 'flex', alignItems: 'center', padding: '10px 16px', fontSize: '14px', color: '#cbd5e1', textDecoration: 'none', transition: 'background 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'rgba(99, 102, 241, 0.1)', color: '#818cf8', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '12px' }}>
                <svg fill="currentColor" viewBox="0 0 20 20" style={{ width: '20px', height: '20px' }} xmlns="http://www.w3.org/2000/svg">
                  <path clipRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" fillRule="evenodd"></path>
                </svg>
              </div>
              <span style={{ fontWeight: '500' }}>Configuración</span>
            </a>

            <div onClick={cerrarSesion} style={{ display: 'flex', alignItems: 'center', padding: '10px 16px', fontSize: '14px', color: '#f87171', textDecoration: 'none', transition: 'background 0.2s', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.05)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#f87171', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '12px' }}>
                <svg fill="currentColor" viewBox="0 0 20 20" style={{ width: '20px', height: '20px' }} xmlns="http://www.w3.org/2000/svg">
                  <path clipRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" fillRule="evenodd"></path>
                </svg>
              </div>
              <span style={{ fontWeight: '500' }}>Cerrar Sesión</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserProfileMenu