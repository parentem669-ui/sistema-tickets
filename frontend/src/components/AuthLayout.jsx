import React from 'react'

function AuthLayout({ children, titulo }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#0f172a', fontFamily: 'sans-serif' }}>
      <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' }}>
        <h2 style={{ textAlign: 'center', color: '#1e293b', marginBottom: '24px' }}>
          {titulo}
        </h2>
        
        {children}
        
      </div>
    </div>
  )
}

export default AuthLayout