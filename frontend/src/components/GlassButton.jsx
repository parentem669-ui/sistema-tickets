import React from 'react'

function GlassButton({ children, type = 'button' }) {
  return (
    <button 
      type={type} 
      style={{
        padding: '12px', width: '100%', borderRadius: '24px',
        background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
        color: 'white', border: 'none', cursor: 'pointer', fontWeight: '600',
        fontSize: '15px', boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)', marginTop: '10px'
      }}
    >
      {children}
    </button>
  )
}

export default GlassButton