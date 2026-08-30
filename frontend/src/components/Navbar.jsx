import React from 'react';

function Navbar({ openModal }) {
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px', borderBottom: '1px solid #1e293b' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'white', fontSize: '20px', fontWeight: 'bold' }}>
        🎟️ HelpDesk
      </div>
      
      <div style={{ display: 'flex', gap: '20px' }}>
        <button 
          onClick={() => openModal('login')}
          style={{ backgroundColor: 'transparent', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}
        >
          Iniciar Sesión
        </button>
        <button 
          onClick={() => openModal('register')}
          style={{ backgroundColor: '#6366f1', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px', transition: 'background 0.3s' }}
        >
          Registrarse
        </button>
      </div>
    </nav>
  );
}

export default Navbar;