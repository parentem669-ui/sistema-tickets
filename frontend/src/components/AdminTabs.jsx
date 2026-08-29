import React from 'react'

function AdminTabs({ pestanaActiva, setPestanaActiva, conteoActivos, conteoCerrados }) {
  return (
    <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', borderBottom: '2px solid #e2e8f0', paddingBottom: '10px' }}>
      <button 
        onClick={() => setPestanaActiva('activos')}
        style={{
          padding: '10px 20px',
          border: 'none',
          backgroundColor: 'transparent',
          fontSize: '16px',
          fontWeight: pestanaActiva === 'activos' ? 'bold' : 'normal',
          color: pestanaActiva === 'activos' ? '#6366f1' : '#64748b',
          borderBottom: pestanaActiva === 'activos' ? '3px solid #6366f1' : 'none',
          cursor: 'pointer',
          marginBottom: '-12px'
        }}
      >
        🚀 Cola Activa ({conteoActivos})
      </button>
      
      <button 
        onClick={() => setPestanaActiva('historial')}
        style={{
          padding: '10px 20px',
          border: 'none',
          backgroundColor: 'transparent',
          fontSize: '16px',
          fontWeight: pestanaActiva === 'historial' ? 'bold' : 'normal',
          color: pestanaActiva === 'historial' ? '#10b981' : '#64748b',
          borderBottom: pestanaActiva === 'historial' ? '3px solid #10b981' : 'none',
          cursor: 'pointer',
          marginBottom: '-12px'
        }}
      >
        📁 Historial Cerrados ({conteoCerrados})
      </button>
    </div>
  )
}

export default AdminTabs