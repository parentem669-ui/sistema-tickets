import React from 'react'
import UserProfileMenu from './UserProfileMenu'
import logo from '../assets/Logo_TI.png';

function ClientHeader({ usuarioActual, cerrarSesion }) {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      borderBottom: '1px solid rgba(255,255,255,0.1)', 
      paddingBottom: '20px' 
    }}>
      
      {/* Brand / Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <img src={logo} alt="Logo TI" style={{ width: '42px', height: '42px', objectFit: 'contain' }} />
        <div>
          <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '800', color: '#f8fafc', letterSpacing: '-0.5px', lineHeight: '1' }}>
            HelpDesk <span style={{ color: '#818cf8', fontWeight: '400' }}>Pro</span>
          </h1>
          <span style={{ fontSize: '12px', color: '#94a3b8' }}>Portal de Cliente</span>
        </div>
      </div>

      {/* Menú Modular del Usuario */}
      <UserProfileMenu usuarioActual={usuarioActual} cerrarSesion={cerrarSesion} />

    </div>
  )
}

export default ClientHeader